import { ChevronRight, ChevronLeft, Plus } from 'react-feather';
import { useState } from 'react';

export default function Sidebar({ pacientes }) {
  const [collapsed, setCollapsed] = useState(false);
  const [boards, setBoards] = useState([{ id: 1, name: 'Cooperado' }]);
  const [showSelect, setShowSelect] = useState(false);
  const [selectedPacienteId, setSelectedPacienteId] = useState('');

  const handleAddBoard = () => {
    const pacienteSelecionado = pacientes.find(p => p.id == selectedPacienteId);
    if (pacienteSelecionado) {
      const newBoard = {
        id: Date.now(),
        name: pacienteSelecionado.nome,
      };
      setBoards([...boards, newBoard]);
      setShowSelect(false);
      setSelectedPacienteId('');
    }
  };

  return (
    <>
      <div
        className={`bg-[#1d2125] h-[calc(100vh-3rem)] border-r border-r-[#9fadbc29] transition-all linear duration-500 flex-shrink-0 ${
          collapsed ? 'w-[40px]' : 'w-[280px]'
        }`}
      >
        {collapsed ? (
          <div>
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hover:bg-slate-600 rounded-sm"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        ) : (
          <div>
            <div className="workspac p-3 flex justify-between border-b border-b-[#9fadbc29]">
              <h4>Cooperados</h4>
              <button
                onClick={() => setCollapsed(!collapsed)}
                className="hover:bg-slate-600 rounded-sm p-1"
              >
                <ChevronLeft size={18} />
              </button>
            </div>
            <div className="boarlist">
              <div className="flex justify-between px-3 py-2">
                <h6>Meus Quadros</h6>
                <button
                  className="hover:bg-slate-600 p-1 rounded-sm"
                  onClick={() => setShowSelect(!showSelect)}
                >
                  <Plus size={16} />
                </button>
              </div>

              {showSelect && (
                <div className="px-3 py-2">
                  <select
                    className="w-full p-1 rounded text-black"
                    value={selectedPacienteId}
                    onChange={(e) => setSelectedPacienteId(e.target.value)}
                  >
                    <option value="">Selecione um cooperado</option>
                    {pacientes.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.nome}
                      </option>
                    ))}
                  </select>
                  <button
                    className="mt-2 w-full bg-blue-600 text-white py-1 rounded hover:bg-blue-700"
                    style={{ backgroundColor: '#008d4c' }}
                    onClick={handleAddBoard}
                    disabled={!selectedPacienteId}
                  >
                    Adicionar
                  </button>
                </div>
              )}
            </div>

            <ul>
            {boards.map((board) => (
              <li key={board.id}>
                <button className="px-3 py-2 w-full text-sm flex justify-start items-center hover:bg-gray-500">
                  <span className="w-6 h-4 rounded-sm mr-2 bg-red-600">&nbsp;</span>
                  <span>{board.name}</span>
                </button>
              </li>
            ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
