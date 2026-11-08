import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home.jsx"; //นามสกุลจะใส่หรือไม่ใส่ก็ได้
import Bmi from "./pages/Bmi";
import Bmr from "./pages/Bmr";
import Car from "./pages/Car";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bmr" element={<Bmr />} />
          <Route path="/bmi" element={<Bmi />} />
          <Route path="/car" element={<Car />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}