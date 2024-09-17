import { getAuthToken } from "../utils/Auth";
export const getSavedAddresses = async () => {
    const res = await fetch("http://localhost:8080/get-addresses", {
        headers: {
            'Authorization': 'bearer ' + getAuthToken()
        }
    });
    if (!res.ok) {
        const err = await res.json();
        throw err;
    }
    const add = await res.json();
    return add;
}