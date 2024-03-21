import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Url from '../../Url';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { addToCart } from '../../redux/cartinfo/cartSlice';
export default function FavouritesCard(props) {
  const dispatch=useDispatch()
  const { id,name, comp, img, discountedPrice, price } = props;
  const [isHovered, setIsHovered] = useState(false);
  const username= useSelector(state=>state.user.username)
  console.log(Url + img);
  const discountPercentage = ((price - discountedPrice) / price) * 100;

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const handleMouseDown=(event)=>{
       
    //   navigate(`/details/${id}`)
  }
const handleaddToBag=async (event)=>{
  event.stopPropagation() 
  console.log("add to ")
  try{
    const response = await fetch(`${Url}/cart/${username}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ item_name: name }),
    });
    console.log(response,"this is response in fav card ")
    if(response.ok){
       dispatch(addToCart())
    }
  }catch(error){

  }
  
}
  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleMouseDown}
      style={{ width: '20vw', height: '50vh' }}
    >
      <Card sx={{ width: '100%', height: '100%' }}>
        <CardMedia
          component="img"
          alt={name}
          image={Url + img}
          sx={{
            objectFit: 'contain',
            height: '50%',
            width: '90%',
          }}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
            title={name}
          >
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {comp}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <span> RS. {discountedPrice} </span>

            <span style={{ textDecoration: 'line-through' }}>Rs. {price}</span>
            <span> </span>
            <span style={{ color: 'green' }}> ({discountPercentage.toFixed(0)}% off)</span>
          </Typography>
        </CardContent>
        {isHovered && (
          <CardActions>
            <Button color= 'error' size="small" sx={{ left: '20%' }} onClick={handleaddToBag}>
             
              Move To Bag 
            </Button>
          </CardActions>
         )}
      </Card>
    </div>
  );
}
