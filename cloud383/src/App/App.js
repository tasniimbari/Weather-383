import "./App.css";
import {useEffect} from 'react';
function App() {
     const url = `https://api.openweathermap.org/data/2.5/weather?q=london&units=metric&appid=895284fb2d2c50a520ea537456963d9c`


async function fetchAPI(){
 const response = await fetch(`${url}`);
  const data = await response.json();
console.log(data)
}
  useEffect(() => {
  fetchAPI()
}, [])
  return (
    <div className="App">
      <header className="App-header"></header>
    </div>
  );
}

export default App;