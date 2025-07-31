import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Main from './components/Main';

import { usePacientes } from './api/pacientes';
import { useConvenios } from './api/convenios'; //

function App() {
  const { pacientes, loading, erro } = usePacientes();
  const { convenios, loading: loadingConvenios, erro: erroConvenios } = useConvenios();


  if (loading || loadingConvenios) { return <div className="text-white p-4">Carregando convênios...</div>; }
  if (erroConvenios) { return <div className="text-red-500 p-4">Erro ao carregar convênios: {erroConvenios}</div>; }
  
  if (loading) return <div className="text-white p-4">Carregando pacientes...</div>;
  if (erro) return <div className="text-red-500 p-4">Erro: {erro}</div>;

  return (
    <>
      <Header />
      <div className="content flex">
        <Sidebar pacientes={pacientes} />
        <Main pacientes={pacientes}  convenios={convenios}/>
      </div>
    </>
  );
}

export default App;
