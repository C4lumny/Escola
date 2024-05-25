import { useState, useEffect } from "react";
import { escolaApi } from "@/lib/api";

export const useRequest = () => {
  const [apiData, setApiData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const apiRequest = async (data: any, endpoint: string, methodType: 'post' | 'put' | 'delete' | 'get' | 'patch') => {
    try {;
      const response = await escolaApi[methodType](endpoint, data);
      setApiData(response);
      setError(null);
      setLoading(false);

      return { apiData: response.data, error: null, loading: false };
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

  return { apiRequest };
};