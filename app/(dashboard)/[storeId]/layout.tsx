import Navbar from "@/components/Navbar";
import { CheckUserSession, GetStoreByStoreID } from "@/lib/queries";
import { redirect } from "next/navigation";
import React from "react";

const layout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) => {
  const userId = await CheckUserSession();
  if (!userId) redirect("/sign-in");

  const store = await GetStoreByStoreID(params?.storeId, userId);
  if (!store) redirect("/");

  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default layout;
