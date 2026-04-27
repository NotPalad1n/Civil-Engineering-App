// Icône Dalle : Prisme plat (Parfait)
export const SlabIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 -1 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" className={className}>
    <path d="M3 10L12 6L21 10L12 14L3 10Z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3 10V13L12 17L21 13V10" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 14V17" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const BeamIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 -0.5 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" className={className}>
    {/* Face supérieure : 'a' reste minimal, angles isométriques 30° */}
    <path d="M4 12L18 5L20 6L6 13L4 12Z" strokeLinecap="round" strokeLinejoin="round" />
    
    {/* Retombée : 'b' réduit (hauteur de 5 unités au lieu de 10) */}
    <path d="M4 12V17L6 18L20 11V6" strokeLinecap="round" strokeLinejoin="round" />
    
    {/* Arête intérieure de la retombée (jonction isométrique) */}
    <path d="M6 13V18" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Icône Poteau : Vertical pur (Parfait)
export const ColumnIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" className={className}>
    <path d="M9 6L12 4L15 6L12 8L9 6Z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 6V18L12 20L15 18V6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 8V20" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const FootingIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 2 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" className={className}>
    {/* Base de la semelle (Parties visibles uniquement) */}
    {/* Arêtes verticales et contours du bas */}
    <path d="M4 14V17L12 21L20 17V14" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 18V21" strokeLinecap="round" strokeLinejoin="round" />
    
    {/* Face supérieure de la semelle : On "coupe" le tracé au niveau du fût */}
    {/* On dessine le V de devant et on s'arrête aux bords du poteau à l'arrière */}
    <path d="M10 11L4 14L12 18L20 14L14 11" strokeLinecap="round" strokeLinejoin="round" />
    
    {/* Fut de poteau allongé et centré (Le tracé reste inchangé) */}
    {/* Face supérieure du fût */}
    <path d="M10 8L12 7L14 8L12 9L10 8Z" strokeLinecap="round" strokeLinejoin="round" />
    {/* Arêtes verticales du fût */}
    <path d="M10 8V14L12 15L14 14V8" strokeLinecap="round" strokeLinejoin="round" />
    {/* Arête centrale intérieure */}
    <path d="M12 9V15" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const StripFootingIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 2 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" className={className}>
    {/* Base de la semelle (Parties visibles uniquement) */}
    {/* Arêtes verticales et contours du bas */}
    <path d="M4 14V17L12 21L20 17V14" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 18V21" strokeLinecap="round" strokeLinejoin="round" />
    
    {/* Face supérieure de la semelle : On "coupe" le tracé au niveau du fût */}
    {/* On dessine le V de devant et on s'arrête aux bords du poteau à l'arrière */}
    <path d="M10 11L4 14L12 18L20 14L14 11" strokeLinecap="round" strokeLinejoin="round" />
    
    {/* Fut de poteau allongé et centré (Le tracé reste inchangé) */}
    {/* Face supérieure du fût */}
    <path d="M10 8L12 7L14 8L12 9L10 8Z" strokeLinecap="round" strokeLinejoin="round" />
    {/* Arêtes verticales du fût */}
    <path d="M10 8V14L12 15L14 14V8" strokeLinecap="round" strokeLinejoin="round" />
    {/* Arête centrale intérieure */}
    <path d="M12 9V15" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);