"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { product } from "@/types";

export default function Home() {
  const BaseURL = "https://fakestoreapi.com/";
  const router = useRouter();

  // product list
  const [productList, setProductList] = useState<product[]>([]);
  const [copyList, setCopyList] = useState<product[]>([]);

  const [loading, setLoading] = useState<Boolean>(true);
  const [inputValue, setInputValue] = useState<string>("");

  // get list
  async function getProductList() {
    const res = await fetch(BaseURL + "products");
    const response = await res.json();
    setLoading(false);
    if (res.ok) {
      setProductList(response);
      setCopyList(response);
      return response;
    } else {
    }
  }

  useEffect(() => {
    getProductList();
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
    let _x: product[] = productList.filter((_el: any) =>
      _el.title.toLowerCase().includes(inputValue.toLowerCase())
    );
    setProductList(_x);
  }
  function handelKeyUp() {
    if (!inputValue) {
      setProductList(copyList);
    }
  }

  return (
    <section>
      {
        <input
          type="text"
          className="border-2 border-gray-200 rounded-md focus:border-gray-300 p-2 min-w-[400px] mb-7 shadow-md"
          placeholder="search ..."
          value={inputValue}
          onChange={handleChange}
          onKeyUp={handelKeyUp}
        />
      }
      {loading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <span className="loader w-full "></span>
        </div>
      ) : (
        ""
      )}
      <div className="grid grid-cols-12 gap-5">
        {!loading && productList.length ? (
          productList.map((el: product) => (
            <div
              key={el.id}
              className="bg-slate-50 shadow-md rounded-md  col-span-12 sm:col-span-4  lg:col-span-3 2xl:col-span-2 py-3 px-2 hover:scale-[101%] duration-200 ease-in-out  relative flex flex-col justify-between"
            >
              <div>
                <div className="bg-white w-full rounded-lg">
                  <div className="max-w-[150px] aspect-square mx-auto mb-4  ">
                    <img
                      src={el.image}
                      alt="product image"
                      className="w-full  aspect-square object-contain "
                    />
                  </div>
                </div>

                <h4 className="font-semibold text-lg mb-4">{el.title}</h4>
                <p className="text-gray-500 text-sm">
                  {el.description.slice(0, 110)}{" "}
                  {el.description.length > 110 && "..."}
                </p>
                <span className="font-semibold absolute top-0 right-0 bg-yellow-200 rounded-l-md px-3 py-1">
                  {" "}
                  $ {el.price}{" "}
                </span>
              </div>
              <button
                onClick={() => router.push(`/products/${el.id}`)}
                type="button"
                className="bg-purple-300 text-purple-900  w-full py-3 font-semibold rounded-md mt-3"
              >
                Show more
              </button>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center min-h-[400px] bg-purple-100 rounded-md w-full col-span-12">
            <p className="text-rose-600 font-semibold text-lg">
              No product found
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
