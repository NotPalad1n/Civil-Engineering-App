"use client";

import { useRef } from 'react';
import { InlineMath } from 'react-katex';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';

interface Results {
  Ath?: number;
  As?: number;
  Amin?: number;
  AminRps?: number;
  dispositionSismique?: string;
  Amax?: number;
  lambda?: number;
  suggestion?: string;
  largeur?: number;
  longueur?: number;
  h?: number;
  Nu?: number;
  fc28?: number;
  fe?: number;
  Lf?: number;
  f?: number;
  ratio?: number;
}

interface ResultatsPoteauProps {
  results: Results | null;
}

export default function ResultatsPoteau({ results }: ResultatsPoteauProps) {
  const printRef = useRef<HTMLDivElement>(null);

  const handleDownloadPdf = async () => {
    if (!printRef.current || !results) return;

    try {
      const isDark = document.documentElement.classList.contains('dark');
      const dataUrl = await toPng(printRef.current, { 
        pixelRatio: 4,
        backgroundColor: isDark ? '#0f172a' : '#ffffff' 
      });

      const imgProps = new jsPDF().getImageProperties(dataUrl);
      const pdfWidth = 210; // Largeur A4 en mm
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      // On crée un PDF avec une hauteur PERSONNALISÉE [largeur, hauteur]
      const pdf = new jsPDF('p', 'mm', [pdfWidth, pdfHeight]);
      
      pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
      pdf.save(`Note_de_calcul_Poteau_${results.largeur}x${results.longueur}.pdf`);

    } catch (err) {
    console.error(err);
    }

  };

  return (
    <div className="flex flex-col items-center w-full lg:h-full bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-md mt-10 lg:mt-0 transition-colors duration-300">

      {/* Contenu */}
      <div 
        ref={printRef}
        className="flex flex-col items-center bg-slate-100 dark:bg-slate-900 space-y-3 w-full rounded-md p-6 transition-colors duration-300"
      >
        {results ? (
          <>
            {/* Titre Principal */}
            <div className="w-full text-center border-b border-slate-300 dark:border-slate-700 pb-4 mb-6 text-slate-900 dark:text-slate-100">
              <InlineMath math={`\\large \\textbf{Note de calcul - Poteau}`} />
            </div>

            {/* I. Dimensions */}
            <section className="w-full">
              <div className="text-left text-slate-800 dark:text-slate-200 font-bold mb-2 border-l-4 border-blue-600 dark:border-blue-500 pl-2">
                <InlineMath math={`\\text{I. Dimensions}`} />
              </div>
              <div className="flex flex-col items-center bg-white dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/80 py-3 rounded text-slate-900 dark:text-slate-100">
                <InlineMath math={`a = ${results.largeur}~\\text{cm ; } b = ${results.longueur}~\\text{cm}`} />
                <InlineMath math={`h = ${results.h}~\\text{m}`} />
              </div>
            </section>

            {/* II. Flambement */}
            <section className="w-full">
              <div className="text-left text-slate-800 dark:text-slate-200 font-bold mb-2 border-l-4 border-blue-600 dark:border-blue-500 pl-2">
                <InlineMath math={`\\text{II. Caractéristiques de flambement}`} />
              </div>
              <div className="flex flex-col items-center bg-white dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/80 py-3 rounded text-slate-900 dark:text-slate-100">
                <InlineMath math={`k = ${results.f}`} />
                <InlineMath math={`L_{f} = ${results.Lf}~\\text{m}`} />
                <InlineMath math={`\\lambda = ${results.lambda}`} />
              </div>
            </section>

            {/* III. Effort Normal */}
            <section className="w-full">
              <div className="text-left text-slate-800 dark:text-slate-200 font-bold mb-2 border-l-4 border-blue-600 dark:border-blue-500 pl-2">
                <InlineMath math={`\\text{III. Effort normal}`} />
              </div>
              <div className="text-center bg-white dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/80 py-3 rounded text-slate-900 dark:text-slate-100">
                <InlineMath math={`N_{u} = ${results.Nu}~\\text{kN}`} />
              </div>
            </section>

            {/* IV. Matériaux */}
            <section className="w-full">
              <div className="text-left text-slate-800 dark:text-slate-200 font-bold mb-2 border-l-4 border-blue-600 dark:border-blue-500 pl-2">
                <InlineMath math={`\\text{IV. Matériaux et dispositions}`} />
              </div>
              <div className="flex flex-col text-center bg-white dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/80 py-3 rounded text-slate-900 dark:text-slate-100 space-y-1">
                <InlineMath math={`f_{c28} = ${results.fc28}~\\text{MPa ; } f_{e} = ${results.fe}~\\text{MPa}`} />
                <InlineMath math={`\\text{Dispositions sismiques : } ${results.dispositionSismique === 'rps2011' ? '\\text{RPS 2011}' : '\\text{Aucune}'}`} />
              </div>
            </section>

            {/* V. Acier */}
            <section className="w-full">
              <div className="text-left text-slate-800 dark:text-slate-200 font-bold mb-2 border-l-4 border-blue-600 dark:border-blue-500 pl-2">
                <InlineMath math={`\\text{V. Sections d'acier}`} />
              </div>
              <div className="flex flex-col text-center bg-white dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/80 py-3 rounded space-y-1 text-slate-900 dark:text-slate-100">
                <InlineMath math={`A_{th} = ${results.Ath}~\\text{cm}^2`} />
                <InlineMath math={`A_{min~\\text{(BAEL)}} = ${results.Amin}~\\text{cm}^2`} />
                {results.AminRps !== undefined && (
                  <InlineMath math={`A_{min~\\text{(RPS 2011)}} = ${results.AminRps}~\\text{cm}^2`} />
                )}
                <InlineMath math={`A_{max} = ${results.Amax}~\\text{cm}^2`} />
              </div>
            </section>

            {/* VI. Résultat Final */}
            <section className="w-full">
              <div className="text-left text-slate-800 dark:text-slate-200 font-bold mb-2 border-l-4 border-blue-600 dark:border-blue-500 pl-2">
                <InlineMath math={`\\text{VI. Section d'acier retenu}`} />
              </div>
              <div className="flex flex-col text-center bg-white dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/80 py-3 rounded text-slate-900 dark:text-slate-100">
                <InlineMath math={`A_{s} = ${results.As}~\\text{cm}^2`} />
                <InlineMath math={`\\text{Ratio de ferraillage} = ${results.ratio}~\\%`} />
              </div>
            </section>

            {/* Footer */}
            <div className="w-full text-right text-[10px] text-slate-500 dark:text-slate-400 italic mt-4">
              Généré le {new Date().toLocaleDateString('fr-FR')}
            </div>
          </>
        ) : (
          <p className="text-slate-500 dark:text-slate-400 text-center">
            Remplissez le formulaire et cliquez sur calculer.
          </p>
        )}

      </div>

      {results && (
        <div className="flex">
          <button
            onClick={handleDownloadPdf}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md transition-all cursor-pointer font-semibold mb-6 shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
            </svg>
            Exporter en PDF
          </button>
        </div>
      )}

    </div>
  );
}