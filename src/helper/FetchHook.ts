
import axios from "axios";
import { useEffect, useState } from "react";

import { options } from "@/helper/apiConfig";

const useFetchData = (url: string,anime?:boolean) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>();

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(url, options);

        if (response.data.results === undefined) {
          setData(response.data);
        } else {
          setData(response.data.results);
        }

        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }

    async function animeData() {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(url);

        if (response.data === undefined) {
          setData(response.data);
        } else {
          setData(response.data);
        }

        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }
    

    if(anime){
      animeData()
    }else{
      fetchData();
    }
    


  }, [url]);

  return [data, loading, error];
};

export default useFetchData;
