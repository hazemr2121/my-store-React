import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "../context/CartContext";

// eslint-disable-next-line react/prop-types

function ProductItem({ product }) {
  const { addToCart } = useCart();
  const handleAddToCart = async () => {
    try {
      await axios.post("https://fakestoreapi.com/carts", {
        userId: 5,
        date: new Date().toISOString().split("T")[0],
        products: [{ productId: product.id, quantity: 1 }],
      });

      addToCart(product.id, 1);

      toast.success(`${product.title} added to cart!`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add to cart");
    }
  };
  return (
    <div key={product.id} className="col-md-4 mb-4">
      <div className="card h-100">
        <Link to={`/products/${product.id}`}>
          <img
            src={product.image}
            className="card-img-top"
            alt={product.title}
            style={{ height: "200px", objectFit: "contain" }}
          />
        </Link>

        <div className="card-body">
          <h5 className="card-title">{product.title}</h5>

          <p className="card-text">${product.price}</p>
          <button className="btn btn-info w-100" onClick={handleAddToCart}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
