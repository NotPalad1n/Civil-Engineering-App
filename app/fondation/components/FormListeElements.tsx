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
    'w-full border border-gray-300 rounded px-2 py-1 h-10 appearance-none';
  const colorInput = 'w-full h-10 border border-gray-300 rounded';

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
            className="flex gap-4 bg-gray-50 p-3 rounded w-full"
          >
            {/* ID */}
            <div className={fieldClass}>
              <label className="text-sm text-black">ID</label>
              <input
                type="text"
                value={element.id}
                readOnly
                className={`${inputClass} bg-gray-100 text-center cursor-not-allowed`}
              />
            </div>

            {/* Hauteur */}
            <div className={fieldClass}>
              <label className="text-sm text-black">Hauteur (cm)</label>
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
              <label className="text-sm text-black">Couleur</label>
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
              <label className="text-sm text-black">
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
              <label className="text-sm text-gray-600">
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
          className="text-blue-600 font-bold border border-blue-600 rounded px-4 py-2 hover:bg-blue-50 transition"
        >
          + Ajouter un élément
        </button>
      </div>

      {errorMessage && (
        <p className="text-center text-red-600">{errorMessage}</p>
      )}
    </div>
  );
}
