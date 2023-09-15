import { useContext, useEffect, useState } from "react";
import "../css/home.css";
import Chart from "chart.js/auto";
import { Bar,Line } from "react-chartjs-2";
import {
  Wind,
  CloudHail,
  Sun,
  Waves,
  CloudRainWind,
  LocateFixed,
  Search,
  CalendarDays,
} from "lucide-react";
import { Data } from "./fetch";
const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const months = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function Home(props) {
  const data = useContext(Data);
  const d = new Date();
  // if(Object.keys(data).length)console.log(data.list[0].weather[0].icon);
  const [city_name, setCity] = useState("Delhi");
  const [state, setState] = useState({
    labels: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
    datasets: [
      {
        label: "Weather",
        data: [11, 19, 34, 94, 45, 34, 67, 23, 12],
      },
    ],
  });


  useEffect(() => {
    setState({
      labels: [
        `${(d.getHours() + 0) % 24}:00`,
        `${(d.getHours() + 3) % 24}:00`,
        `${(d.getHours() + 6) % 24}:00`,
        `${(d.getHours() + 9) % 24}:00`,
        `${(d.getHours() + 12) % 24}:00`,
      ],
      datasets: [
        {
          label: "Weather",
          data: [
            Object.keys(data).length
              ? parseInt(data.list[0].main.temp - 273)
              : 89,
            Object.keys(data).length
              ? parseInt(data.list[1].main.temp - 273)
              : 40,
            Object.keys(data).length
              ? parseInt(data.list[2].main.temp - 273)
              : 45,
            Object.keys(data).length
              ? parseInt(data.list[3].main.temp - 273)
              : 50,
            Object.keys(data).length
              ? parseInt(data.list[4].main.temp - 273)
              : 49,
          ],
          backgroundColor:"#FFFF00",
          borderColor:"Black",
          borderWidth:"1",

        },
      ],
    });
  }, [data]);
  return (
    <>
      <div className="container">
        <div className="head">
          <div className="place">
            <h3>{Object.keys(data).length ? data.city.name : "city"}</h3>
            <h6>{Object.keys(data).length ? data.city.country : "country"}</h6>
          </div>
          <div className="searchbar">
            <div className="search">
              <input
                type="text"
                placeholder="Search here..  "
                onChange={(event) => setCity(event.target.value)}
              />
              <p onClick={() => props.locat(city_name)}>
                <Search/>
              </p>
            </div>
          </div>
        </div>
        <div className="main">
          <div className="col1">
            <div className="row1">
              <p className="time">{`${d.getHours()}:${d.getMinutes()}`}</p>
              <div className="weather">
                <div className="temp">
                  <img
                    className="image"
                    src={
                      Object.keys(data).length &&
                      `svgfile/${data.list[0].weather[0].icon}.svg`
                    }
                  />

                  <p>
                    {Object.keys(data).length
                      ? parseInt(data.list[0].main.temp - 273)
                      : "temp"}
                    °C
                  </p>
                </div>
                <p>
                  {Object.keys(data).length
                    ? data.list[0].weather[0].main
                    : "c10d"}
                </p>
              </div>
            </div>
            <div className="row2">
              <p> Overview Temperature</p>
              <div className="graph">
                <Line data={state} options={{responsive:"true"}}className="linegraph" />
              </div>
              
            </div>
          </div>
          <div className="col2">
            <div className="top">
              <div className="date">
                <h3>{`${months[d.getMonth() + 1]} ${d.getFullYear()}`}</h3>
                <h6>{days[d.getDay()]}</h6>
              </div>
              <div className="live">
                <p className="live" onClick={() => props.live()}>
                  <LocateFixed className="locationbtn" />
                </p>
              </div>
            </div>
            <div className="row1">
              <div className="cardlist">
                <div className="card">
                  <p>Now</p>
                  {Object.keys(data).length && (
                    <img
                      src={` svgfile/${data.list[0].weather[0].icon}.svg`}
                    />
                  )}
                  <p>
                    {Object.keys(data).length
                      ? parseInt(data.list[0].main.temp - 273)
                      : "false"}
                    °C
                  </p>
                </div>
                <div className="card">
                  <p>{days[(d.getDay() + 1)%7]}</p>
                  {Object.keys(data).length && (
                    <img
                      src={` svgfile/${data.list[7].weather[0].icon}.svg`}
                    />
                  )}
                  <p>
                    {Object.keys(data).length
                      ? parseInt(data.list[7].main.temp - 273)
                      : "false"}
                    °C
                  </p>
                </div>
                <div className="card">
                  <p>{days[(d.getDay() + 2)%7]}</p>
                  {Object.keys(data).length && (
                    <img
                      src={` svgfile/${data.list[15].weather[0].icon}.svg`}
                    />
                  )}
                  <p>
                    {Object.keys(data).length
                      ? parseInt(data.list[15].main.temp - 273)
                      : "false"}
                    °C
                  </p>
                </div>
                <div className="card">
                  <p>{days[(d.getDay() + 3)%7]}</p>
                  {Object.keys(data).length && (
                    <img
                      src={` svgfile/${data.list[23].weather[0].icon}.svg`}
                    />
                  )}
                  <p>
                    {Object.keys(data).length
                      ? parseInt(data.list[23].main.temp - 273)
                      : "false"}
                    °C
                  </p>
                </div>
                <div className="card">
                  <p>{days[(d.getDay() + 4)%7]}</p>
                  {Object.keys(data).length && (
                    <img
                      src={` svgfile/${data.list[31].weather[0].icon}.svg`}
                    />
                  )}
                  <p>
                    {Object.keys(data).length
                      ? parseInt(data.list[31].main.temp - 273)
                      : "false"}
                    °C
                  </p>
                </div>
                <div className="card">
                  <p>{days[(d.getDay() + 5)%7]}</p>
                  {Object.keys(data).length && (
                    <img
                      src={` svgfile/${data.list[35].weather[0].icon}.svg`}
                    />
                  )}
                  <p>
                    {Object.keys(data).length
                      ? parseInt(data.list[35].main.temp - 273)
                      : "false"}
                    °C
                  </p>
                </div>
                <div className="card">
                  <p>{days[(d.getDay() + 6)%7]}</p>
                  {Object.keys(data).length && (
                    <img
                      src={` svgfile/${data.list[39].weather[0].icon}.svg`}
                    />
                  )}
                  <p>
                    {Object.keys(data).length
                      ? parseInt(data.list[39].main.temp - 273)
                      : "false"}
                    °C
                  </p>
                </div>
               
              </div>
            </div>
            <div className="row2">
              <div className="card">
                <p>
                  <Wind />
                </p>
                <div className="middle">
                  <p>Wind Speed</p>
                  <p className="value">
                    {Object.keys(data).length
                      ? data.list[0].wind.speed
                      : "false"}
                    Km/h
                  </p>
                </div>
              </div>
              <div className="card">
                <p>
                  {" "}
                  <CloudHail />
                </p>
                <div className="middle">
                  <p>Humidity</p>
                  <p className="value">
                    {Object.keys(data).length
                      ? data.list[0].main.humidity
                      : "false"}
                  </p>
                </div>
              </div>
            </div>
            <div className="row3">
              <div className="card">
                <p>
                  <Waves />
                </p>
                <div className="middle">
                  <p>Pressure</p>
                  <p className="value">
                    {Object.keys(data).length
                      ? data.list[0].main.pressure
                      : "false"}
                  </p>
                </div>
              </div>
              <div className="card">
                <p>
                  {" "}
                  <Sun />
                </p>
                <div className="middle">
                  <p>Sunrise</p>
                  <p className="value">
                    {Object.keys(data).length
                      ? `${new Date(
                          data.city.sunrise * 1000
                        ).getHours()}:${new Date(
                          data.city.sunrise * 1000
                        ).getMinutes()}`
                      : "false"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Home;
