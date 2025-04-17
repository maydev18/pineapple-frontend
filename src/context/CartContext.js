import {createContext, useState, useEffect , useContext} from "react";
import { useError } from "./ErrorContext";
import { useAuth } from "./AuthContext";
import useApiClient from "../utils/axios";
export const CartContext = createContext();
export const useCart = () => useContext(CartContext); 
export const CartProvider = ({children}) => {
    const [cart , setCartProducts] = useState([]);
    const {isLoggedIn , login} = useAuth();
    const [total , setTotal] = useState(0);
    const[quantity , setQuantity] = useState(0);
    const [isOpen , setIsOpen] = useState(false);
    const [discount , setDiscount] = useState(0);
    const {showError} = useError();
    const apiClient = useApiClient();
    const setCartState = (cartDetails) => {
        setCartProducts(cartDetails.cart);
        setTotal(cartDetails.total);
        setQuantity(cartDetails.quantity);
        setDiscount(cartDetails.discount);
    }
    const fetchCart = async () => {
        try{
            const res = await apiClient.get('cart');
            const cartDetails = await res.data;
            setCartState(cartDetails);
            return cartDetails;
        }
        catch(err){
            showError(err.response.data.message , 'danger');
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
            const res = await apiClient.post('add-to-cart' , JSON.stringify({
                productID: productID,
                size: size,
            }))
            const cartDetails = res.data;
            setCartState(cartDetails);
            setIsOpen(true);
        }
        catch(err){
            showError(err.response.data.message , 'danger');
        }
    };
    const deleteFromCart = async(productID , size) => {
        try{
            if(!isLoggedIn){
                return await login();
            }
            const res = await apiClient.post('delete-from-cart' , JSON.stringify({
                productID: productID,
                size: size,
            }))
            const cartDetails = res.data;
            setCartState(cartDetails);
            setIsOpen(true);
        }
        catch(err){
            showError(err.response.data.message , 'danger');
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