import Carousel from "react-material-ui-carousel";

import banner1 from "@/assets/images/banner1.jpg";
import banner2 from "@/assets/images/banner2.jpg";
import banner3 from "@/assets/images/banner3.jpg";
import { Box, Button, Container, Grid, Pagination, Stack, TextField } from "@mui/material";
import ButtonMenu from "@/components/UI/ButtonMenu";
import ProductItem from "@/components/Products/ProductItem";
import { useState } from "react";
import { useTheme } from "@mui/styles";

const images = [banner1, banner2, banner3];
const categories = ["Converse", "Vans", "Nike", "Adidas", "Fila"];

function Home() {
  const [currentCategory, setCurrentCategory] = useState(categories[0]);
  const theme = useTheme();

  const handleChangeCategory = (category) => {
    setCurrentCategory(category);
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
            {categories.map((category) => (
              <Button
                key={category}
                variant="contained"
                sx={{
                  textTransform: "uppercase",
                  marginRight: 3,
                  marginY: 1,
                  backgroundColor: category === currentCategory && theme.palette.secondary.main,
                  color: category === currentCategory && theme.palette.primary.main,
                  ":hover": {
                    color: "white",
                  },
                }}
                onClick={handleChangeCategory.bind(this, category)}
              >
                {category}
              </Button>
            ))}
          </Box>
          <ButtonMenu />
        </Stack>

        <TextField placeholder="Search your products by name" sx={{ marginY: 3, width: { xs: "100%", md: "380px" } }} />

        <Grid container spacing={2}>
          <Grid item xs={6} md={4} lg={3}>
            <ProductItem />
          </Grid>
          <Grid item xs={6} md={4} lg={3}>
            <ProductItem />
          </Grid>
          <Grid item xs={6} md={4} lg={3}>
            <ProductItem />
          </Grid>
          <Grid item xs={6} md={4} lg={3}>
            <ProductItem />
          </Grid>
          <Grid item xs={6} md={4} lg={3}>
            <ProductItem />
          </Grid>
          <Grid item xs={6} md={4} lg={3}>
            <ProductItem />
          </Grid>
          <Grid item xs={6} md={4} lg={3}>
            <ProductItem />
          </Grid>
          <Grid item xs={6} md={4} lg={3}>
            <ProductItem />
          </Grid>
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
          <Pagination count={10} color="secondary" />
        </Box>
      </Container>
    </>
  );
}

export default Home;
