import React from "react";
import { Pets } from "./components/pets/Pets";
import { Trades } from "./components/trades/trades";
import { SearchBox } from "./components/pets/SearchBox";
import { MyNavbar } from "./components/starters/mynavbar";
import Login from "./components/starters/Login";
import Logout from "./components/starters/Logout";

import ReactDOM from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

const App = () => {
  //return [<Pets />];
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Login />} />
        <Route path="logout" element={<Logout />} />
        
          <Route path="trades" element={[<MyNavbar />,<Trades/>] }/>
          
        
        
        <Route path="securities" element={[<MyNavbar />,<Pets/>]}/>
        
      </Routes>
    </BrowserRouter>
  );
};


export default App;
