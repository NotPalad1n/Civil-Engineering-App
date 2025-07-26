interface FormPoutreProps {
  formData: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  errorMessage: string | null;
}

export default function FormPreDimPoutre({ formData, onChange, onSubmit, errorMessage }: FormPoutreProps) {
  const inputClass = 'w-full border border-gray-300 rounded px-3 py-2 h-10 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none';
  const selectClass = 'w-full border border-gray-300 rounded px-3 py-2 h-10 bg-white text-gray-800';

  return (
    <form onSubmit={onSubmit} className="flex-1 space-y-4">

        <div>
            <label className="block mb-1">Longueur (m)</label>
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
            <label className="block mb-1">Forme de la poutre</label>
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
            <label className="block mb-1">Type de chargement</label>
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
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md transition"
        >
            Calculer
        </button>

        {errorMessage && <p className="mt-4 text-red-600 text-center">{errorMessage}</p>}
    </form>
  );
}
