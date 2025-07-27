interface Results {
  A?: number;
  B?: number;
  D?: number;
  H?: number;
}

interface ResultatsSemelleProps {
  results: Results | null;
}

export default function ResultatsPreDimSemelle({ results }: ResultatsSemelleProps) {
  return (
    <div className="flex-1 mt-10 lg:mt-0 bg-gray-100 p-6 rounded space-y-3 h-full">
      {results ? (
        <>
          <h2 className="text-xl font-semibold mb-4 text-center">Résultats</h2>
          <p><strong>Dimensions de la semelle :</strong></p>

          <p><strong>A :</strong> {results.A} m</p>
          <p><strong>B :</strong> {results.B} m</p>
          <p><strong>D :</strong> {results.D} m</p>
          <p><strong>H :</strong> {results.H} m</p>
            
        </>
      ) : (
        <p className="text-center text-gray-500">Remplissez le formulaire et cliquez sur calculer.</p>
      )}
    </div>
  );
}
