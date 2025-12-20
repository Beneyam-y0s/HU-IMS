import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css'
import Root from "../utils/Root.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dahsboard.jsx"
import UserManagement from "./pages/adminPage/UserManagement.jsx";
import StaffMember from "./pages/staffMembers/Sidebar.jsx";
import StoreManager from "./pages/store Manager/StoreManager.jsx";
import StaffDashboard from "./pages/staffMembers/Dashboard.jsx"
import Home from "./pages/staffMembers/Home.jsx"
import About from "./pages/staffMembers/About.jsx"
import Profile from "./components/Profile.jsx";
import ContactUs from "./pages/staffMembers/ContactUs.jsx";
import Logout from "./components/Logout.jsx";
import Request from "./pages/staffMembers/Request.jsx";
import Product from "./pages/store Manager/Product.jsx";
import Catagory from "./pages/store Manager/Category.jsx";
import ProtectedRoutes from "../utils/ProtectedRoutes.jsx";
function App() {
 
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoutes requireRole={["admin"]}>
                <Dashboard />
              </ProtectedRoutes>}>
              <Route
                path="categories"
                element={<Catagory />}
              />
              <Route
                path="products"
                element={<Product />}
              />
              <Route
                path="suppliers"
                element={<h1>Supplires</h1>}
              />
              <Route
                path="orders"
                element={<h1>orders</h1>}
              />
              <Route
                path="users"
                element={<UserManagement />}
              >
            
              </Route>
              <Route
                path="profile"
                element={<Profile />}
              />
              <Route
                path="logout"
                element={<Logout />}
              />
          </Route>

         <Route
          path="customer/dashboard"
          element={
            <ProtectedRoutes requireRole={["staffMember"]}>
              <StaffDashboard />
            </ProtectedRoutes>
            
          }>
          <Route 
              path="request"
              element={<Request />}
          />
          <Route 
              path="home"
              element={<Home />}
          />
          <Route 
              path="about"
              element={<About />}
          />
          <Route 
              path="profile"
              element={<Profile />}
          />
          <Route 
              path="contact"
              element={<ContactUs />}
          />
          
          <Route path="logout" element={<Logout />} />

         </Route>

       
  


          <Route 
            path="/storeManager/dashboard" 
            element={
              <ProtectedRoutes requireRole={["storeManager"]}>
                <Dashboard />
              </ProtectedRoutes>}>

              <Route
                path="categories"
                element={<Catagory />}
              />
              <Route
                path="products"
                element={<Product />}
              />
              <Route
                path="suppliers"
                element={<h1>Supplires</h1>}
              />
              <Route
                path="profile"
                element={<Profile />}
              />
              <Route
                path="logout"
                element={<Logout />}
              />

          </Route>


          <Route 
            path="/departmentHead/dashboard" 
            element={
              <ProtectedRoutes requireRole={["departmentHead"]}>
                <Dashboard />
              </ProtectedRoutes>}>

              <Route
                path="categories"
                element={<h1>categories</h1>}
              />
              <Route
                path="products"
                element={<h1>product</h1>}
              />
              <Route
                path="suppliers"
                element={<h1>Supplires</h1>}
              />
              <Route
                path="profile"
                element={<Profile />}
              />
              <Route
                path="logout"
                element={<Logout />}
              />

          </Route>

         
          
          
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<p className="font-bold text-3xl mt-20 ml-20">Unauthorized user</p>} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
