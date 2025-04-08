import { auth } from "@clerk/nextjs";
import prismadb from "./prismadb";
import { Billboard, Image, OrderItem } from "@prisma/client";
import { NextResponse } from "next/server";

//STORE - GET
export const GetAllStoresByUserID = async (userId: string) => {
  const stores = await prismadb.store.findMany({ where: { userId: userId } });
  if (!stores) return false;

  return stores;
};

export const GetStoreByStoreID = async (storeId: string, userId?: string) => {
  try {
    const store = await prismadb.store.findFirst({
      where: { id: storeId, userId: userId },
    });
    if (!store) return false;

    return store;
  } catch (error) {
    console.log(error);
  }
};

export const GetFirstStoreByUserID = async (userId: string) => {
  try {
    const store = await prismadb.store.findFirst({
      where: { userId: userId },
    });
    if (!store) return false;

    return store;
  } catch (error) {
    console.log(error);
  }
};

export const GetStoresCountOverall = async () => {
  const store = await prismadb.store.count({});
  if (!store) return false;

  return store;
};

export const GetStoresCountByUserID = async (userId: string) => {
  const store = await prismadb.store.count({
    where: { userId: userId },
  });
  if (!store) return false;

  return store;
};

//STORE - POST
export const CreateStore = async (name: string, userId: string) => {
  //check if user has other stores; TODO:set up permision depending on tier
  const userStores = await prismadb.store.findMany({ where: { userId } });

  if (userStores.length > 0)
    throw new Error(
      "Max store count, you can only create one Store in a single account"
    );

  const store = await prismadb.store.create({ data: { name, userId } });

  return store;
};

//STORE - PATCH
export const UpdateStore = async (
  storeId: string,
  userId: string,
  name: string
) => {
  const store = await prismadb.store.updateMany({
    where: { id: storeId, userId },
    data: { name },
  });

  return store;
};

//STORE - DELETE
export const DeleteStore = async (storeId: string, userId: string) => {
  const store = await prismadb.store.deleteMany({
    where: { id: storeId, userId },
  });

  return store;
};

//BILLBOARDS - GET
export const GetBillboardByID = async (billboardId: string) => {
  const billboard = await prismadb.billboard.findUnique({
    where: {
      id: billboardId,
    },
  });

  return billboard;
};

export const GetAllBillboardsByStoreID = async (storeId: string) => {
  const billboards = await prismadb.billboard.findMany({
    where: { storeId },
  });
  if (!billboards) return false;

  return billboards;
};

export const GetBillboardsCountOverall = async () => {
  const billboards = await prismadb.billboard.count({});
  if (!billboards) return false;

  return billboards;
};

export const GetBillboardsByStoreID = async (storeId: string) => {
  const billboards = await prismadb.billboard.findMany({
    where: { storeId },
    orderBy: { createdAt: "desc" },
  });

  return billboards;
};

export const GetMainBillboardByStoreID = async (storeId: string) => {
  const billboard = await prismadb.billboard.findFirst({
    where: { storeId, isPrimaryBillboard: true },
  });
  if (!billboard) return false;

  return billboard;
};

//BILLBOARDS - POST
export const CreateBillboard = async (
  label: string,
  imageUrl: string,
  textColor: string,
  storeId: string
) => {
  const billboard = await prismadb.billboard.create({
    data: { label, imageUrl, textColor, storeId },
  });

  return billboard;
};

//BILLBOARDS - PATCH
export const UpdateBillboard = async (
  billboardId: string,
  data: {
    label: string;
    imageUrl: string;
    textColor: string;
    isPrimaryBillboard: boolean;
  }
) => {
  const billboard = await prismadb.billboard.updateMany({
    where: { id: billboardId },
    data: data,
  });

  if (data.isPrimaryBillboard == true) {
    let billboardTemp = billboard as unknown as Billboard;
    const updatedRecords = await prismadb.billboard.updateMany({
      where: {
        storeId: billboardTemp?.storeId,
        id: { not: billboardId },
      },
      data: {
        isPrimaryBillboard: false,
      },
    });

    return updatedRecords;
  }

  return billboard;
};

//BILLBOARDS - DELETE
export const DeleteBillboard = async (billboardId: string) => {
  const billboard = await prismadb.billboard.deleteMany({
    where: { id: billboardId },
  });

  return billboard;
};

//CATEGORIES - GET
export const GetCategoryByID = async (categoryId: string) => {
  const category = await prismadb.category.findUnique({
    where: {
      id: categoryId,
    },
    include: { billboard: true },
  });

  return category;
};

export const GetCategoriesByStoreID = async (storeId: string) => {
  const categories = await prismadb.category.findMany({
    where: { storeId },
    include: {
      billboard: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return categories;
};
//CATEGORIES - POST
export const CreateCategory = async (
  name: string,
  billboardId: string,
  storeId: string
) => {
  const category = await prismadb.category.create({
    data: { name, storeId, billboardId },
  });

  return category;
};
//CATEGORIES - PATCH
export const UpdateCategory = async (
  categoryId: string,
  data: { name: string; billboardId: string }
) => {
  const category = await prismadb.category.updateMany({
    where: { id: categoryId },
    data: data,
  });

  return category;
};
//CATEGORIES - DELETE
export const DeleteCategory = async (categoryId: string) => {
  const category = await prismadb.category.deleteMany({
    where: { id: categoryId },
  });

  return category;
};

//SIZE - GET
export const GetSizeByID = async (sizeId: string) => {
  const size = await prismadb.size.findUnique({
    where: {
      id: sizeId,
    },
    include: {
      store: true,
    },
  });

  return size;
};

export const GetSizesByStoreID = async (storeId: string) => {
  const sizes = await prismadb.size.findMany({
    where: { storeId },
    include: {
      store: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return sizes;
};
//SIZE - POST
export const CreateSize = async (
  name: string,
  value: string,
  storeId: string
) => {
  const size = await prismadb.size.create({
    data: { name, storeId, value },
  });

  return size;
};

//SIZE - PATCH
export const UpdateSize = async (
  sizeId: string,
  data: { name: string; value: string }
) => {
  const size = await prismadb.size.updateMany({
    where: { id: sizeId },
    data: data,
  });

  return size;
};
//SIZE - DELETE
export const DeleteSize = async (sizeId: string) => {
  const size = await prismadb.size.deleteMany({
    where: { id: sizeId },
  });

  return size;
};

//SIZE - GET
export const GetColorByID = async (colorId: string) => {
  const color = await prismadb.color.findUnique({
    where: {
      id: colorId,
    },
    include: {
      store: true,
    },
  });

  return color;
};

export const GetColorsByStoreID = async (storeId: string) => {
  const colors = await prismadb.color.findMany({
    where: { storeId },
    include: {
      store: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return colors;
};
//SIZE - POST
export const CreateColor = async (
  name: string,
  value: string,
  storeId: string
) => {
  const color = await prismadb.color.create({
    data: { name, storeId, value },
  });

  return color;
};

//SIZE - PATCH
export const UpdateColor = async (
  colorId: string,
  data: { name: string; value: string }
) => {
  const color = await prismadb.color.updateMany({
    where: { id: colorId },
    data: data,
  });

  return color;
};
//SIZE - DELETE
export const DeleteColor = async (colorId: string) => {
  const color = await prismadb.color.deleteMany({
    where: { id: colorId },
  });

  return color;
};

//PRODUCTSS - GET
export const GetProductByID = async (productId: string) => {
  const product = await prismadb.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      images: true,
      size: true,
      color: true,
    },
  });

  return product;
};

export const GetAllProductsByStoreID = async (
  storeId: string,
  filters: {
    categoryId: string | undefined;
    colorId: string | undefined;
    sizeId: string | undefined;
    isFeatured: string | undefined;
  }
) => {
  const products = await prismadb.product.findMany({
    where: {
      storeId,
      categoryId: filters.categoryId,
      colorId: filters.colorId,
      sizeId: filters.sizeId,
      isFeatured: filters.isFeatured ? true : undefined,
    },
    include: { images: true, size: true, color: true, category: true },
    orderBy: {
      createdAt: "desc",
    },
  });
  if (!products) return false;

  return products;
};

export const GetProductsByStoreID = async (storeId: string) => {
  const products = await prismadb.product.findMany({
    where: { storeId },
    include: { category: true, size: true, color: true, images: true },
    orderBy: { createdAt: "desc" },
  });

  return products;
};

export const GetStockCountByStoreID = async (storeId: string) => {
  const stock = await prismadb.product.count({
    where: { storeId, isArchived: false },
  });

  return stock;
};

//PRODUCTS - POST
export const CreateProduct = async (
  name: string,
  price: number,
  categoryId: string,
  sizeId: string,
  colorId: string,
  isFeatured: boolean,
  isArchived: boolean,
  storeId: string,
  images: Image[]
) => {
  const product = await prismadb.product.create({
    data: {
      name: name,
      price,
      categoryId,
      sizeId,
      colorId,
      isFeatured,
      isArchived,
      storeId,
      images: {
        createMany: {
          data: [...images.map((image: { url: string }) => image)],
        },
      },
    },
  });

  return product;
};

//PRODUCTS - PATCH
export const UpdateProduct = async (
  productId: string,
  data: {
    name: string;
    price: number;
    categoryId: string;
    sizeId: string;
    colorId: string;
    isFeatured: boolean;
    isArchived: boolean;
    images: Image[];
  }
) => {
  await prismadb.product.update({
    where: { id: productId },
    data: {
      name: data.name,
      price: data.price,
      categoryId: data.categoryId,
      sizeId: data.sizeId,
      colorId: data.colorId,
      isFeatured: data.isFeatured,
      isArchived: data.isArchived,
      images: {
        deleteMany: {},
      },
    },
  });

  const product = await prismadb.product.update({
    where: { id: productId },
    data: {
      images: {
        createMany: {
          data: [...data.images.map((img: { url: string }) => img)],
        },
      },
    },
  });
  return product;
};

//PRODUCTS - DELETE
export const DeleteProduct = async (productId: string) => {
  const product = await prismadb.product.deleteMany({
    where: { id: productId },
  });

  return product;
};

//PRODUCTSS - GET
export const GetOrderByID = async (orderId: string) => {
  const order = await prismadb.order.findUnique({
    where: {
      id: orderId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  return order;
};

export const GetAllOrdersByStoreID = async (
  storeId: string,
  filters: {
    categoryId: string | undefined;
    colorId: string | undefined;
    sizeId: string | undefined;
    isFeatured: string | undefined;
  }
) => {
  const orders = await prismadb.order.findMany({
    where: {
      storeId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  if (!orders) return false;

  return orders;
};

export const GetOrdersByStoreID = async (storeId: string) => {
  const orders = await prismadb.order.findMany({
    where: { storeId },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return orders;
};

export const GetTotalRevenueByStoreID = async (storeId: string) => {
  const paidOrders = await prismadb.order.findMany({
    where: { storeId, isPaid: true },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  return paidOrders.reduce((total, order) => {
    const ordertotal = order.orderItems.reduce((orderSum, item) => {
      return orderSum + item.product.price.toNumber();
    }, 0);
    return total + ordertotal;
  }, 0);
};

export const GetSalesCountByStoreID = async (storeId: string) => {
  const sales = await prismadb.order.count({
    where: { storeId, isPaid: true },
  });

  return sales;
};

//ORDER - POST
export const CreateOrder = async (
  customerName: string,
  phone: string,
  address: string,
  isPaid: boolean,
  storeId: string,
  orderItems: OrderItem[]
) => {
  const order = await prismadb.order.create({
    data: {
      customerName,
      phone,
      address,
      isPaid,
      storeId,
      orderItems: {
        createMany: {
          data: [...orderItems.map((item: OrderItem) => item)],
        },
      },
    },
  });

  return order;
};

//ORDER - PATCH
export const UpdateOrder = async (
  orderId: string,
  data: {
    customerName: string;
    phone: string;
    address: string;
    isPaid: boolean;
    storeId: string;
    orderItems: OrderItem[];
  }
) => {
  const order = await prismadb.order.update({
    where: { id: orderId },
    data: {
      customerName: data.customerName,
      phone: data.phone,
      address: data.address,
      isPaid: data.isPaid,
      storeId: data.storeId,
      orderItems: {
        deleteMany: {},
      },
    },
  });

  return order;
};

//PRODUCTS - DELETE
export const DeleteOrder = async (orderId: string) => {
  const order = await prismadb.order.deleteMany({
    where: { id: orderId },
  });

  return order;
};
//SESSION

export const CheckUserSession = async () => {
  const { userId } = auth();

  if (!userId) return false;
  return userId;
};

export const GetGraphRevenue = async (storeId: string) => {
  const paidOrders = await prismadb.order.findMany({
    where: { storeId, isPaid: true },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  const monthlyRevenue: { [key: number]: number } = {};

  for (const order of paidOrders) {
    const month = order.createdAt.getMonth();
    let revenueForOrder = 0;
    for (const item of order.orderItems) {
      revenueForOrder += item.product.price.toNumber();
    }
    monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenueForOrder;
  }
  const graphData: { name: string; total: number }[] = [
    { name: "Jan", total: 0 },
    { name: "Feb", total: 0 },
    { name: "Mar", total: 0 },
    { name: "Apr", total: 0 },
    { name: "May", total: 0 },
    { name: "Jun", total: 0 },
    { name: "Jul", total: 0 },
    { name: "Aug", total: 0 },
    { name: "Sep", total: 0 },
    { name: "Oct", total: 0 },
    { name: "Nov", total: 0 },
    { name: "Dec", total: 0 },
  ];

  for (const month in monthlyRevenue) {
    graphData[parseInt(month)].total = monthlyRevenue[parseInt(month)];
  }

  return graphData;
};
