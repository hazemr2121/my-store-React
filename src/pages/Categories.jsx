import { useState, useEffect } from "react";
import { getCategories, getProductsByCategory } from "../services/api";
import ProductItem from "./ProductItem";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = async (category) => {
    setLoading(true);
    setSelectedCategory(category);

    try {
      const data = await getProductsByCategory(category);
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="text-center my-4">Categories</h1>

      <div className="d-flex flex-wrap gap-2 mb-4">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`btn btn-outline-primary ${
              selectedCategory === category ? "active" : ""
            }`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {loading && <div className="text-center">Loading products...</div>}

      {selectedCategory && !loading && (
        <div>
          <h2 className="text-center my-4">{selectedCategory}</h2>
          <div className="row">
            {products.map((product) => (
              <ProductItem product={product} key={product.id} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
