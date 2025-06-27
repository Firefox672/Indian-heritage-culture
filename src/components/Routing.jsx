// import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import DetailsComponent from './DetailsComponent';

import Architecture from './categories/Architecture';
import Dance from './categories/Dance';
import Festivals from './categories/Festivals';
import Food from './categories/Food';
import Music from './categories/Music';
import Crafts from './categories/Crafts';
import Religions from './categories/Religions';
import Ayurvedics from './categories/Ayurvedics';
import Palaces from './categories/Palaces';

import NavComponent from './NavComponent';
import FooterComponent from './FooterComponent';

import Aboutus from './Aboutus';
import Explore from './explore/Explore';
import Contactus from './Contactus';

function LayoutWrapper() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <>
      {isHomePage && <NavComponent />}
      <Routes>
        <Route path="/" element={<DetailsComponent />} />
        <Route path="/architecture" element={<Architecture />} />
        <Route path="/dance" element={<Dance />} />
        <Route path="/festivals" element={<Festivals />} />
        <Route path="/food" element={<Food />} />
        <Route path="/music" element={<Music />} />
        <Route path="/crafts" element={<Crafts />} />
        <Route path="/religions" element={<Religions />} />
        <Route path="/ayurvedics" element={<Ayurvedics />} />
        <Route path="/palaces" element={<Palaces />} />
        <Route path="/aboutus" element={<Aboutus/>} />
        <Route path="/explore" element={<Explore/>} />
        <Route path="/contactus" element={<Contactus/>} />
      </Routes>
      {isHomePage && <FooterComponent />}
    </>
  );
}

function Routing() {
  return (
    <Router>
      <LayoutWrapper />
    </Router>
  );
}

export default Routing;
