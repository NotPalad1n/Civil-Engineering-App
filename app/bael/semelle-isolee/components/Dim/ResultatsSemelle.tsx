import { InlineMath } from 'react-katex';

interface WarningSol {
  sigmaSol: number;
  limit: number;
}

interface Results {
  Asx?: number;
  Asy?: number;
  message?: string;

  warning?: WarningSol;

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

export default function ResultatsSemelle({ results }: ResultatsSemelleProps) {
  return (
    <div className="flex flex-col items-center mt-10 lg:mt-0 bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 rounded-md space-y-3 h-full transition-colors duration-300">
      {results ? (
        <>
          {/* Titre Principal */}
          <div className="w-full text-center border-b border-slate-300 dark:border-slate-700 pb-4 mb-6 text-slate-900 dark:text-slate-100">
            <InlineMath math={`\\large \\textbf{Note de calcul - Semelle isolée}`} />
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

          {/* IV. Sections d’acier retenu : */}
          <section className="w-full">
            <div className="text-left text-slate-800 dark:text-slate-200 font-bold mb-2 border-l-4 border-blue-600 dark:border-blue-500 pl-2">
              <InlineMath math={`\\text{IV. Sections d’acier retenu :}`} />
            </div>
            <div className="flex flex-col items-center bg-white dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/80 py-3 rounded text-slate-900 dark:text-slate-100">
              <InlineMath math={`\\text{Ferraillage // A :}`}/>
              <InlineMath math={`A_{s//A} = ${results.Asx}~\\text{cm}^2`} />

              <InlineMath math={`\\text{Ferraillage // B :}`}/>
              <InlineMath math={`A_{s//B} = ${results.Asy}~\\text{cm}^2`} />
            </div>
          </section>

          {/* V. Verification de la contrainte : DYNAMIQUE ET PROPRE */}
          <section className="w-full">
            <div className="text-left text-slate-800 dark:text-slate-200 font-bold mb-2 border-l-4 border-blue-600 dark:border-blue-500 pl-2">
              <InlineMath math={`\\text{V. Verification de la contrainte :}`} />
            </div>
            
            {results.warning ? (
              /* Toast d'Alerte rouge structuré (Fissure / Sol insuffisant) */
              <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-950/60 border-l-4 border-red-600 dark:border-red-500 rounded-r-lg shadow-sm text-left w-full">
                <div className="mt-0.5">
                  <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <p className="text-red-800 dark:text-red-200 font-bold text-sm">Alerte de dimensionnement</p>
                  <p className="text-red-700 dark:text-red-300 text-sm italic">
                    Contrainte au sol dépassée : <InlineMath math="\sigma_{sol}" /> ({results.warning.sigmaSol} MPa) 
                    dépasse la limite de {results.warning.limit} MPa. Augmentez la surface <InlineMath math="A \times B" />.
                  </p>
                </div>
              </div>
            ) : (
              /* Message vert de succès */
              <div className="flex flex-col items-center bg-white dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/80 py-3 rounded text-sm text-slate-900 dark:text-slate-100">
                <InlineMath math={`\\text{${results.message}}`} />
              </div>
            )}
          </section>

        </>
      ) : (
        <p className="text-center text-slate-500 dark:text-slate-400">Remplissez le formulaire et cliquez sur calculer.</p>
      )}
    </div>
  );
}
