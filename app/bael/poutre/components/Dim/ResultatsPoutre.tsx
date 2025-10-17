import { InlineMath } from 'react-katex';

interface Results {
  Ast?: number;
  Asc?: number;
  Asts?: number;
  Ascs?: number;
  Stmax?: number;
  St?: number;
  phiT?: number;
  cour1?: string;
  autres?: string;
  suggestion?: string;
}

interface ResultatsPoutreProps {
  results: Results | null;
}

export default function ResultatsPoutre({ results }: ResultatsPoutreProps) {
  return (
    <div className="flex flex-col items-center mt-10 lg:mt-0 bg-gray-100 p-6 rounded space-y-3 h-full w-full lg:max-h-[556px] overflow-y-scroll overflow-x-hidden">
      {results ? (
        <>

          <InlineMath math={`\\textbf{Résultats à l’ ELU :}`}/>

          <InlineMath math={`A_{st} = ${results.Ast}~\\text{cm}^2`} />
          <InlineMath math={`A_{sc} = ${results.Asc}~\\text{cm}^2`} />

          <InlineMath math={`\\textbf{Résultats à l’ELS :}`} />

          <InlineMath math={`A_{st} = ${results.Asts}~\\text{cm}^2`} />
          <InlineMath math={`A_{sc} = ${results.Ascs}~\\text{cm}^2`} />

          <InlineMath math={`\\textbf{Résultats de l’Effort tranchant :}`} />

          <InlineMath math={`S_t = ${results.St}~\\text{cm}`} />
          <InlineMath math={`S_{t\\max} = ${results.Stmax}~\\text{cm}`} />

          <InlineMath math={`\\text{Le diamètre des armatures est :}`} />
          <InlineMath math={`\\varphi_t = ${results.phiT}~\\text{mm}`} />

          <InlineMath math={`\\text{${results.cour1}}`}/>
          <InlineMath math={`\\text{${results.autres}}`}/>

        </>
      ) : (
        <p className="text-center text-gray-500">Remplissez le formulaire et cliquez sur calculer.</p>
      )}
    </div>
  );
}
