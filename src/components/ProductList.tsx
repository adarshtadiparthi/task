import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/productSlice';
import { AppDispatch } from '../store';

interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
    rating: { rate: number; count: number };
}

const ProductList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector((state: any) => state.products);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Filter products based on search term
  const filteredProducts = products.filter((product: Product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort products based on selected option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case 'price':
        return a.price - b.price;
      case 'priceDesc':
        return b.price - a.price;
      case 'rating':
        return b.rating.rate - a.rating.rate;
      default:
        return 0;
    }
  });

  // Calculate pagination
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  // Reset to first page when search term or sort option changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortOption]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search and Sort Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary-500 
                     focus:ring-2 focus:ring-primary-200 transition-all duration-200 
                     dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-200 bg-white cursor-pointer
                   hover:border-primary-500 transition-all duration-200
                   dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <option value="default">Sort by</option>
          <option value="price">Price: Low to High</option>
          <option value="priceDesc">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-red-500 text-center p-4 bg-red-50 rounded-lg">
          {error}
        </div>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {currentProducts.map(product => (
            <div 
            key={product.id} 
            className="bg-white rounded-lg shadow hover:shadow-md 
                        transition-all duration-300 animate-fade-in
                        dark:bg-gray-800 dark:text-white
                        flex flex-col h-[300px]" // Fixed height for consistent card sizes
            >
            {/* Image Container */}
            <div className="relative h-[160px] p-2"> {/* Reduced height */}
                <img 
                src={product.image} 
                alt={product.title} 
                className="absolute top-0 left-0 w-full h-full object-contain p-2
                        bg-white dark:bg-gray-700 rounded-t-lg"
                />
            </div>

            {/* Content Container */}
            <div className="p-3 flex flex-col flex-grow"> {/* Reduced padding */}
                <h2 className="text-sm font-semibold line-clamp-2 mb-1 flex-grow">
                {product.title}
                </h2>
                
                <div className="mt-auto"> {/* Push price and rating to bottom */}
                <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-bold text-primary-600 dark:text-primary-400">
                    ${product.price.toFixed(2)}
                    </span>
                    <div className="flex items-center">
                    <span className="text-yellow-400 text-sm">★</span>
                    <span className="ml-1 text-xs text-gray-600 dark:text-gray-300">
                        {product.rating.rate}
                    </span>
                    </div>
                </div>
                
                <button className="w-full py-1.5 px-3 text-sm bg-primary-500 text-white rounded
                                hover:bg-primary-600 transition-colors duration-200">
                    Add to Cart
                </button>
                </div>
            </div>
            </div>
        ))}
        </div>

      {/* Show pagination only if there are products */}
      {sortedProducts.length > 0 && (
        <div className="flex justify-center items-center space-x-4 mt-8">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg bg-primary-500 text-white disabled:opacity-50
                     hover:bg-primary-600 transition-colors duration-200"
          >
            Previous
          </button>
          <div className="flex items-center space-x-2">
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx + 1)}
                className={`w-8 h-8 rounded-full ${
                  currentPage === idx + 1
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                } transition-colors duration-200`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg bg-primary-500 text-white disabled:opacity-50
                     hover:bg-primary-600 transition-colors duration-200"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;