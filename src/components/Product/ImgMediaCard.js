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
import axios from 'axios';
export default function ImgMediaCard(props) {
  const navigate=useNavigate()
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
       
      navigate(`/details/${id}`)
  }
const handleaddToFavorite=async (event)=>{
  event.stopPropagation() 
  console.log("add to ")
  try{
    const response = await axios.post(Url + `/wishlist/${username}/`, {
        
      item_name: name
    });
    console.log(response)
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
            <Button color= 'error' size="small" sx={{ left: '20%' }} onClick={handleaddToFavorite}>
              <FavoriteBorderOutlinedIcon color='error' / >
              Add to Favorite
            </Button>
          </CardActions>
         )}
      </Card>
    </div>
  );
}
