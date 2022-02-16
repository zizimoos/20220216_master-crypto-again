import { BrowserRouter, Route, Routes } from "react-router-dom";
import CoinDetail from "./cryptoApp/CoinDetail";
import CryptoApp from "./cryptoApp/CryptoApp";

const Router = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<CryptoApp />}></Route>
        <Route path="/:coinId/*" element={<CoinDetail />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
