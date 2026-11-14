interface FormPoteauProps {
  formData: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function FormPoteau({ formData, onChange, onSubmit}: FormPoteauProps) {
  const inputClass = 'w-full border border-slate-300 dark:border-slate-700 rounded px-3 py-2 h-10 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-200 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none';
  const selectClass = 'w-full border border-slate-300 dark:border-slate-700 rounded px-3 py-2 h-10 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-200 cursor-pointer';
  const labelClass = 'block mb-1 text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors duration-300';

  return (
    <form onSubmit={onSubmit} className="flex-1 space-y-4">
      
      <div>
        <label className={labelClass}>Hauteur du poteau h (m)</label>
        <input
          type="number"
          step="any"
          inputMode="decimal"
          name="hauteurPoteau"
          value={formData.hauteurPoteau}
          onChange={onChange}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Coefficient de flambement</label>
        <select
          name="facteurFlambement"
          value={formData.facteurFlambement}
          onChange={onChange}
          className={selectClass}
        >
          <option value="2">Encastré - libre (2)</option>
          <option value="1">Articulé - Articulé (1)</option>
          <option value="0.707">Encastré - Articulé (0.707)</option>
          <option value="0.5">Encastré - Encastré (0.5)</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">

        <div>
          <label className={labelClass}>Largeur a (cm)</label>
          <input
            type="number"
            step="any"
            inputMode="decimal"
            name="largeur"
            value={formData.largeur}
            onChange={onChange}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Longueur b (cm)</label>
          <input
            type="number"
            step="any"
            inputMode="decimal"
            name="longueur"
            value={formData.longueur}
            onChange={onChange}
            className={inputClass}
          />
        </div>

      </div>

      <div>
        <label className={labelClass}>
          Effort normal N<sub>u</sub> (kN)
        </label>
        <input
          type="number"
          step="any"
          inputMode="decimal"
          name="Nu"
          value={formData.Nu}
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
            step="any"
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

      <div>
        <label className={labelClass}>Dispositions sismiques</label>
        <select
          name="dispositionSismique"
          value={formData.dispositionSismique || 'aucun'}
          onChange={onChange}
          className={selectClass}
        >
          <option value="aucun">Aucun</option>
          <option value="rps2011">RPS 2011</option>
        </select>
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
