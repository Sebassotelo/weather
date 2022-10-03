import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [info, setInfo] = useState({});
  const [ext, setExt] = useState(null);
  const [loading, setLoading] = useState(false);

  const buscarCiudad = async () => {
    const data = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d451a5df137546c700a65908b3fcb325&lang=es&units=metric`
    );
    const dataExt = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=d451a5df137546c700a65908b3fcb325&lang=es&units=metric&cnt=3`
    );
    const ciudad = await data.json();
    const ciudadExt = await dataExt.json();

    setInfo(ciudad);
    console.log(ciudad);
    if (ciudad.cod === 200) {
      setLoading(true);
    } else if (ciudad.cod === 404) {
      setLoading(false);
    }
  };

  const actu = (e) => {
    setLoading(false);
    buscarCiudad();

    e.preventDefault();
  };

  const manejarCiudad = (e) => {
    setCity(e.target.value);
  };

  return (
    <div className="App">
      <div className="container">
        {" "}
        <form action="" onSubmit={actu}>
          <input
            type="text"
            className="input"
            onChange={manejarCiudad}
            placeholder="Ingrese la Ciudad"
            required
          />
          <button className="button">Buscar</button>
        </form>
        {loading ? (
          <div className="info">
            <h1>
              Ciudad: {info.name}, {info.sys.country}
            </h1>
            <p>Temperatura: {info.main.temp}°</p>
            <p>Temp max: {info.main.temp_max}°</p>
            <p>Temp min: {info.main.temp_min}°</p>
            <p>Humedad: {info.main.humidity}%</p>

            <div className="cielo">
              <img
                src={`http://openweathermap.org/img/wn/${info.weather[0].icon}@2x.png`}
                alt=""
              />
              <p>{info.weather[0].description}</p>
            </div>
          </div>
        ) : (
          <div className="loader">
            <div class="lds-ripple">
              <div></div>
              <div></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
