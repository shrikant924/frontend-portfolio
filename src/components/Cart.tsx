import { useAppSelector } from '../app/hook';

export const Cart = () => {
  const items = useAppSelector((state) => state.productCart.items);

  return (
    <>
      {items.map((item) => (
        <div className="d-flex flex-column justify-content-center card-wrapper">
          <h2>
            <span>Product :</span> {item.name}
          </h2>
          <h2>
            <span>Price : </span> {item.price}
          </h2>
          <h2>
            {' '}
            <span>Qty : </span>
            {item.qty}
          </h2>
        </div>
      ))}
    </>
  );
};

export default Cart;
