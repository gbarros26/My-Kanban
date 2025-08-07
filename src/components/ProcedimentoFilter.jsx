import { useEffect, useState } from "react";
import Select from "react-select";

export default function ProcedimentoFilter({ procedimentos, value, onChange }) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    // Mapeia todos os procedimentos para o formato do react-select
    const opts = procedimentos.map((proc) => ({
      value: proc.codigo,
      label: `${proc.codigo} - ${proc.nome}`,
    }));
    setOptions(opts);

    // Se não tiver valor definido e existir pelo menos 1 procedimento, seleciona o primeiro
    if (!value && opts.length > 0) {
      onChange(opts[0].value);
    }
  }, [procedimentos]);

  const selectedOption = options.find((opt) => opt.value === value) || null;

  return (
    <div>
      <Select
        options={options}
        value={selectedOption}
        onChange={(option) => onChange(option ? option.value : "")}
        isDisabled={false}
        classNamePrefix="react-select"
      />
    </div>
  );
}
