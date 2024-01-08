import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserTable from "./components/UserTable/UserTable";
import CreateUser from "./components/CreateUser/CreateUser";
import EditUser from "./components/EditUser/EditUser";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserTable />} />
          <Route path="/create" element={<CreateUser />} />
          <Route path="/edit/:id" element={<EditUser />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
