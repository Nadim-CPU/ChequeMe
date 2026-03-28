import { createRoot } from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import './styles/base.css';
import App from './app/App';
import 'bootstrap/dist/css/bootstrap.min.css';


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
  ,
)
