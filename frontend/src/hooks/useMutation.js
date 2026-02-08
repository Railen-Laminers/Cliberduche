import { useState } from 'react';
import { parseError } from '../api/axios';

/**
 * Generic hook for async operations (create/update/delete)
 * @param {Function} mutationFn - Async function to execute (API call)
 */
export default function useMutation(mutationFn) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = async (...args) => {
    setError(null);
    setIsLoading(true);
    try {
      const result = await mutationFn(...args);
      return result;
    } catch (err) {
      setError(parseError(err));
      throw err; // rethrow if caller wants to handle it
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setError(null);
    setIsLoading(false);
  };

  return { mutate, isLoading, error, reset };
}
