import { useState, useEffect } from 'react';

export function useFetch<T>(url: string) {

    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        async function fetchData() {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(url, { signal });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status} - ${response.statusText}`);
                }

                const json = await response.json();

                // Only update state if the component is still mounted
                if (!signal.aborted) {
                    setData(json);
                }
            }
            catch (error) {
                // Ignore abort errors (they are intentional cancellations)
                if (error instanceof Error) {
                    if (error.name !== 'AbortError') {
                        setError(error.message);
                    }
                }
                else {
                    setError('An unknown error occured');
                }
            }
            finally {
                if (!signal.aborted) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        // Cleanup function: Cancel the fetch if the component unmounts 
        // or if the 'url' changes before the fetch finishes.
        return () => {
            controller.abort();
        };
    }, [url]);

    return { data, loading, error };
};