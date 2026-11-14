import { InlineMath } from 'react-katex';

interface Results {
  h?: number;
  lx?: number;
  ly?: number;
}

interface ResultatsDalleProps {
  results: Results | null;
}

export default function ResultatsPreDimDalle({ results }: ResultatsDalleProps) {
  return (
    <div className="flex flex-col items-center mt-10 lg:mt-0 bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 rounded-md space-y-3 h-full transition-colors duration-300">
      {results ? (
        <>
          {/* Titre Principal */}
          <div className="w-full text-center border-b border-slate-300 dark:border-slate-700 pb-4 mb-6 hidden lg:block md:block text-slate-900 dark:text-slate-100">
            <InlineMath math={`\\large \\textbf{Prédimensionnement - Dalle pleine}`} />
          </div>

          {/* Titre Principal */}
          <div className="flex flex-col w-full text-center border-b border-slate-300 dark:border-slate-700 pb-4 mb-6 lg:hidden md:hidden text-slate-900 dark:text-slate-100">
            <InlineMath math={`\\large \\textbf{Prédimensionnement -}`} />
            <InlineMath math={`\\large \\textbf{Dalle pleine}`} />
          </div>

          {/* I. Dimensions */}
          <section className="w-full">
            <div className="text-left text-slate-800 dark:text-slate-200 font-bold mb-2 border-l-4 border-blue-600 dark:border-blue-500 pl-2">
              <InlineMath math={`\\text{I. Dimensions de la dalle :}`} />
            </div>
            <div className="flex flex-col items-center bg-white dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/80 py-3 rounded text-slate-900 dark:text-slate-100">
              <InlineMath math={`l_{x} = ${results.lx}~\\text{m ; } l_{y} = ${results.ly}~\\text{m}`} />
               <InlineMath math={`h = ${results.h}~\\text{cm}`} />
            </div>
          </section>
            
        </>
      ) : (
        <p className="text-center text-slate-500 dark:text-slate-400">Remplissez le formulaire et cliquez sur calculer.</p>
      )}
    </div>
  );
}
