import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Url from '../../Url';
import { useSelector } from 'react-redux';
import { Grid } from '@mui/material';
import FavouritesCard from './FavouritesCard';
function Favourites() {
  const username = useSelector(state => state.user.username);
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const response = await axios.get(Url + `/showwishlist/${username}/`,{
            headers: {
                'ngrok-skip-browser-warning': 'skip-browser-warning',},
              
        });
        console.log(response.data,"this is reponse data "); // assuming response.data is an array of favourites
        setFavourites(response.data.wishlisted_items);
      } catch (error) {
        console.error('Error fetching favourites:', error);
      }
    };

    fetchFavourites();
  }, [username]);

  return (
    <div>
        <h1> Your Favourites</h1>
      <Grid container spacing={2} sx={{paddingBottom:'10vh'}}>
           
           {
           favourites.map((productObj, index) => (
             (<Grid item xs={12} sm={6} md={4} lg={4}>
               
             <FavouritesCard
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
    </div>
  );
}

export default Favourites;
