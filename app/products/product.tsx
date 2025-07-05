"use client";

import { Card, CardActionArea, Stack, Typography } from "@mui/material";
import { Product as IProduct } from "./interfaces/product.interface";
import Image from "next/image";
import { getProductImage } from "./product-image";
import { useRouter } from "next/navigation";

interface ProductProps {
  product: IProduct;
}

export default function Product({ product }: ProductProps) {
  const router = useRouter();

  return (
    <>
      <CardActionArea
        onClick={() => {
          router.push(`/products/${product.id}`);
        }}
      >
        <Card className="p-4" style={{ flexGrow: 1 }}>
          <Stack spacing={0.5}>
            <Typography variant="h5">{product.name}</Typography>
            {product.imageExist && (
              <Image
                width="0"
                height="0"
                sizes="100vw"
                className="w-full h-auto"
                alt="Picture of the product"
                src={getProductImage(product.id)}
              />
            )}
            <Typography
              variant="caption"
              gutterBottom
              sx={{ display: "block" }}
            >
              {product.description}
            </Typography>
            <Typography
              variant="caption"
              gutterBottom
              sx={{ display: "block" }}
            >
              ${product.price}
            </Typography>
          </Stack>
        </Card>
      </CardActionArea>
    </>
  );
}
