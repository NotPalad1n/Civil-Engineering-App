'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle2, Copy, Check } from 'lucide-react';

import ErrorToast from '@/app/components/ErrorToast';

export default function ContactMe() {
    const [copied, setCopied] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [errorTitle, setErrorTitle] = useState<string | null>(null);

    const handleCopyEmail = async () => {
        try {
            await navigator.clipboard.writeText('younesoumast2@gmail.com');
            setCopied(true);
            // L'icône redevient normale après 2 secondes
            setTimeout(() => setCopied(false), 2000); 
        } catch (err) {
            console.error("Erreur lors de la copie :", err);
        }
    };

    const [formState, setFormState] = useState({
        name: '',
        email: '',
        subject: 'suggestion',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(null);
        setErrorTitle(null);

        // 1. Vérification des champs vides
        if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
        setErrorTitle("Champs incomplets");
        setErrorMessage("Veuillez remplir tous les champs obligatoires avant d'envoyer.");
        return;
        }

        // 2. Vérification du format de l'email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formState.email)) {
        setErrorTitle("Format d'email invalide");
        setErrorMessage("L'adresse email saisie n'est pas correcte (ex: nom@domaine.com).");
        return;
        }

        // Si tout est valide, envoi des données
        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 1200));
        setIsSubmitting(false);
        setSubmitted(true);
        setFormState({ name: '', email: '', subject: 'suggestion', message: '' });
    };

    return (
        <section className="bg-white pb-24" id="contact">

            <ErrorToast 
                message={errorMessage} 
                title={errorTitle} 
                onClose={() => setErrorMessage(null)} 
            />

            <div className="max-w-7xl mx-auto px-6">
                
                {/* En-tête de la section (Strictement aligné sur Tools et WhatWeProvide) */}
                <div className="text-center mb-20">
                    <motion.span 
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-blue-600 font-black uppercase tracking-[0.2em] text-xs block mb-4"
                    >
                        Une question ?
                    </motion.span>
                    
                    <motion.h2 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight"
                    >
                        Contact & Support
                    </motion.h2>
                </div>

                {/* Grille de contenu */}
                <div className="grid grid-cols-1 lg:grid-cols-2 items-start gap-12 justify-around">
                
                    {/* Colonne Gauche : Texte & Réseaux Sociaux */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6 lg:pr-8 text-center lg:text-left"
                    >
                        <h3 className="text-2xl font-bold text-slate-800 tracking-tight">
                            Développons ensemble l'ingénierie de demain
                        </h3>
                        
                        <p className="text-slate-500 leading-relaxed text-sm md:text-base">
                            Une suggestion d'implémentation réglementaire, un retour sur les calculs de béton armé, 
                            ou une opportunité professionnelle ? N'hésitez pas à laisser un message via le formulaire.
                        </p>

                        <div className="pt-4 space-y-4">
                            {/* Adresse Email Pro avec bouton Copier (mx-auto pour mobile, lg:mx-0 pour desktop) */}
                            <div className="flex items-center space-x-3 text-sm text-slate-600 bg-slate-50 border border-slate-100 px-4 py-3 rounded-xl w-fit shadow-sm mx-auto lg:mx-0">
                                <Mail className="w-5 h-5 text-blue-600 flex-shrink-0" />
                                <span className="font-medium select-all">younesoumast2@gmail.com</span>

                                {/* Bouton de copie */}
                                <button
                                    type="button"
                                    onClick={handleCopyEmail}
                                    className="m-auto p-1 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all cursor-pointer focus:outline-none"
                                    title={copied ? "Copié !" : "Copier l'adresse"}
                                >
                                    {copied ? (
                                        <Check className="w-4 h-4 text-green-600 scale-110 transition-transform" />
                                    ) : (
                                        <Copy className="w-4 h-4" />
                                    )}
                                </button>
                            </div>

                            {/* Badges de Réseaux professionnels (justify-center pour mobile, lg:justify-start pour desktop) */}
                            <div className="flex items-center justify-center lg:justify-start space-x-4 pt-2">
                                {/* LinkedIn */}
                                <a 
                                    href="https://www.linkedin.com/in/younes-oumast/" 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="flex items-center justify-center space-x-2 text-xs font-bold text-slate-600 hover:text-blue-600 transition-all duration-300 bg-slate-50 hover:bg-blue-50/50 px-4 py-3 rounded-md border border-slate-200/60 shadow-sm w-[109px]"
                                >
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                    </svg>
                                    <span>LinkedIn</span>
                                </a>

                                {/* GitHub */}
                                <a 
                                    href="https://github.com/NotPalad1n" 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="flex items-center justify-center space-x-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-all duration-300 bg-slate-50 hover:bg-slate-100 px-4 py-3 rounded-md border border-slate-200/60 shadow-sm w-[109px]"
                                >
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                    </svg>
                                    <span>GitHub</span>
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* Colonne Droite : Formulaire (Style Boîte arrondie 3XL de "WhatWeProvide") */}
                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-xl shadow-slate-100/40 w-full"
                    >
                        {submitted ? (
                        <div className="py-12 text-center space-y-4">
                            <div className="mx-auto flex items-center justify-center h-14 w-14 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                            <CheckCircle2 className="h-7 w-7" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800">Message transmis !</h3>
                            <p className="text-sm text-slate-500 max-w-sm mx-auto">
                            Votre retour a bien été pris en compte. Je vous répondrai dans les plus brefs délais.
                            </p>
                            <button 
                            onClick={() => setSubmitted(false)}
                            className="mt-4 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
                            >
                            Envoyer un autre message
                            </button>
                        </div>
                        ) : (
                            <form onSubmit={handleSubmit} noValidate className="space-y-5 text-left">
  
                                {/* Nom */}
                                <div>
                                    <label htmlFor="name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                                    Nom Complet
                                    </label>
                                    <input
                                    type="text"
                                    id="name"
                                    required
                                    value={formState.name}
                                    onChange={(e) => setFormState({...formState, name: e.target.value})}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md text-sm text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50/50 transition-all"
                                    placeholder="Ex: John Doe"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label htmlFor="email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                                    Adresse Email
                                    </label>
                                    <input
                                    type="email"
                                    id="email"
                                    required
                                    value={formState.email}
                                    onChange={(e) => setFormState({...formState, email: e.target.value})}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md text-sm text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50/50 transition-all"
                                    placeholder="Ex: john@exemple.com"
                                    />
                                </div>

                                {/* Objet de la demande */}
                                <div>
                                    <label htmlFor="subject" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                                    Objet de votre message
                                    </label>
                                    <select
                                    id="subject"
                                    value={formState.subject}
                                    onChange={(e) => setFormState({...formState, subject: e.target.value})}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md text-sm text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50/50 transition-all cursor-pointer"
                                    >
                                    <option value="suggestion">Suggestion d'évolution technique</option>
                                    <option value="bug">Signalement de bug de calcul</option>
                                    <option value="recrutement">Opportunité professionnelle / Collaboration</option>
                                    <option value="autre">Autre demande</option>
                                    </select>
                                </div>

                                {/* Message */}
                                <div>
                                    <label htmlFor="message" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                                    Message
                                    </label>
                                    <textarea
                                    id="message"
                                    required
                                    rows={4}
                                    value={formState.message}
                                    onChange={(e) => setFormState({...formState, message: e.target.value})}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md text-sm text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50/50 transition-all resize-none"
                                    placeholder="Décrivez votre besoin ou votre idée..."
                                    />
                                </div>

                                {/* Bouton d'action */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-md text-md transition-all duration-300 shadow-xl shadow-blue-100 flex items-center justify-center space-x-2 disabled:opacity-50 active:scale-[0.98] cursor-pointer"
                                >
                                    {isSubmitting ? (
                                    <span>Transmission en cours...</span>
                                    ) : (
                                    <>
                                        <span>Envoyer le message</span>
                                        <Send className="w-4 h-4 ml-1 transform transition-transform group-hover:translate-x-0.5" />
                                    </>
                                    )}
                                </button>

                            </form>
                        )}
                    </motion.div>

                </div>
            </div>
        </section>
    );
    }