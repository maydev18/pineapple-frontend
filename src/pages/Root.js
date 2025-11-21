import { Outlet } from "react-router-dom";
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import CartSidebar from "../Components/CartSidebar";
import AlertModal from "../Modal/AlertModal";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { trackPageView } from "../analytics";
import ReactGA from "react-ga4";
function RootLayout(){
    const location = useLocation();

  useEffect(() => {
    // Track page view
    trackPageView(location.pathname + location.search);

    // 3-Second View Event
    const timer = setTimeout(() => {
      ReactGA.event({
        category: "engagement",
        action: "3_sec_view",
        label: location.pathname,
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [location]);
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