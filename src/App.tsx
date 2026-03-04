import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Battle from "./pages/Battle/Battle";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/battle" element={<Battle />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
