import "./App.css";
import Navbar from "./components/Navbar";
import News from "./components/News";
import SingleNews from "./components/SingleNews";
import SavedNews from "./components/SavedNews";
import UserPreferences from './components/UserPreferences';
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./components/Login";
import { createContext } from "react";
import axios from "axios";

export const userContext = createContext();

function App() {
  // let url = this.props;

  const [user, setUser] = useState({})
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get('http://localhost:4001/')
    .then(user => {
      console.log(user);
      setUser(user.data);
    })
    .catch(err => console.log(err))
  }, []);
  return (
    <>
    <userContext.Provider value={user}>
        <Router>
          <Navbar />
          <div className="container my-3">
            <Routes>
              <Route path="/"  element={<News key='general' country="in" category="general" />}></Route>
              <Route path="/business"  element={<News key='business' country="in" category="business" />}></Route>
              <Route path="/entertainment"  element={<News key='entertainment' country="in" category="entertainment" />}></Route>
              <Route path="/health"  element={<News key='health' country="in" category="health" />}></Route>
              <Route path="/science"  element={<News key='science' country="in" category="science" />}></Route>
              <Route path="/sports"  element={<News key='sports' country="in" category="sports" />}></Route>
              <Route path="/technology"  element={<News key='technology' country="in" category="technology" />}></Route>
                {/* To display single news */}
              {/* <Route path="/singlenews/*" element={<SingleNews key="SingleNews"/>} /> */}
              <Route path="/singlenews/*" element={<SingleNews key="SingleNews" url="url"/>}></Route> 
              <Route path="/SavedNews" element={<SavedNews key='SavedNews'/>}></Route> 
              <Route path="/preferences" element={<UserPreferences key="UserPreferances"/>} ></Route>
              
              {/* for login */}
              <Route path="/login" element={<Login/>} />

            </Routes>
          </div>
        </Router>

        </userContext.Provider>
      </>
  );
}

export default App;
