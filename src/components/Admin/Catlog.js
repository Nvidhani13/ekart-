import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Url from '../../Url';
import { Grid, Box } from '@mui/material';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import {Link }from 'react-router-dom'
import axios from 'axios';
function Catlog() {
  const [productlist, setProductlist] = useState([]);

  const fetchProductDetails = async () => {
    try {
      const response = await fetch(Url + "/show/", {
        method: 'GET',
        headers: {
          'ngrok-skip-browser-warning': 'skip-browser-warning',
        }
      });
      const formData = await response.json();
      setProductlist(formData);
      console.log(formData,"this is form data ")
    } catch (error) {
      console.error("Error fetching product details: ", error);
    }
  }
  const handleDelete = async (item_name) => {
    try {
      await axios.delete(`${Url}/add-item/pinku/`, {
        data: { item_name } // Send the item_name in the request body
      });
      fetchProductDetails(); // Re-fetch product details after successful deletion
    } catch (error) {
      console.error("Error deleting product: ", error);
    }
  };
  useEffect(() => {
    fetchProductDetails();
  }, []);

  return (
    <Box
      display='flex'
      flexDirection='column'
      justifyContent='center'
      paddingTop='2%'
      paddingLeft='5%'
      paddingRight='5%'
      paddingBottom='15%'
      
    > 
      <Typography variant='h5'>Welcome Admin</Typography>
      
      <Grid container justifyContent="space-between" alignItems="center" marginBottom='10px'>
        <Typography variant='h6' component='div' sx={{ paddingRight: '0px' }}>Catlog</Typography>

        <Link to="/admin/addproduct">
          <Button variant="contained" color="success">Add Product</Button>
        </Link>
      </Grid>
        
      <Box 
      paddingLeft='2%'
      paddingRight='2%'>
        
        <Paper elevation={4}>
        <TableContainer  >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align="right">Brand</TableCell>
                <TableCell align="right">Discounted Price</TableCell>
                <TableCell align="right">Actual Price</TableCell>
                <TableCell align="right">QTY</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productlist.map((productObj, index) => (
                <TableRow
                  key={productObj.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {productObj.item_name}
                  </TableCell>
                  <TableCell align="right">{productObj.brand_name}</TableCell>
                  <TableCell align="right">{productObj.discounted_price}</TableCell>
                  <TableCell align="right">{productObj.actual_price}</TableCell>
                  <TableCell align="right">{productObj.available_number}</TableCell>
                  <TableCell align="right">
                    <Button color='error' onClick={() => handleDelete(productObj.item_name)} startIcon={<DeleteIcon />}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </Paper>
      </Box>
    </Box>
  )
}

export default Catlog;
