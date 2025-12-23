
import Navbar from "./Navbar";
import Product from "./Product";
import Productpage from "./Productpage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <br></br>
        <Routes>
        <Route path="/product" element={<Product/>}/>
        <Route path="/productpage" element={<Productpage/>}/>

        </Routes>
      </Router>
    </>
  );
};
export default App;
