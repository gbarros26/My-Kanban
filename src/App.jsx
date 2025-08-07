import './App.css';

import DashboardLayout from './components/DashboardLayout';
import Login from './components/Login';

import { usePacientes } from './api/pacientes';
import { useConvenios } from './api/convenios'; //
import { useProcedimentos } from './api/procedimentos';


import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const { pacientes, loading, erro } = usePacientes();
  const { convenios, loading: loadingConvenios, erro: erroConvenios } = useConvenios();
  const { procedimentos, loading: loadingProced, erro: erroProced } = useProcedimentos();

  // DEBUG
  // if (loading || loadingConvenios) { return <div className="text-white p-4">Carregando convênios...</div>; }
  // if (erroConvenios) { return <div className="text-red-500 p-4">Erro ao carregar convênios: {erroConvenios}</div>; }
  
  // if (loading) return <div className="text-white p-4">Carregando pacientes...</div>;
  // if (erro) return <div className="text-red-500 p-4">Erro: {erro}</div>;

  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={ isAuthenticated ? <Navigate to="/dashboard" /> : <Login onLoginSuccess={handleLoginSuccess} /> } />
          <Route path="/dashboard" element={
              isAuthenticated ? (
                <DashboardLayout pacientes={pacientes} convenios={convenios}  procedimentos={procedimentos} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/" element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
