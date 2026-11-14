interface FormSemelleProps {
  formData: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function FormPreDimSemelle({ formData, onChange, onSubmit}: FormSemelleProps) {
  const inputClass = 'w-full border border-slate-300 dark:border-slate-700 rounded px-3 py-2 h-10 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-200 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none';
  const labelClass = 'block mb-1 text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors duration-300';

  return (
    <form onSubmit={onSubmit} className="flex-1 space-y-4">

      <div className="grid grid-cols-2 gap-4">

        <div>
          <label className={labelClass}>Largeur du Poteau a (cm)</label>
          <input
            type="number"
            step="any"
            inputMode="decimal"
            name="largeurPoteau"
            value={formData.largeurPoteau}
            onChange={onChange}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Longueur du Poteau b (cm)</label>
          <input
            type="number"
            step="any"
            inputMode="decimal"
            name="longueurPoteau"
            value={formData.longueurPoteau}
            onChange={onChange}
            className={inputClass}
          />
        </div>

      </div>

      <div>
        <label className={labelClass}>
          Contrainte admissible du sol σ<sub>ser</sub> (MPa)
        </label>
        <input
          type="number"
          step="any"
          inputMode="decimal"
          name="contrainte"
          value={formData.contrainte}
          onChange={onChange}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>
          Effort service N<sub>ser</sub> (kN)
        </label>
        <input
          type="number"
          step="any"
          inputMode="decimal"
          name="Nser"
          value={formData.Nser}
          onChange={onChange}
          className={inputClass}
        />
      </div>

      <button
          type="submit"
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md transition font-semibold cursor-pointer shadow-sm"
      >
          Calculer
      </button>

    </form>
  );
}
