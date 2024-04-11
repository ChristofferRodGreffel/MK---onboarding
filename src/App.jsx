import { Route, Routes } from "react-router-dom";
import SignIn from "./customer/SignIn";

function App() {
  return (
    <>
      <Routes>
        <Route path="*" element={<SignIn />} />
      </Routes>
    </>
  );
}

export default App;
