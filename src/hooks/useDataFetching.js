import { useState, useEffect } from 'react';
import { useError } from '../context/ErrorContext';
const useDataFetching = (fetchDataFunction) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const {setError} = useError();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetchDataFunction(); // Call the API function passed as a parameter
                setData(result);                   // Store the result in state
            } catch (error) {
                setError(error);                   // Handle any errors
            } finally {
                setLoading(false);                 // Set loading to false after fetching data
            }
        };

        fetchData();                           // Trigger the fetch operation on component mount
    }, [fetchDataFunction]);                       // Dependency array to re-run if the function changes
    // Return the state: data, loading status, and error if any
    return { data, loading};
};

export default useDataFetching;
