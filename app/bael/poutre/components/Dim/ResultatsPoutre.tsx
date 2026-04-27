"use client";

import { useRef } from 'react';
import { InlineMath } from 'react-katex';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';

import { CadresResults, Warning } from './calculs';

interface Results {
  Ast?: number;
  Asc?: number;
  Asts?: number;
  Ascs?: number;
  Stmax?: number;
  St?: number;
  phiT?: number;
  cadresResults?: CadresResults;
  warning?: Warning | null;
  largeur?: number;
  h?: number;
  Mu?: number;
  Mser?: number;
  Vu?: number;
  fc28?: number;
  fe?: number;
  fissuration?: string;
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
      // pdf.save(`Note_de_calcul_Poutre_${results.largeur}x${results.hauteur}.pdf`);
      pdf.save(`Note_de_calcul_Poutre.pdf`);

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
              <InlineMath math={`\\text{I. Dimensions}`} />
            </div>
            <div className="flex flex-col items-center bg-gray-50 py-3 rounded">
              <InlineMath math={`b = ${results.largeur}~\\text{cm ; } h = ${results.h}~\\text{cm}`} />
            </div>
          </section>

          {/* II. Sollicitations */}
          <section className="w-full">
            <div className="text-left text-gray-800 font-bold mb-2 border-l-4 border-blue-600 pl-2">
              <InlineMath math={`\\text{II. Sollicitations}`} />
            </div>
            <div className="flex flex-col items-center bg-gray-50 py-3 rounded">
              <InlineMath math={`M_{u} = ${results.Mu}~\\text{kN m ; } M_{ser} = ${results.Mser}~\\text{kN m}`} />
              <InlineMath math={`V_{u} = ${results.Vu}~\\text{kN}`} />
            </div>
          </section>

          {/* III. Matériaux */}
          <section className="w-full">
            <div className="text-left text-gray-800 font-bold mb-2 border-l-4 border-blue-600 pl-2">
              <InlineMath math={`\\text{III. Matériaux}`} />
            </div>
            <div className="text-center bg-gray-50 py-3 rounded">
              <InlineMath math={`f_{c28} = ${results.fc28}~\\text{MPa ; } f_{e} = ${results.fe}~\\text{MPa}`} />
            </div>
          </section>

          {/* IV. Résultats à l’ELU */}
          <section className="w-full">
            <div className="text-left text-gray-800 font-bold mb-2 border-l-4 border-blue-600 pl-2">
              <InlineMath math={`\\text{IV. Résultats à l’ELU}`} />
            </div>
            <div className="flex flex-col items-center bg-gray-50 py-3 rounded">
              <InlineMath math={`A_{st} = ${results.Ast}~\\text{cm}^2`} />
              <InlineMath math={`A_{sc} = ${results.Asc}~\\text{cm}^2`} />
            </div>
          </section>
          
          {/* V. Résultats à l’ELS */}
          <section className="w-full">
            <div className="text-left text-gray-800 font-bold mb-2 border-l-4 border-blue-600 pl-2">
              <InlineMath math={`\\text{V. Résultats à l’ELS}`} />
            </div>
            <div className="flex flex-col items-center bg-gray-50 py-3 rounded">
              <InlineMath math={`A_{st} = ${results.Asts}~\\text{cm}^2`} />
              <InlineMath math={`A_{sc} = ${results.Ascs}~\\text{cm}^2`} />
            </div>
          </section>

          {/* VI. Résultats de l’Effort tranchant */}
          <section className="w-full">
            <div className="text-left text-gray-800 font-bold mb-2 border-l-4 border-blue-600 pl-2">
              <InlineMath math={`\\text{VI. Résultats de l’Effort tranchant}`} />
            </div>
            <div className="flex flex-col items-center bg-gray-50 py-3 rounded">
              <InlineMath math={`\\text{fissurations : ${results.fissuration}}`} />
              <InlineMath math={`S_t = ${results.St}~\\text{cm}`} />
              <InlineMath math={`S_{t\\max} = ${results.Stmax}~\\text{cm}`} />
            </div>
          </section>

          {/* IV. Répartition des armatures transversales */}
          {/* On n'affiche la section que si cadresResults existe ET qu'il n'y a pas de warning */}
          {results.cadresResults && !results.warning && (
            <section className="w-full">
              {/* Titre avec bordure bleue à gauche */}
              <div className="text-left text-gray-800 font-bold mb-2 border-l-4 border-blue-600 pl-2">
                <InlineMath math={`\\text{VII. Répartition des armatures}`} />
              </div>

              {/* Bloc de résultats à fond gris */}
              <div className="flex flex-col items-center bg-gray-50 py-4 rounded-lg space-y-3">
                
                {/* 1. Diamètre des armatures */}
                <InlineMath math={`\\text{Diamètre retenu : } \\phi_t = ${results.cadresResults.phiT} \\text{ mm}`} />

                {/* 2. Position du premier cadre */}
                <InlineMath 
                  math={`\\text{Premier cadre à } ${results.cadresResults.distFirst} \\text{ cm du nu}`} 
                />

                {/* 3. Logique de répartition (Constant vs Caquot) */}
                {results.cadresResults.method === "Constant" ? (
                  <InlineMath 
                    math={`\\text{Espacement constant de } ${results.cadresResults.distOthers} \\text{ cm}`} 
                  />
                ) : (
                  <div className="flex flex-col items-center space-y-1">
                    <InlineMath math={`\\text{Répartition : Série de Caquot}`} />
                    <span className="text-[10px] text-gray-400 italic">
                      (7, 8, 9, 10, 11, 13, 16, 20, 25, 35, 40)
                    </span>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Affichage de l'alerte de dimensionnement si elle existe */}
          {results.warning && (
            <section className="w-full">

            {/* Titre avec bordure bleue à gauche */}
            <div className="text-left text-gray-800 font-bold mb-2 border-l-4 border-blue-600 pl-2">
              <InlineMath math={`\\text{VII. Répartition des armatures}`} />
            </div>

            <div className="flex items-start gap-3 p-4 bg-red-50 border-l-4 border-red-600 rounded-r-lg shadow-sm">
              {/* Icône d'alerte */}
              <div className="mt-0.5">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              
              <div className="flex flex-col">
                <p className="text-red-800 font-bold text-sm">Alerte de dimensionnement</p>
                
                {/* Phrase de l'erreur avec LaTeX uniquement sur le symbole */}
                <p className="text-red-700 text-sm italic">
                  Section insuffisante : <InlineMath math="\tau_u" /> ({results.warning.tauU} MPa) 
                  dépasse la limite de {results.warning.limit} MPa.
                </p>
              </div>
            </div>

            </section>

          )}

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
