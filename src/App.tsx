import "./App.css";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const App = () => {
  const allCookies = Cookies.get(); //Obtiene todas las cookies almacenados del navegador
  const cookiesArray = Object.entries(allCookies); 

  const [count, setCount] = useState(0); // variable dependiente
  const [token, setToken] = useState({ name: "", value: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setToken((prevToken) => {
      return {
       ...prevToken,
        [name]: value,
      };
    });
  };


  //Esta funcion establece una cookie al navegador
  const handleSubmit = () => {
    setCount((prevCount) => prevCount + 1); //Cambia el valor de la variable dependiente
    Cookies.set(token.name, token.value); //Establece la cookie
    //Limpia los campos
    setToken((prevToken) => {
      return {
       ...prevToken,
        name: "",
        value: "",
      };
    });
  };

  //Esta funcion elimina una cookie del navegador
  const handleDelete = (name) => {
    setCount((prevCount) => prevCount + 1);
    Cookies.remove(name); //Elimina la cookie del navegador
  };

  useEffect(() => {}, [count]);

  return (
    <div className="main">
      <div className="title">
        <img src="/cookies.png" alt="cookies" />
        <span>Cookies</span>
      </div>
      <div className="content">
        <div className="cookies">
          <span>Tus Cookies</span>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {cookiesArray.length > 0 &&
                cookiesArray.map((cookie, index) => (
                  <tr key={index}>
                    <td>{cookie[0]}</td>
                    <td>{cookie[1]}</td>
                    <td>
                      <button onClick={() => handleDelete(cookie[0])}>
                        <span>Eliminar</span>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="actions">
          <div>
            <span>Name:</span>
            <input
              name="name"
              value={token.name}
              onChange={handleChange}
              type="text"
              placeholder="Required.."
            />
          </div>
          <div>
            <span>Value:</span>
            <input
              name="value"
              value={token.value}
              onChange={handleChange}
              type="text"
              placeholder="Required.."
            />
          </div>
          <button disabled={!token.name || !token.value} onClick={handleSubmit}>
            <span>Agregar</span>
          </button>
        </div>
      </div>
      <div className="footer">
        <a href="https://storyset.com/food">Food illustrations by Storyset</a>
      </div>
    </div>
  );
};


export default App;