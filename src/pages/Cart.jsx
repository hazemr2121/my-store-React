import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, fetchProductDetails } from "../cart/cartSlice";

export default function Cart() {
  const dispatch = useDispatch();
  const { cart, products, status, error } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart()).then((action) => {
      if (action.payload) {
        action.payload.products.forEach((product) => {
          dispatch(fetchProductDetails(product.productId));
        });
      }
    });
  }, [dispatch]);

  if (status === "loading") {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (status === "failed") {
    return <div className="text-center mt-5 text-danger">{error}</div>;
  }

  if (!cart) {
    return <div className="text-center mt-5">Cart not found.</div>;
  }

  const totalPrice = cart.products.reduce((total, item) => {
    const product = products.find((p) => p.id === item.productId);
    return total + (product ? product.price * item.quantity : 0);
  }, 0);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Cart</h1>
      <div className="row">
        {cart.products.map((item) => {
          const product = products.find((p) => p.id === item.productId);
          return (
            <div key={item.productId} className="col-md-4 mb-4">
              <div className="card h-100">
                {product ? (
                  <>
                    <img
                      src={product.image}
                      className="card-img-top"
                      alt={product.title}
                      style={{ height: "200px", objectFit: "contain" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{product.title}</h5>
                      <p className="card-text">${product.price}</p>
                      <p className="card-text">Quantity: {item.quantity}</p>
                      <button className="btn btn-warning w-100">
                        Remove from cart
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="card-body">
                    <p>Loading product details...</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="row mt-5">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-header bg-light">
              <h3 className="mb-0">Order Summary</h3>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between mb-3">
                <h5>Total Items:</h5>
                <h5>
                  {cart.products.reduce(
                    (total, item) => total + item.quantity,
                    0
                  )}
                </h5>
              </div>
              <div className="d-flex justify-content-between mb-3 border-bottom pb-3">
                <h5>Subtotal:</h5>
                <h5>${totalPrice.toFixed(2)}</h5>
              </div>
              <div className="d-flex justify-content-between">
                <h4>Total:</h4>
                <h4 className="text-primary">${totalPrice.toFixed(2)}</h4>
              </div>
            </div>
            <div className="card-footer bg-white border-top-0 text-center p-3">
              <button className="btn btn-success btn-lg px-5">
                Proceed to Checkout
              </button>
              <p className="text-muted small mt-2">
                Secure checkout process with various payment options
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
