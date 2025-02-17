import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { CartProvider } from "./context/CartContext";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/AuthContext";
import { Provider } from "react-redux";
import { store } from "./store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <CartProvider>
          <App />
          <ToastContainer />
        </CartProvider>
      </AuthProvider>
    </Provider>
  </StrictMode>
);
