import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Divider,
  Fade,
  Grid2,
  Modal,
  Paper,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ItemDetails from "./ItemDetails";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 'auto',
  height: 'auto',
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const Products = ({ darkMode }) => {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [itemId, setItemId] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchProducts = async () => {
    setIsLoading(true);
    setProducts([]);
    const { data } = await axios.get("https://dummyjson.com/products");
    setProducts(data.products);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const clickViewDetails = (item) => {
    setItemId(item);
    setOpen(true);
  };
  if (isLoading) {
    return (
      <>
        <Box
          sx={{ display: "flex", justifyContent: "center", marginTop: "30vh" }}
        >
          <CircularProgress />
        </Box>
      </>
    );
  }

  return (
    <>
      <Grid2 container spacing={2} sx={{ marginBlock: "1rem" }}>
        {products?.map((item) => (
          <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={item.id}>
            <Paper square>
              <Card>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  image={item.thumbnail}
                />
                <Divider />
                <CardContent
                  sx={{
                    backgroundColor: `${darkMode ? "#262626" : "#f2f2f2"}`,
                  }}
                >
                  <Typography gutterBottom variant="h5" component="div" noWrap>
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary" }}
                    noWrap
                  >
                    {item.description}
                  </Typography>
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "4px" }}
                  >
                    {/* Current Price */}
                    <Typography
                      component="span"
                      sx={{ fontWeight: "bold", fontSize: "1.1rem" }}
                    >
                      $
                      {(
                        item.price -
                        item.price * (item.discountPercentage / 100)
                      ).toFixed(2)}
                    </Typography>

                    {/* MRP */}
                    <Typography
                      component="span"
                      sx={{
                        color: "text.secondary",
                        fontSize: "0.7rem",
                      }}
                    >
                      M.R.P:
                    </Typography>
                    <Typography
                      component="span"
                      sx={{
                        textDecoration: "line-through",
                        color: "text.secondary",
                        fontSize: "0.7rem",
                      }}
                    >
                      ${item.price}
                    </Typography>

                    {/* Discount */}
                    <Typography component="span" sx={{ fontSize: "0.8rem" }}>
                      ({item.discountPercentage}% off)
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions
                  sx={{
                    backgroundColor: `${darkMode ? "#262626" : "#f2f2f2"}`,
                    paddingInline: "15px",
                    paddingBottom: "15px",
                  }}
                >
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      backgroundColor: "#FFD700",
                      color: "black",
                      fontWeight: "500",
                      fontSize: "12px",
                      border: !darkMode ? "1px solid black" : "none",
                      "&:hover": {
                        backgroundColor: "#ffe13d",
                      },
                    }}
                  >
                    Add to Cart
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    color="inherit"
                    sx={{ fontWeight: "500", fontSize: "12px" }}
                    onClick={() => clickViewDetails(item.id)}
                  >
                    View Details
                  </Button>
                </CardActions>
              </Card>
            </Paper>
          </Grid2>
        ))}
      </Grid2>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Fade in={open}>
          <Box sx={style}>
            <ItemDetails itemId={itemId} setOpen={setOpen} />
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default Products;
