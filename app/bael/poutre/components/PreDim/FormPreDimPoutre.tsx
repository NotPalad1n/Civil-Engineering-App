interface FormPoutreProps {
  formData: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function FormPreDimPoutre({ formData, onChange, onSubmit }: FormPoutreProps) {
  const inputClass = 'w-full border border-slate-300 dark:border-slate-700 rounded px-3 py-2 h-10 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-200 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none';
  const selectClass = 'w-full border border-slate-300 dark:border-slate-700 rounded px-3 py-2 h-10 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-200 cursor-pointer';
  const labelClass = 'block mb-1 text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors duration-300';

  return (
    <form onSubmit={onSubmit} className="flex-1 space-y-4">

        <div>
            <label className={labelClass}>Longueur (m)</label>
            <input
            type="number"
            inputMode="decimal"
            name="longueur"
            value={formData.longueur}
            onChange={onChange}
            className={inputClass}
            />
        </div>

        <div>
            <label className={labelClass}>Forme de la poutre</label>
            <select
            name="forme"
            value={formData.forme}
            onChange={onChange}
            className={selectClass}
            >
            <option value="Isolée">Isolée</option>
            <option value="Continue">Continue</option>
            </select>
        </div>

        <div>
            <label className={labelClass}>Type de chargement</label>
            <select
            name="chargement"
            value={formData.chargement}
            onChange={onChange}
            className={selectClass}
            >
            <option value="CC">Chargée - Chargée</option>
            <option value="CD">Chargée - Dechargée</option>
            <option value="DD">Dechargée - Dechargée</option>
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
