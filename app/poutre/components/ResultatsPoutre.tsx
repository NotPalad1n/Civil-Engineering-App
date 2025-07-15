interface Results {
  largeur?: number;
  longueur?: number;
  hauteur?: number;
  fissuration?: string;
  Mu?: number;
  fc28?: number;
  fe?: number;
  suggestion?: string;
}

interface ResultatsPoteauProps {
  results: Results | null;
}

export default function ResultatsPoutre({ results }: ResultatsPoteauProps) {
  return (
    <div className="flex-1 mt-10 lg:mt-0 bg-gray-100 p-6 rounded space-y-3">
      {results ? (
        <>
          <h2 className="text-xl font-semibold mb-4 text-center">Résultats</h2>
          <p><strong>longueur :</strong> {results.longueur} m</p>
          <p><strong>largeur :</strong> {results.largeur} cm</p>  
          <p><strong>hauteur :</strong> {results.hauteur} cm</p>
          <p><strong>fissuration :</strong> {results.fissuration}</p>
          <p><strong>M<sub>u</sub> :</strong> {results.Mu} kN m</p>
          <p><strong>fc<sub>28</sub> :</strong> {results.fc28} MPa</p>
          <p><strong>f<sub>e</sub> :</strong> {results.fe} MPa</p>
          <p><strong>Suggestion d’armature :</strong> {results.suggestion}</p>
        </>
      ) : (
        <p className="text-center text-gray-500">Remplissez le formulaire et cliquez sur calculer.</p>
      )}
    </div>
  );
}
