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
      <div className="flex flex-col items-center mt-10 lg:mt-0 bg-gray-100 p-6 rounded space-y-3 h-full">
        <p className="text-center text-gray-500">Remplissez le formulaire et cliquez sur calculer.</p>
      </div>
    );
  }

  const correlation = formData.correlation;

  return (
    <div className="flex flex-col items-center mt-10 lg:mt-0 bg-gray-100 p-6 rounded space-y-3 h-full">
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
