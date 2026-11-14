import { useState } from 'react';

interface CorrelationFormProps {
  formData: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  errorMessage: string | null;
}

export default function FormAngleFrottement({ formData, onChange, onSubmit, errorMessage }: CorrelationFormProps) {
  const inputClass =
    'w-full border border-slate-300 dark:border-slate-700 rounded px-3 py-2 h-10 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-200 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none';
  const selectClass = 'w-full border border-slate-300 dark:border-slate-700 rounded px-3 py-2 h-10 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-200 cursor-pointer';
  const labelClass = 'block mb-1 text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors duration-300';

  const [correlationType, setCorrelationType] = useState('Pl');

  const handleCorrelationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCorrelationType(e.target.value === 'Pl' ? 'Pl' : 'Ip');
    onChange(e); // still pass the event up
  };

  return (
    <form onSubmit={onSubmit} className="flex-1 space-y-4">

      <div>
        <label className={labelClass}>Corrélations</label>
        <select
          name="correlation"
          value={formData.correlation}
          onChange={handleCorrelationChange}
          className={selectClass}
        >
          <option value="Pl">À partir de Pl de Menard</option>
          <option value="Ip">À partir de IP - (Fahri 1970)</option>
        </select>
      </div>

      {correlationType === 'Pl' && (
        <div>
          <label className={labelClass}>Pl (kPa)</label>
          <input
            type="number"
            inputMode="decimal"
            name="Pl"
            value={formData.Pl || ''}
            onChange={onChange}
            className={inputClass}
          />
        </div>
      )}

      {correlationType === 'Ip' && (
        <div>
          <label className={labelClass}>Ip (%)</label>
          <input
            type="number"
            inputMode="decimal"
            name="Ip"
            value={formData.Ip || ''}
            onChange={onChange}
            className={inputClass}
          />
        </div>
      )}

      <button
        type="submit"
        className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md transition font-semibold cursor-pointer shadow-sm"
      >
        Calculer
      </button>

      {errorMessage && <p className="mt-4 text-red-600 dark:text-red-400 text-center">{errorMessage}</p>}
    </form>
  );
}
