import React from "react";
import { Link } from "react-router-dom";

function App() {
    return (
        <div>
      <h1>App</h1>
      <nav>
        <ul>
          <li>
            <Link to="/app/index.html">Accueil</Link>
          </li>
          <li>
            <Link to="/Home">Page d'accueil</Link>
          </li>
        </ul>
      </nav>
    </div>

    );
}
export default App;