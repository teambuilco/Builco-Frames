import React, { createContext, useState, useEffect } from 'react';

export type Language = 'en' | 'es';
export type Theme = 'dark' | 'light';

export const translations = {
  en: {
    nav: ['Solutions', 'Industries', 'Process', 'About'],
    contact: 'Contact Us',
    solutions: ['Mining', 'Energy', 'Government and Public Relations'],
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
    clients: ['Anglo American', 'BHP', 'Cámara de Comercio de Bogotá', 'Cisne', 'Novira', 'Congreso de la república de Colombia', 'Barrick Gold', 'Newmont'],
    locations: ['Colombia', 'Peru', 'Mexico', 'USA'],
    ctaTitle: 'Ready to scale your ',
    ctaTitleHighlight: 'global footprint?',
    ctaSub: 'Join the network of industry pioneers shaping the future of Government and Public Relations.',
    ctaBtn: 'Schedule a Strategic Consultation',
    footerDesc: 'Strategic connections for high-impact industries. Global reach, local intelligence, absolute discretion.',
    footerRights: '© 2026 BUILDING CONNECTIONS STRATEGIC PARTNERS. ALL RIGHTS RESERVED.',
    contactForm: {
      title: 'Contact Our Strategy Team',
      sub: 'Direct line to global expertise',
      name: 'Full Name',
      email: 'Institutional Email',
      message: 'Strategic Inquiry',
      submit: 'Send Inquiry',
      successTitle: 'Inquiry Received',
      successMessage: 'Our strategy team has received your message. A partner will contact you shortly to discuss your requirements.',
      close: 'Close'
    },
    privacy: {
      title: 'Habeas Data & Privacy Policy',
      sub: 'International Standard for Information Security and Privacy Compliance',
      content: [
        {
          title: '1. Legal Basis & International Compliance',
          text: 'BUILDING CONNECTIONS STRATEGIC PARTNERS (BUILCO) operates under a global compliance framework, adhering to GDPR (EU), CCPA (USA), and International Habeas Data principles. This policy governs the processing of personal and corporate data with absolute integrity and legal certainty.'
        },
        {
          title: '2. User Rights (Habeas Data)',
          text: 'Under international law, you maintain the inalienable right to access, update, rectify, and delete your data from our systems. We provide a transparent process for users to know how their information is being stored and used in accordance with the International Covenant on Civil and Political Rights regarding privacy.'
        },
        {
          title: '3. Strategic Data Processing',
          text: 'We collect high-level business intelligence data solely to facilitate elite networking and strategic industrial partnerships. This data is subject to strict non-disclosure protocols and is never processed for automated advertising or third-party commercial exploitation.'
        },
        {
          title: '4. Zero-Trust Security Infrastructure',
          text: 'Our Mino platform utilizes a Zero-Trust security model. All data is encrypted at rest and in transit using military-grade standards (AES-256). Access is restricted to authenticated entities with specific strategic clearance.'
        },
        {
          title: '5. Institutional Contact',
          text: 'For official inquiries regarding data sovereignty or to exercise your rights, please contact our Legal & Compliance department at team@builco.co'
        }
      ]
    },
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
    solutions: ['Minería', 'Energía', 'Gobierno y relaciones públicas'],
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
    clients: ['Anglo American', 'BHP', 'Cámara de Comercio de Bogotá', 'Cisne', 'Novira', 'Congreso de la república de Colombia', 'Barrick Gold', 'Newmont'],
    locations: ['Colombia', 'Perú', 'México', 'Estados Unidos'],
    ctaTitle: '¿Listo para escalar su ',
    ctaTitleHighlight: 'huella global?',
    ctaSub: 'Únase a la red de pioneros de la industria que dan forma al futuro de Gobierno y relaciones públicas.',
    ctaBtn: 'Programar una Consulta Estratégica',
    footerDesc: 'Conexiones estratégicas para industrias de alto impacto. Alcance global, inteligencia local, discreción absoluta.',
    footerRights: '© 2026 BUILDING CONNECTIONS STRATEGIC PARTNERS. TODOS LOS DERECHOS RESERVADOS.',
    contactForm: {
      title: 'Contacte a nuestro Equipo Estratégico',
      sub: 'Línea directa con expertos globales',
      name: 'Nombre Completo',
      email: 'Correo Institucional',
      message: 'Consulta Estratégica',
      submit: 'Enviar Consulta',
      successTitle: 'Consulta Recibida',
      successMessage: 'Nuestro equipo estratégico ha recibido su mensaje. Un socio se pondrá en contacto con usted a la brevedad para discutir sus requerimientos.',
      close: 'Cerrar'
    },
    privacy: {
      title: 'Habeas Data y Política de Privacidad',
      sub: 'Estándar Internacional para la Seguridad de la Información y Cumplimiento de Privacidad',
      content: [
        {
          title: '1. Base Legal y Cumplimiento Internacional',
          text: 'BUILDING CONNECTIONS STRATEGIC PARTNERS (BUILCO) opera bajo un marco de cumplimiento global, adhiriéndose al RGPD (UE), CCPA (EE. UU.) y los principios internacionales de Habeas Data. Esta política rige el procesamiento de datos personales y corporativos con absoluta integridad y certeza legal.'
        },
        {
          title: '2. Derechos del Usuario (Habeas Data)',
          text: 'Bajo el derecho internacional, usted mantiene el derecho inalienable de acceder, actualizar, rectificar y eliminar sus datos de nuestros sistemas. Proporcionamos un proceso transparente para que los usuarios sepan cómo se almacena y utiliza su información de acuerdo con el Pacto Internacional de Derechos Civiles y Políticos respecto a la privacidad.'
        },
        {
          title: '3. Procesamiento Estratégico de Datos',
          text: 'Recopilamos datos de inteligencia empresarial de alto nivel únicamente para facilitar redes de élite y asociaciones industriales estratégicas. Estos datos están sujetos a estrictos protocolos de confidencialidad y nunca se procesan para publicidad automatizada o explotación comercial por terceros.'
        },
        {
          title: '4. Infraestructura de Seguridad Zero-Trust',
          text: 'Nuestra plataforma Mino utiliza un modelo de seguridad Zero-Trust. Todos los datos están encriptados en reposo y en tránsito utilizando estándares de grado militar (AES-256). El acceso está restringido a entidades autenticadas con autorización estratégica específica.'
        },
        {
          title: '5. Contacto Institucional',
          text: 'Para consultas oficiales sobre la soberanía de los datos o para ejercer sus derechos, póngase en contacto con nuestro departamento de Legal y Cumplimiento en team@builco.co'
        }
      ]
    },
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
  isPrivacyModalOpen: boolean;
  setIsPrivacyModalOpen: (open: boolean) => void;
  isContactModalOpen: boolean;
  setIsContactModalOpen: (open: boolean) => void;
}>({
  lang: 'en',
  setLang: () => {},
  theme: 'dark',
  setTheme: () => {},
  t: translations.en,
  setIsMinoModalOpen: () => {},
  isPrivacyModalOpen: false,
  setIsPrivacyModalOpen: () => {},
  isContactModalOpen: false,
  setIsContactModalOpen: () => {}
});

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>('dark');
  const [isMinoModalOpen, setIsMinoModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const t = translations[lang];

  return (
    <AppContext.Provider value={{ 
      lang, 
      setLang, 
      theme, 
      setTheme, 
      t, 
      setIsMinoModalOpen,
      isPrivacyModalOpen,
      setIsPrivacyModalOpen,
      isContactModalOpen,
      setIsContactModalOpen 
    }}>
      {children}
    </AppContext.Provider>
  );
};
