import { CheckUserSession, GetStoreByStoreID } from "@/lib/queries";
import { redirect } from "next/navigation";
import React from "react";
import SettingsForm from "./components/SettingsForm";

interface ISettingsPageProps {
  params: {
    storeId: string;
  };
}

const SettingsPage: React.FC<ISettingsPageProps> = async ({ params }) => {
  const userId = await CheckUserSession();
  if (!userId) redirect("/sign-in");

  const store = await GetStoreByStoreID(params.storeId, userId);
  if (!store) redirect("/");

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={store} />
      </div>
    </div>
  );
};

export default SettingsPage;
