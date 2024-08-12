import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../redux/productSlice";
import ProductCard from "./ProductCard";


const ProductList = () =>{

     const dispatch = useDispatch();
     const {productList, status, error} = useSelector((state)=>state.products);

     useEffect(()=>{
          if(status === 'idle'){
               dispatch(fetchProducts());
          }
     }, [dispatch, status])

     return(
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
               {productList.map((product)=>(
                    <ProductCard key={product.id} product={product} />
               ))}
          </div>
     )
}

export default ProductList;