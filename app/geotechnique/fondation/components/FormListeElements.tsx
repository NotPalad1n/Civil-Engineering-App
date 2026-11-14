interface ElementData {
  id: string;
  color: string;
  Pl: string;
  Em: string;
  hauteur: string;
}

interface FormListeElementsProps {
  elements: ElementData[];
  setElements: (updated: ElementData[]) => void;
  errorMessage?: string;
}

export default function FormListeElements({
  elements,
  setElements,
  errorMessage,
}: FormListeElementsProps) {
  const fieldClass =
    'flex flex-col items-start justify-center gap-1 w-full';

  const inputClass =
    'w-full border border-slate-300 dark:border-slate-700 rounded px-2 py-1 h-10 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-200 appearance-none';
  const colorInput = 'w-full h-10 border border-slate-300 dark:border-slate-700 rounded bg-white dark:bg-slate-900 cursor-pointer';

  const handleChange = (
    index: number,
    field: keyof ElementData,
    value: string
  ) => {
    const updated = [...elements];
    updated[index][field] = value;
    setElements(updated);
  };

  const handleAddElement = () => {
    const newId = elements.length.toString();
    setElements([
      ...elements,
      { id: newId, color: '#000000', Pl: '', Em: '', hauteur: '' },
    ]);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {elements.map((element, index) => (
          <div
            key={index}
            className="flex gap-4 bg-white dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 p-3 rounded w-full transition-colors duration-200"
          >
            {/* ID */}
            <div className={fieldClass}>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">ID</label>
              <input
                type="text"
                value={element.id}
                readOnly
                className={`${inputClass} bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-center cursor-not-allowed`}
              />
            </div>

            {/* Hauteur */}
            <div className={fieldClass}>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Hauteur (cm)</label>
              <input
                type="number"
                value={element.hauteur}
                onChange={(e) =>
                  handleChange(index, 'hauteur', e.target.value)
                }
                className={inputClass}
              />
            </div>

            {/* Color */}
            <div className={fieldClass}>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Couleur</label>
              <input
                type="color"
                value={element.color}
                onChange={(e) =>
                  handleChange(index, 'color', e.target.value)
                }
                className={colorInput}
              />
            </div>

            {/* Pl */}
            <div className={fieldClass}>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                P<sub>l</sub> (kN)
              </label>
              <input
                type="number"
                value={element.Pl}
                onChange={(e) =>
                  handleChange(index, 'Pl', e.target.value)
                }
                className={inputClass}
              />
            </div>

            {/* Em */}
            <div className={fieldClass}>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                E<sub>m</sub> (kN)
              </label>
              <input
                type="number"
                value={element.Em}
                onChange={(e) =>
                  handleChange(index, 'Em', e.target.value)
                }
                className={inputClass}
              />
            </div>

          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <button
          type="button"
          onClick={handleAddElement}
          className="text-blue-600 dark:text-blue-400 font-bold border border-blue-600 dark:border-blue-500 rounded px-4 py-2 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition cursor-pointer"
        >
          + Ajouter un élément
        </button>
      </div>

      {errorMessage && (
        <p className="text-center text-red-600 dark:text-red-400">{errorMessage}</p>
      )}
    </div>
  );
}
