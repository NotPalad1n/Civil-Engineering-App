import Link from 'next/link';

interface ToolCardProps {
  title: string;
  description: string;
  href: string;
}

export default function ToolCard({ title, description, href }: ToolCardProps) {
  return (
    <Link href={href}>
      <div className="flex flex-col justify-center text-center bg-white rounded-2xl p-4 border border-gray-200 hover:shadow-xl hover:border-blue-500 transition-all duration-300 max-w-[275px] min-h-[200px] mx-auto h-full">
        <h3 className="text-2xl font-semibold font-outfit mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </Link>
  );
}