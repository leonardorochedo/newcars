// Pages
import { Home } from "./pages/Home/Home";
import { NotFound } from "./pages/NotFound/NotFound";

// UserPages
import { Login } from "./pages/UserPages/Login/Login";
import { Register } from "./pages/UserPages/Register/Register";

// Components
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";

// Lib
import { 
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
