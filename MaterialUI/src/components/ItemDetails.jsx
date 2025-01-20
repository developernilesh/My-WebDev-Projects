import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Divider,
  Grid2,
  List,
  ListItem,
  ListItemText,
  Rating,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const ItemDetails = ({ itemId, setOpen }) => {
  const [itemDetails, setItemDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState();

  const fetchProductDetails = async () => {
    setIsLoading(true);
    setItemDetails({});
    const { data } = await axios.get(
      `https://dummyjson.com/products/${itemId}`
    );
    setItemDetails(data);
    setSelectedImage(data.images[0]);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchProductDetails();
  }, []);

  if (isLoading) {
    return (
      <>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      </>
    );
  }

  return (
    <>
      <Card sx={{ display: "flex" }}>
        <Grid2 container>
          {/* Left side - Images */}
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Box
              sx={{ height: "400px", display: "flex", alignItems: "center" }}
            >
              <CardMedia
                component="img"
                width="100%"
                image={selectedImage}
                alt={itemDetails.title}
              />
            </Box>
            <List sx={{ display: "flex" }}>
              {itemDetails.images?.map((image, index) => (
                <ListItem
                  key={index}
                  button
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    style={{ width: "100%", maxWidth: "100px" }}
                  />
                </ListItem>
              ))}
            </List>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 8 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography variant="h5" component="h1">
                {itemDetails.title}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {itemDetails.description}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography variant="h5" color="primary">
                  ${itemDetails.price?.toFixed(2)}
                </Typography>
                {itemDetails.discountPercentage > 0 && (
                  <Chip
                    label={`${itemDetails.discountPercentage}% OFF`}
                    color="secondary"
                    size="small"
                  />
                )}
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Rating value={itemDetails.rating} precision={0.1} readOnly />
                <Typography variant="body2">
                  ({itemDetails.rating?.toFixed(1)})
                </Typography>
              </Box>
              <Divider />
              <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                <Typography variant="span" color="text.primary">
                  Stock:&nbsp;
                </Typography>
                <Typography variant="span" color="text.secondary">
                  {itemDetails.stock},&nbsp;
                </Typography>
                <Typography variant="span" color="text.primary">
                  Warranty:&nbsp;
                </Typography>
                <Typography variant="span" color="text.secondary">
                  {itemDetails.warrantyInformation}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                <Typography variant="span" color="text.primary">
                  Weight:&nbsp;
                </Typography>
                <Typography variant="span" color="text.secondary">
                  {`${itemDetails.weight} g`},&nbsp;
                </Typography>
                <Typography variant="span" color="text.primary">
                  Dimensions:&nbsp;
                </Typography>
                <Typography
                  variant="span"
                  color="text.secondary"
                >{`${itemDetails.dimensions?.width} x ${itemDetails.dimensions?.height} x ${itemDetails.dimensions?.depth} cm`}</Typography>
              </Box>
              <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                <Typography variant="span" color="text.primary">
                  Shipping:&nbsp;
                </Typography>
                <Typography variant="span" color="text.secondary">
                  {itemDetails.shippingInformation}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                <Typography variant="span" color="text.primary">
                  Return Policy:&nbsp;
                </Typography>
                <Typography variant="span" color="text.secondary">
                  {itemDetails.returnPolicy}
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2">Tags:</Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
                  {itemDetails.tags?.map((tag, index) => (
                    <Chip key={index} label={tag} size="small" />
                  ))}
                </Box>
              </Box>
            </Box>
          </Grid2>
        </Grid2>

        {/* Large image display */}
      </Card>
      {/* <Button
        variant="contained"
        color="inherit"
        onClick={() => setOpen(false)}
      >
        Close
      </Button> */}
    </>
  );
};

export default ItemDetails;
