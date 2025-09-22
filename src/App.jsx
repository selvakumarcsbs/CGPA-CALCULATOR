import Cgpa from "./components/Cgpa";
import Gpa from "./components/Gpa";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route,} from "react-router-dom";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Gpa" element={<Gpa />} />
          <Route path="/Cgpa" element={<Cgpa />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
