interface FormPoteauProps {
  formData: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  errorMessage: string | null;
}

export default function FormPoteau({ formData, onChange, onSubmit, errorMessage }: FormPoteauProps) {
  const inputClass = 'w-full border border-gray-300 rounded px-3 py-2 h-10 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none';
  const selectClass = 'w-full border border-gray-300 rounded px-3 py-2 h-10 bg-white text-gray-800';

  return (
    <form onSubmit={onSubmit} className="flex-1 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">Hauteur du poteau (m)</label>
          <input
            type="number"
            inputMode="decimal"
            name="hauteurPoteau"
            value={formData.hauteurPoteau}
            onChange={onChange}
            className={inputClass}
          />
        </div>
        <div>
          <label className="block mb-1">Facteur de flambement</label>
          <select
            name="facteurFlambement"
            value={formData.facteurFlambement}
            onChange={onChange}
            className={selectClass}
          >
            <option value="2">2</option>
            <option value="1">1</option>
            <option value="0.707">0.707</option>
            <option value="0.5">0.5</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">Longueur (cm)</label>
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
          <label className="block mb-1">Largeur (cm)</label>
          <input
            type="number"
            inputMode="decimal"
            name="largeur"
            value={formData.largeur}
            onChange={onChange}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="block mb-1">
          Effort normal N<sub>u</sub> (kN)
        </label>
        <input
          type="number"
          inputMode="decimal"
          name="Nu"
          value={formData.Nu}
          onChange={onChange}
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">
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
          <label className="block mb-1">
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
        className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md transition"
      >
        Calculer
      </button>

      {errorMessage && <p className="mt-4 text-red-600 text-center">{errorMessage}</p>}
    </form>
  );
}
