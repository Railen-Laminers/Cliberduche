import { useState, useEffect } from 'react';
import { parseError } from '../api/axios';

/**
 * Generic hook for fetching data
 * @param {Function} queryFn - Async function to fetch data
 * @param {Array} dependencies - Dependency array to refetch on change
 */
export default function useQuery(queryFn, dependencies = []) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await queryFn();
            setData(result);
        } catch (err) {
            setError(parseError(err));
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependencies);

    return { data, isLoading, error, refetch: fetchData };
}
