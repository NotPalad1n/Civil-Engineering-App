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

  const fieldClass ='flex flex-col items-start justify-center gap-1 w-full';
  const inputClass ='w-full border border-gray-300 rounded px-2 py-1 h-10 appearance-none';
  const selectClass = 'w-full border border-gray-300 rounded px-3 py-2 h-10';

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

  const handleDeleteElement = (id: string) => {
    const updated = elements
      .filter((el) => el.id !== id)
      .map((el, i) => ({ ...el, id: i.toString() }));
    setElements(updated);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {elements.map((element, index) => (
          <div
            key={index}
            className="relative flex gap-4 bg-gray-50 p-3 rounded w-full"
          >

            {/* Delete button */}
            <button
              type="button"
              onClick={() => handleDeleteElement(element.id)}
              className="absolute -top-2 -right-2 text-red-500 hover:text-white hover:bg-red-500 font-bold rounded-full w-6 h-6 flex items-center justify-center transition bg-red-100 shadow-sm"
              title="Supprimer cet élément"
            >
              ×
            </button>

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
              <label className="text-sm text-black">Diamètre (mm)</label>
              <select
                value={element.diametre}
                onChange={(e) => handleChange(index, 'diametre', e.target.value)}
                className={selectClass}
              >
                <option value="8">8</option>
                <option value="10">10</option>
                <option value="12">12</option>
                <option value="14">14</option>
                <option value="16">16</option>
                <option value="18">18</option>
                <option value="20">20</option>
                <option value="25">25</option>
              </select>
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