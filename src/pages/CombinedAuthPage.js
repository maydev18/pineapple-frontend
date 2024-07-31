
import {json , redirect } from 'react-router-dom';
import AuthForm from '../Components/AuthForm';
const CombinedAuthPage = () => {
  return <AuthForm />
};


export default CombinedAuthPage;

export async function action({request}){
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get('mode') || 'login';
  if(mode !== 'login' &&  mode !== 'signup'){
      throw json({
          message : "unsupported mode"
      } , {
          status : 422
      });
  }
  const data = await request.formData();
  const authData = {
      email : data.get('email'),
      password : data.get('password')
  };
  const res = await fetch('http://localhost:8080/auth/' + mode , {
      method : mode === 'login' ? 'POST' : "PUT",
      headers : {
          'Content-Type' : 'application/json'
      },
      body : JSON.stringify(authData)
  })
  if(!res.status === 500){
      throw json({message : "Could not authenticate user"} , {status : 500});
  }
  const resData = await res.json();
  console.log(resData);
  if(!res.ok){
    alert(resData.message);
    return null;
  }
  else{
    if(mode === 'login'){
      const token = resData.token;
      localStorage.setItem('token' , token);
      const expiration = new Date();
      expiration.setDate(expiration.getDate() + 30);
      localStorage.setItem('expiration' , expiration.toISOString());
      return redirect('/');
    }
    else if(mode === 'signup'){
      return res.redirect('/auth?mode=login')
    }
  }
}
