import { createContext, useState } from "react";


interface CartContextType {
    count: number;
    increaseCount: () => void;
    deleteCount: () => void;
}

export const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {

    const [count, setCount] = useState(0);

    const increaseCount = () => {
        setCount(prev => prev + 1);
    };

    const deleteCount = () => {
        setCount(prev => (prev > 0 ? prev - 1 : 0));
    };

    return (
        <CartContext.Provider value={{ count, increaseCount, deleteCount }}>{children}</CartContext.Provider>
    )
};