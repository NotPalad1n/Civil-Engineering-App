import { InlineMath } from 'react-katex';

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
    <div className="flex flex-col items-center mt-10 lg:mt-0 bg-gray-100 p-6 rounded space-y-3 h-full w-full lg:max-h-[556px] overflow-y-scroll overflow-x-hidden">
      {results ? (
        <>

          <InlineMath math={`\\textbf{Résultats à l’ ELU // x :}`}/>

          <InlineMath math={`A_{st~x} = ${results.Astx}~\\text{cm}^2`} />
          <InlineMath math={`A_{sc~x} = ${results.Ascx}~\\text{cm}^2`} />

          <InlineMath math={`\\textbf{Résultats à l’ ELU // y :}`}/>

          <InlineMath math={`A_{st~y} = ${results.Asty}~\\text{cm}^2`} />
          <InlineMath math={`A_{sc~y} = ${results.Ascy}~\\text{cm}^2`} />

          <InlineMath math={`\\textbf{Armatures d’âme :}`}/>

          <InlineMath math={`\\text{${results.message}}`} />

          <InlineMath math={`\\textbf{Sections minimales :}`}/>

          <InlineMath math={`A_{x~min} = ${results.Axmin}~\\text{cm}^2`} />
          <InlineMath math={`A_{y~min} = ${results.Aymin}~\\text{cm}^2`} />

          <InlineMath math={`\\textbf{Espacement maximal :}`}/>

          <InlineMath math={`S_{t~x} = ${results.Stx}~\\text{cm}^2`} />
          <InlineMath math={`S_{t~y} = ${results.Sty}~\\text{cm}^2`} />
          
        </>
      ) : (
        <p className="text-center text-gray-500">Remplissez le formulaire et cliquez sur calculer.</p>
      )}
    </div>
  );
}
