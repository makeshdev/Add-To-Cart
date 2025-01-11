import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";

function Post(props) {
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  async function fetchData() {
    try {
      const url = await fetch("https://fakestoreapi.com/products");
      const res = await url.json();
      setData([...res]);
    } catch (error) {
      console.log(error.message);
    }
  }
  function addCard(items) {
    let idData = cart.some((i) => i.id == items.id);
    if (idData) {
      alert("Item already added to the cart");
    } else {
      setCart([...cart, items]);
      setTotal(total + parseInt(items.price));
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Navbar cart={cart} setCart={setCart} total={total} setTotal={setTotal} />
      <div className="bg-slate-50">
        <div className="container mx-auto my-8">
          <div className="grid grid-cols-1 gap-14 md:grid-cols-2 lg:grid-cols-4">
            {data.map((items, index) => {
              return (
                <div
                  key={index}
                  className="bg-white rounded-sm shadow-lg flex flex-col justify-end"
                >
                  <div className="w-full flex justify-center p-4">
                    <img src={items.image} className="rounded-md h-[300px]" />
                  </div>
                  <div className="p-4 pb-8">
                    <p className="text-black mb-5 text-lg">{items.title}</p>
                    <div className="flex justify-between items-center">
                      <p className="text-black font-black text-md">
                        Rs.{items.price}
                      </p>
                      <button
                        className="bg-green-500 font-bold text-white p-3 py-2 rounded-sm"
                        onClick={() => addCard(items)}
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Post;
