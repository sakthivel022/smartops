import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import FinOps from "./pages/FinOps";
import Databricks from "./pages/Databricks";
import Storage from "./pages/Storage";
import VirtualMachine from "./pages/VirtualMachine";
import AppServices from "./pages/AppServices";
import Others from "./pages/Others";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/"               element={<FinOps />}         />
          <Route path="/databricks"     element={<Databricks />}     />
          <Route path="/storage"        element={<Storage />}        />
          <Route path="/virtual-machines" element={<VirtualMachine />} />
          <Route path="/app-services"   element={<AppServices />}    />
          <Route path="/others"         element={<Others />}         />
          {/* Add more routes here as pages are built */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;