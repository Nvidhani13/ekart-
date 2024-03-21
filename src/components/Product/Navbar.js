import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography, { typographyClasses } from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { deepPurple } from '@mui/material/colors';
import { useState } from 'react';
import SearchField from '../../controls/SearchField';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import logo from '../../resources/eKartLogo.png'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { loggedOut } from '../../redux/userDetails/userSlice';
import { emptyCart } from '../../redux/cartinfo/cartSlice';
import { useNavigate } from 'react-router-dom';
const pages = [
  { name: 'Products', link: '/' },  
  { name: 'Login', link: '/login' },         
];

const settings = ['Profile', 'Logout'];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  
  
  const username= useSelector(state=>state.user.username)
  const cartItems=useSelector(state=>state.cart.noOfCartItems)
  const isLogin=useSelector(state=>state.user.loggedIn)
  console.log(isLogin,"This is login")
  console.log(username)
  const initials = (username ? username.slice(0, 2).toUpperCase() : '');
  const dispatch=useDispatch()
  const navigate=useNavigate()
  

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleProfile=()=>{
    
  }
  const handleLogout=()=>{
    dispatch(loggedOut());
    dispatch(emptyCart());
    navigate('/login');
  }

  return (
    <AppBar position="static" sx={{ backgroundColor: 'black' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            component="img"
            sx={{ height: 54,width:54 }}
            alt="Logo"
            src={logo}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            eKart
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              
            </Menu>
          </Box>
        
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            
              <Link to='/' style={{textDecoration:'none'}}>
                <Button
                  
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Products
                </Button>
              </Link>
              <Link to={isLogin?'/':'/login'} style={{textDecoration:'none'}}>
             <Button
                  
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {isLogin?`Hello ${username}`:'Login'}
                </Button>
              </Link>
            
            <SearchField/>
          </Box>
          
          <Box sx={{ flexGrow: 0 , display: 'flex',gap:2, alignItems: 'center' }}>
            {/* <Link to='/fav'>
            <IconButton color="inherit" >
            <FavoriteBorderOutlinedIcon color='inherit'/>
                 
                </IconButton>
            </Link> */}
            <Link to={isLogin?'/fav':'/'}style={{ textDecoration: 'none', color: 'inherit' }} >
                <IconButton color="inherit" >
            <FavoriteBorderOutlinedIcon color='inherit'/>
                 
                </IconButton>
              </Link>
            {/* <Link to='/cart'style={{ textDecoration: 'none', color: 'inherit' }} >
              <ShoppingCartOutlinedIcon color='inherit'/>
            </Link> */}
             <Box sx={{ position: 'relative' }}>
              <Link to={isLogin?'/cart':'/'}style={{ textDecoration: 'none', color: 'inherit' }} >
                <IconButton color="inherit" >
                  <ShoppingCartOutlinedIcon />
                </IconButton>
              </Link>
              <Box sx={{
                position: 'absolute',
                top: -8,
                right: -8,
                width: 16,
                height: 16,
                borderRadius: '50%',
               
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                fontSize: '0.8rem',
              }}>{cartItems===0?'':cartItems}</Box>
            </Box>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }} >
                <Avatar sx={{ bgcolor: deepPurple[500] }}>{initials}</Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              
            >
              
                <MenuItem  onClick={handleProfile}>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem  onClick={handleLogout} >
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
            
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
