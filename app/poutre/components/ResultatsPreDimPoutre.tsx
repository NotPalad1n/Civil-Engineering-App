interface Results {
  b?: number;
  h?: number;
  message?: string;
}

interface ResultatsPoutreProps {
  results: Results | null;
}

export default function ResultatsPreDimPoutre({ results }: ResultatsPoutreProps) {
  return (
    <div className="flex-1 mt-10 lg:mt-0 bg-gray-100 p-6 rounded space-y-3 h-full">
      {results ? (
        <>
          <h2 className="text-xl font-semibold mb-4 text-center">Résultats</h2>
          <p><strong>Dimensions de la poutre :</strong></p>

          <p><strong>b :</strong> {results.b} cm</p>
          <p><strong>h :</strong> {results.h} cm</p>

          <p className="whitespace-pre-line">{results.message}</p>
            
        </>
      ) : (
        <p className="text-center text-gray-500">Remplissez le formulaire et cliquez sur calculer.</p>
      )}
    </div>
  );
}
