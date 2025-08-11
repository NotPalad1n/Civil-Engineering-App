import ToolCard from './ToolCard';

const BAELtools = [
  {
    title: 'Dalle en béton armé',
    description: 'Calcule les sections de ferraillage pour une dalle pleine en béton armé.',
    href: '/dalle',
  },
  {
    title: 'Poutre en béton armé',
    description: 'Calcule la section d’armature d’une poutre en béton armé.',
    href: '/poutre',
  },
  {
    title: 'Poteau en béton armé',
    description: "Calcule la section d’armature d’un poteau en béton armé.",
    href: '/poteau',
  },
  {
    title: 'Semelle isolée',
    description: 'Calcule la section d’armature d’une semelle isolée en béton armé.',
    href: '/semelle',
  },
  {
    title: 'Semelle filante',
    description: 'Calcule la section d’armature d’une semelle filante en béton armé.',
    href: '/semelle-filante',
  },

  // Add more tools here as needed
];

const Geotools = [
  {
    title: 'Corrélations',
    description: 'Description.',
    href: '/correlations',
  },
  {
    title: 'Fondation',
    description: 'Description.',
    href: '/fondation',
  },


  // Add more tools here as needed
];

export default function Tools() {
  return (
    <div className="py-16 px-6" id="tools">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-10">Outils</h2>
        <p className="text-lg font-medium text-center mb-10 cursor-default">BAEL 91 mod 99</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {BAELtools.map((tool) => (
            <ToolCard
              key={tool.title}
              title={tool.title}
              description={tool.description}
              href={tool.href}
            />
          ))}
        </div>
        <p className="text-lg font-medium text-center mb-10 mt-10 cursor-default">Géotechnique</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {Geotools.map((tool) => (
            <ToolCard
              key={tool.title}
              title={tool.title}
              description={tool.description}
              href={tool.href}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
