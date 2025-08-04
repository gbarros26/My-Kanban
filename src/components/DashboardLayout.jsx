// src/components/DashboardLayout.jsx
import Header from './Header';
import Sidebar from './Sidebar';
import Main from './Main';

export default function DashboardLayout({ pacientes, convenios }) {
  return (
    <>
      <Header />
      <div className="content flex">
        <Sidebar pacientes={pacientes} />
        <Main pacientes={pacientes} convenios={convenios} />
      </div>
    </>
  );
}
