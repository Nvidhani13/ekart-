import logo from './logo.svg';
import './App.css';

import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Switch ,Routes} from 'react-router-dom';
import Product from './components/Product/Product';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/" exact element={<Product/>} />
      </Routes>
      </Router>
      <Footer/>
    </div>
  );
}

export default App;
