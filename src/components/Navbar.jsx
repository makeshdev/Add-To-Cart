import { useState } from "react";
import { Cartsvg, Closesvg, Close1svg } from "../assets/icon";

function Navbar({ cart, setCart, total, setTotal }) {
  const [popup, setpopup] = useState(false);

  const showData = () => {
    setpopup(!popup);
  };
  const removeData = (item, index) => {
    cart.splice(index, 1);
    setCart([...cart]);
    setTotal(total - parseInt(item.price));
  };
  return (
    <>
      <div className="bg-white shadow-lg sticky top-0">
        <div className="container mx-auto relative">
          <div className="flex justify-between items-center py-6">
            <h1 className="font-extrabold text-2xl text-green-500">LOGO</h1>
            <button
              className="bg-green-500 font-bold text-white p-2 flex gap-1 items-center rounded-sm"
              onClick={() => showData()}
            >
              <Cartsvg /> Cart
              <span className="bg-white text-green-500 text-sm px-1 ml-1 text-center">
                {cart.length}
              </span>
            </button>
          </div>
          {popup && (
            <div className="w-full lg:w-1/3 bg-slate-200 max-h-[600px] overflow-y-scroll rounded-md absolute right-0 p-6 shadow-xl border-green-300 border-2">
              <div className="w-full mb-4 flex justify-end cursor-pointer">
                <Close1svg
                  onClick={() => setpopup(false)}
                  className="w-6 h-6 text-gray-500 hover:text-gray-800"
                />
              </div>

              {cart.length == 0 ? (
                <>
                  <p className="text-gray-600 text-center">No Data Found!</p>
                </>
              ) : (
                cart.map((item, index) => {
                  return (
                    <>
                      <div
                        key={index}
                        className="flex justify-between items-center pb-5"
                      >
                        <div className="flex items-center gap-4 w-3/4">
                          <img
                            src={item.image}
                            className="rounded-md w-16 h-12 object-fill"
                          />
                          <p className="text-gray-600">{item.title}</p>
                        </div>
                        <div className="flex items-center gap-6 w-1/4">
                          <div className="cursor-pointer text-gray-500 hover:text-gray-700">
                            <Closesvg
                              onClick={() => removeData(item, index)}
                              className="cursor-pointer text-gray-500 hover:text-gray-700"
                            />
                          </div>
                          <p className="text-gray-600">Rs.{item.price}</p>
                        </div>
                      </div>
                    </>
                  );
                })
              )}
              <div className="flex justify-between items-center">
                <p className="font-bold">Total</p>
                <p className="font-bold">Rs.{total}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;
