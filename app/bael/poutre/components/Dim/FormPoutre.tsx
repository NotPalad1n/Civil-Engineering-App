interface FormPoutreProps {
  formData: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function FormPoutre({ formData, onChange, onSubmit }: FormPoutreProps) {
  const inputClass = 'w-full border border-slate-300 dark:border-slate-700 rounded px-3 py-2 h-10 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-200 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none';
  const selectClass = 'w-full border border-slate-300 dark:border-slate-700 rounded px-3 py-2 h-10 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-200 cursor-pointer';
  const labelClass = 'block mb-1 text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors duration-300';

  return (
    <form onSubmit={onSubmit} className="flex-1 space-y-4">

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Largeur b (cm)</label>
          <input
            type="number"
            inputMode="decimal"
            name="largeur"
            value={formData.largeur}
            onChange={onChange}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Hauteur h (cm)</label>
          <input
            type="number"
            inputMode="decimal"
            name="hauteur"
            value={formData.hauteur}
            onChange={onChange}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Type de fissuration</label>
        <select
          name="fissuration"
          value={formData.fissuration}
          onChange={onChange}
          className={selectClass}
        >
          <option value="peu nuisible">Peu nuisible</option>
          <option value="prejudiciable">Préjudiciable</option>
          <option value="tres prejudiciable">Très préjudiciable</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>
            Moment ultime M<sub>u</sub> (kN m)
          </label>
          <input
            type="number"
            inputMode="decimal"
            name="Mu"
            value={formData.Mu}
            onChange={onChange}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>
            Moment service M<sub>ser</sub> (kN m)
          </label>
          <input
            type="number"
            inputMode="decimal"
            name="Mser"
            value={formData.Mser}
            onChange={onChange}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>
          Effort ultime V<sub>u</sub> (kN)
        </label>
        <input
          type="number"
          inputMode="decimal"
          name="Vu"
          value={formData.Vu}
          onChange={onChange}
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>
            Résistance du béton f<sub>c28</sub> (MPa)
          </label>
          <input
            type="number"
            inputMode="decimal"
            name="fc28"
            value={formData.fc28}
            onChange={onChange}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>
            Résistance de l’acier f<sub>e</sub> (MPa)
          </label>
          <select
            name="fe"
            value={formData.fe}
            onChange={onChange}
            className={selectClass}
          >
            <option value="400">400</option>
            <option value="500">500</option>
          </select>
        </div>
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
