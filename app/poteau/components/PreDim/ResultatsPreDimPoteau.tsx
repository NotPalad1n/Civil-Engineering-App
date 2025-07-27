interface Results {
  asq?: number;
  bsq?: number;
  a?: number;
  b?: number;
}

interface ResultatsPoteauProps {
  results: Results | null;
}

export default function ResultatsPreDimPoteau({ results }: ResultatsPoteauProps) {
  return (
    <div className="flex-1 mt-10 lg:mt-0 bg-gray-100 p-6 rounded space-y-3 h-full">
      {results ? (
        <>
          <h2 className="text-xl font-semibold mb-4 text-center">Résultats</h2>
          <p><strong>Dimensions du poteau dans le cas carré :</strong></p>

          <p><strong>a :</strong> {results.asq} cm</p>
          <p><strong>b :</strong> {results.bsq} cm</p>

          <p><strong>Dimensions du poteau dans le cas rectangle :</strong></p>

          <p><strong>a :</strong> {results.a} cm</p>
          <p><strong>b :</strong> {results.b} cm</p>
            
        </>
      ) : (
        <p className="text-center text-gray-500">Remplissez le formulaire et cliquez sur calculer.</p>
      )}
    </div>
  );
}
