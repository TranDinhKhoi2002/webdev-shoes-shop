import { fetchAddToCart } from "@/redux/slices/cart";
import { printPriceWithCommas } from "@/utils/printPriceWithCommas";
import { Box, Button, Grid, Modal, Slider, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/styles";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

function ProductItem({ product }) {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [value, setValue] = useState(1);

  const { name, image, description, price } = product;
  const theme = useTheme();
  const dispatch = useDispatch();

  const handleAddToCart = async (productId, size, quantity) => {
    try {
      const { success } = await dispatch(fetchAddToCart({ productId, size, quantity })).unwrap();
      if (success) {
        toast.success("Added to cart successfully!!");
        setModalIsVisible(false);
      }
    } catch (error) {
      toast.error("Something went wrong!! Please try again");
    }
  };

  const handleChangeSize = (size) => {
    setSelectedSize(size);
  };

  const handleOpenModal = () => {
    setModalIsVisible(true);
  };

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box>
        <img
          src={image || "https://drake.vn/image/cache/catalog/Palladium/77357-001-M/77357-001-M_1-300x300.jpg"}
          alt=""
          style={{ width: "100%" }}
        />
        <Typography
          sx={{
            mt: 1,
            fontWeight: "600",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          <Link
            to={`/products/${product._id}`}
            state={{ product: product }}
            style={{ color: theme.palette.primary.main }}
          >
            {name}
          </Link>
        </Typography>

        <Typography sx={{ mt: "5px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {description}
        </Typography>
        <Typography sx={{ mt: "5px" }}>{printPriceWithCommas(price)}</Typography>
        <Button
          sx={{
            border: `1px solid ${theme.palette.primary.main}`,
            borderRadius: 4,
            mt: 2,
            paddingX: 2,
          }}
          onClick={handleOpenModal}
        >
          Add to cart
        </Button>
      </Box>
      <Modal
        open={modalIsVisible}
        onClose={() => setModalIsVisible(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            You want to add?
          </Typography>
          <Typography variant="body1" sx={{ marginY: 1 }}>
            Choose your size:
          </Typography>
          <Grid container spacing={2}>
            {product.sizes.map((size) => (
              <Grid item>
                <Button
                  variant="outlined"
                  onClick={handleChangeSize.bind(this, size.name)}
                  sx={{ border: size.name === selectedSize && 2 }}
                >
                  {size.name}
                </Button>
              </Grid>
            ))}
          </Grid>

          <Typography variant="body1" sx={{ marginY: 1 }}>
            Quantity:
          </Typography>
          <Stack direction="row" spacing={2}>
            <Slider value={value} onChange={handleSliderChange} min={1} max={50} />
            <Typography variant="body1" sx={{ marginY: 1 }}>
              {value}
            </Typography>
          </Stack>

          <Button
            variant="contained"
            sx={{ mt: 3, py: 1 }}
            fullWidth
            onClick={handleAddToCart.bind(this, product._id, selectedSize, value)}
          >
            Add to cart
          </Button>
        </Box>
      </Modal>
    </>
  );
}

export default ProductItem;
