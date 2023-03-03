import { printPriceWithCommas } from "@/utils/printPriceWithCommas";
import { Box, Button, Typography } from "@mui/material";

function ProductItem({ name, desc, price }) {
  //   const { src, name, price, desc } = item;
  return (
    <Box>
      <img
        src="https://drake.vn/image/cache/catalog/Palladium/77357-001-M/77357-001-M_1-300x300.jpg"
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
        {name}
      </Typography>
      <Typography sx={{ mt: "5px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        {desc}
      </Typography>
      <Typography sx={{ mt: "5px" }}>{printPriceWithCommas(price)}</Typography>
      <Button
        sx={{
          // color: "#212121",
          border: "1px solid #212121",
          borderRadius: 4,
          mt: 2,
          paddingX: 2,
          "&:hover": {
            // backgroundColor: "#212121",
            // color: "#fafafa",
          },
        }}
      >
        Add to cart
      </Button>
    </Box>
  );
}

export default ProductItem;
