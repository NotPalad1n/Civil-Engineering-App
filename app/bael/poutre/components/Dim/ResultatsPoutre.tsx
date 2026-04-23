"use client";

import { useRef } from 'react';
import { InlineMath } from 'react-katex';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';

interface Results {
  Ast?: number;
  Asc?: number;
  Asts?: number;
  Ascs?: number;
  Stmax?: number;
  St?: number;
  phiT?: number;
  cour1?: string;
  autres?: string;
  suggestion?: string;
}

interface ResultatsPoutreProps {
  results: Results | null;
}

export default function ResultatsPoutre({ results }: ResultatsPoutreProps) {
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
      pdf.save(`Note_de_calcul_Poutre_${results.largeur}x${results.hauteur}.pdf`);

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
            <InlineMath math={`\\large \\textbf{Note de calcul - Poutre}`} />
          </div>

          {/* I. Dimensions */}
          <section className="w-full">
            <div className="text-left text-gray-800 font-bold mb-2 border-l-4 border-blue-600 pl-2">
              <InlineMath math={`\\text{I. Résultats à l’ ELU}`} />
            </div>
            <div className="flex flex-col items-center bg-gray-50 py-3 rounded">
              <InlineMath math={`A_{st} = ${results.Ast}~\\text{cm}^2`} />
              <InlineMath math={`A_{sc} = ${results.Asc}~\\text{cm}^2`} />
            </div>
          </section>
          
          {/* I. Dimensions */}
          <section className="w-full">
            <div className="text-left text-gray-800 font-bold mb-2 border-l-4 border-blue-600 pl-2">
              <InlineMath math={`\\text{II. Résultats à l’ELS}`} />
            </div>
            <div className="flex flex-col items-center bg-gray-50 py-3 rounded">
              <InlineMath math={`A_{st} = ${results.Asts}~\\text{cm}^2`} />
              <InlineMath math={`A_{sc} = ${results.Ascs}~\\text{cm}^2`} />
            </div>
          </section>

          <InlineMath math={`\\textbf{Résultats de l’Effort tranchant :}`} />

          <InlineMath math={`S_t = ${results.St}~\\text{cm}`} />
          <InlineMath math={`S_{t\\max} = ${results.Stmax}~\\text{cm}`} />

          <InlineMath math={`\\text{Le diamètre des armatures est :}`} />
          <InlineMath math={`\\varphi_t = ${results.phiT}~\\text{mm}`} />

          <InlineMath math={`\\text{${results.cour1}}`}/>
          <InlineMath math={`\\text{${results.autres}}`}/>

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
