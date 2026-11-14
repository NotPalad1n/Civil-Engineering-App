import { InlineMath } from 'react-katex';

interface Results {
  As?: number;
  AsFourni?: number;
  verification?: string;
}

interface ResultatsProps {
  results: Results | null;
}

export default function ResultatsFerr({ results}: ResultatsProps) {
  return (
    <div className="flex flex-col items-center mt-10 lg:mt-0 bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 rounded-md space-y-3 h-full transition-colors duration-300">
      {results ? (
        <>

          {/* Titre Principal */}
          <div className="w-full text-center border-b border-slate-300 dark:border-slate-700 pb-4 mb-6 text-slate-900 dark:text-slate-100">
            <InlineMath math={`\\large \\textbf{Vérification de sections}`} />
          </div>

          {/* Section d’acier nécessaire */}
          <section className="w-full">
            <div className="text-left text-slate-800 dark:text-slate-200 font-bold mb-2 border-l-4 border-blue-600 dark:border-blue-500 pl-2">
              <InlineMath math={`\\text{Section d’acier nécessaire :}`} />
            </div>
            <div className="text-center bg-white dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/80 py-3 rounded text-slate-900 dark:text-slate-100">
              <InlineMath math={`A_{s} = ${results.As}~\\text{cm}^2`} />
            </div>
          </section>

          {/* Section d’acier fourni */}
          <section className="w-full">
            <div className="text-left text-slate-800 dark:text-slate-200 font-bold mb-2 border-l-4 border-blue-600 dark:border-blue-500 pl-2">
              <InlineMath math={`\\text{Section d’acier fourni}`} />
            </div>
            <div className="text-center bg-white dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/80 py-3 rounded text-slate-900 dark:text-slate-100">
              <InlineMath math={`A_{s} = ${results.AsFourni}~\\text{cm}^2`} />
            </div>
          </section>

          {/* Remarque */}
          <section className="w-full">
            <div className="text-left text-slate-800 dark:text-slate-200 font-bold mb-2 border-l-4 border-blue-600 dark:border-blue-500 pl-2">
              <InlineMath math={`\\text{Remarque}`} />
            </div>
            <div className="text-center bg-white dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/80 py-3 rounded text-slate-900 dark:text-slate-100">
              <InlineMath math={`\\text{${results.verification}}`} />
            </div>
          </section>

        </>
      ) : (
        <p className="text-center text-slate-500 dark:text-slate-400">Remplissez le formulaire et cliquez sur calculer.</p>
      )}
    </div>
  );
}
