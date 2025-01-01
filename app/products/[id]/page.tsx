"use client";

import React, { useEffect, useState, use } from "react";
import { FaStar } from "react-icons/fa6";
import { product } from "@/types";

export default function details({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [product, setProduct] = useState<product>();
  const [loading, setLoading] = useState<Boolean>(true);
  const BaseURL = "https://fakestoreapi.com/";

  const { id } = use(params);
  const rating: any = [];

  // get details
  async function getProductList() {
    const res = await fetch(BaseURL + "products/" + id);
    const response = await res.json();
    setLoading(false);
    if (res.ok) {
      setProduct(response);
    } else {
    }
  }

  useEffect(() => {
    getProductList().then(() => {});
  }, []);

  return (
    <div>
      {!loading && (
        <div className=" border rounded-xl py-5  px-3 grid grid-cols-12 gap-5">
          <div className=" col-span-12 sm:col-span-3 bg-white rounded-xl">
            <img src={product.image} alt="" className="w-1/2 m-auto" />
          </div>
          <div className=" col-span-12 sm:col-span-6">
            <span className="border-2 border-blue-400 text-blue-700 bg-blue-100   rounded-lg px-2 py-1 mt-3">
              {" "}
              {product.category}
            </span>

            <h2 className="font-semibold text-xl my-3">{product.title}</h2>
            <p className="text-gray-600 text-sm mb-5">{product.description}</p>
              <div className="flex items-center justify-between">
                <div className="text-yellow-600 flex items-center gap-1">
                  {Array.from(
                    { length: product.rating.rate.toFixed() },
                    (_, index) => (
                      <span key={index}>
                        <FaStar />
                      </span>
                    )
                  )}
                </div>
                <p className="text-rose-800 font-semibold text-xl">
                  {" "}
                  $ {product.price}
                </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
