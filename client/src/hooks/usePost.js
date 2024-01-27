import { useState, useEffect } from "react";

export const usePost = () => {
  const [apiData, setApiData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const postData = async (data, endpoint) => {
    try {
      const response = await fetch(`http://localhost:3000${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      setApiData(responseData);
      setError(null);
      setLoading(false);

      return { apiData: responseData, error: null, loading: false };
    } catch (error) {
      setApiData(null);
      setError(error);
      setLoading(false);

      return { apiData: null, error, loading: false };
    }
  };

  useEffect(() => {
    // Aquí puedes realizar acciones adicionales cuando el estado cambia
  }, [loading, apiData, error]);

  return { postData };
};
