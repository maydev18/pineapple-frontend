import {createContext, useState, useEffect , useContext} from "react";
import { getAuthToken } from "../utils/Auth";
import { useError } from "./ErrorContext";
export const CartContext = createContext();
export const useCart = () => useContext(CartContext); 
export const CartProvider = ({children}) => {
    const [cart , setCartProducts] = useState([]);
    const [isOpen , setIsOpen] = useState(false);
    const {showError} = useError();
    const fetchCart = async () => {
        try{
            const res = await fetch('http://localhost:8080/cart', {
                headers: {
                Authorization: 'bearer ' + getAuthToken(),
                },
            });
            if(!res.ok){
                const err = await res.json();
                throw err;
            }
            const cartItems = await res.json();
            setCartProducts(cartItems);
            return cartItems;
        }
        catch(err){
            showError(err.message , 'danger');
        }
    };
    useEffect(() => {
        fetchCart();
    } , []);
    const addToCart = async(productID , size) => {
        try{
            const res = await fetch('http://localhost:8080/add-to-cart', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'bearer ' + getAuthToken(),
                },
                body: JSON.stringify({
                    productID: productID,
                    size: size,
                }),
            });
            if(!res.ok){
                const err = await res.json();
                throw err;
            }
            const cartItems = await res.json();
            setCartProducts(cartItems);
            setIsOpen(true);
        }
        catch(err){
            showError(err.message , 'danger');
        }
    };
    const deleteFromCart = async(productID , size) => {
        try{
            const res = await fetch('http://localhost:8080/delete-from-cart' , {
                method : "post",
                headers : {
                    'Content-Type': 'application/json',
                    'Authorization' : 'bearer ' + getAuthToken()
                },
                body : JSON.stringify({
                    productID : productID,
                    size : size
                })
            });
            if(!res.ok){
                const err = await res.json();
                throw err;
            }
            const cartItems = await res.json();
            setCartProducts(cartItems);
            setIsOpen(true);
        }
        catch(err){
            showError(err.message , 'danger');
        }
    };
    const openCart = () => {
        setIsOpen(true);
    };
    const closeCart = () => {
        setIsOpen(false);
    }
    return (
        <CartContext.Provider value = {{cart , addToCart , deleteFromCart , isOpen , openCart , closeCart , fetchCart}}>
            {children}
        </CartContext.Provider>
    );
};