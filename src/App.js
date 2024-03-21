import './App.css';

import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Product/Navbar';
import AddProduct from './components/Admin/AddProduct';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Product from './components/Product/Product';
import ProductDetails from './components/Product/ProductDetails';
import Catlog from './components/Admin/Catlog';
import Cart from './components/Checkout/Cart';
import { Provider } from 'react-redux';
import {store,persistor} from './redux/Store';
import { PersistGate } from 'redux-persist/integration/react'
import Favourites from './components/Product/Favourites';
function App() {
  //localStorage.setItem('userEmail', data.get('email'));
  return (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<><Navbar />
            <Product />
          </>} />

          <Route path="/details/:id" element={<>
            <Navbar />
            <ProductDetails />
          </>} />

          <Route path="/login" element={<Login />} />
          <Route path="/reg" element={<SignUp />} />
          <Route path="/admin" element={<Catlog />} />
          <Route path="/admin/addproduct" element={<AddProduct />} />
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/fav' element={<Favourites/>}/>

          


        </Routes>
      </Router>
      <Footer />
    </div>
    </PersistGate>
    </Provider>
  );
}

export default App;
