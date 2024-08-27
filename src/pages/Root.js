import { Outlet } from "react-router-dom";
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import CartSidebar from "../Components/CartSidebar";
import AlertModal from "../Modal/AlertModal";
function RootLayout(){
    return <>
        <Header />
        <AlertModal/>
        <CartSidebar/>
        <main>
            <Outlet />
        </main>
        <Footer />
    </>
}

export default RootLayout;