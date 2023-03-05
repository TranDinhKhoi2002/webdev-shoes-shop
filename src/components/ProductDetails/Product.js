import React, { useRef } from "react";
import { useState } from "react";
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Rating from "@/components/Rating/Rating";
import NumberBox from "@/components/ProductDetails/NumberBox";
import { Container } from "@mui/material";
import { useLocation } from "react-router-dom";
import { printPriceWithCommas } from "@/utils/printPriceWithCommas";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { fetchAddToCart } from "@/redux/slices/cart";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    width: "80%",
    margin: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
  },
  media: {
    height: 450,
    [theme.breakpoints.down("sm")]: {
      height: 300,
    },
  },
  imageGrid: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
  },
  imageGrid2: {
    paddingBottom: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      paddingBottom: theme.spacing(1),
    },
  },
  smallImage: {
    height: 80,
    width: 80,
    [theme.breakpoints.down("sm")]: {
      height: 60,
      width: 60,
    },
  },
  description: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
  },
  button: {
    marginTop: theme.spacing(3),
    padding: "12px 30px",
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(2),
      padding: "8px 20px",
    },
  },
  cardContent: {
    paddingBottom: theme.spacing(0),
  },
  smallSmallImage: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    transition: "border 0.3s ease-in-out",
    "&:hover": {
      border: `1px solid ${theme.palette.primary.main}`,
    },
    [theme.breakpoints.down("sm")]: {
      width: "40px",
      height: "40px",
    },
  },
  selectedImage: {
    border: "3px solid white",
    outline: "3px solid gray",
  },
  input: {
    width: "4em",
    marginRight: "0.5em",
    [theme.breakpoints.down("sm")]: {
      width: "3em",
      marginRight: "0.25em",
    },
  },
}));

const row = {
  id: 1,
  url: "https://images.pexels.com/photos/6748706/pexels-photo-6748706.jpeg",
  name: "Name of Shoe",
  votes: 5,
  votePeople: 15,
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue. Etiam porta sem malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.",
  price: 50.0,
  images: [
    {
      id: 1,
      imageUrl: "https://images.pexels.com/photos/1571467/pexels-photo-1571467.jpeg",
    },
    {
      id: 2,
      imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
    },
  ],
};

export default function ProductDetail() {
  const [currentSize, setCurrentSize] = useState();
  const classes = useStyles();
  const dispatch = useDispatch();

  const ref = useRef();
  const location = useLocation();
  const product = location.state.product;

  const handleChangeSize = (size) => {
    setCurrentSize(size);
  };

  const handleAddToCart = async () => {
    if (!currentSize) {
      toast.error("Please choose a size");
      return;
    }

    const quantity = ref.current.getQuantity();
    const remainingProducts = currentSize.quantity - currentSize.sold;
    if (quantity > remainingProducts) {
      toast.error("We don't have enough products, please choose less");
      return;
    }

    try {
      const { success } = await dispatch(
        fetchAddToCart({ productId: product._id, size: currentSize.name, quantity })
      ).unwrap();

      if (success) {
        toast.success("Added to cart successfully!!");
      }
    } catch (error) {}
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 10 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardMedia className={classes.media} image={product.image} title="row" />
          </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="h3" component="h1">
            {product.name}
          </Typography>
          <Rating value={row.votes} /> ({row.votePeople})
          <Typography variant="h6" sx={{ mt: 2 }} color="textSecondary">
            Price: {printPriceWithCommas(product.price)}đ
          </Typography>
          <Typography variant="body2" component="p" sx={{ mt: 2 }}>
            {product.description}
          </Typography>
          <Typography variant="subtitle1" sx={{ marginY: 3 }} color="gray">
            Choose a size:
          </Typography>
          <Grid container spacing={1}>
            {product.sizes.map((size) => (
              <Grid item key={size._id}>
                <Button
                  variant="outlined"
                  disabled={size.quantity - size.sold === 0}
                  sx={{ border: currentSize?.name === size.name && 2 }}
                  onClick={handleChangeSize.bind(this, size)}
                >
                  {size.name}
                </Button>
              </Grid>
            ))}
          </Grid>
          <NumberBox min={1} max={10} ref={ref} />
          <Button variant="contained" color="primary" className={classes.button} onClick={handleAddToCart}>
            Add to Cart
            <ShoppingCartIcon sx={{ marginLeft: 2 }} />
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
