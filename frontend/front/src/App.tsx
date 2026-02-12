import { useEffect, useState } from "react";
import AgendamentoForm from "./components/AgendamentoForm";


type Agendamento = {
  id?: number;
  servico: string;
  profissional: string;
  dataHoraAgendamento: string;
  cliente: string;
  telefoneCliente: string;
};

function App() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [editAgendamento, setEditAgendamento] = useState<Agendamento | null>(null);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/agendamentos`)
      .then(res => res.json())
      .then(setAgendamentos);
  }, []);

  function addAgendamento(data: Omit<Agendamento, "id">) {
    fetch(`${API_URL}/agendamentos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(newAgendamento => setAgendamentos([...agendamentos, newAgendamento]));
  }

  function deleteAgendamento(a: Agendamento) {
  fetch(
    `${API_URL}/agendamentos/${a.id}`,
    { method: "DELETE" }
  ).then(res => {
    if (res.ok) {
      setAgendamentos(agendamentos.filter(item => item.id !== a.id));
    } else {
      alert("Erro ao deletar no backend.");
    }
  });
}

  function updateAgendamento(data: Agendamento) {
  fetch(`${API_URL}/agendamentos`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then(res => res.json())
    .then(updated => {
      setAgendamentos(agendamentos.map(a => a.id === updated.id ? updated : a));
      setEditAgendamento(null);
    });
}

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Agendador de Horários</h1>
        <AgendamentoForm
    onAdd={editAgendamento ? updateAgendamento : addAgendamento}
    initialData={editAgendamento}
    />
      <ul className="w-full max-w-xl">
  {agendamentos.map(a => (
    <li
      key={a.id}
      className="bg-white p-4 rounded shadow mb-4 flex flex-col md:flex-row md:items-center md:justify-between"
    >
      <div className="flex-1">
        <span className="font-semibold">{a.servico}</span>
        <span className="text-gray-500 ml-2">({a.profissional})</span>
        <div className="text-sm text-gray-600 mt-1">
          <span>Cliente: {a.cliente}</span> | <span>Telefone: {a.telefoneCliente}</span>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-4 mt-4 md:mt-0">
        <div className="text-blue-600 font-mono text-lg bg-blue-100 px-3 py-1 rounded mb-2 md:mb-0">
          {a.dataHoraAgendamento
            ? new Date(a.dataHoraAgendamento).toLocaleString("pt-BR", {
                dateStyle: "short",
                timeStyle: "short",
              })
            : "-"}
        </div>
        <div className="flex gap-2">
          <button
            className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
            onClick={() => setEditAgendamento(a)}
          >
            Editar
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
            onClick={() => deleteAgendamento(a)}
          >
            Deletar
          </button>
        </div>
      </div>
    </li>
  ))}
</ul>
    </div>
  );
}

export default App;