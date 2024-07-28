import Header from "../Components/Header";
import { useRouteError } from "react-router-dom";
function ErrorPage(){
    const error = useRouteError();
    let title = "An error occured";
    let status = error.status
    let message = error.message
    if(error.status === 500){
        message = error.data.message;
    }
    if(error.status === 404){
        title = "Not found";
        message = "could not find the resource you are looking for";
    }
    return (
        <>
            <Header />
            <h1>{status + title}</h1>
            <p>{message}</p>
        </>
    );
}

export default ErrorPage;