'use client';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface ToolCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
}

export default function ToolCard({ title, description, href, icon }: ToolCardProps) {
  return (
    <Link href={href}>
      <motion.div 
        whileHover={{ y: -5 }}
        className="group flex flex-col bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-500 transition-all duration-300 h-full relative overflow-hidden"
      >
        {/* Background Decoration */}
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Icon Container */}
        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-5 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
          {icon}
        </div>

        <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow">{description}</p>

        <div className="flex items-center text-blue-600 text-sm font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
          Lancer l'outil <ChevronRight className="ml-1 w-4 h-4" />
        </div>
      </motion.div>
    </Link>
  );
}