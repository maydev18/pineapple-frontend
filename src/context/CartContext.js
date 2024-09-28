import {createContext, useState, useEffect , useContext} from "react";
import { useError } from "./ErrorContext";
import { useAuth } from "./AuthContext";
export const CartContext = createContext();
export const useCart = () => useContext(CartContext); 
export const CartProvider = ({children}) => {
    const [cart , setCartProducts] = useState([]);
    const {isLoggedIn , token , login} = useAuth();
    const [total , setTotal] = useState(0);
    const[quantity , setQuantity] = useState(0);
    const [isOpen , setIsOpen] = useState(false);
    const [discount , setDiscount] = useState(0);
    const {showError} = useError();
    const fetchCart = async () => {
        try{
            console.log("fetched cart");
            const res = await fetch('http://localhost:8080/cart', {
                headers: {
                Authorization: 'bearer ' + token,
                },
            });
            if(!res.ok){
                const err = await res.json();
                throw err;
            }
            const cartDetails = await res.json();
            setCartProducts(cartDetails.cart);
            setTotal(cartDetails.total);
            setQuantity(cartDetails.quantity);
            setDiscount(cartDetails.discount);
            return cartDetails;
        }
        catch(err){
            showError(err.message , 'danger');
        }
    };
    useEffect(() => {
        fetchCart();
    } , [isLoggedIn]);
    const addToCart = async(productID , size) => {
        try{
            if(!isLoggedIn){
                return showError("Please login to continue ahead");
            }
            const res = await fetch('http://localhost:8080/add-to-cart', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'bearer ' + token,
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
            const cartDetails = await res.json();
            setCartProducts(cartDetails.cart);
            setTotal(cartDetails.total);
            setQuantity(cartDetails.quantity);
            setDiscount(cartDetails.discount);
            setIsOpen(true);
        }
        catch(err){
            showError(err.message , 'danger');
        }
    };
    const deleteFromCart = async(productID , size) => {
        try{
            if(!isLoggedIn){
                return await login();
            }
            const res = await fetch('http://localhost:8080/delete-from-cart' , {
                method : "post",
                headers : {
                    'Content-Type': 'application/json',
                    'Authorization' : 'bearer ' + token
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
            const cartDetails = await res.json();
            setCartProducts(cartDetails.cart);
            setTotal(cartDetails.total);
            setQuantity(cartDetails.quantity);
            setDiscount(cartDetails.discount);
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
        <CartContext.Provider value = {{cart , addToCart , deleteFromCart , isOpen , openCart , closeCart , fetchCart , total , quantity , discount}}>
            {children}
        </CartContext.Provider>
    );
};