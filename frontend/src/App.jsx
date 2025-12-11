import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css'
import Root from "../utils/Root.jsx";
import Login from "./pages/Login.jsx";
import ProtectedRoutes from "../utils/ProtectedRoutes.jsx";
function App() {
 
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/admin/dashboard" element={<ProtectedRoutes requireRole={["admin"]}><h1>Admin dashboard</h1></ProtectedRoutes>} />
          <Route path="/customer/dashboard" element={<h1>customer dashboard</h1>} />
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<p className="font-bold text-3xl mt-20 ml-20">Unauthorized user</p>} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
