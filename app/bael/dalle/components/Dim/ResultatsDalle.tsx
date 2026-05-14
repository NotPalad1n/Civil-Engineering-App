"use client";

import { useRef } from 'react';
import { InlineMath } from 'react-katex';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';

interface Results {
  Astx?: number;
  Ascx?: number;
  Asty?: number;
  Ascy?: number;
  Axmin?: number;
  Aymin?: number;
  Stx?: number;
  Sty?: number;
  h?: number;
  lx?: number;
  ly?: number;
  alpha?: number;

  message?: string;
}

interface ResultatsDalleProps {
  results: Results | null;
}

export default function ResultatsDalle({ results }: ResultatsDalleProps) {
  
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
      pdf.save(`Note_de_calcul_dalle_${results.lx}x${results.ly}.pdf`);

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
              <InlineMath math={`\\large \\textbf{Note de calcul - Dalle pleine}`} />
            </div>

            {/* I. Dimensions */}
            <section className="w-full">
              <div className="text-left text-gray-800 font-bold mb-2 border-l-4 border-blue-600 pl-2">
                <InlineMath math={`\\text{I. Dimensions de la dalle :}`} />
              </div>
              <div className="flex flex-col items-center bg-gray-50 py-3 rounded">
                <InlineMath math={`l_{x} = ${results.lx}~\\text{m ; } l_{y} = ${results.ly}~\\text{m}`} />
                <InlineMath math={`h = ${results.h}~\\text{cm}`} />
                <InlineMath math={`\\alpha = ${results.alpha}`} />
              </div>
            </section>

            {/* II. Résultats à l’ ELU // x : */}
            <section className="w-full">
              <div className="text-left text-gray-800 font-bold mb-2 border-l-4 border-blue-600 pl-2">
                <InlineMath math={`\\text{II. Résultats à l’ ELU // x :}`} />
              </div>
              <div className="flex flex-col items-center bg-gray-50 py-3 rounded">
                <InlineMath math={`A_{st~x} = ${results.Astx}~\\text{cm}^2`} />
                <InlineMath math={`A_{sc~x} = ${results.Ascx}~\\text{cm}^2`} />
              </div>
            </section>

            {/* III. Résultats à l’ ELU // y  : */}
            <section className="w-full">
              <div className="text-left text-gray-800 font-bold mb-2 border-l-4 border-blue-600 pl-2">
                <InlineMath math={`\\text{II. Résultats à l’ ELU // y :}`} />
              </div>
              <div className="flex flex-col items-center bg-gray-50 py-3 rounded">
                <InlineMath math={`A_{st~y} = ${results.Asty}~\\text{cm}^2`} />
                <InlineMath math={`A_{sc~y} = ${results.Ascy}~\\text{cm}^2`} />
              </div>
            </section>

            {/* IV. Armatures d’âme  : */}
            <section className="w-full">
              <div className="text-left text-gray-800 font-bold mb-2 border-l-4 border-blue-600 pl-2">
                <InlineMath math={`\\text{IV. Armatures d’âme :}`} />
              </div>
              <div className="flex flex-col items-center bg-gray-50 py-3 rounded">
                <InlineMath math={`\\text{${results.message}}`} />
              </div>
            </section>

            {/* V. Sections minimales : */}
            <section className="w-full">
              <div className="text-left text-gray-800 font-bold mb-2 border-l-4 border-blue-600 pl-2">
                <InlineMath math={`\\text{V. Sections minimales :}`} />
              </div>
              <div className="flex flex-col items-center bg-gray-50 py-3 rounded">
                <InlineMath math={`A_{x~min} = ${results.Axmin}~\\text{cm}^2`} />
                <InlineMath math={`A_{y~min} = ${results.Aymin}~\\text{cm}^2`} />
              </div>
            </section>

            {/* VI. Espacement maximal : */}
            <section className="w-full">
              <div className="text-left text-gray-800 font-bold mb-2 border-l-4 border-blue-600 pl-2">
                <InlineMath math={`\\text{VI. Espacement maximal :}`} />
              </div>
              <div className="flex flex-col items-center bg-gray-50 py-3 rounded">
                <InlineMath math={`S_{t~x} = ${results.Stx}~\\text{cm}`} />
                <InlineMath math={`S_{t~y} = ${results.Sty}~\\text{cm}`} />
              </div>
            </section>

            {/* Footer */}
            <div className="w-full text-right text-[10px] text-gray-500 italic mt-4">
              Généré le {new Date().toLocaleDateString('fr-FR')}
            </div>
            
          </>
        ) : (
          <p className="text-center text-gray-500">Remplissez le formulaire et cliquez sur calculer.</p>
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
