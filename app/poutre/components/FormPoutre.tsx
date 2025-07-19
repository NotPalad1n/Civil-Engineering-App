interface FormPoutreProps {
  formData: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  errorMessage: string | null;
}

export default function FormPoutre({ formData, onChange, onSubmit, errorMessage }: FormPoutreProps) {
  const inputClass = 'w-full border border-gray-300 rounded px-3 py-2 h-10 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none';
  const selectClass = 'w-full border border-gray-300 rounded px-3 py-2 h-10 bg-white text-gray-800';

  return (
    <form onSubmit={onSubmit} className="flex-1 space-y-4">

      <div className="grid grid-cols-2 gap-4">
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
        <div>
          <label className="block mb-1">Hauteur (cm)</label>
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
        <label className="block mb-1">Type de fissuration</label>
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
          <label className="block mb-1">
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
          <label className="block mb-1">
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
        <label className="block mb-1">
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
