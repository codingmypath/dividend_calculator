import {BrowserRouter, Routes, Route} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Home from "./pages/Home";
import AddEdit from "./pages/AddEdit";
import View from "./pages/View";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <div className="App">
      <ToastContainer position="top-center" />
    <Routes>
      <Route exact path="/" element={ <Home /> } />
      <Route exact path="/addContact" element={ <AddEdit /> } />
      <Route exact path="/update/:id" element={ <AddEdit /> } />
      <Route exact path="/View/:id" element={ <View /> } />
    </Routes>
      </div>
    </BrowserRouter>
    </div>
  );
}

export default App;
