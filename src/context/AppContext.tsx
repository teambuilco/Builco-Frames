import React, { createContext, useState, useEffect } from 'react';

export type Language = 'en' | 'es';
export type Theme = 'dark' | 'light';

export const translations = {
  en: {
    nav: ['Solutions', 'Industries', 'Process', 'About'],
    contact: 'Contact Us',
    badge: 'Global Strategic Partner',
    heroTitle: 'Building strategic connections in ',
    heroTitleHighlight: 'high-impact',
    heroTitleEnd: ' industries',
    heroSub: 'We bridge the gap between vision and execution in mining, energy, and Government and Public Relations. Accelerating global growth through elite networking and strategic intelligence.',
    getStarted: 'Get Started',
    portfolio: 'Our Portfolio',
    socialProof: 'Trusted by Industry Leaders Worldwide',
    servicesTitle: 'Expertise that drives ',
    servicesTitleHighlight: 'global impact',
    services: [
      {
        title: "Global Intelligence",
        description: "Deep market insights and geopolitical analysis for high-stakes decision making in emerging markets."
      },
      {
        title: "Strategic Networking",
        description: "Direct access to key stakeholders, government officials, and industry pioneers across three continents."
      },
      {
        title: "Asset Optimization",
        description: "Maximizing value in mining and energy projects through operational excellence and strategic alignment."
      }
    ],
    processTitle: 'Our Strategic Flow',
    processSub: 'A structured approach to complex global challenges.',
    steps: [
      { number: "01", title: "Analysis", desc: "We identify high-potential opportunities and map the strategic landscape." },
      { number: "02", title: "Connection", desc: "We bridge the gap between your vision and the right global partners." },
      { number: "03", title: "Execution", desc: "We facilitate the operational and strategic rollout of your project." }
    ],
    diffTitle: 'Why industry leaders ',
    diffTitleHighlight: 'choose Building Connections',
    diffItems: [
      { title: "Elite Network", desc: "Access to decision-makers that aren't on any public directory." },
      { title: "Deep Domain Expertise", desc: "Decades of experience in mining, energy, and Government and Public Relations." },
      { title: "Absolute Discretion", desc: "High-stakes strategic work requires the highest level of confidentiality." }
    ],
    yearsExp: 'Years of Strategic Excellence',
    whereWeAre: 'Where we are',
    clients: ['Anglo American', 'BHP', 'Rio Tinto', 'Glencore', 'Vale', 'Freeport-McMoRan', 'Barrick Gold', 'Newmont'],
    locations: ['Colombia', 'Chile', 'Peru', 'Australia', 'Canada', 'South Africa', 'Brazil', 'Mexico', 'USA'],
    ctaTitle: 'Ready to scale your ',
    ctaTitleHighlight: 'global footprint?',
    ctaSub: 'Join the network of industry pioneers shaping the future of Government and Public Relations.',
    ctaBtn: 'Schedule a Strategic Consultation',
    footerDesc: 'Strategic connections for high-impact industries. Global reach, local intelligence, absolute discretion.',
    footerRights: '© 2026 BUILDING CONNECTIONS STRATEGIC PARTNERS. ALL RIGHTS RESERVED.',
    mino: {
      welcome: 'Welcome to Mino',
      sub: 'Exclusive access to the strategic network',
      email: 'Email Address',
      password: 'Password',
      login: 'Log In',
      forgot: 'Forgot your password?',
      noAccount: "Don't have an account?",
      request: 'Request Access',
      registerTitle: 'Access Request',
      registerSub: 'Complete the details to join Mino',
      fullName: 'Full Name',
      company: 'Company',
      camara: 'Chamber of Commerce',
      rut: 'Tax ID (RUT)',
      submitRequest: 'Submit Request',
      backToLogin: 'Back to Login',
      forgotTitle: 'Reset Password',
      forgotSub: 'Enter your email to receive instructions',
      send: 'Send',
      resetSuccess: 'Password reset has been sent to your email',
      close: 'Close'
    }
  },
  es: {
    nav: ['Soluciones', 'Industrias', 'Proceso', 'Nosotros'],
    contact: 'Contáctanos',
    badge: 'Socio Estratégico Global',
    heroTitle: 'Construyendo conexiones estratégicas en industrias de ',
    heroTitleHighlight: 'alto impacto',
    heroTitleEnd: '',
    heroSub: 'Cerramos la brecha entre la visión y la ejecución en minería, energía e Gobierno y relaciones públicas. Acelerando el crecimiento global a través de redes de élite e inteligencia estratégica.',
    getStarted: 'Empezar',
    portfolio: 'Nuestro Portafolio',
    socialProof: 'Con la confianza de líderes de la industria en todo el mundo',
    servicesTitle: 'Experiencia que impulsa el ',
    servicesTitleHighlight: 'impacto global',
    services: [
      {
        title: "Inteligencia Global",
        description: "Información profunda del mercado y análisis geopolítico para la toma de decisiones de alto nivel en mercados emergentes."
      },
      {
        title: "Redes Estratégicas",
        description: "Acceso directo a partes interesadas clave, funcionarios gubernamentales y pioneros de la industria en tres continentes."
      },
      {
        title: "Optimización de Activos",
        description: "Maximizando el valor en proyectos de minería y energía a través de la excelencia operativa y la alineación estratégica."
      }
    ],
    processTitle: 'Nuestro Flujo Estratégico',
    processSub: 'Un enfoque estructurado para desafíos globales complejos.',
    steps: [
      { number: "01", title: "Análisis", desc: "Identificamos oportunidades de alto potencial y mapeamos el panorama estratégico." },
      { number: "02", title: "Conexión", desc: "Cerramos la brecha entre su visión y los socios globales adecuados." },
      { number: "03", title: "Ejecución", desc: "Facilitamos el despliegue operativo y estratégico de su proyecto." }
    ],
    diffTitle: 'Por qué los líderes ',
    diffTitleHighlight: 'eligen Building Connections',
    diffItems: [
      { title: "Red de Élite", desc: "Acceso a tomadores de decisiones que no están en ningún directorio público." },
      { title: "Experiencia Profunda", desc: "Décadas de experiencia en minería, energía e Gobierno y relaciones públicas." },
      { title: "Discreción Absoluta", desc: "El trabajo estratégico de alto nivel requiere el más alto nivel de confidencialidad." }
    ],
    yearsExp: 'Años de Excelencia Estratégica',
    whereWeAre: 'En donde estamos',
    clients: ['Anglo American', 'BHP', 'Rio Tinto', 'Glencore', 'Vale', 'Freeport-McMoRan', 'Barrick Gold', 'Newmont'],
    locations: ['Colombia', 'Chile', 'Perú', 'Australia', 'Canadá', 'Sudáfrica', 'Brasil', 'México', 'Estados Unidos'],
    ctaTitle: '¿Listo para escalar su ',
    ctaTitleHighlight: 'huella global?',
    ctaSub: 'Únase a la red de pioneros de la industria que dan forma al futuro de Gobierno y relaciones públicas.',
    ctaBtn: 'Programar una Consulta Estratégica',
    footerDesc: 'Conexiones estratégicas para industrias de alto impacto. Alcance global, inteligencia local, discreción absoluta.',
    footerRights: '© 2026 BUILDING CONNECTIONS STRATEGIC PARTNERS. TODOS LOS DERECHOS RESERVADOS.',
    mino: {
      welcome: 'Bienvenido a Mino',
      sub: 'Acceso exclusivo a la red estratégica',
      email: 'Correo Electrónico',
      password: 'Contraseña',
      login: 'Iniciar Sesión',
      forgot: '¿Olvidó su contraseña?',
      noAccount: '¿No tiene una cuenta?',
      request: 'Solicitar Acceso',
      registerTitle: 'Solicitud de Acceso',
      registerSub: 'Complete los datos para unirse a Mino',
      fullName: 'Nombre Completo',
      company: 'Empresa',
      camara: 'Cámara de Comercio',
      rut: 'RUT',
      submitRequest: 'Enviar Solicitud',
      backToLogin: 'Volver al Inicio de Sesión',
      forgotTitle: 'Restablecer Contraseña',
      forgotSub: 'Ingrese su correo para recibir las instrucciones',
      send: 'Enviar',
      resetSuccess: 'Se ha enviado el restablecimiento de la contraseña a su correo electrónico',
      close: 'Cerrar'
    }
  }
};

export const AppContext = createContext<{
  lang: Language;
  setLang: (l: Language) => void;
  theme: Theme;
  setTheme: (t: Theme) => void;
  t: typeof translations.en;
  setIsMinoModalOpen: (open: boolean) => void;
}>({
  lang: 'en',
  setLang: () => {},
  theme: 'dark',
  setTheme: () => {},
  t: translations.en,
  setIsMinoModalOpen: () => {}
});

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>('dark');
  const [isMinoModalOpen, setIsMinoModalOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const t = translations[lang];

  return (
    <AppContext.Provider value={{ lang, setLang, theme, setTheme, t, setIsMinoModalOpen }}>
      {children}
    </AppContext.Provider>
  );
};
