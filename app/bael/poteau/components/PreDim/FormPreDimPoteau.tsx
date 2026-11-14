interface FormPoteauProps {
  formData: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function FormPreDimPoteau({ formData, onChange, onSubmit}: FormPoteauProps) {

  const inputClass = 'w-full border border-slate-300 dark:border-slate-700 rounded px-3 py-2 h-10 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-200 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none';

  return (
    <form onSubmit={onSubmit} className="flex-1 space-y-4">

      <div>
          <label className="block mb-1 text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors duration-300">
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

      <div>
        <label className="block mb-1 text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors duration-300">
          Largeur du poteau a (cm)
        </label>
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

      <button
          type="submit"
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md transition font-semibold cursor-pointer shadow-sm"
      >
          Calculer
      </button>

    </form>
  );
}
