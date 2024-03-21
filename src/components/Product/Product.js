import React from 'react';
import { useState, useEffect } from 'react';
import ImgMediaCard from './ImgMediaCard';
import axios from 'axios';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import Url from '../../Url';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
function Product() {
  const [productlist, setProductlist] = useState([]); // Your product data goes here

  const fetchProductDetails = async () => {
    console.log(Url+"/show/"," this is url")
    try {
      const response= await fetch(Url+"/show/",{
        method: 'GET',
        headers: {
          'ngrok-skip-browser-warning':'skip-browser-warning',
        }
      });
      const formData = await response.json();
      console.log(formData)
      setProductlist(formData)
      
    } catch (error) {
      console.error("Error fetching product details: ", error);
    }
  }

  useEffect(() => {
    fetchProductDetails();
  }, []);

  return (
    <div>
      {productlist.length === 0 ? (
        <div className="spinner-border text-primary" role="status"></div>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            position: 'relative',
            left: '2%',
            margin: '5%',
            width: '90%', // Adjust the width based on your preference
          }}
        >
        <Grid container spacing={2}>
           
          {
          productlist.map((productObj, index) => (
            productObj.available_number!==0 &&
            (<Grid item xs={12} sm={6} md={4} lg={4}>
              
            <ImgMediaCard
              key={index}
              id={productObj.id}
              name={productObj.item_name}
              comp={productObj.brand_name}
              img={productObj.image}
              discountedPrice={productObj.discounted_price}
              price={productObj.actual_price}

              sx={{
                flexBasis: '30%', // Adjust this value to ensure three cards fit in one line
                margin: '10px',
                boxSizing: 'border-box', // Include padding and borders in the total width
              }}
            />
            </Grid >)
          ))
        }
          
         </Grid>
         </Box>

      )}
    </div>
  );
}

export default Product;
