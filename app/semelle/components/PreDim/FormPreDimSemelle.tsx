interface FormSemelleProps {
  formData: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  errorMessage: string | null;
}

export default function FormPreDimSemelle({ formData, onChange, onSubmit, errorMessage }: FormSemelleProps) {
  const inputClass = 'w-full border border-gray-300 rounded px-3 py-2 h-10 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none';
  // const selectClass = 'w-full border border-gray-300 rounded px-3 py-2 h-10 bg-white text-gray-800';

  return (
    <form onSubmit={onSubmit} className="flex-1 space-y-4">

      <div className="grid grid-cols-2 gap-4">

        <div>
          <label className="block mb-1">Largeur Poteau a (cm)</label>
          <input
            type="number"
            inputMode="decimal"
            name="largeurPoteau"
            value={formData.largeurPoteau}
            onChange={onChange}
            className={inputClass}
          />
        </div>

        <div>
          <label className="block mb-1">Longueur Poteau b (cm)</label>
          <input
            type="number"
            inputMode="decimal"
            name="longueurPoteau"
            value={formData.longueurPoteau}
            onChange={onChange}
            className={inputClass}
          />
        </div>

      </div>

      <div>
        <label className="block mb-1">
          Contrainte admissible du sol σ<sub>ser</sub> (MPa)
        </label>
        <input
          type="number"
          inputMode="decimal"
          name="contrainte"
          value={formData.contrainte}
          onChange={onChange}
          className={inputClass}
        />
      </div>

      <div>
        <label className="block mb-1">
          Effort service N<sub>ser</sub> (kN)
        </label>
        <input
          type="number"
          inputMode="decimal"
          name="Nser"
          value={formData.Nser}
          onChange={onChange}
          className={inputClass}
        />
      </div>

      <button
          type="submit"
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md transition cursor-pointer"
      >
          Calculer
      </button>

      {errorMessage && <p className="mt-4 text-red-600 text-center">{errorMessage}</p>}
    </form>
  );
}
