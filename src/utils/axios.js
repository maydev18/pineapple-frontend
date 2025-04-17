import axios from 'axios';
import { useAuth } from '../context/AuthContext';
const useApiClient = () => {
    const {token} = useAuth();
    return axios.create({
        baseURL: process.env.REACT_APP_BASE_URL,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
    });
}

export default useApiClient;
