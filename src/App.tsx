import React, { useState } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInPage from "./pages/SignInPage/SignInPage";
import BookTable from "./components/BookTable/BookTable";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import OrderDashboard from "./pages/OrderDashboard/OrderDashboard";
import ContactPage from "./pages/ContactPage/ContactPage";
import FAQPage from "./pages/FaqPage/FaqPage";
import MainPage from "./pages/MainPage/MainPage";
import ReviewPage from "./pages/ReviewPage/ReviewPage";
import store from "./store/store";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import YourReservationsPage from "./pages/YourReservationsPage/YourReservationsPage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import MenuPage from "./pages/MenuPage/MenuPage";
function App() {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/SignInPage" element={<SignInPage />} />
          <Route path="/SignUpPage" element={<SignUpPage />} />
          <Route path="/bookTable" element={<BookTable />} />
          <Route
            path="/YourReservationsPage"
            element={<YourReservationsPage />}
          />
          <Route path="/orderDashboard" element={<OrderDashboard />} />
          <Route path="/checkoutPage" element={<CheckoutPage />} />
          <Route path="/faqPage" element={<FAQPage />} />
          <Route path="/contactPage" element={<ContactPage />} />
          <Route path="/reviewPage" element={<ReviewPage />} />
          <Route path="/menuPage" element={<MenuPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
