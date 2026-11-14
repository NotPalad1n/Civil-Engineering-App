import { InlineMath } from 'react-katex';
import PlotCohesionND from './PlotCohesionND';

interface Results {
  Cu?: number;
}

interface ResultatsCohesionNDProps {
  results: Results | null;
  formData: {
    correlation?: string;
    Pl1?: number;
    Pl2?: number;
    IC?: number;
  } | null;
}

export default function ResultatsCohesionND({ results, formData }: ResultatsCohesionNDProps) {
  // Check if formData or correlation is missing
  if (!results || !formData || !formData.correlation) {
    return (
      <div className="flex flex-col items-center mt-10 lg:mt-0 bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 rounded-md space-y-3 h-full transition-colors duration-300">
        <p className="text-center text-slate-500 dark:text-slate-400">Remplissez le formulaire et cliquez sur calculer.</p>
      </div>
    );
  }

  const correlation = formData.correlation;

  return (
    <div className="flex flex-col items-center mt-10 lg:mt-0 bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 rounded-md space-y-3 h-full text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <InlineMath math={`\\textbf{Cohésion non drainée :}`} />
      <InlineMath math={`Cu = ${results.Cu}\\text{ kPa}`} />

      <InlineMath math={`\\textbf{Courbe de corrélation :}`} />

      <InlineMath math={`\\text{Equation utilisée :}`} />

      {correlation === 'Pl1' && (
        <InlineMath math={
          "C_u = " +
          "\\begin{cases}" +
          "\\dfrac{P_l}{5.5} & \\text{si } P_l \\le 300 \\\\[8pt]" +
          "\\dfrac{P_l}{12} + 30 & \\text{si } 300 < P_l \\le 1000 \\\\[8pt]" +
          "\\dfrac{P_l}{35} + 85 & \\text{si } P_l > 1000" +
          "\\end{cases}"
        } />
      )}
      {correlation === 'Pl2' && (
        <InlineMath math={"C_u = 0.21 \\left( \\dfrac{P_{l2}}{1000} \\right)^{0.75} \\times 1000"} />
      )}
      {correlation === 'IC' && (
        <InlineMath math={"C_u = 200 \\left( \\dfrac{I_C}{100} \\right)^2"} />
      )}

      <PlotCohesionND
        correlation={correlation}
        userPl1={correlation === 'Pl1' ? formData.Pl1 : undefined}
        userPl2={correlation === 'Pl2' ? formData.Pl2 : undefined}
        userIC={correlation === 'IC' ? formData.IC : undefined}
      />
    </div>
  );
}
