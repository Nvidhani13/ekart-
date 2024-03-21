import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Paper, Button } from '@mui/material';
import Input from '@mui/material/Input';
import Url from '../../Url';

function AddProduct() {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState('');
  const [regularPrice, setRegularPrice] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [formFilled, setFormFilled] = useState(false);

  const handleImageChange = (event) => {
    console.log(event.target.files[0],"this is file ")
    setSelectedImage((event.target.files[0]));
  };

  const handleSave = async () => {
    try {
      // Collect form data
      const username = 'nikhil'; // Hardcoded username

      // Create FormData object
      const formData = new FormData();
      formData.append('item_name', name);
      formData.append('brand_name', company);

      formData.append('desc', description);
      formData.append('available_number', stock);
      formData.append('actual_price', regularPrice);
      formData.append('discounted_price', salePrice);
      formData.append('image', selectedImage);

      console.log(formData);
      console.log(selectedImage,"this is selected image ")
      const response = await fetch(('' + Url + '/add-item/pinku/'), {
        method: 'POST',
        body: formData,
      });

      console.log('Product added successfully');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleInputChange = (event, setter) => {
    const { value } = event.target;
    setter(value);

    // Check if all fields are filled
    if (name && company && description && stock && regularPrice && salePrice && selectedImage) {
      setFormFilled(true);
    } else {
      setFormFilled(false);
    }
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        width: '60%',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box display='flex' flexDirection='row' gap='2'>
        <Paper
          elevation={3}
          sx={{
            border: '1px solid #ccc',
            borderRadius: 2,
            padding: 2,
          }}
        >
          <Box
            sx={{
              display: 'grid',
              gap: 2,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                position: 'relative',
                background: 'white',
                padding: 1,
                borderTopLeftRadius: 2,
                borderBottomRightRadius: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
              }}
            >
              Add New Product
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Name"
                id="name"
                value={name}
                onChange={(event) => handleInputChange(event, setName)}
                size="small"
                margin="normal"
                sx={{ width: '50%' }}
                required
                error={!name}
                helperText={!name && 'Name cannot be empty'}
              />
              <TextField
                label="Company"
                id="company"
                value={company}
                onChange={(event) => handleInputChange(event, setCompany)}
                size="small"
                margin="normal"
                sx={{ width: '50%' }}
                required
                error={!company}
                helperText={!company && 'Company cannot be empty'}
              />
            </Box>
            <TextField
              id="desc"
              label="Description"
              value={description}
              onChange={(event) => handleInputChange(event, setDescription)}
              placeholder="Description"
              multiline
              fullWidth
              margin="normal"
              required
              error={!description}
              helperText={!description && 'Description cannot be empty'}
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                padding: '10px',
                backgroundColor: "#F1FADA"
              }}
            >
              <Typography variant="subtitle1">Upload Product Image</Typography>
              <Input
                type="file"
                id='image'
                onChange={handleImageChange}
                inputProps={{ accept: 'image/*' }}
                required
                error={!selectedImage}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
              }}>
              <TextField
                label="Stock"
                id="stock"
                value={stock}
                onChange={(event) => handleInputChange(event, setStock)}
                defaultValue=""
                size="small"
                margin='normal'
                sx={{ padding: '2px' }}
                required
                error={!stock}
                helperText={!stock && 'Stock cannot be empty'}
              />
              <TextField
                label="Sale price"
                id="price"
                value={regularPrice}
                onChange={(event) => handleInputChange(event, setRegularPrice)}
                defaultValue=""
                size="small"
                margin="normal"
                sx={{ padding: '2px' }}
                required
                error={!regularPrice}
                helperText={!regularPrice && 'Sale price cannot be empty'}
              />
              <TextField
                label="Actual Price"
                id="actualPrice"
                value={salePrice}
                onChange={(event) => handleInputChange(event, setSalePrice)}
                defaultValue=""
                size="small"
                margin="normal"
                sx={{ padding: '2px' }}
                required
                error={!salePrice}
                helperText={!salePrice && 'Actual Price cannot be empty'}
              />
            </Box>
          </Box>
        </Paper>
        
      </Box>
      <Button
          variant="contained"
          sx={{ backgroundColor: '#1976d2', color: 'white', marginTop: '2rem' }}
          onClick={handleSave}
          disabled={!formFilled}
        >
          Save
        </Button>
    </Box>
  );
}

export default AddProduct;
