import { MoreHorizontal, UserPlus, Edit2, Plus } from 'react-feather';
import { useState, useEffect } from 'react';

import DateFilter from './DateFilter';
import ProcedimentoFilter from './ProcedimentoFilter';

export default function Main({ convenios, pacienteSelecionado, procedimentos }) {
  const [columns, setColumns] = useState([
   
    { id: 'agendados', title: 'AGENDADOS', cards: [] },
    { id: 'a_atender', title: 'A ATENDER', cards: [] },
    { id: 'atendidos', title: 'ATENDIDOS', cards: [] },
    { id: 'cancelado', title: 'CANCELADOS', cards: [] },
  ]);
    // PACIENTE2 É O PACIENTE CERTO E PACIENTE É O NOME DO COOPERADO, ISSO PRECISA SER CORRIGIDO
  const [showModal, setShowModal] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [form, setForm] = useState({
    paciente: '',
    paciente2: '',
    convenio: '',
    horario: '',
    status: 'agendados'
  });

  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleConfirm = () => {
    if (!pacienteSelecionado) {
      alert("Selecione um cooperado antes de adicionar um card.");
      return;
    }

    const newCard = {
      id: editingCard ? editingCard.id : Date.now(),
      text: `Paciente: ${form.paciente2}  | Convênio: ${form.convenio} | Horário: ${form.horario}`,
      date: selectedDate,
      pacienteId: pacienteSelecionado.id,
    };

    if (editingCard) {
      // Atualiza card existente
      setColumns((prev) =>
        prev.map((col) => ({
          ...col,
          cards: col.cards.filter((c) => c.id !== editingCard.id).concat(col.id === form.status ? [newCard] : []),
        }))
      );
    } else {
      // Adiciona novo card
      setColumns((prev) =>
        prev.map((col) =>
          col.id === form.status
            ? { ...col, cards: [...col.cards, newCard] }
            : col
        )
      );
    }

    setShowModal(false);
    setEditingCard(null);
    setForm({ paciente: '', convenio: '', horario: '', status: 'a_atender' });
  };

  const handleCardClick = (card, columnId) => {
    const [paciente2, convenio, horario] = card.text
      .split(' | ')
      .map((str) => str.trim())
      .map((str) => {
        if (str.startsWith('Paciente: ')) return str.replace('Paciente: ', '');
        if (str.startsWith('Convênio: ')) return str.replace('Convênio: ', '');
        if (str.startsWith('Horário: ')) return str.replace('Horário: ', '');
        return str;
      });

    setEditingCard(card);
    setForm({ paciente: '', paciente2, convenio, horario, status: columnId });
    setShowModal(true);
  };

  // Auto-preencher o nome do cooperado quando for selecionado no Sidebar
  useEffect(() => {
    if (pacienteSelecionado) {
      setForm((prev) => ({
        ...prev,
        paciente: pacienteSelecionado.nome,
      }));
    }
  }, [pacienteSelecionado]);

  return (

  <>

  <div className="flex flex-col bg-gray-100 w-full h-[calc(100vh-3rem)] relative text-black">
    {/* Header */}
    <div className="p-3 bg-[#1d2125] text-white flex justify-between items-center w-full">

      {/* Esquerda: título */}
      <h2 className="text-lg">{pacienteSelecionado ? pacienteSelecionado.nome : 'Selecione um cooperado'}</h2>

      {/* Direita: filtro de data e botões */}
      <div className="flex items-center space-x-4">
        <DateFilter selectedDate={selectedDate} onDateChange={setSelectedDate} />
        
        {/* <button className="bg-white text-gray-800 px-3 py-1 mr-2 rounded hover:bg-gray-300 flex items-center">
          <UserPlus size={16} className="mr-2" /> Share
        </button> */}
        {/* <button className="hover:bg-gray-700 px-2 py-1 rounded">
          <MoreHorizontal size={16} />
        </button> */}
      </div>

    </div>



      {/* Kanban Columns */}
      <div className="flex justify-center flex-grow p-4 space-x-4 bg-gray-200">
        {columns.map((column) => (
  <div key={column.id} className="w-80 bg-white rounded-md p-3 shadow flex flex-col">
    
    {/* Cabeçalho da coluna */}
    <div className="flex justify-between items-center mb-2 border-b pb-1">
      <h3 className="font-semibold">{column.title}</h3>
      <button className="hover:bg-gray-200 p-1 rounded-sm">
        <MoreHorizontal size={16} />
      </button>
    </div>

    <div className="overflow-y-auto space-y-2" style={{ maxHeight: 'calc(100vh - 12rem)' }}>
      {column.cards
        .filter((card) =>(!card.date || card.date === selectedDate) &&
            (!pacienteSelecionado || card.pacienteId === pacienteSelecionado.id)
        )
        .map((card) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card, column.id)}
            className="bg-gray-200 text-black p-2 rounded-md flex justify-between items-center hover:bg-gray-300 cursor-pointer"
          >
            <span className="text-sm">{card.text}</span>
            <Edit2 size={14} />
          </div>
      ))}
    </div>
  </div>
))}
      </div>

      {/* Button p/ add card*/}
      <button
        onClick={() => {

          setEditingCard(null);
          setForm({ paciente: pacienteSelecionado.nome, convenio: '', horario: '', status: 'a_atender' });
          setShowModal(true);
        }}
        className="absolute bottom-4 right-4 bg-[#008d4c] hover:bg-green-700 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg"
        title="Adicionar"
      >
        <Plus size={24} />
      </button>

      {/* Modal p/ add card */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-md w-[600px] text-black shadow-lg">
            <h3 className="text-lg font-semibold mb-4">{editingCard ? 'Atendimento' : 'Novo Atendimento'}</h3>

            <div className="space-y-3">
              <input type="hidden" name="paciente" onChange={handleChange} value={form.paciente}/>
              <input type="text" name="paciente2" placeholder="Paciente"  onChange={handleChange} value={form.paciente2 || ""} className="w-full px-3 py-2 border border-gray-300 rounded"  />
              <select name="convenio" value={form.convenio} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded">
                <option value="">Selecione um convênio</option>
                {convenios.map((c) => (
                  <option key={c.id} value={c.nome}>
                  {c.razao_social}
                  </option>
                ))}
              </select>
              <input type="time" name="horario" placeholder="Horário" value={form.horario} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded" />
              <ProcedimentoFilter procedimentos={procedimentos} value={form.procedimentoCodigo} onChange={(val) => setForm((prev) => ({ ...prev, procedimentoCodigo: val }))} />
              <select name="status" value={form.status} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded">
                {columns.map((col) => (
                  <option key={col.id} value={col.id}>
                    {col.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingCard(null);
                }}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 rounded text-white"
                style={{ backgroundColor: '#008d4c' }}
              >
                Confirmar
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  </>
  );
  
}
