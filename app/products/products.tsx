import { Grid } from "@mui/material";
import getProducts from "./actions/get-products";
import Product from "./product";

export default async function Products() {
  const products = await getProducts();

  return (
    <Grid container spacing={4}>
      {products.map((product) => (
        <Grid key={product.id} item sm={6} lg={4} xs={12} display="flex">
          <Product product={product} />
        </Grid>
      ))}
    </Grid>
  );
}
