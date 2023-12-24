"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface Product {
  id: number;
  title: string;
  link: string;
  brand: string;
  price: string;
  description: string;
  image: string;
}

interface ProductsResponse {
  data: Product[];
}

const ProductSkeleton = () => (
  <div className="animate-pulse flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
    <div className="aspect-h-4 aspect-w-3 bg-gray-300 sm:aspect-none h-96"></div>
    <div className="space-y-2 p-4">
      <div className="h-4 bg-gray-300 rounded"></div>
      <div className="h-4 bg-gray-300 rounded w-5/6"></div>
      <div className="h-4 bg-gray-300 rounded w-4/6"></div>
    </div>
  </div>
);

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const productsResponse = await fetch(
          `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/products`
        );
        const brandsResponse = await fetch(
          `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/brands`
        );

        if (!productsResponse.ok || !brandsResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const productsData = await productsResponse.json();
        const brandsData = await brandsResponse.json();

        setProducts(productsData.data);
        setBrands(brandsData.data);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleBrandChange = (brand: string) => {
    setSelectedBrand(brand);
  };

  const filteredProducts = selectedBrand
    ? products.filter((product) => product.brand === selectedBrand)
    : products;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4  sm:px-6 lg:max-w-7xl lg:pb-8">
        <h2 className="sr-only">Products</h2>
        <div className="mb-5 flex gap-3 flex-wrap">
          {brands.map((brand) => (
            <Button
              variant="outline"
              key={brand}
              onClick={() => handleBrandChange(brand)}
            >
              {brand}
            </Button>
          ))}
          <Button variant="outline" onClick={() => handleBrandChange("")}>
            Все товары
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <ProductSkeleton key={index} />
              ))
            : filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
                >
                  <div className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-96">
                    <img src={product.image} alt={product.title} />
                  </div>
                  <div className="flex flex-1 flex-col space-y-2 p-4">
                    <h3 className="text-sm font-medium text-gray-900">
                      <a href={product.link}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.title}
                      </a>
                    </h3>
                    <p className="text-sm text-gray-500">
                      {product.description}
                    </p>
                    <div className="flex flex-1 flex-col justify-end">
                      <p className="text-sm italic text-gray-500">
                        {product.brand}
                      </p>
                      <p className="text-base font-medium text-gray-900">
                        {product.price} ₸
                      </p>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
