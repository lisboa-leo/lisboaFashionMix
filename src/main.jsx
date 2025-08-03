import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from "@material-tailwind/react"; 
import { AuthProvider } from './contexts/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </ThemeProvider>
);
