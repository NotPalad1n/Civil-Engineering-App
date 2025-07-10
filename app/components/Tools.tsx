import ToolCard from './ToolCard';

const tools = [
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
    description: 'Dimensionne une semelle en béton armé sous un poteau.',
    href: '/semelle',
  },

  // Add more tools here as needed
];

export default function Tools() {
  return (
    <div className="bg-white py-16 px-6" id="tools">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-10">Outils</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {tools.map((tool) => (
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
