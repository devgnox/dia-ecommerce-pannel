import Heading from "@/components/ui/heading";
import {
  GetTotalRevenueByStoreID,
  GetStoreByStoreID,
  GetSalesCountByStoreID,
  GetStockCountByStoreID,
  GetGraphRevenue,
} from "@/lib/queries";
import { Separator } from "@/components/ui/separator";
import { redirect } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, DollarSign, Package } from "lucide-react";
import { priceFormatter } from "@/lib/utils";
import Overview from "@/components/Overview";

interface IDashboardPageProps {
  params: { storeId: string };
}

const DashboardPage: React.FC<IDashboardPageProps> = async ({ params }) => {
  const totalRevenues = await GetTotalRevenueByStoreID(params.storeId);
  const salesCount = await GetSalesCountByStoreID(params.storeId);
  const stockCount = await GetStockCountByStoreID(params.storeId);
  const graphRevenue = await GetGraphRevenue(params.storeId);

  const store = await GetStoreByStoreID(params.storeId);
  if (!store) {
    toast.error("Store doesn't exist.");
    redirect("/");
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading title="Dashboard" description="Overview of your Store" />
        <Separator />
        <div className="grid gap-4 grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-2">
              <CardTitle className="text-sm font medium light:text-gray-800">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {priceFormatter.format(totalRevenues)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-2">
              <CardTitle className="text-sm font medium light:text-gray-800">
                Sales
              </CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{salesCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font medium light:text-gray-800">
                Products In Stock
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stockCount}</div>
            </CardContent>
          </Card>
        </div>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview data={graphRevenue} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
