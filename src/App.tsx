import React, { useState } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./components/auth/SignIn/SignIn";
import SignUp from "./components/auth/SignUp/SignUp";
import BookTable from "./components/BookTable/BookTable";
import CheckoutPage from "./components/Checkout/Checkout";
import Header from "./components/Header/Header";
import OrderDashboard from "./components/OrderDashboard/OrderDashboard";
import Sidebar from "./components/Sidebar/Sidebar";
import YourReservations from "./components/YourReservations/YourReservations";
import MainPage from "./pages/MainPage";
import store from "./store/store";
function App() {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header setShowSidebar={setShowSidebar} />
        <Sidebar showSidebar={showSidebar} />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/bookTable" element={<BookTable />} />
          <Route path="/yourReservations" element={<YourReservations />} />
          <Route path="/orderDashboard" element={<OrderDashboard />} />
          <Route path="/checkoutPage" element={<CheckoutPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
