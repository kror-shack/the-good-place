import React, { useState } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInPage from "./pages/SignInPage/SignInPage";
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
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import BookTablePage from "./pages/BookTablePage/BookTablePage";
import ProtectedRoute from "./utils/auth/protectedRoute";
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
          <Route path="/bookTablePage" element={<BookTablePage />} />
          <Route
            path="/YourReservationsPage"
            element={
              <ProtectedRoute>
                <YourReservationsPage />
              </ProtectedRoute>
            }
          />
          <Route path="/orderDashboard" element={<OrderDashboard />} />
          <Route
            path="/checkoutPage"
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />
          <Route path="/faqPage" element={<FAQPage />} />
          <Route path="/contactPage" element={<ContactPage />} />
          <Route path="/reviewPage" element={<ReviewPage />} />
          <Route path="/menuPage" element={<MenuPage />} />
          <Route
            path="/profilePage"
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </Provider>
  );
}

export default App;
