import { useState } from 'react';
import logo from '../assets/coopanest2021.png';

export default function Login({ onLoginSuccess }) {
  const [form, setForm] = useState({ usuario: '', senha: '' });
  const [erro, setErro] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro(null);
    setLoading(true);

    try {
      const res = await fetch('http://localhost/syscoopanestpe/public/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: form.usuario, password: form.senha }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Erro ao fazer login');
      }

      const data = await res.json();

      localStorage.setItem('token', data.token);
     // alert(`Bem-vindo, ${form.usuario}! Token salvo no localStorage.`);

      onLoginSuccess();

    } catch (error) {
      setErro(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#008d4c]">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md min-h-[500px] flex flex-col justify-center items-center">
       <img src={logo} alt="Logo" className="w-[300px] h-auto mb-6" />

        {erro && <p className="text-red-600 mb-4 text-center">{erro}</p>}

        <form onSubmit={handleLogin} className="space-y-4 w-full">
          <div>
            <label className="block text-gray-600 mb-1">Usuário</label>
            <input
              type="text"
              name="usuario"
              value={form.usuario}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded text-black"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Senha</label>
            <input
              type="password"
              name="senha"
              value={form.senha}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded text-black"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#008d4c] hover:bg-[#27662b] text-white font-semibold py-2 rounded"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}
