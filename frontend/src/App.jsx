// PAGES
import { Home } from "./pages/Home/Home";
import { NotFound } from "./pages/NotFound/NotFound";

// USERPAGES
import { Login } from "./pages/UserPages/Login/Login";
import { Register } from "./pages/UserPages/Register/Register";

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

function App() {
  return (
    <BrowserRouter>
    <Container>
      <Header />
      <ToastContainer
        position="top-left"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Footer />
      </Container>
    </BrowserRouter>
  );
}

export default App;
