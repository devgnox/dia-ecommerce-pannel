"use client";

import React, { useEffect, useState } from "react";
import { Billboard } from "@prisma/client";
import Heading from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Trash } from "lucide-react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import AlertModal from "@/components/modals/AlertModal";
import useOrigin from "@/hooks/useOrigin";
import ImageUpload from "@/components/ui/image-upload";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  label: z.string().min(2),
  imageUrl: z.string().min(1),
  textColor: z
    .string()
    .min(3)
    .regex(/^#/, { message: "String must be a valid hex code" }),
  isPrimaryBillboard: z.boolean().default(false),
});

type BillboardFormValues = z.infer<typeof formSchema>;

interface IBillboardFormProps {
  initialData: Billboard | null;
}

const BillboardForm: React.FC<IBillboardFormProps> = ({ initialData }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const router = useRouter();
  const origin = useOrigin();

  const title = initialData ? "Edit Billboard" : "Create Billboard";
  const description = initialData ? "Edit a Billboard" : "Add a new Billboard";
  const toastMessage = initialData ? "Billboard update." : "Billboard created.";
  const action = initialData ? "Save Changes" : "Create";

  const form = useForm<BillboardFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label: "",
      imageUrl: "",
      textColor: "",
      isPrimaryBillboard: false,
    },
  });

  const onSubmit = async (data: BillboardFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/billboards/${params.billboardId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/billboards`, data);
      }

      router.push(`/${params.storeId}/billboards`);
      router.refresh();

      toast.success(toastMessage);
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    setLoading(true);
    try {
      const response = await axios.delete(
        `/api/${params.storeId}/billboards/${params.billboardId}`
      );

      router.refresh();
      router.push(`/${params.storeId}/billboards`);
      toast.success("Billboard deleted!");
    } catch (error) {
      toast.error("Make sure to remove all categories using this Billboard.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            variant="destructive"
            size="icon"
            onClick={() => setOpen(true)}
            disabled={loading}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={loading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-8">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Billboard Label"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="textColor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Text Color</FormLabel>
                  <FormControl>
                    <div className="flex gap-2">
                      <div
                        className="rounded-md w-[50px] border border-gray-400"
                        style={{ backgroundColor: field.value }}
                      />
                      <Input
                        placeholder="#ffffff"
                        disabled={loading}
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Only hexadecimal colors{" "}
                    <span className="text-sm font-medium light:text-gray-500 hover:text-blue-400">
                      (
                      <a
                        target="_blank"
                        href="https://htmlcolorcodes.com"
                        className="no-underline"
                      >
                        See more
                      </a>
                      )
                    </span>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isPrimaryBillboard"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      //@ts-ignore
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-2 leading-none">
                    <FormLabel>Main Billboard?</FormLabel>
                    <FormDescription>
                      This would be your main billboard for your store. You can
                      change it later on.
                    </FormDescription>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto " type="submit">
            {action}
          </Button>
        </form>
      </Form>
      {/* <Separator /> */}
    </>
  );
};

export default BillboardForm;
