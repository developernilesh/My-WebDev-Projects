import { Box, Button, CircularProgress, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const ItemDetails = ({ itemId, setOpen }) => {
  const [itemDetails, setItemDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchProductDetails = async () => {
    setIsLoading(true);
    setItemDetails({});
    const { data } = await axios.get(
      `https://dummyjson.com/products/${itemId}`
    );
    setItemDetails(data);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchProductDetails();
  }, []);

  if (isLoading) {
    return (
      <>
        <Box sx={{ display: "flex", justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      </>
    );
  }

  return (
    <>
      <Typography variant="h6" component="h2">
        {itemDetails?.title}
      </Typography>
      <Typography sx={{ mt: 2 }} gutterBottom>
        {itemDetails?.description}
      </Typography>
      <Button
        variant="contained"
        color="inherit"
        onClick={() => setOpen(false)}
      >
        Close
      </Button>
    </>
  );
};

export default ItemDetails;
