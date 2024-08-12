// src/components/RelatedProducts.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RelatedProducts = ({ currentProductId }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const productList = useSelector((state) => state.products.productList);

  useEffect(() => {
    // Filter out the current product
    const filteredProducts = productList.filter(product => product.id !== currentProductId);
    
    // Shuffle the array and select the first 3 products
    const shuffledProducts = filteredProducts.sort(() => 0.5 - Math.random()).slice(0, 3);

    setRelatedProducts(shuffledProducts);
  }, [currentProductId, productList]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Related Products</h3>
      <ul>
        {relatedProducts.map((product) => (
          <li key={product.id} className="mb-4">
            <Link to={`/products/${product.id}`} className="flex items-center">
              <img src={product.image} alt={product.name} className="w-16 h-16 object-cover mr-4" />
              <div>
                <p className="text-sm font-semibold">{product.name}</p>
                <p className="text-gray-500">${product.price}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RelatedProducts;
