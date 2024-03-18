## Dia Store Admin Dashboard | Full Stack Dashboard & CMS.

This is a Full Stack Dashboard I made.

To use this demo use this credentials: 

email: janedoe@test.com
p: Dia$admin.

Live Deploy: [Demo](https://dia-ecommerce-pannel.vercel.app/208a7cdf-3bc8-4c1c-af17-543d7af8935d)
## Screenshots

![image](https://github.com/devgnox/dia-ecommerce-pannel/assets/34384738/76c26314-fcb3-41a6-8ee8-f0caa0c8b292)
![image](https://github.com/devgnox/dia-ecommerce-pannel/assets/34384738/928794ba-d216-43ce-8d1a-6a3b50f8ee6f)

## Features

- You can create, update and delete products, you can upload multiple images for one product.
- You can create, update and delete categories.
- You can create, update and delete "Billboards" With an Image and a label so you can display them in your store. 
- You can set up the "Color" and "Size" filters and then aply them to the "Product" in the creation form.
- You can filter and search through all categories, products, sizes, colors, billboards.
- You can signal if a product is to be "featured" so they appear in your front store homepage.
- You can archive a product so they don't show up in your front store.
- You will be able to Overview your orders.
- You can see some graphs of your revenue, sales and stock.
- Stripe webhooks.
- Stripe for checkout.
- Uses Clerk for Authentication.
- Cloudinary for image storage.

## Tech Stack

**Client:** React, TailwindCSS

**Server:** Next.js, App Router, Prisma, Postgresql/CockroachDB


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`

`CLERK_SECRET_KEY`

`NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in`

`NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up`

`NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/`

`NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/`

`DATABASE_URL`

`NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`

`STRIPE_API_KEY`

`FRONTEND_STORE_URL`

`STRIPE_WEBHOOK_SECRET`

## Usage/Examples

```javascript
npm i

```
Set up the Enviroment Variables Make sure to set up prisma:

```
npx prisma generate
npx prisma db push
```

Run the App
```
npm run dev
```


