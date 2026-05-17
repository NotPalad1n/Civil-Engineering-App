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
        // bg-white -> dark:bg-slate-900 | border-slate-100 -> dark:border-slate-800/60
        className="group flex flex-col bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800/60 shadow-sm hover:shadow-xl dark:hover:shadow-none hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 h-full relative overflow-hidden"
      >
        {/* Background Decoration : bg-blue-50 -> dark:bg-blue-950/30 */}
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-50 dark:bg-blue-950/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Icon Container : bg-blue-50 -> dark:bg-blue-950/50 | text-blue-600 -> dark:text-blue-400 */}
        <div className="w-12 h-12 bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-600 rounded-xl flex items-center justify-center mb-5 group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-blue-600 dark:group-hover:text-white transition-colors duration-300">
          {icon}
        </div>

        {/* Titre : text-slate-800 -> dark:text-slate-100 */}
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2 transition-colors duration-300">
          {title}
        </h3>
        
        {/* Description : text-slate-500 -> dark:text-slate-400 */}
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6 flex-grow transition-colors duration-300">
          {description}
        </p>

        {/* Lien d'action : text-blue-600 -> dark:text-blue-400 */}
        <div className="flex items-center text-blue-600 dark:text-blue-600 text-sm font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
          Lancer l'outil <ChevronRight className="ml-1 w-4 h-4" />
        </div>
      </motion.div>
    </Link>
  );
}