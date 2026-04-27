import ToolCard from './ToolCard';

import { SlabIcon, BeamIcon, ColumnIcon, FootingIcon, StripFootingIcon } from './Icons/StructuralIcons';
import { EqualApproximately} from 'lucide-react';


const BAELtools = [
  {
    title: 'Dalle pleine',
    description: 'Ferraillage des dalles pleines.',
    href: '/bael/dalle',
    icon: <SlabIcon className="w-8 h-8" />
  },
  {
    title: 'Poutre BA',
    description: 'Calcul ELU/ELS des sections rectangulaires.',
    href: '/bael/poutre',
    icon: <BeamIcon className="w-8 h-8" />
  },
  {
    title: 'Poteau BA',
    description: "Calcul du ferraillage longitudinal et transversal.",
    href: '/bael/poteau',
    icon: <ColumnIcon className="w-8 h-8" />
  },
  {
    title: 'Semelle isolée',
    description: 'Vérification des contraintes au sol et ferraillage de la base.',
    href: '/bael/semelle-isolee',
    icon: <FootingIcon className="w-8 h-8" />
  },
  {
    title: 'Semelle filante',
    description: 'Vérification des contraintes au sol et ferraillage de la base.',
    href: '/bael/semelle-filante',
    icon: <StripFootingIcon className="w-8 h-8" />
  }
];

const Geotools = [
  {
    title: 'Corrélations',
    description: 'Estimation des paramètres mécaniques à partir des essais in-situ.',
    href: '/geotechnique/correlations',
    icon: <EqualApproximately className="w-6 h-6" />
  },
  {
    title: 'Fondations',
    description: 'Calcul de la capacité portante et des tassements des fondations superficielles.',
    href: '/geotechnique/fondation',
    icon: <FootingIcon className="w-8 h-8" />
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