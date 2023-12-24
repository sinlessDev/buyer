"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

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

export default function Products() {
  // Specify the type of the state
  const [products, setProducts] = useState<ProductsResponse>({ data: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          process.env.NEXT_PUBLIC_VERCEL_URL + "/api/products"
        );
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        console.log(data);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Продукты</h2>

        <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
          {products.data.length > 0 &&
            products.data?.map((product) => (
              <div
                key={`${product.id}-${product.title}`}
                className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
              >
                <div className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-96">
                  <Image
                    src={product.image}
                    alt={product.image}
                    width={0}
                    height={0}
                    unoptimized
                    className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                  />
                </div>
                <div className="flex flex-1 flex-col space-y-2 p-4">
                  <h3 className="text-sm font-medium text-gray-900">
                    <a href={product.link}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.title}
                    </a>
                  </h3>
                  <p className="text-sm text-gray-500">{product.description}</p>
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
}
