import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Url from '../../Url';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useSelector } from 'react-redux';
import { addToCart } from '../../redux/cartinfo/cartSlice';
import { useDispatch } from 'react-redux';
import { updateToken } from '../../redux/userDetails/userSlice';
import axios from 'axios';
function ProductDetails(props) {
    
    const { id } = useParams();
    const [quantity, setQuantity] = useState(1);
    const username= useSelector(state=>state.user.username)//any time action is dispatched this will run do comparison with prev value and force
    //to re render if strict comparision says false 
    const {access,refresh}=useSelector(state=>state.user.token)
    console.log(access,"This is acessToken")
    const dispatch=useDispatch()
    const [product, setproduct] = useState({})

    const fetchProductDetails = async () => {
        try {
            const response = await fetch(Url + "/show/", {
                method: 'GET',
                headers: {

                    'ngrok-skip-browser-warning': 'skip-browser-warning',
                    
                }
            });
            //const data=await response.json()
            const formData = await response.json();
            console.log(formData, "this is form data ")
            const requiredProduct = formData.filter(item => item.id == id)
            setproduct(requiredProduct[0])
            console.log(product)
            console.log(Url + product.image,"this is url")

        } catch (error) {
            console.error("Error fetching product details: ", error);
        }
    }
    

const handleAddToCart = async () => {
    let Total = quantity;
    console.log(username);
    console.log(`${Url}/cart/${username}/`, " this is username ");

    for (let i = 0; i < quantity; i++) {
        try {
            const response = await axios.post(`${Url}/cart/${username}/`, {
                item_name: product.item_name
            }, { 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access}`
                }
            });

            if (response.status === 200) {
                setQuantity(quantity - 1);
                dispatch(addToCart());
            }

            if (response.status === 400) {
                const item_added = Total - quantity;
                alert(`${Total} ${product.item_name} not available, ${item_added} ${product.item_name} added`);
                return;
            }
        } catch (error) {
            console.log(error,"this is error ")
            if (error.response) {
                if (error.response.data.detail=== 'Access token expired') {
                    try{
                        const response = await axios.post(`${Url}/refresh-token/`, {
                            refresh_token: refresh
                        }, {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        });
                        console.log(response.data)
                        console.log(access,"this is access token prev")
                        console.log(response.data.access,"Response data to access ")
                        dispatch(updateToken({accessToken:response.data.access_token.access,refreshToken:response.data.access_token.refresh}))
                        console.log(access,"this is access token")
                    }
                    catch(error){

                    }
                   
            } else {
                
                    console.error('Error:', error);
                    alert('An error occurred. Please try again later.');
                }
            } else {
                console.error('Error:', error.message);
                alert('An error occurred. Please try again later.');
            }
            return;
        }
        // dispatch action here
    }
};


    useEffect(() => {
        fetchProductDetails();
    }, []);
    const handleDecreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleIncreaseQuantity = () => {
        setQuantity(quantity + 1);
    };
    return (
        <div>
            <Box leftpadding='10%' sx={{ display: 'flex', gap: '10%', }}>
                <Box>
                    <img src={'' + Url + product.image} alt="Product" style={{ width: '40vw', height: '80vh' }} />
                </Box>
                <Box paddingTop='5%'>
                    {/* Display other product details */}
                    <h1>{product.item_name}</h1>

                    <Typography paddingBottom='10%'>Brand:{product.brand_name}</Typography>
                    <Typography variant="body2" color="text.secondary">
            <span> RS. {product.discounted_price} </span>

            <span style={{ textDecoration: 'line-through' }}>Rs. {product.actual_price}</span>
            <span> </span>
            {/* <span style={{ color: 'green' }}> ({(product.actual_price-product.disco).toFixed(0)}% off)</span> */}
          </Typography>
                    <Typography gutterBottom>{product.desc}</Typography>
                    <Rating name="read-only" value={4} readOnly />
                    <p>(1000+ reviews)</p>
 
                
                 
                    <Box sx={{
                        display:'flex',
                        flexDirection:"column"
                    }}>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center',position:'relative',left:'20%' }}>
                        <IconButton onClick={handleDecreaseQuantity}>
                            <RemoveIcon />
                        </IconButton>
                        <TextField
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            variant="outlined"
                            type="number"
                            inputProps={{ min: 1 }}
                            size='small'
                            sx={{ width: '60px', textAlign: 'center' }}
                        />
                        <IconButton onClick={handleIncreaseQuantity}>
                            <AddIcon />
                        </IconButton>
                    </Box>
                    
                        <Button color='warning' size="large" sx={{}} onClick={handleAddToCart}>
                            <ShoppingCartOutlinedIcon color='warning'/>
                            Add to Cart
                        </Button>
                        <Button color='warning'>Buy Now</Button>
                    </Box>
                </Box>
            </Box>
        </div>
    )
}

export default ProductDetails
