import { InlineMath } from 'react-katex';
import PlotAngleFrottement from './PlotAngleFrottement';

interface Results {
  phi?: number;
}

interface ResultatsAngleFrottementProps {
  results: Results | null;
  formData: {
    correlation?: string;
    Pl?: number;
    Ip?: number;
  } | null;
}

export default function ResultatsAngleFrottement({ results, formData }: ResultatsAngleFrottementProps) {
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
      <InlineMath math={`\\textbf{Angle de frottement :}`} />
      <InlineMath math={`\\phi = ${results.phi}\\text{°}`} />

      <InlineMath math={`\\textbf{Courbe de corrélation :}`} />

      <InlineMath math={`\\text{Equation utilisée :}`} />

      {correlation === 'Pl' && (
        <InlineMath math={`\\phi = 24 + 4 \\times \\frac{\\log_{10}\\left(\\frac{10 \\times Pl}{2.5}\\right)}{\\log_{10}(2)}`} />
      )}
      {correlation === 'Ip' && (
        <InlineMath math={`\\phi = \\arctan\\left(0.21 + \\frac{8}{Ip + 6}\\right) \\times \\frac{180}{\\pi}`} />
      )}

      <PlotAngleFrottement
        correlation={correlation}
        userPl={correlation === 'Pl' ? formData.Pl : undefined}
        userIp={correlation === 'Ip' ? formData.Ip : undefined}
      />
    </div>
  );
}
