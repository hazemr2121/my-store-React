import { useEffect, useState } from "react";
import { getCategories } from "../services/api";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  return (
    <div className="container">
      <h1 className="text-center my-4">Categories</h1>
      <ul className="list-group">
        {categories.map((category, index) => (
          <li key={index} className="list-group-item">
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}
