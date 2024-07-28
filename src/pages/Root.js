import { Outlet , useLoaderData , useSubmit } from "react-router-dom";
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { useEffect } from "react";
import { getTokenDuration } from '../utils/Auth';
function RootLayout(){
    const token = useLoaderData();
    const submit = useSubmit();
    useEffect(()=>{
        if(!token){
            return;
        }
        if(token === 'EXPIRED'){
            submit(null , {action : '/logout' , method : 'post'});
            return;
        }

        const tokenDuration = getTokenDuration();
        setTimeout(() => {
            submit(null , {action : '/logout' , method : 'post'});
        }, tokenDuration);
    } , [token , submit])
    return <>
        <Header />
        <main>
            <Outlet />
        </main>
        <Footer />
    </>
}

export default RootLayout;