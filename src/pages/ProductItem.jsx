/* eslint-disable react/prop-types */
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "../context/CartContext";
import { useMutation } from "@tanstack/react-query";

function ProductItem({ product }) {
  const { addToCart } = useCart();

  const mutation = useMutation({
    mutationFn: (newCartData) => {
      return axios.post("https://fakestoreapi.com/carts", newCartData);
    },
    onSuccess: () => {
      addToCart(product.id, 1);
      toast.success(`${product.title} added to cart!`);
    },
    onError: (error) => {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add to cart");
    },
  });

  const handleAddToCart = () => {
    const newCartData = {
      userId: 5,
      date: new Date().toISOString().split("T")[0],
      products: [{ productId: product.id, quantity: 1 }],
    };
    mutation.mutate(newCartData);
  };

  return (
    <div className="col-md-4 mb-4" key={product.id}>
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
          <button
            className="btn btn-info w-100"
            onClick={handleAddToCart}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Adding..." : "Add to cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
