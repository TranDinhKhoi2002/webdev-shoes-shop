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
import { toast } from "react-toastify";
import useDebounce from "@/hooks/useDebounce";
import { useSelector } from "react-redux";
import { selectBrands, selectProducts } from "@/redux/slices/data";

const images = [banner1, banner2, banner3];
// const brands = ["Converse", "Vans", "Nike", "Adidas", "Fila"];

function Home() {
  const loadedProducts = useSelector(selectProducts);
  const [products, setProducts] = useState(loadedProducts);
  const [searchValue, setSearchValue] = useState("");
  const theme = useTheme();
  const brands = useSelector(selectBrands);
  const [currentBrand, setCurrentBrand] = useState(brands[0]?.name || "");

  const getProducts = async (brandName) => {
    if (brandName) {
      const products = await getProductsByBrand(brandName);
      setProducts(products);
    }
  };

  useEffect(() => {
    getProducts(brands[0]?.name);
    if (brands[0]) {
      setCurrentBrand(brands[0].name);
    }
  }, [brands]);

  const handleChangeBrand = async (brandName) => {
    try {
      setCurrentBrand(brandName);
      getProducts(brandName);
    } catch (error) {
      toast.error("Something went wrong!! Please try again");
    }
  };

  const debouncedValue = useDebounce(searchValue, 500);
  useEffect(() => {
    if (debouncedValue.trim().length === 0) {
      getProducts(currentBrand);
      return;
    }

    if (debouncedValue !== "") {
      const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(debouncedValue.toLowerCase())
      );
      console.log(filteredProducts);
      setProducts(filteredProducts);
    }
  }, [debouncedValue, currentBrand]);

  const handleInputChange = (e) => {
    const searchInputValue = e.target.value;
    if (!searchInputValue.startsWith(" ")) {
      setSearchValue(searchInputValue);
    }
  };

  const handleSortProducts = (order) => {
    const sortedProducts = [...products];

    if (order === "asc") {
      sortedProducts.sort((currentProduct, nextProduct) => currentProduct.price - nextProduct.price);
      setProducts(sortedProducts);
    } else {
      sortedProducts.sort((currentProduct, nextProduct) => nextProduct.price - currentProduct.price);
      setProducts(sortedProducts);
    }
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
            {brands.map((brand) => (
              <Button
                key={brand._id}
                variant="contained"
                sx={{
                  textTransform: "uppercase",
                  marginRight: 3,
                  marginY: 1,
                  backgroundColor: brand.name === currentBrand && theme.palette.secondary.main,
                  color: brand.name === currentBrand && theme.palette.primary.main,
                }}
                onClick={handleChangeBrand.bind(this, brand.name)}
              >
                {brand.name}
              </Button>
            ))}
          </Box>
          <ButtonMenu onClick={handleSortProducts} />
        </Stack>

        <TextField
          placeholder="Search your products by name"
          value={searchValue}
          sx={{ marginY: 3, width: { xs: "100%", md: "380px" } }}
          onChange={handleInputChange}
        />

        <Grid container spacing={2}>
          {products ? (
            products.map((product) => (
              <Grid key={product._id} item xs={6} md={4} lg={3}>
                <ProductItem product={product} />
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
