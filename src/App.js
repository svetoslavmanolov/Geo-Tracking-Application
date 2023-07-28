import { Routes, Route } from "react-router-dom";
import { useLoadScript } from "@react-google-maps/api";
import Map from "./components/Map/Map";
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import PointsList from "./components/PointsList/PointsList";
import Login from "./components/Login/Login";
import Logout from "./components/Logout/Logout";
import { AuthProvider } from "./contexts/AuthContext";

const App = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  if (!isLoaded) return <div>Loading...</div>

  return (
    <>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/map' element={<Map />} />
          <Route path='/points' element={<PointsList />} />
          <Route path='/login' element={<Login />} />
          <Route path='/logout' element={<Logout />} />
        </Routes>
      </AuthProvider>
    </>

  );
}

export default App;

