"use client";

import React, { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Copy, Server } from "lucide-react";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

interface IApiAlertProps {
  title: string;
  description: string;
  variant: "public" | "admin";
}

const textMap: Record<IApiAlertProps["variant"], string> = {
  public: "Public",
  admin: "Admin",
};

const variantMap: Record<IApiAlertProps["variant"], BadgeProps["variant"]> = {
  public: "secondary",
  admin: "destructive",
};

const ApiAlert: React.FC<IApiAlertProps> = ({
  title,
  description,
  variant = "public",
}) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(description);
    toast("API Copied to the Clipboard!", {
      icon: "📋",
    });
  };

  return (
    <Alert>
      <Server className="h-4 w-4 " />
      <AlertTitle className="flex items-center gap-x-2 light:text-gray-800 ">
        {title} <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className="mt-4 flex items-center justify-between light:text-gray-800 text-sm">
        <code className="relative rounded bg-muted px-[1rem] py-[0.2rem] font-mono text-sm font-semibold">
          {description}
        </code>
        <Button variant="outline" size="icon" onClick={copyToClipboard}>
          <Copy className="g-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default ApiAlert;
