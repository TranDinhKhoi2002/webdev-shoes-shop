import { printPriceWithCommas } from "@/utils/printPriceWithCommas";
import { Box, Button, Typography } from "@mui/material";
import { useTheme } from "@mui/styles";
import { Link } from "react-router-dom";

function ProductItem({ product }) {
  const { name, image, description, price } = product;
  const theme = useTheme();

  return (
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
      >
        Add to cart
      </Button>
    </Box>
  );
}

export default ProductItem;
