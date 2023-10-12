import { useEffect } from "react";
import useBerries from "./apis/useBerries";
import ListBerries from "./components/ListBerries";

import "./static/css/App.css";

const App = () => {
  const { berries, error, loaded } = useBerries();

  useEffect(() => {
    if (loaded) {
      console.log(berries);
    }
  });

  function sortByNameAscending(berries) {
    berries.sort((a, b) => {
      let na = a.name.toLowerCase(),
        nb = b.name.toLowerCase();

      if (na < nb) {
        return -1;
      }
      if (na > nb) {
        return 1;
      }
      return 0;
    });

    return berries;
  }

  return (
    <div className="App">
      {error ? (
        <>Error loading data.</>
      ) : loaded ? (
        <ListBerries loaded={loaded} data={sortByNameAscending(berries)} />
      ) : (
        <>Data not loaded.</>
      )}
    </div>
  );
};

export default App;
