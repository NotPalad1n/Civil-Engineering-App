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
  const inputClass ='w-full border border-slate-300 dark:border-slate-700 rounded px-2 py-1 h-10 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-200 appearance-none';
  const selectClass = 'w-full border border-slate-300 dark:border-slate-700 rounded px-3 py-2 h-10 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-200 cursor-pointer';

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
            className="relative flex gap-4 bg-white dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 p-3 rounded w-full transition-colors duration-200"
          >

            {/* Delete button */}
            <button
              type="button"
              onClick={() => handleDeleteElement(element.id)}
              className="absolute -top-2 -right-2 text-red-500 dark:text-red-400 hover:text-white hover:bg-red-500 dark:hover:bg-red-600 font-bold rounded-full w-6 h-6 flex items-center justify-center transition bg-red-100 dark:bg-red-950 border border-red-200 dark:border-red-900 shadow-sm cursor-pointer"
              title="Supprimer cet élément"
            >
              ×
            </button>

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

            {/* Nombre */}
            <div className={fieldClass}>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Nombre</label>
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
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Diamètre (mm)</label>
              <select
                value={element.diametre}
                onChange={(e) => handleChange(index, 'diametre', e.target.value)}
                className={selectClass}
              >
                <option value="-">-</option>
                <option value="8">8</option>
                <option value="10">10</option>
                <option value="12">12</option>
                <option value="14">14</option>
                <option value="16">16</option>
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
          className="text-blue-600 dark:text-blue-400 font-bold border border-blue-600 dark:border-blue-500 rounded px-4 py-2 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition cursor-pointer"
        >
          + Ajouter un élément
        </button>
      </div>

    </div>
  );
}