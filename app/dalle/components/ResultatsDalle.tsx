interface Results {
  Astx?: number;
  Ascx?: number;
  Asty?: number;
  Ascy?: number;
  Axmin?: number;
  Aymin?: number;
  Stx?: number;
  Sty?: number;
  message?: string;
  suggestion?: string;
}

interface ResultatsDalleProps {
  results: Results | null;
}

export default function ResultatsDalle({ results }: ResultatsDalleProps) {
  return (
    <div className="flex-1 mt-10 lg:mt-0 bg-gray-100 p-6 rounded space-y-3">
      {results ? (
        <>
          <h2 className="text-xl font-semibold mb-4 text-center">Résultats</h2>
          <p><strong>ELU // x :</strong></p>

          <p><strong>A<sub>stx</sub> :</strong> {results.Astx} cm² par mètre</p>
          <p><strong>A<sub>scx</sub> :</strong> {results.Ascx} cm² par mètre</p>

          <p><strong>ELU // y :</strong></p>

          <p><strong>A<sub>sty</sub> :</strong> {results.Asty} cm² par mètre</p>
          <p><strong>A<sub>scy</sub> :</strong> {results.Ascy} cm² par mètre</p>

          <p><strong>Armatures d'âme :</strong></p>

          <p className="whitespace-pre-line">{results.message}</p>

          <p><strong>Sections minimales :</strong></p>

          <p><strong>A<sub>xmin</sub> :</strong> {results.Axmin} cm² par mètre</p>
          <p><strong>A<sub>ymin</sub> :</strong> {results.Aymin} cm² par mètre</p>

          <p><strong>Espacement maximal :</strong></p>

          <p><strong>S<sub>tx</sub> :</strong> {results.Stx} m</p>
          <p><strong>S<sub>ty</sub> :</strong> {results.Sty} m</p>
            
          <p><strong>Suggestion d’armature :</strong> {results.suggestion}</p>
        </>
      ) : (
        <p className="text-center text-gray-500">Remplissez le formulaire et cliquez sur calculer.</p>
      )}
    </div>
  );
}
