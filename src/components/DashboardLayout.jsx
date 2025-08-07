import Header from './Header';
import Sidebar from './Sidebar';
import Main from './Main';
import { useState } from 'react';

export default function DashboardLayout({ pacientes, convenios, procedimentos }) {
  const [pacienteSelecionado, setPacienteSelecionado] = useState(null);

  const handlePacienteSelect = (paciente) => {
    setPacienteSelecionado(paciente);
  };

  return (
    <>
      <Header />
      <div className="content flex">
        <Sidebar pacientes={pacientes} onPacienteSelect={handlePacienteSelect} />
        <Main pacientes={pacientes} convenios={convenios} pacienteSelecionado={pacienteSelecionado} procedimentos={procedimentos}/>
      </div>
    </>
  );
}
