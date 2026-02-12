import { useEffect, useState } from "react";



type Agendamento = {
  servico: string;
  profissional: string;
  dataHoraAgendamento: string;
  cliente: string;
  telefoneCliente: string;
};

type AgendamentoFormProps = {
  onAdd: (data: Agendamento) => void;
  initialData?: Agendamento | null;
};

function formatDatetimeLocal(dateStr: string) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  // Ajuste para o formato yyyy-MM-ddTHH:mm
  return date.toISOString().slice(0, 16);
}

function AgendamentoForm({ onAdd, initialData }: AgendamentoFormProps) {
  const [form, setForm] = useState<Agendamento>(
    initialData || {
    servico: "",
    profissional: "",
    dataHoraAgendamento: "",
    cliente: "",
    telefoneCliente: "",
  });

   useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,
        dataHoraAgendamento: formatDatetimeLocal(initialData.dataHoraAgendamento),
      });
    }
  }, [initialData]); 

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onAdd(form);
    setForm({
      servico: "",
      profissional: "",
      dataHoraAgendamento: "",
      cliente: "",
      telefoneCliente: "",
    });
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mb-6 w-full max-w-xl">
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2" htmlFor="servico">Serviço</label>
        <input
          name="servico"
          id="servico"
          placeholder="Serviço"
          value={form.servico}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2" htmlFor="profissional">Profissional</label>
        <input
          name="profissional"
          id="profissional"
          placeholder="Profissional"
          value={form.profissional}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2" htmlFor="dataHoraAgendamento">Data e Hora</label>
        <input
          name="dataHoraAgendamento"
          id="dataHoraAgendamento"
          type="datetime-local"
          value={form.dataHoraAgendamento}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2" htmlFor="cliente">Cliente</label>
        <input
          name="cliente"
          id="cliente"
          placeholder="Cliente"
          value={form.cliente}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2" htmlFor="telefoneCliente">Telefone</label>
        <input
          name="telefoneCliente"
          id="telefoneCliente"
          placeholder="Telefone"
          value={form.telefoneCliente}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition"
      >
        {initialData ? "Atualizar Agendamento" : "Adicionar Agendamento"}
      </button>
    </form>
  );
}

export default AgendamentoForm;