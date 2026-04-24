import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import FinOps from "./pages/FinOps";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<FinOps />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;