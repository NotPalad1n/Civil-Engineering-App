import { useState } from 'react';

interface CorrelationFormProps {
  formData: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  errorMessage: string | null;
}

export default function FormCohesionND({ formData, onChange, onSubmit, errorMessage }: CorrelationFormProps) {
  const inputClass =
    'w-full border border-gray-300 rounded px-3 py-2 h-10 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none';
  const selectClass = 'w-full border border-gray-300 rounded px-3 py-2 h-10 bg-white text-gray-800';

  const [correlationType, setCorrelationType] = useState('Pl1');

  const handleCorrelationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    
    const value = e.target.value;

    if (value === 'Pl1') {
      setCorrelationType('Pl1');
    } else if (value === 'Pl2') {
      setCorrelationType('Pl2');
    } else if (value === 'IC') {
      setCorrelationType('IC');
    }

    onChange(e); // still pass the event up
  };

  return (
    <form onSubmit={onSubmit} className="flex-1 space-y-4">

      <div>
        <label className="block mb-1">Corrélations</label>
        <select
          name="correlation"
          value={formData.correlation}
          onChange={handleCorrelationChange}
          className={selectClass}
        >
          <option value="Pl1">À partir de Pl de Menard - (Cassan 1988)</option>
          <option value="Pl2">À partir de Pl de Menard - (Baguelin et Jezequez 1972)</option>
          <option value="IC">À partir de l’indice de consistance - IC (Peck ??)</option>
        </select>
      </div>

      {correlationType === 'Pl1' && (
        <div>
          <label className="block mb-1">Pl (kPa)</label>
          <input
            type="number"
            inputMode="decimal"
            name="Pl1"
            value={formData.Pl1 || ''}
            onChange={onChange}
            className={inputClass}
          />
        </div>
      )}

      {correlationType === 'Pl2' && (
        <div>
          <label className="block mb-1">Pl (kPa)</label>
          <input
            type="number"
            inputMode="decimal"
            name="Pl2"
            value={formData.Pl2 || ''}
            onChange={onChange}
            className={inputClass}
          />
        </div>
      )}

      {correlationType === 'IC' && (
        <div>
          <label className="block mb-1">IC (%)</label>
          <input
            type="number"
            inputMode="decimal"
            name="IC"
            value={formData.IC || ''}
            onChange={onChange}
            className={inputClass}
          />
        </div>
      )}

      <button
        type="submit"
        className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md transition font-semibold cursor-pointer "
      >
        Calculer
      </button>

      {errorMessage && <p className="mt-4 text-red-600 text-center">{errorMessage}</p>}
    </form>
  );
}
