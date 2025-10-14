'use client';
import ListeArmatures from './ListeArmatures';

interface ElementData {
  id: string;
  nombre: string;
  diametre: string;
}

interface FormPoteauProps {
  formData: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  errorMessage: string | null;
  elements: ElementData[];                      // 🔹 new
  setElements: (updated: ElementData[]) => void; // 🔹 new
}

export default function FormFerrPoteau({ formData, onChange, onSubmit, errorMessage, elements, setElements, }: FormPoteauProps) {

  const inputClass = 'w-full border border-gray-300 rounded px-3 py-2 h-10 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none';
  // const selectClass = 'w-full border border-gray-300 rounded px-3 py-2 h-10 bg-white text-gray-800';

  return (
    <form onSubmit={onSubmit} className="flex-1 space-y-4">

      <div>
          <label className="block mb-1">Section nécessaire A<sub>s</sub> (cm²)</label>
          <input
          type="number"
          inputMode="decimal"
          name="As"
          value={formData.As}
          onChange={onChange}
          className={inputClass}
          />
      </div>

      <p className="block mb-1">Armatures</p>

      <ListeArmatures
        elements={elements}
        setElements={setElements}
      />

      <button
          type="submit"
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md transition font-semibold cursor-pointer"
      >
          Calculer
      </button>

      {errorMessage && <p className="mt-4 text-red-600 text-center">{errorMessage}</p>}
    </form>
  );
}
