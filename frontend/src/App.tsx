import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomeView from "./views/Home.view";
import CollectionView from "./views/Collection.view";
import ShopView from "./views/Shop.view";
import AboutView from "./views/About.view";
import ContactView from "./views/Contact.view";
import LoginView from "./views/Login.view";
import SignUpView from "./views/SignUp.view";
import SearchView from "./views/Search.view";
import WishlistView from "./views/Wishlist.view";
import OrdersView from "./views/Orders.view";
import ProfileView from "./views/Profile.view";
import CartView from "./views/Cart.view";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/search" element={<SearchView />} />
            <Route path="/collection" element={<CollectionView />} />
            <Route path="/shop" element={<ShopView />} />
            <Route path="/about" element={<AboutView />} />
            <Route path="/contact" element={<ContactView />} />
            <Route path="/login" element={<LoginView />} />
            <Route path="/signup" element={<SignUpView />} />
            <Route path="/wishlist" element={<WishlistView />} />
            <Route path="/orders" element={<OrdersView />} />
            <Route path="/profile" element={<ProfileView />} />
            <Route path="/cart" element={<CartView />} />
            {/* Add more routes as needed */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
