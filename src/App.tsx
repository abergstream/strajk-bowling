import { Route, Routes, useNavigate } from "react-router-dom";
import Booking from "./Pages/Booking/Booking";
import { useEffect, useState } from "react";
import { responseType } from "./Types/types";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Confirmation from "./Pages/Confirmation/Confirmation";

function App() {
  const navigate = useNavigate();
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
      console.log("RESPONSE: ", apiResponse);
      navigate("/confirmation");
    }
  }, [apiResponse]);

  return (
    <>
      <ToastContainer />

      <Routes>
        <Route index element={<Booking setApiResponse={setApiResponse} />} />
        <Route
          path="/confirmation"
          element={<Confirmation apiResponse={apiResponse} />}
        />
      </Routes>
    </>
  );
}

export default App;
