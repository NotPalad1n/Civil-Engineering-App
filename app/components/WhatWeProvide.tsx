export default function WhatWeProvide() {
  return (
    <section className="bg-gray-50 py-16 px-6 ">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-12">
          Ce que nous proposons
        </h1>

        <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-200">
          {/* Item 1 */}
          <div className="flex-1 px-6 py-8 flex flex-col items-center text-center">
            <div className="text-4xl mb-4">📐</div>
            <h3 className="text-2xl font-semibold mb-2">Calculs de ferraillage</h3>
            <p className="text-sm text-gray-600">
              Outils simples pour dimensionner les armatures des poteaux, poutres, dalles et semelles.
            </p>
          </div>

          {/* Item 2 */}
          <div className="flex-1 px-6 py-8 flex flex-col items-center text-center">
            <div className="text-4xl mb-4">💻</div>
            <h3 className="text-2xl font-semibold mb-2">Interface intuitive</h3>
            <p className="text-sm text-gray-600">
              Une interface claire et fluide adaptée aux étudiants, techniciens et ingénieurs.
            </p>
          </div>

          {/* Item 3 */}
          <div className="flex-1 px-6 py-8 flex flex-col items-center text-center">
            <div className="text-4xl mb-4">🌐</div>
            <h3 className="text-2xl font-semibold mb-2">Accès en ligne</h3>
            <p className="text-sm text-gray-600">
              Tous les outils sont disponibles directement dans le navigateur, sans installation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
