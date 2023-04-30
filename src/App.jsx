import './App.css'
import {BrowserRouter} from "react-router-dom";
import Memory from "./Memory.jsx";
import Images from './images';



const App=()=> {


  return (
      <BrowserRouter>
          <Memory/>
      </BrowserRouter>
  );
};

export default App
