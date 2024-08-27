import { Outlet } from "react-router-dom";
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import CartSidebar from "../Components/CartSidebar";
function RootLayout(){
    return <>
        <Header />
        <CartSidebar/>
        <main>
            <Outlet />
        </main>
        <Footer />
    </>
}

export default RootLayout;