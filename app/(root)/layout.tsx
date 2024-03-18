import { CheckUserSession, GetFirstStoreByUserID } from "@/lib/queries";
import { redirect } from "next/navigation";
import React from "react";

const SetupLayout = async ({ children }: { children: React.ReactNode }) => {
  const userId = await CheckUserSession();
  if (!userId) redirect("/sign-in");

  const store = await GetFirstStoreByUserID(userId);
  if (store) {
    redirect(`/${store.id}`);
  }

  return <>{children}</>;
};

export default SetupLayout;
