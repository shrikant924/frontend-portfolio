import { useState } from 'react';

export const Dropdown = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block">
      {/* Button */}
      <button onClick={() => setOpen(!open)} className=" px-4 py-2 rounded hover:text-blue-600">
        Categories
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute mt-2 w-40 bg-white border rounded shadow-lg">
          <ul>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Electronics</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Cloths</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Footware</li>
          </ul>
        </div>
      )}
    </div>
  );
};
