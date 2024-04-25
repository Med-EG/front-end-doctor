import { Route, Routes } from "react-router-dom";
import "./App.css";
import DoctorRegister from "./pages/DoctorRegister";

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<DoctorRegister />} />
    </Routes>
  );
}

export default App;
