import { Dispatch, SetStateAction } from 'react';
import { InlineMath } from 'react-katex';

interface Results {
  b?: number;
  h?: number;
  message?: string;
}

interface ResultatsPoutreProps {
  results: Results | null;
  setActiveTab?: Dispatch<SetStateAction<'dim' | 'predim'>>;
  setFormData?: Dispatch<SetStateAction<Record<string, string>>>;
}

export default function ResultatsPreDimPoutre({ results, setActiveTab, setFormData}: ResultatsPoutreProps) {
  return (
    <div className="flex flex-col items-center text-left mt-10 lg:mt-0 bg-gray-100 p-6 rounded space-y-3 min-h-full w-full">
      {results ? (
        <>
          {/* <h2 className="text-xl font-semibold mb-4 text-center">Résultats</h2> */}

          <InlineMath math={`\\textbf{Dimensions de la poutre :}`}/>
          <InlineMath math={`b = ${results.b}~\\text{cm}`}/>
          <InlineMath math={`h = ${results.h}~\\text{cm}`}/>

          <InlineMath math={`\\text{${results.message}}`}/>
          
          <button
            onClick={() => {
                setFormData?.((prev) => ({
                  ...prev,
                  largeur: results.b?.toString() ?? '',
                  hauteur: results.h?.toString() ?? '',
                }));
                setActiveTab?.('dim');
              }
            }
            className="mt-4 text-black hover:text-blue-600 transition cursor-pointer"
          >
            <InlineMath math={`\\textbf{Passer au dimensionnement →}`}/> 
          </button>
        </>
      ) : (
        <p className="text-center text-gray-500">Remplissez le formulaire et cliquez sur calculer.</p>
      )}
    </div>
  );
}
