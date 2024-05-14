import './App.css';

import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

import { Routes, Route } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import Anchor from '../components/Anchor/Anchor';
import ScrollToTop from '../components/ScrollToTop/ScrollToTop';

const App = () => {
  return (
    <div className="App">
      <Header />
      <ScrollToTop />
      <AppRoutes />
      <Footer />
      <Anchor />
    </div>
  );
}

export default App;
