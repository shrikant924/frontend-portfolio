export const Contact = () => {
  const style = ' rounded font-medium text-sm my-2 p-1 bg-white w-full focus:outline-none ';
  return (
    <>
      <div className="flex pt-20 items-center min-h-screen w-screen  flex-col drop-shadow-2xl bg-blue-200 box-border">
        <h3
          className="text-2xl text-shadow-slate-800 flex align-center justify-center flex-row  mb-2  box-border max-w-full 
         font-medium shadow-2xl border-b-3 border-b-blue-500 pb-1
        "
        >
          Fill the below details to contact with us
        </h3>
        <div className="bg-gray-500 w-full max-w-150 p-5 rounded-2xl shadow-2xl mt-5|">
          <div className="flex gap-1.5 flex-col md:flex-row">
            <input
              className={`${style}`}
              type="text"
              autoComplete="false"
              placeholder={'First Name:* '}
            />
            <input
              className={style}
              type="text"
              autoComplete="false"
              required
              placeholder="Last Name:*"
            />
          </div>

          <div className="flex gap-1.5 flex-col md:flex-row">
            <input
              className={style}
              type="text"
              autoComplete="false"
              required
              placeholder="Mobile No:* "
            />
            <input
              className={style}
              type="text"
              autoComplete="false"
              required
              placeholder="Email Id:*"
            />
          </div>

          <div className="flex gap-1.5">
            <textarea
              className={`${style}  w-full`}
              name="message"
              id="message"
              placeholder="Message"
              autoComplete="false"
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
