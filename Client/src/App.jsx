import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Forms/Login";
import NotFound from "./components/NotFound";
import { AuthProvider } from "./utils/auth";
import Register from "./components/Forms/Register";
import AddOrder from "./components/Forms/AddOrder";
import RequireAuth from "./utils/RequireAuth";
import GetOrder from "./components/Forms/GetOrder";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/add-order"
            element={
              <RequireAuth>
                <AddOrder />
              </RequireAuth>
            }
          />
          <Route
            path="/get-order"
            element={
              <RequireAuth>
                <GetOrder />
              </RequireAuth>
            }
          />
          {/* 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
