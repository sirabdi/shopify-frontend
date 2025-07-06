import { Stack, Typography } from "@mui/material";
import getProduct from "./get-product";
import Image from "next/image";
import { getProductImage } from "../product-image";
import Checkout from "@/app/checkout/checkout";

interface SingleProductProps {
  params: { productId: string };
}

export default async function SingleProduct({ params }: SingleProductProps) {
  const detailProduct = await getProduct(+params.productId);

  return (
    <Stack gap={3} marginBottom={"2rem"}>
      <Typography variant="h2">{detailProduct.name}</Typography>
      {detailProduct.imageExist && (
        <Image
          width="0"
          height="0"
          sizes="100vw"
          className="w-auto md:w-1/2 h-auto"
          alt="Picture of the product"
          src={getProductImage(detailProduct.id)}
        />
      )}
      <Typography>{detailProduct.description}</Typography>
      <Typography variant="h4">{detailProduct.price}</Typography>

      <Checkout productId={detailProduct.id} />
    </Stack>
  );
}
