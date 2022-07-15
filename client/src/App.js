import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home"
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        {/* <Alert alert={alert} /> */}
        <div className="container">
          <Routes>
            <Route path="/edit" element={<Home />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
