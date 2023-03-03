import Carousel from "react-material-ui-carousel";

import banner1 from "@/assets/images/banner1.jpg";
import banner2 from "@/assets/images/banner2.jpg";
import banner3 from "@/assets/images/banner3.jpg";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Pagination,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ButtonMenu from "@/components/UI/ButtonMenu";
import ProductItem from "@/components/Products/ProductItem";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/styles";
import { getProductsByBrand } from "@/services/productServices";

const images = [banner1, banner2, banner3];
const brands = ["Converse", "Vans", "Nike", "Adidas", "Fila"];

function Home() {
  const [currentBrand, setCurrentBrand] = useState(brands[0]);
  const [products, setProducts] = useState([]);
  const theme = useTheme();

  const getProducts = async (brandName) => {
    const products = await getProductsByBrand(brandName);
    setProducts(products);
  };

  useEffect(() => {
    getProducts(brands[0]);
  }, []);

  const handleChangeBrand = async (brandName) => {
    try {
      getProducts(brandName);
      setCurrentBrand(brandName);
    } catch (error) {}
  };

  return (
    <>
      <Carousel autoPlay={true} navButtonsAlwaysVisible={true}>
        {images.map((image, index) => (
          <img key={index} src={image} alt="" style={{ width: "100%" }} />
        ))}
      </Carousel>
      <Container sx={{ marginY: 8 }} maxWidth="xl">
        <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between">
          <Box>
            {brands.map((category) => (
              <Button
                key={category}
                variant="contained"
                sx={{
                  textTransform: "uppercase",
                  marginRight: 3,
                  marginY: 1,
                  backgroundColor: category === currentBrand && theme.palette.secondary.main,
                  color: category === currentBrand && theme.palette.primary.main,
                  ":hover": {
                    color: "white",
                  },
                }}
                onClick={handleChangeBrand.bind(this, category)}
              >
                {category}
              </Button>
            ))}
          </Box>
          <ButtonMenu />
        </Stack>

        <TextField placeholder="Search your products by name" sx={{ marginY: 3, width: { xs: "100%", md: "380px" } }} />

        <Grid container spacing={2}>
          {products ? (
            products.map((product) => (
              <Grid key={product._id} item xs={6} md={4} lg={3}>
                <ProductItem name={product.name} price={product.price} desc={product.description} />
              </Grid>
            ))
          ) : (
            <CircularProgress />
          )}
        </Grid>
        {products.length === 0 && (
          <Typography sx={{ textAlign: "center", marginY: 10, fontSize: 30 }}>
            No products found in{" "}
            <Typography component="span" sx={{ display: "inline-block", fontSize: 30, fontWeight: "bold" }}>
              {currentBrand}
            </Typography>{" "}
            brand
          </Typography>
        )}

        <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
          <Pagination count={10} color="secondary" />
        </Box>
      </Container>
    </>
  );
}

export default Home;
