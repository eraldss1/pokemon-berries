import axios from "axios";
import { useState, useEffect } from "react";

const useBerries = () => {
  const url = "https://pokeapi.co/api/v2/berry?limit=64";

  const [berries, setBerries] = useState(null);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(url);
        setBerries(response.data.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoaded(true);
      }
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { berries, error, loaded };
};

export default useBerries;
