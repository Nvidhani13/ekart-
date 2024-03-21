import React from 'react';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import './Cart.css';
import Url from '../../Url';
import logo from'../../resources/eKartLogo.png';
import { useState, useEffect } from 'react';
import Divider from '@mui/material/Divider';
import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import {removeFromCart} from '../../redux/cartinfo/cartSlice';


function Cart() {
  const [productlist, setProductlist] = useState([]);
  const [total,setTotal]=useState(0)
  const username=useSelector(state=>state.user.username)
  const dispatch=useDispatch()
  const formatNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  const removeItem = async (quantity, name) => {
    try {
      const response = await axios.post(Url + `/remove-item/${username}/`, {
        
        item_name: name
      });
      console.log(response.data,"this is response data from remove from cart "); // Log response if needed

      
      fetchCartDetails();
      dispatch(removeFromCart({noOfItems:quantity}))

    } catch (error) {
      console.error("Error removing item from cart: ", error);
    }
  }
  const handleIncreaseQuantity = (index) => {
    // Create a copy of the product list
    const updatedProductList = [...productlist];
    // Increase the quantity of the product at the specified index
    updatedProductList[index].quantity += 1;
    // Update the state with the new product list
    setProductlist(updatedProductList);
    let temp=updatedProductList.reduce((acc,product)=>{
      return acc+product.quantity*product.discounted_price
    },0)
    setTotal(temp)
  };
  
  const handleDecreaseQuantity = (index) => {
    // Create a copy of the product list
    const updatedProductList = [...productlist];
    // Decrease the quantity of the product at the specified index
    if (updatedProductList[index].quantity > 1) {
      updatedProductList[index].quantity -= 1;
      // Update the state with the new product list
      setProductlist(updatedProductList);
      let temp=updatedProductList.reduce((acc,product)=>{
        return acc+product.quantity*product.discounted_price
      },0)
      setTotal(temp)
    }
  };
  const fetchCartDetails = async () => {
  console.log(username)

    try {
      const response = await fetch(Url + `/viewcart_2/${username}`, {
        method: 'GET',
        headers: {
          'ngrok-skip-browser-warning': 'skip-browser-warning',
        }
      });
      const formData = await response.json();
      console.log(formData,"this is form data ")
      console.log(formData.cart_items,"this is cart ")
  
       setProductlist(formData.cart_items);
        let temp=formData.cart_items.reduce((acc,product)=>{
          return acc+product.quantity*product.discounted_price
        },0)
        console.log(temp,"This is temp")
        setTotal(temp)
     
      
    } catch (error) {
      console.error("Error fetching product details: ", error);
    }
  }

  useEffect(() => {
    fetchCartDetails();
  }, []);
  console.log(productlist,"This is product list 1")
  return (
    <>
      <img src={logo} alt="" style={{ height: '15vh', width: '20vh', padding: '0px' }} />
      <div className='heading'>
        <ShoppingBagOutlinedIcon fontSize='large' />
        <h2> MY CART</h2>
      </div>
      <div className='cart-list' style={{paddingBottom:"15vh"}}>
        {Array.isArray(productlist) && productlist.map((product, index) => (
          
          <div key={index}>
            <Divider className='cart-divider'/>
            <div className='product-details'>
              <img className='product-image' src={Url + product.image} alt="" />
         
              <Grid container spacing={2}>
        <Grid item xs={2}>
          <h5>{product.item_name}</h5>
        </Grid>
        <Grid item xs={2}>
            <h6>{"PRICE"}</h6>
          <h5>{product.discounted_price}</h5>
        </Grid>
        <Grid item xs={2}>
            <h6>{"QUANTITY"}</h6>
          {/* <h5>{product.quantity}</h5> */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
                    {/* <Button sx={{backgroundColor:'white',color:'black'}}variant="contained" onClick={() => handleDecreaseQuantity(index)}>-</Button> */}
                    <IconButton size="small" onClick={() => handleDecreaseQuantity(index)}>
                      <RemoveIcon />
                    </IconButton>
                    <TextField
                      type="number"
                      size='small'
                      value={product.quantity}
                      InputProps={{
                        inputProps: { min: 1 },
                      }}
                      style={{ width: '100%', textAlign: 'center' }}
                      disabled
                    />
              <IconButton size="small" onClick={() => handleIncreaseQuantity(index)}>
                      <AddIcon />
                    </IconButton>
                  </div>
        </Grid>
        <Grid item xs={4}>
            <h6>{"TOTAL"}</h6>
          <h5>RS.{formatNumberWithCommas(product.quantity*product.discounted_price)}</h5>
        </Grid>
        <Grid item xs={2}>
        <Button color="error" onClick={()=>removeItem(product.quantity,product.item_name)}>Remove</Button>
        </Grid>
        </Grid>
            </div>
            <Divider/>
          </div>
        ))
       }
       <h2 style={{alignContent:'right',paddingTop:"1vh"}}>Total:RS.{total}</h2>
       <Button>PROCEED TO CHECKOUT</Button>
        

      </div>
    </>
  );
}

export default Cart;
