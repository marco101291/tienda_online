// src/components/ProductDetail.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProductById, clearProduct } from '../redux/productSlice';
import { incrementQuantity, decrementQuantity, addItem } from '../redux/cartSlice';

const ProductDetail = () => {
  
  const { id } = useParams();  
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.product);
  const products = useSelector((state) => state.products);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);
  const cartItem = useSelector((state) => state.cart.items.find(item => item.id === product?.id));
  const [quantity, setQuantity] = useState(1);


  console.log("state.product", product);
  console.log("state.products", products);
  

  useEffect(() => {
    if(id){
      dispatch(fetchProductById(id));
    }
    

    // return () => {
    //   dispatch(clearProduct());
    // };
  }, [dispatch, id]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return null;
  }

  const handleAddToCart = () => {
    dispatch(addItem({ ...product, quantity }));
  }

  // Increment the quantity
  const handleIncrement = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  // Decrement the quantity, ensuring it doesn't go below 1
  const handleDecrement = () => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  console.log("quantity from Product Detail: ", quantity);
  

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <img src={product.image} alt={product.name} className="w-full h-auto max-h-96 object-contain" />
        </div>
        <div className="md:w-1/2 md:pl-8">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-2xl font-bold mb-4">${product.price}</p>
          
          {/* Unit modification buttons */}
          <div className="flex items-center mb-4">
            <button onClick={()=>handleDecrement(cartItem?.id)} className="bg-red-500 text-white px-2 py-1 rounded">-</button>
            <span className="mx-4">{quantity || 0}</span>
            <button onClick={()=>handleIncrement(cartItem?.id)} className="bg-green-500 text-white px-2 py-1 rounded">+</button>
          </div>

          <button onClick={()=>handleAddToCart(cartItem?.id)} className="bg-blue-500 text-white px-4 py-2 rounded">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
