"use client";
import Products from '@/utils/products';
import ProductCard from './ProductCard';

const AllProducts = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Our Products</h1>
      {Products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Products.map((product) => (
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
