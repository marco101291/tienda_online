import React from 'react';
import ProductList from '../components/ProductList';


const Home = () => {
     return(
          <div className="p-4">
               <h1 className="text-3x1 font-bold mb-6">Welcome to the Music Store</h1>
               <ProductList />
          </div>
     )
}

export default Home;