import React, { useEffect } from "react";
import "./App.css";
import ItemCard from "./components/ItemCard/ItemCard";
import { getProducts } from "./api";

function App() {
  const [data, setData] = React.useState([]); 

  const getData = () =>
    getProducts({}).then((res) => {
      if (res.status === 200) {
        setData(res.data);
        console.log(data);
      } else {
        console.log(res);
      }
    });

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="App">
      <ItemCard />
    </div>
  );
}

export default App;
