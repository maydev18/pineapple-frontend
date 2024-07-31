import { redirect } from "react-router-dom";

export function getTokenDuration(){
    const expiration = localStorage.getItem('expiration');
    const date = new Date(expiration);
    const now = new Date();
    const duration = date.getTime() - now.getTime();
    return duration;
}

export function getAuthToken(){
    const token = localStorage.getItem('token');
    if(!token) return null;
    const tokenDuration = getTokenDuration();
    if(tokenDuration <= 0) {
        return 'EXPIRED';
    }
    return token;
}

export function tokenLoader(){
    return getAuthToken();
}


//protection to routes
export function checkAuthLoader() {
    const token = getAuthToken();
    
    if (!token) {
      return redirect('/auth?mode=login');
    }
   
    return null;
  }