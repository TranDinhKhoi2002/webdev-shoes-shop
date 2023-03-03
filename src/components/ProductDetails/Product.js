import React from "react";
import { useState } from "react";
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import Rating from "@/components/Rating/Rating";
import NumberBox from "@/components/ProductDetails/NumberBox/NumberBox";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    width: "70%",
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
  const classes = useStyles();
  const [imagenow, setImage] = useState(row.url);
  const [selectedImage, setSelectedImage] = useState(row.url);
  {
    /* click ảnh bên dưới */
  }
  const handleImageClick = (image) => {
    setImage(image);
    setSelectedImage(image);
  };
  {
    /* click ảnh bên phải*/
  }
  const handleImageClick2 = (imageUrl) => {
    setImage(imageUrl);
    setSelectedImage(imageUrl);
  };
  {
    /* số lượng */
  }
  const [quantity, setQuantity] = useState(1);
  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

  return (
    <div className={classes.root}>
      <IconButton aria-label="back">
        <Link to="/">
          {" "}
          {/* cần link cái này về home */}
          <ArrowBackIcon />
        </Link>
      </IconButton>
      <Grid container spacing={2}>
        {/* bên trái */}
        <Grid item xs={12} sm={6}>
          {/* ảnh lớn */}
          <Card>
            <CardMedia className={classes.media} image={imagenow} title="row" />
          </Card>
          {/* các hình ảnh bên dưới */}
          <Grid container className={classes.imageGrid} justify="center" spacing={2}>
            {/* sản phẩm chính */}
            <Grid item>
              <Card>
                <CardMedia
                  className={classes.smallImage}
                  image={row.url}
                  title="row"
                  onClick={() => handleImageClick(row.url)}
                />
              </Card>
            </Grid>
            {/* map các ảnh sản phẩm cùng loại, khác màu */}
            {Object.values(row.images).map((image, id) => (
              <Grid item>
                <Card>
                  <CardMedia
                    className={classes.smallImage}
                    key={id}
                    image={image.imageUrl}
                    onClick={() => handleImageClick(image.imageUrl)}
                  />
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
        {/* Bên phải */}
        <Grid item xs={12} sm={6} style={{ paddingLeft: "60px" }}>
          {/* tên sp, rating, price, mô tả */}
          <Typography variant="h3" component="h1">
            {row.name}
          </Typography>
          <Rating value={row.votes} /> ({row.votePeople})
          <Typography variant="subtitle1" color="textSecondary">
            <h2>
              Price: ${row.price.toFixed(2)} - Total: ${(row.price * quantity).toFixed(2)}
            </h2>
          </Typography>
          <CardContent className={classes.cardContent}>
            <Typography variant="body2" component="p">
              {row.description}
            </Typography>
          </CardContent>
          {/* chọn màu cho sản phẩm */}
          <Typography variant="subtitle1" color="gray">
            <h5>Choose a color:</h5>
          </Typography>
          {/* map các sản phẩm ra để chọn */}
          <Grid container className={classes.imageGrid2} justify="center" spacing={2}>
            <Grid item>
              <CardMedia
                className={`${classes.smallSmallImage} ${selectedImage === row.url && classes.selectedImage}`}
                image={row.url}
                title="row"
                onClick={() => handleImageClick2(row.url)}
              />
            </Grid>
            {Object.values(row.images).map((image, id) => (
              <Grid item key={id}>
                <CardMedia
                  className={`${classes.smallSmallImage} ${selectedImage === image.imageUrl && classes.selectedImage}`}
                  image={image.imageUrl}
                  onClick={() => handleImageClick2(image.imageUrl)}
                />
              </Grid>
            ))}
          </Grid>
          {/* số lượng chọn */}
          <div>
            <NumberBox value={quantity} onChange={handleQuantityChange} min={1} max={10} />
          </div>
          <Button variant="contained" color="primary" className={classes.button}>
            Add to Cart
            <ShoppingCartIcon sx={{ marginLeft: 2 }} />
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
