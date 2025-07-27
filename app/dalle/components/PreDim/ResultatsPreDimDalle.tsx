interface Results {
  h?: number;
}

interface ResultatsDalleProps {
  results: Results | null;
}

export default function ResultatsPreDimDalle({ results }: ResultatsDalleProps) {
  return (
    <div className="flex-1 mt-10 lg:mt-0 bg-gray-100 p-6 rounded space-y-3 h-full">
      {results ? (
        <>
          <h2 className="text-xl font-semibold mb-4 text-center">Résultats</h2>
          <p><strong>Dimensions de la dalle :</strong></p>

          <p><strong>h :</strong> {results.h} cm</p>
            
        </>
      ) : (
        <p className="text-center text-gray-500">Remplissez le formulaire et cliquez sur calculer.</p>
      )}
    </div>
  );
}
