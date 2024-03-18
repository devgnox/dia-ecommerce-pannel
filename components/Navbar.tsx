import { UserButton } from "@clerk/nextjs";
import React from "react";
import MainNav from "@/components/MainNav";
import StoreSwitcher from "@/components/StoreSwitcher";
import { redirect } from "next/navigation";
import { CheckUserSession, GetAllStoresByUserID } from "@/lib/queries";
import { ThemeToggler } from "@/components/ui/theme-toggler";

const Navbar = async () => {
  const userId = await CheckUserSession();
  if (!userId) redirect("/sign-in");

  const stores = await GetAllStoresByUserID(userId);
  if (!stores) redirect("/");

  return (
    <div className="border-b ">
      <div className="flex h-16 items-center px-4 ">
        <StoreSwitcher items={stores} />
        <MainNav className="mx-6">routes</MainNav>
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggler />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
