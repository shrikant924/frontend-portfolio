import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hook';
import { hidePopUp } from '../features/popup/popUpSlice';

export const Popup = () => {
  const dispatch = useAppDispatch();
  const { message, type, visible } = useAppSelector((state) => state.popUp);

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        dispatch(hidePopUp());
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!visible) return null;

  const bgColor =
    type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';

  return (
    <div className={`fixed top-5 left-1/2 text-white px-4 py-2 rounded shadow-lg ${bgColor}`}>
      {message}
    </div>
  );
};
