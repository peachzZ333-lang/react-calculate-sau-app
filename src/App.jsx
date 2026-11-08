import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home.jsx";
import Bmi from "./pages/Bmi.jsx";
import Bmr from "./pages/Bmr.jsx";
import Car from "./pages/Car.jsx";

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/bmi" element={<Bmi />} />
        <Route path="/bmr" element={<Bmr />} />
        <Route path="/car" element={<Car />} />

        {/* รองรับทั้งตัวพิมพ์ใหญ่และตัวพิมพ์เล็ก */}
        <Route path="/Home" element={<Home />} />
        <Route path="/Bmi" element={<Bmi />} />
        <Route path="/Bmr" element={<Bmr />} />
        <Route path="/Car" element={<Car />} />
      </Routes>
    </BrowserRouter>
  );
}
