// PAGES
import { Home } from "./pages/Home/Home";
import { NotFound } from "./pages/NotFound/NotFound";

// USERPAGES
import { Login } from "./pages/UserPages/Login/Login";
import { Register } from "./pages/UserPages/Register/Register";
import { Perfil } from "./pages/UserPages/Perfil/Perfil";
import { Edit } from "./pages/UserPages/Edit/Edit";
import { Delete } from "./pages/UserPages/Delete/Delete";

// CARPAGES
import { CarView } from "./pages/CarPages/CarView/CarView";
import { InsertCar } from "./pages/CarPages/InsertCar/InsertCar";
import { DeleteCar } from "./pages/CarPages/DeleteCar/DeleteCar";
import { MyCars } from "./pages/CarPages/MyCars/MyCars";

// COMPONENTS
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { Container } from "./components/Container/Container";

// LIB'S
import { 
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
    <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    <Container>
      <div className="invisible"></div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* USER */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/users/:id" element={<Perfil />} />
        <Route path="/users/edit/:id" element={<Edit />} />
        <Route path="/users/delete/:id" element={<Delete />} />
        {/* CAR */}
        <Route path="/cars/:id" element={<CarView />} />
        <Route path="/cars/insert" element={<InsertCar />} />
        <Route path="/cars/delete/:id" element={<DeleteCar />} />
        <Route path="/cars/mycars" element={<MyCars />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Footer />
      </Container>
    </BrowserRouter>
  );
}

export default App;
