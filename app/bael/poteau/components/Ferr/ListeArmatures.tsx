interface ElementData {
  id: string;
  nombre: string;
  diametre: string;
}

interface FormListeElementsProps {
  elements: ElementData[];
  setElements: (updated: ElementData[]) => void;
}

export default function ListeArmatures({
  elements,
  setElements,
}: FormListeElementsProps) {
  const fieldClass =
    'flex flex-col items-start justify-center gap-1 w-full';

  const inputClass =
    'w-full border border-gray-300 rounded px-2 py-1 h-10 appearance-none';

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
      { id: newId, nombre: '', diametre: ''},
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

            {/* Nombre */}
            <div className={fieldClass}>
              <label className="text-sm text-black">Nombre</label>
              <input
                type="number"
                value={element.nombre}
                onChange={(e) =>
                  handleChange(index, 'nombre', e.target.value)
                }
                className={inputClass}
              />
            </div>

            {/* diametre */}
            <div className={fieldClass}>
              <label className="text-sm text-black">Diametre (mm)</label>
              <input
                type="number"
                value={element.diametre}
                onChange={(e) =>
                  handleChange(index, 'diametre', e.target.value)
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

    </div>
  );
}
