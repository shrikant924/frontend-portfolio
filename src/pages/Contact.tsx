export const Contact = () => {
  const style = 'border-2 rounded placeholder:text-black font-bold my-2 p-1 bg-white w-full ';
  return (
    <>
      <div className="flex justify-center items-center min-h-screen w-screen  flex-col drop-shadow-2xl bg-blue-200">
        <h3 className="font-semibold italic text-3xl text-purple-700 flex align-center justify-center flex-row  mb-2">
          Contact US
        </h3>
        <div className="bg-gray-500 max-w-md h-fit p-5 rounded-2xl shadow-2xl">
          <div className="flex gap-1.5">
            <input className={style} type="text" placeholder="First Name:* " />
            <input className={style} type="text" placeholder="Last Name:*" />
          </div>

          <div className="flex gap-1.5">
            <input className={style} type="text" placeholder="Mobile No:* " />
            <input className={style} type="text" placeholder="Email Id:*" />
          </div>

          <div className="flex gap-1.5">
            <textarea
              className={`${style}  w-full`}
              name="message"
              id="message"
              placeholder="Message"
            ></textarea>
          </div>

          <div className="flex gap-1.5 justify-center align-center">
            <button
              className={'font-bold text-2xl border py-1 px-3 rounded bg-yellow-300'}
              type="submit"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
