import { InlineMath } from 'react-katex';

interface Results {
  A?: number;
  B?: number;
  D?: number;
  H?: number;

  a?: number;
  b?: number;
  sigma?: number;
}

interface ResultatsSemelleProps {
  results: Results | null;
}

export default function ResultatsPreDimSemelle({ results }: ResultatsSemelleProps) {
  return (
    <div className="flex flex-col items-center mt-10 lg:mt-0 bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 rounded-md space-y-3 h-full transition-colors duration-300">
      {results ? (
        <>
          {/* Titre Principal */}
          <div className="w-full text-center border-b border-slate-300 dark:border-slate-700 pb-4 mb-6 hidden lg:block md:block text-slate-900 dark:text-slate-100">
            <InlineMath math={`\\large \\textbf{Prédimensionnement - Semelle isolée}`} />
          </div>

          {/* Titre Principal */}
          <div className="flex flex-col w-full text-center border-b border-slate-300 dark:border-slate-700 pb-4 mb-6 lg:hidden md:hidden text-slate-900 dark:text-slate-100">
            <InlineMath math={`\\large \\textbf{Prédimensionnement -}`} />
            <InlineMath math={`\\large \\textbf{Semelle isolée}`} />
          </div>

          {/* I. Dimensions du poteau : */}
          <section className="w-full">
            <div className="text-left text-slate-800 dark:text-slate-200 font-bold mb-2 border-l-4 border-blue-600 dark:border-blue-500 pl-2">
              <InlineMath math={`\\text{I. Dimensions du poteau :}`} />
            </div>
            <div className="flex flex-col items-center bg-white dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/80 py-3 rounded text-slate-900 dark:text-slate-100">
              <InlineMath math={`a = ${results.a}~\\text{cm ; } b = ${results.b}~\\text{cm}`} />
            </div>
          </section>

          {/* II. Contrainte admissible du sol */}
          <section className="w-full">
            <div className="text-left text-slate-800 dark:text-slate-200 font-bold mb-2 border-l-4 border-blue-600 dark:border-blue-500 pl-2">
              <InlineMath math={`\\text{II. Contrainte admissible du sol :}`} />
            </div>
            <div className="text-center bg-white dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/80 py-3 rounded text-slate-900 dark:text-slate-100">
              <InlineMath math={`\\sigma_{ser} = ${results.sigma}~\\text{MPa}`} />
            </div>
          </section>

          {/* II. Dimensions de la semelle : */}
          <section className="w-full">
            <div className="text-left text-slate-800 dark:text-slate-200 font-bold mb-2 border-l-4 border-blue-600 dark:border-blue-500 pl-2">
              <InlineMath math={`\\text{II. Dimensions de la semelle :}`} />
            </div>
            <div className="flex flex-col items-center bg-white dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/80 py-3 rounded text-slate-900 dark:text-slate-100">
              <InlineMath math={`A = ${results.A}~\\text{m ; } B = ${results.B}~\\text{m}`} />
              <InlineMath math={`H = ${results.H}~\\text{m}`} />
              <InlineMath math={`d = ${results.D}~\\text{m}`} />
            </div>
          </section>
            
        </>
      ) : (
        <p className="text-center text-slate-500 dark:text-slate-400">Remplissez le formulaire et cliquez sur calculer.</p>
      )}
    </div>
  );
}
