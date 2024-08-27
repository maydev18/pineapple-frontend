import {createContext, useState, useEffect} from "react";
import { getAuthToken } from "../utils/Auth";

export const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [cart , setCartProducts] = useState([]);
    const [isOpen , setIsOpen] = useState(false);

    const fetchCart = async () => {
        try{
            const res = await fetch('http://localhost:8080/cart', {
                headers: {
                Authorization: 'bearer ' + getAuthToken(),
                },
            });
            const cartItems = await res.json();
            setCartProducts(cartItems);
        }
        catch(err){
            alert(err.message);
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
            const cartItems = await res.json();
            setCartProducts(cartItems);
            setIsOpen(true);
        }
        catch(err){
            alert("failed in adding to cart");
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
            const cartItems = await res.json();
            setCartProducts(cartItems);
            setIsOpen(true);
        }
        catch(err){
            alert("failed removing from cart");
        }
    };
    const openCart = () => {
        setIsOpen(true);
    };
    const closeCart = () => {
        setIsOpen(false);
    }
    return (
        <CartContext.Provider value = {{cart , addToCart , deleteFromCart , isOpen , openCart , closeCart}}>
            {children}
        </CartContext.Provider>
    );
};