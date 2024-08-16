import React from 'react';
import Image from 'next/image';

const ProductCard = ({ name, imageUrl, price }) => {
  return (
    <div className="border rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
      <Image
        src={imageUrl}
        alt={name}
        width={300} // Adjust as needed
        height={200} // Adjust as needed
        className="object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2 truncate">{name}</h2>
        <p className="text-gray-700 text-lg mb-4">${price}</p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
