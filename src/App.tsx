// import axios from "axios";
import "./App.css";
import AppRouter from "./routers/AppRouter";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;
