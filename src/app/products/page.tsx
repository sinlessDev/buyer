"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const products = [
  {
    id: 1,
    name: "Basic Tee 8-Pack",
    href: "#",
    price: "$256",
    description:
      "Get the full lineup of our Basic Tees. Have a fresh shirt all week, and an extra for laundry day.",
    options: "8 colors",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-01.jpg",
    imageAlt:
      "Eight shirts arranged on table in black, olive, grey, blue, white, red, mustard, and green.",
  },
  {
    id: 2,
    name: "Basic Tee",
    href: "#",
    price: "$32",
    description:
      "Look like a visionary CEO and wear the same black t-shirt every day.",
    options: "Black",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-02.jpg",
    imageAlt: "Front of plain black t-shirt.",
  },
  // More products...
];

export default function Example() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/products");
        const result = await res.json();
        if (res.ok) {
          setData(result.data);
        }
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
          {data.length > 0 &&
            data.map((product) => (
              <div
                key={product}
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
