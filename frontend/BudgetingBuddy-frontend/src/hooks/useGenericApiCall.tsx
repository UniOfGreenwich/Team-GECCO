import { useState } from "react";

const UseGenericApiCall = <T,>(
  url: string,
  method: string,
  headers: {} | null,
  body?: any,
) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      let fetchOptions: RequestInit = {
        method: method.toUpperCase(),
      };

      if (headers) {
        fetchOptions = {
          ...fetchOptions,
          headers: headers,
        };
      }

      if (body) {
        fetchOptions = {
          ...fetchOptions,
          body: JSON.stringify(body),
        };
      }

      const response = await fetch(url, fetchOptions);

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const result: T = await response.json();
      setData(result);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
};

export default UseGenericApiCall;
