import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Booking from "./Pages/Booking/Booking";
import { useEffect, useState } from "react";
import { responseType } from "./Types/types";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Confirmation from "./Pages/Confirmation/Confirmation";
import Navigation from "./Components/Navigation/Navigation";
import LandingPage from "./Pages/LandingPage/LandingPage";
import { AnimatePresence } from "framer-motion";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [apiResponse, setApiResponse] = useState<responseType>({
    when: "",
    lanes: 0,
    people: 0,
    shoes: [0],
    price: 0,
    id: "",
    active: false,
  });

  useEffect(() => {
    if (apiResponse.when) {
      navigate("/confirmation");
    }
  }, [apiResponse]);

  // Scrolls to the top of the page when changing location
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      {location.pathname != "/" && (
        <>
          <ToastContainer
            position="top-center"
            newestOnTop
            closeOnClick
            stacked
            draggable
            pauseOnHover
          />

          <Navigation />
        </>
      )}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route index element={<LandingPage />} />

          <Route
            path="/booking"
            element={<Booking setApiResponse={setApiResponse} />}
          />
          <Route
            path="/confirmation"
            element={<Confirmation apiResponse={apiResponse} />}
          />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
