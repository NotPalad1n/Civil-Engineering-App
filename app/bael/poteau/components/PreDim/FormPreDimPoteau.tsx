interface FormPoteauProps {
  formData: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function FormPreDimPoteau({ formData, onChange, onSubmit}: FormPoteauProps) {

  const inputClass = 'w-full border border-gray-300 rounded px-3 py-2 h-10 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none onWheel={(e) => e.currentTarget.blur()}';

  return (
    <form onSubmit={onSubmit} className="flex-1 space-y-4">

      <div>
          <label className="block mb-1">Effort normal N<sub>u</sub> (kN)</label>
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
        <label className="block mb-1">Largeur du poteau a (cm)</label>
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
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md transition font-semibold cursor-pointer"
      >
          Calculer
      </button>

    </form>
  );
}
