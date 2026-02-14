import { useNavigate } from 'react-router-dom';

export const OrderStatus = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex w-full mt-30 items-center justify-center">
        <div
          className="relative 
        flex justify-center items-center flex-col max-w-md border gap-5 box-border w-150 py-32 shadow-2xl rounded-2xl"
        >
          <div className="rounded-full w-30 h-30 flex justify-center items-center bg-green-100 box">
            <div className="rounded-full h-23 w-23 bg-green-600 inset-shadow-white  flex items-center justify-center">
              <div>
                <img src="./public/305615.png" alt="" className=" h-9 invert brightness-0" />
              </div>
            </div>
          </div>
          <div>
            <h2 className="font-bold text-3xl text-green-500">Order placed Successfully</h2>

            <p className="text-slate-600">We will inform you once the order gets shipped</p>
          </div>

          <div className="flex flex-col w-80 gap-5">
            <button
              className="bg-[#ffffff] text-[#23aeb3] h-14 text-xl border-2
            hover:bg-[#23aeb3]
            hover:text-[#ffffff]
         "
            >
              View Orders
            </button>
            <button
              className="bg-[#ffffff] text-[#23aeb3] border-2 h-14 text-xl hover:bg-[#23aeb3] hover:text-[#ffffff] "
              onClick={() => navigate('/')}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
