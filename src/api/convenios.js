import { useEffect, useState } from 'react';

export function useConvenios() {
  const [convenios, setConvenios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    fetch('http://localhost/syscoopanestpe/public/api/convenios', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer 6Qcis30pwJmGOd76pOfvNoL7OuQiCpOqImSbslm6AjGj8NM8FshyFVM6E1yz',
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Erro: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setConvenios(data);
        setLoading(false);
      })
      .catch((error) => {
        setErro(error.message);
        setLoading(false);
      });
  }, []);

  return { convenios, loading, erro };
}
