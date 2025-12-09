import { CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';

import LandingPage from './pages/landingPage/LandingPage';
import UserCrudController from './pages/userRegister/UserCrudController';
import UserList from './pages/userList/UserList';

export default function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <div className="app-background">
        <Header />
        <div className="app-content">
          <div className="app-container">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/cadastrar" element={<UserCrudController />} />
              <Route path="/listar" element={<UserList />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
