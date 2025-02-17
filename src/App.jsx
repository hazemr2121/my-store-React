import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Link,
  useNavigate,
} from "react-router-dom";
import { useCart } from "./context/CartContext";
import { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Categories = lazy(() => import("./pages/Categories"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const Cart = lazy(() => import("./pages/Cart"));

const LoadingFallback = () => (
  <div
    className="d-flex justify-content-center align-items-center"
    style={{ height: "60vh" }}
  >
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

const Layout = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const { cartCount } = useCart();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="container-fluid p-0">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            My Store
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              {token ? (
                <li className="nav-item">
                  <button
                    className="btn btn-link nav-link"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              )}

              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  to="/categories"
                  className="nav-link"
                  role="button"
                  aria-expanded="false"
                >
                  Categories
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cart">
                  Cart ({cartCount})
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <Suspense fallback={<LoadingFallback />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense>
        <Layout />
      </Suspense>
    ),
    children: [
      {
        element: (
          <Suspense>
            <ProtectedRoute />
          </Suspense>
        ),
        children: [
          {
            index: true,
            element: (
              <Suspense>
                <Home />
              </Suspense>
            ),
          },
          {
            path: "categories",
            element: (
              <Suspense>
                <Categories />
              </Suspense>
            ),
          },
          {
            path: "products/:id",
            element: (
              <Suspense>
                <ProductDetails />
              </Suspense>
            ),
          },
          {
            path: "cart",
            element: (
              <Suspense>
                <Cart />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "login",
        element: (
          <Suspense>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "register",
        element: (
          <Suspense>
            <Register />
          </Suspense>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
