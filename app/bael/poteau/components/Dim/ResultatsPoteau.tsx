"use client";

import { useRef } from 'react';
import { InlineMath } from 'react-katex';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';

interface Results {
  Ath?: number;
  As?: number;
  Amin?: number;
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
      const dataUrl = await toPng(printRef.current, { 
        pixelRatio: 4,
        backgroundColor: '#ffffff' 
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
    <div className="flex flex-col items-center w-full lg:h-full bg-gray-100 rounded-md mt-10 lg:mt-0">

      {/* Contenu */}
      <div 
        ref={printRef}
        className="flex flex-col items-center bg-gray-100 space-y-3 w-full rounded-md p-6"
      >
        {results ? (
          <>
            {/* Titre Principal */}
            <div className="w-full text-center border-b border-gray-700 pb-4 mb-6">
              <InlineMath math={`\\large \\textbf{Note de calcul - Poteau}`} />
            </div>

            {/* I. Dimensions */}
            <section className="w-full">
              <div className="text-left text-gray-800 font-bold mb-2 border-l-4 border-blue-600 pl-2">
                <InlineMath math={`\\text{I. Dimensions}`} />
              </div>
              <div className="flex flex-col items-center bg-gray-50 py-3 rounded">
                <InlineMath math={`a = ${results.largeur}~\\text{cm ; } b = ${results.longueur}~\\text{cm}`} />
                <InlineMath math={`h = ${results.h}~\\text{m}`} />
              </div>
            </section>

            {/* II. Flambement */}
            <section className="w-full">
              <div className="text-left text-gray-800 font-bold mb-2 border-l-4 border-blue-600 pl-2">
                <InlineMath math={`\\text{II. Caractéristiques de flambement}`} />
              </div>
              <div className="flex flex-col items-center bg-gray-50 py-3 rounded">
                <InlineMath math={`k = ${results.f}`} />
                <InlineMath math={`L_{f} = ${results.Lf}~\\text{m}`} />
                <InlineMath math={`\\lambda = ${results.lambda}`} />
              </div>
            </section>

            {/* III. Effort Normal */}
            <section className="w-full">
              <div className="text-left text-gray-800 font-bold mb-2 border-l-4 border-blue-600 pl-2">
                <InlineMath math={`\\text{III. Effort normal}`} />
              </div>
              <div className="text-center bg-gray-50 py-3 rounded">
                <InlineMath math={`N_{u} = ${results.Nu}~\\text{kN}`} />
              </div>
            </section>

            {/* IV. Matériaux */}
            <section className="w-full">
              <div className="text-left text-gray-800 font-bold mb-2 border-l-4 border-blue-600 pl-2">
                <InlineMath math={`\\text{IV. Matériaux}`} />
              </div>
              <div className="text-center bg-gray-50 py-3 rounded">
                <InlineMath math={`f_{c28} = ${results.fc28}~\\text{MPa ; } f_{e} = ${results.fe}~\\text{MPa}`} />
              </div>
            </section>

            {/* V. Acier */}
            <section className="w-full">
              <div className="text-left text-gray-800 font-bold mb-2 border-l-4 border-blue-600 pl-2">
                <InlineMath math={`\\text{V. Sections d'acier}`} />
              </div>
              <div className="flex flex-col text-center bg-gray-50 py-3 rounded space-y-1">
                <InlineMath math={`A_{th} = ${results.Ath}~\\text{cm}^2`} />
                <InlineMath math={`A_{min} = ${results.Amin}~\\text{cm}^2`} />
                <InlineMath math={`A_{max} = ${results.Amax}~\\text{cm}^2`} />
              </div>
            </section>

            {/* VI. Résultat Final */}
            <section className="w-full">
              <div className="text-left text-gray-800 font-bold mb-2 border-l-4 border-blue-600 pl-2">
                <InlineMath math={`\\text{VI. Section d'acier retenu}`} />
              </div>
              <div className="flex flex-col text-center bg-gray-50 py-3 rounded">
                <InlineMath math={`A_{s} = ${results.As}~\\text{cm}^2`} />
                <InlineMath math={`\\text{Ratio de ferraillage} = ${results.ratio}~\\%`} />
              </div>
            </section>

            {/* Footer */}
            <div className="w-full text-right text-[10px] text-gray-500 italic mt-4">
              Généré le {new Date().toLocaleDateString('fr-FR')}
            </div>
          </>
        ) : (
          <p className="text-gray-500 text-center">
            Remplissez le formulaire et cliquez sur calculer.
          </p>
        )}

      </div>

      {results && (
        <div className="flex">
          <button
            onClick={handleDownloadPdf}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md transition-all cursor-pointer font-semibold mb-6 "
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