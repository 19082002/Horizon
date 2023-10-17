
import Home from "./home.jsx";
import "../css/home.css";
import { createContext, useState,useEffect } from "react";


const Data = createContext();

function Fetchfun() {
  async function datafetch(lat, lon) {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${ import.meta.env.VITE_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch(() => {
        throw new Error("failed to fetch");
      });
  }
  async function livelocation() {
    let my_promise = new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    my_promise
      .then((position) => {
        console.log(position);
        datafetch(position.coords.latitude, position.coords.longitude);
      })
      .catch((err) => {
        datafetch(28.67, 77.22);
        alert("You  disabled location.");
      });
    console.log(name);
  }
  async function location(name) {
    // const res await
    // if(name==null)name="London"
    fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=5&appid=${ import.meta.env.VITE_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        // console.log(data[0].lon,data[0].lat);
        datafetch(data[0].lat, data[0].lon);
      })
      .catch(() => {
        throw new Error("failed to fetch");
      });
  }
  useEffect(()=>{
    livelocation();
    // location("London")
}, []) 

  const [data, setData] = useState({});
  // const data=await datafetch()
  return (
    <Data.Provider value={data}>
      <Home locat={location} live={livelocation} />
    </Data.Provider>
  );
}
export { Data, Fetchfun };
