import { Card, Stack, Typography } from "@mui/material";
import { Product as IProduct } from "./interfaces/product.interface";

interface ProductProps {
  product: IProduct;
}

export default async function Product({ product }: ProductProps) {
  return (
    <>
      <Card className="p-4" style={{ flexGrow: 1 }}>
        <Stack spacing={0.5}>
          <Typography variant="h5">{product.name}</Typography>
          <Typography variant="caption" gutterBottom sx={{ display: "block" }}>
            {product.description}
          </Typography>
          <Typography variant="caption" gutterBottom sx={{ display: "block" }}>
            ${product.price}
          </Typography>
        </Stack>
      </Card>
    </>
  );
}
