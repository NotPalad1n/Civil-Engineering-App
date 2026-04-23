import ToolCard from './ToolCard';
import { Building2, Ruler, Waves, Mountain, Calculator, Box } from 'lucide-react';

const BAELtools = [
  {
    title: 'Dalle pleine',
    description: 'Dimensionnement des armatures longitudinales.',
    href: '/bael/dalle',
    icon: <Box className="w-6 h-6" />
  },
  {
    title: 'Poutre BA',
    description: 'Calcul ELU/ELS des sections rectangulaires.',
    href: '/bael/poutre',
    icon: <Ruler className="w-6 h-6" />
  },
  {
    title: 'Poteau BA',
    description: "Calcul du ferraillage en compression simple.",
    href: '/bael/poteau',
    icon: <Building2 className="w-6 h-6" />
  },
  {
    title: 'Semelle Isolée',
    description: 'Vérification de la portance et calcul du ferraillage (méthode des bielles).',
    href: '/bael/semelle-isolee',
    icon: <Calculator className="w-6 h-6" />
  },
  {
    title: 'Semelle Filante',
    description: 'Vérification de la portance et calcul du ferraillage (méthode des bielles).',
    href: '/bael/semelle-filante',
    icon: <Calculator className="w-6 h-6" />
  }
];

const Geotools = [
  {
    title: 'Corrélations',
    description: 'Estimation des paramètres mécaniques à partir des essais in-situ (SPT, CPT).',
    href: '/geotechnique/correlations',
    icon: <Waves className="w-6 h-6" />
  },
  {
    title: 'Fondations',
    description: 'Calcul de la capacité portante et des tassements des fondations superficielles.',
    href: '/geotechnique/fondation',
    icon: <Mountain className="w-6 h-6" />
  }
];

export default function Tools() {
  return (
    <section className="py-24 bg-white" id="tools">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Titre de la section */}
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Bibliothèque d'outils</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Des modules de calcul précis conformes aux règlements en vigueur pour optimiser vos projets de structure.
          </p>
        </div>

        {/* Section BAEL */}
        <div className="mb-20">
          <div className="flex items-center space-x-3 mb-8">
            <div className="h-8 w-1.5 bg-blue-600 rounded-full" />
            <h3 className="text-xl font-bold text-slate-800 uppercase tracking-wider">BAEL 91 mod 99</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {BAELtools.map((tool) => (
              <ToolCard key={tool.title} {...tool} />
            ))}
          </div>
        </div>

        {/* Section Géotechnique */}
        <div>
          <div className="flex items-center space-x-3 mb-8">
            <div className="h-8 w-1.5 bg-blue-400 rounded-full" />
            <h3 className="text-xl font-bold text-slate-800 uppercase tracking-wider">Géotechnique</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Geotools.map((tool) => (
              <ToolCard key={tool.title} {...tool} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}