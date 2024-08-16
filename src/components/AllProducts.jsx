"use client";

import { useEffect, useState } from 'react';
import { getProducts } from '@/Products';
import ProductCard from './ProductCard';

const AllProducts = () => {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const result = await getProducts();
      console.log(result);
      if (result.status === 'OK' && result.data && result.data.products) {
        setAllProducts(result.data.products);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Our Products</h1>
      {allProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allProducts.map((product) => (
            <ProductCard
              key={product.asin}
              name={product.product_title}
              imageUrl={product.product_photo}
              price={product.product_price}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No products found.</p>
      )}
    </div>
  );
};

export default AllProducts;
