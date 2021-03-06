import "./App.css";
import { useEffect, useState } from "react";
import DailyView from "../DailyView/DailyView.js";
import { WeeklyView } from "../WeeklyView/WeeklyView.js";

function App() {
  const [cordenates, setCordenates] = useState(false);
  const [dataWeather, setDataWeather] = useState();

  const [inputField, setInputField] = useState("");
  console.log(inputField);

  const [clicked, setClicked] = useState(false);
  console.log(clicked);

   const onChange = (e) => {
     console.log(e.target.value);
     setInputField(e.target.value);
   };


  function onClick() {
    setClicked(true);
  }

  console.log(dataWeather);
  // Api-url to get the coordinates
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${inputField}&limit=1&appid=895284fb2d2c50a520ea537456963d9c`;
  // Api-url to get the weather
  const url2 = `http://api.openweathermap.org/data/2.5/onecall?lat=${cordenates.lat}&lon=${cordenates.lon}&units=metric&appid=895284fb2d2c50a520ea537456963d9c`;

  // useEffect for getting the longitud and latitud data
  useEffect(() => {
    async function fetchAPI() {
      const response = await fetch(`${url}`);
      const data = await response.json();
      setCordenates({ lat: data[0].lat, lon: data[0].lon });
    }
    if (clicked) {
      fetchAPI();
      setClicked(false);
    }
  }, [url,clicked,setClicked]);

  // useEffect for getting the 8 days weather data
  useEffect(() => {
    async function weatherData() {
      const response = await fetch(`${url2}`);
      const data = await response.json();
      setDataWeather(data);
      // console.log(data)
    }
    if (cordenates) {
      weatherData();
    }
  }, [cordenates, url2]);

  return (
    <div className="App">
      <DailyView onClick={onClick} onChange={onChange} inputField={inputField}/>
      <WeeklyView dataWeather={dataWeather} />
    </div>
  );
}

export default App;
