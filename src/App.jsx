import { Route, Routes } from "react-router-dom";
import UserPage from "./pages/UserPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import CreatePage from "./pages/CreatePage";
import { Toaster } from "react-hot-toast";
import ListsPage from "./pages/ListsPage";
import UpdatePage from "./pages/UpdatePage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/dashboard/lists" element={<ListsPage />} />
        <Route path="/dashboard/create" element={<CreatePage />} />
        <Route path="/dashboard/update/:id" element={<UpdatePage />} />
        <Route path="/User/login" element={<LoginPage />} />
        <Route path="/User" element={<UserPage />} />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;
