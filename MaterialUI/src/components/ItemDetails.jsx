import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Divider,
  Grid2,
  List,
  ListItem,
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
            <Box sx={{height: "400px", display:"flex", alignItems:"center"}}>
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

          {/* Right side - Product details */}
          <Grid2 size={{ xs: 12, sm: 8 }}>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                {itemDetails.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {itemDetails.description}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2" color="text.secondary">
                <strong>Price:</strong> ${itemDetails.price?.toFixed(2)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Category:</strong> {itemDetails.category}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Brand:</strong> {itemDetails.brand}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Rating:</strong> {itemDetails.rating}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Stock:</strong> {itemDetails.stock} available
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2" color="text.secondary">
                <strong>Shipping Information:</strong>{" "}
                {itemDetails.shippingInformation}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Availability:</strong> {itemDetails.availabilityStatus}
              </Typography>
            </CardContent>
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
