interface Results {
  Ath?: number;
  As?: number;
  Amin?: number;
  Br?: number;
  alpha?: number;
  lambda?: number;
  suggestion?: string;
}

interface ResultatsPoteauProps {
  results: Results | null;
}

export default function ResultatsPoteau({ results }: ResultatsPoteauProps) {
  return (
    <div className="flex-1 mt-10 lg:mt-0 bg-gray-100 p-6 rounded space-y-3 h-full">
      {results ? (
        <>
          <h2 className="text-xl font-semibold mb-4 text-center">Résultats</h2>
          <p><strong>λ :</strong> {results.lambda}</p>
          <p><strong>α :</strong> {results.alpha}</p>
          <p><strong>B<sub>r</sub> :</strong> {results.Br} m²</p>
          <p><strong>A<sub>th</sub> :</strong> {results.Ath} cm²</p>
          <p><strong>A<sub>min</sub> :</strong> {results.Amin} cm²</p>
          <p><strong>Acier nécessaire A<sub>s</sub> :</strong> {results.As} cm²</p>
          <p><strong>Suggestion d’armature :</strong> {results.suggestion}</p>
        </>
      ) : (
        <p className="text-center text-gray-500">Remplissez le formulaire et cliquez sur calculer.</p>
      )}
    </div>
  );
}
