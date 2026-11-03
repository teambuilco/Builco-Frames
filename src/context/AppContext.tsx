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
    heroSub: 'We partner closely with leaders and institutions to transform bold vision into tangible reality across mining, energy, and Government and Public Relations. We forge strategic bridges and guide high-stakes decisions with rigorous precision, authentic proximity, and absolute discretion.',
    getStarted: 'Schedule Advisory',
    portfolio: 'Explore Verticals',
    socialProof: 'Trusted by Sovereign Entities & Industry Pioneers Worldwide',
    metrics: [
      { value: "$100M+", label: "Capital & Assets Advised" },
      { value: "15+", label: "Years Strategic Advisory" },
      { value: "4", label: "Strategic Countries" },
      { value: "100%", label: "Strict Sovereign Discretion" }
    ],
    corridorWidget: {
      tag: "LIVE STRATEGIC TELEMETRY",
      status: "SECURE LINK ACTIVE",
      corridors: [
        {
          id: "mining",
          industry: "Mining & Critical Minerals",
          hubs: "Sur de Córdoba ↔ Bajo Cauca Antioqueño",
          focus: "Gold, Concessions & Regulation",
          security: "Active Advisory",
          milestones: [
            { title: "Mining Formalization", desc: "Safe and efficient mining through the legal transition of regional operations into traceable, bankable, and ESG-compliant concessions." },
            { title: "Social Responsibility in Mining Regions", desc: "High-trust community compacts, local coexistence, and shared socioeconomic value." },
            { title: "Self-Sustaining Project Development", desc: "Creation of diversified economic environments, circular economic initiatives, regional bioeconomy, and regenerative post-extractive stewardship." }
          ]
        },
        {
          id: "energy",
          industry: "Energy Transition & Infrastructure",
          hubs: "Medellín ↔ Chocó",
          focus: "Grid Modernization, Solar & Green H2",
          security: "Sovereign Framework • Active Advisory",
          milestones: [
            { title: "Solar Park Deployment & Solar Project Management", desc: "End-to-end structuring, environmental permitting, land management, and EPC/O&M supervision for utility-scale photovoltaic plants and resilient clean energy microgrids." },
            { title: "Grid Modernization & Resilience", desc: "High-capacity transmission lines integrated into regional energy markets." },
            { title: "Self-Sustaining Green Capital", desc: "Surplus generation reinvested into decentralized local productive autonomy." }
          ]
        },
        {
          id: "government",
          industry: "Government & Public Relations",
          hubs: "Bogotá",
          focus: "Bilateral Alliances & Regulatory Navigation",
          security: "High Protocol • Institutional Clearance",
          milestones: [
            { title: "Bilateral Sovereign Pacts", desc: "High-protocol alignment between ministries, regulatory agencies, and institutional investors." },
            { title: "Legal Certainty & Permitting", desc: "Transparent compliance frameworks for long-term direct foreign investment." },
            { title: "Sustainable Territorial Governance", desc: "Structured prior-consultation mechanisms fostering durable regional progress." }
          ]
        }
      ]
    },
    divisionsTitle: "Business Verticals",
    divisionsSub: "Specialized verticals engineered to navigate complex regulatory architectures, sovereign alignment, and capital deployment.",
    divisions: [
      {
        id: "mining",
        path: "/mining",
        badge: "Critical Minerals",
        title: "Mining & Natural Resources",
        desc: "Unlocking mineral potential across Latin America and global markets through responsible, safe, and efficient mining under sustainable ESG frameworks and institutional governance.",
        stat: "98% Regulatory Clearance Rate"
      },
      {
        id: "energy",
        path: "/energy",
        badge: "Clean Transition",
        title: "Energy & Infrastructure",
        desc: "Connecting institutional capital with strategic energy assets to accelerate grid modernization, renewables, and decarbonization corridors.",
        stat: "GW-Scale Corridors Mapped"
      },
      {
        id: "government",
        path: "/government",
        badge: "Institutional Protocol",
        title: "Government & Public Relations",
        desc: "Fostering high-trust public-private alliances, legislative compliance, and bilateral diplomatic relationships.",
        stat: "Tier-1 Stakeholder Direct Access"
      }
    ],
    minoSpotlight: {
      badge: "Proprietary Sovereign Tech",
      title: "Mino™ - Technology for responsible mining.",
      desc: "AI-powered marketplace for mineral management. Our encrypted digital ecosystem optimizes traceability, confidential asset exchange, and industrial supply chains with predictive intelligence and Zero-Trust architecture.",
      cta: "Request Terminal Access",
      features: [
        "Encrypted Asset Directory",
        "Direct Bilateral Dealflow",
        "Verified Institutional Counterparts"
      ]
    },
    servicesTitle: 'Expertise that drives ',
    servicesTitleHighlight: 'global impact',
    services: [
      {
        title: "Global Intelligence",
        description: "Deep market insights and geopolitical analysis for high-stakes decision making in emerging markets."
      },
      {
        title: "Strategic Networking",
        description: "Direct access to key stakeholders, government officials, and industry pioneers."
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
    clients: ['Alcaldía de Medellín', 'Agencia Nacional de Minería', 'Cámara de Comercio de Bogotá', 'Cisne', 'Novira', 'Congreso de la república de Colombia'],
    locations: ['Colombia', 'Peru', 'Mexico', 'USA'],
    ctaTitle: 'Ready to scale your ',
    ctaTitleHighlight: 'global footprint?',
    ctaSub: 'Join the network of industry pioneers shaping the future of Government and Public Relations.',
    ctaBtn: 'Schedule a Strategic Consultation',
    footerDesc: 'Strategic connections for high-impact industries. Global reach, local intelligence, absolute discretion.',
    footerRights: '© 2026 BUILDING CONNECTIONS STRATEGIC PARTNERS. ALL RIGHTS RESERVED.',
    footerPrivacySegment: {
      badge: 'Institutional Governance & Regulatory Compliance',
      title: 'Privacy Policy & Habeas Data',
      desc: 'Access our official data protection framework and Habeas Data policy in accordance with Colombian Statutory Law 1581 of 2012, Regulatory Decree 1377 of 2013, and international privacy standards.',
      viewPdf: 'View Official PDF Document',
      downloadPdf: 'Download PDF',
      lawTag: 'Statutory Law 1581 of 2012 • Habeas Data'
    },
    contactForm: {
      title: 'Contact Our Strategy Team',
      sub: 'Direct line to global expertise',
      name: 'Full Name',
      email: 'Institutional Email',
      message: 'Strategic Inquiry',
      successTitle: 'Inquiry Submitted',
      successMessage: 'You will be contacted in the coming days.',
      close: 'Return to Home',
      redirecting: 'Returning to home page in a few moments...'
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
    heroSub: 'Acompañamos de cerca a líderes y organizaciones a convertir grandes visiones en realidades tangibles en minería, energía y Gobierno y Relaciones Públicas. Construimos puentes estratégicos y facilitamos decisiones de alto impacto con rigor técnico, cercanía humana y absoluta confidencialidad.',
    getStarted: 'Solicitar Asesoría',
    portfolio: 'Ver Verticales',
    socialProof: 'Con la confianza de entidades soberanas y líderes industriales en todo el mundo',
    metrics: [
      { value: "$100M+", label: "Capital y Activos Asesorados" },
      { value: "15+", label: "Años de Asesoría Estratégica" },
      { value: "4", label: "Países Estratégicos" },
      { value: "100%", label: "Discreción y Confidencialidad" }
    ],
    corridorWidget: {
      tag: "TELEMETRÍA ESTRATÉGICA EN VIVO",
      status: "ENLACE SEGURO ACTIVO",
      corridors: [
        {
          id: "mining",
          industry: "Minería y Minerales Críticos",
          hubs: "Sur de Córdoba ↔ Bajo Cauca Antioqueño",
          focus: "Oro, concesiones y regulación",
          security: "Asesoría Activa",
          milestones: [
            { title: "Formalización Minera", desc: "Minería segura y eficiente mediante la transición legal de operaciones hacia esquemas concesionados, bancarizables y con estricta trazabilidad." },
            { title: "Responsabilidad Social en Zonas Mineras", desc: "Pactos comunitarios de alto impacto, convivencia en territorio y creación de valor compartido." },
            { title: "Creación de Proyectos Autosostenibles", desc: "Creación de entornos económicos diversificados, encadenamientos productivos circulares, bioeconomía regional y regeneración ambiental post-extracción." }
          ]
        },
        {
          id: "energy",
          industry: "Transición Energética e Infraestructura",
          hubs: "Medellín ↔ Chocó",
          focus: "Modernización de Red, Solar e Hidrógeno Verde",
          security: "Marco Soberano • Asesoría Activa",
          milestones: [
            { title: "Despliegue de parques solares y gestión de proyectos solares", desc: "Estructuración integral, ingeniería, licenciamiento ambiental, gestión predial y supervisión EPC/O&M para plantas fotovoltaicas a gran escala y microrredes energéticas sostenibles." },
            { title: "Modernización de Red e Interconexión", desc: "Líneas de transmisión de alta capacidad integradas a mercados regionales." },
            { title: "Fondos de Desarrollo Autosostenible", desc: "Reinversión de excedentes en autonomía productiva local y descarbonización." }
          ]
        },
        {
          id: "government",
          industry: "Gobierno y Relaciones Públicas",
          hubs: "Bogotá",
          focus: "Alianzas Bilaterales y Navegación Regulatoria",
          security: "Alto Protocolo • Autorización Institucional",
          milestones: [
            { title: "Pactos Soberanos Bilaterales", desc: "Articulación de alto protocolo entre ministerios, agencias reguladoras y capital institucional." },
            { title: "Seguridad Jurídica y Licenciamiento", desc: "Estructuración de garantías de estabilidad para inversión extranjera directa." },
            { title: "Gobernanza Territorial Sostenible", desc: "Mecanismos transparentes de diálogo social y acuerdos territoriales duraderos." }
          ]
        }
      ]
    },
    divisionsTitle: "Verticales de Negocio",
    divisionsSub: "Divisiones especializadas diseñadas para navegar la complejidad regulatoria, el despliegue de capital y la ejecución en territorio.",
    divisions: [
      {
        id: "mining",
        path: "/mining",
        badge: "Minerales Críticos",
        title: "Minería y Recursos Naturales",
        desc: "Desbloqueando el potencial mineral en las Américas mediante una minería responsable, segura y eficiente, bajo estándares ESG sostenibles y respaldo institucional de primer orden.",
        stat: "98% Tasa de Aprobación Regulatoria"
      },
      {
        id: "energy",
        path: "/energy",
        badge: "Transición Limpia",
        title: "Energía e Infraestructura",
        desc: "Conectando capital institucional con activos soberanos para acelerar la expansión de redes, granjas solares y corredores de descarbonización.",
        stat: "Corredores Mapeados a Escala GW"
      },
      {
        id: "government",
        path: "/government",
        badge: "Protocolo Institucional",
        title: "Gobierno y Relaciones Públicas",
        desc: "Construyendo pactos público-privados de alta confianza, cumplimiento legislativo y relaciones diplomáticas bilaterales.",
        stat: "Acceso Directo a Actores Clave"
      }
    ],
    minoSpotlight: {
      badge: "Tecnología Soberana Propietaria",
      title: "Mino™ - Tecnología para una minería responsable",
      desc: "Marketplace con AI para gestión de minerales. Nuestro ecosistema digital cifrado optimiza la trazabilidad, el intercambio confidencial de activos y la cadena de suministro con inteligencia artificial y arquitectura Zero-Trust.",
      cta: "Solicitar Acceso a la Terminal",
      features: [
        "Directorio Seguro de Activos",
        "Flujo Directo de Acuerdos Bilaterales",
        "Contrapartes Institucionales Verificadas"
      ]
    },
    servicesTitle: 'Experiencia que impulsa el ',
    servicesTitleHighlight: 'impacto global',
    services: [
      {
        title: "Inteligencia Global",
        description: "Información profunda del mercado y análisis geopolítico para la toma de decisiones de alto nivel en mercados emergentes."
      },
      {
        title: "Redes Estratégicas",
        description: "Acceso directo a partes interesadas clave, funcionarios gubernamentales y pioneros de la industria."
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
    clients: ['Alcaldía de Medellín', 'Agencia Nacional de Minería', 'Cámara de Comercio de Bogotá', 'Cisne', 'Novira', 'Congreso de la república de Colombia'],
    locations: ['Colombia', 'Perú', 'México', 'Estados Unidos'],
    ctaTitle: '¿Listo para escalar su ',
    ctaTitleHighlight: 'huella global?',
    ctaSub: 'Únase a la red de pioneros de la industria que dan forma al futuro de Gobierno y relaciones públicas.',
    ctaBtn: 'Programar una Consulta Estratégica',
    footerDesc: 'Conexiones estratégicas para industrias de alto impacto. Alcance global, inteligencia local, discreción absoluta.',
    footerRights: '© 2026 BUILDING CONNECTIONS STRATEGIC PARTNERS. TODOS LOS DERECHOS RESERVADOS.',
    footerPrivacySegment: {
      badge: 'Gobernanza Institucional & Cumplimiento Regulatorio',
      title: 'Políticas de Privacidad y Habeas Data',
      desc: 'Consulte nuestro marco oficial de protección de datos personales y política de Habeas Data conforme a la Ley Estatutaria 1581 de 2012, Decreto Reglamentario 1377 de 2013 y estándares internacionales de privacidad.',
      viewPdf: 'Ver Documento Oficial en PDF',
      downloadPdf: 'Descargar PDF',
      lawTag: 'Ley Estatutaria 1581 de 2012 • Habeas Data'
    },
    contactForm: {
      title: 'Contacte a nuestro Equipo Estratégico',
      sub: 'Línea directa con expertos globales',
      name: 'Nombre Completo',
      email: 'Correo Institucional',
      message: 'Consulta Estratégica',
      submit: 'Enviar Consulta',
      successTitle: 'Requerimiento Enviado',
      successMessage: 'Se le contactará en los próximos días.',
      close: 'Volver al Inicio',
      redirecting: 'Redirigiendo a la página de inicio...'
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
  isMinoModalOpen: boolean;
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
  isMinoModalOpen: false,
  isPrivacyModalOpen: false,
  setIsPrivacyModalOpen: () => {},
  isContactModalOpen: false,
  setIsContactModalOpen: () => {}
});

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('builco_lang_v2') as Language | null;
      if (saved === 'en' || saved === 'es') return saved;
    }
    return 'en'; // default to English as requested
  });

  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('builco_theme') as Theme | null;
      if (saved === 'dark' || saved === 'light') return saved;
    }
    return 'dark';
  });

  const [isMinoModalOpen, setIsMinoModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    const isDark = theme === 'dark';
    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.classList.toggle('light', !isDark);
    document.documentElement.style.colorScheme = theme;
    try {
      localStorage.setItem('builco_theme', theme);
    } catch {
      // ignore
    }
  }, [theme]);

  useEffect(() => {
    try {
      localStorage.setItem('builco_lang_v2', lang);
      document.documentElement.lang = lang;
    } catch {
      // ignore
    }
  }, [lang]);

  const t = translations[lang];

  return (
    <AppContext.Provider value={{ 
      lang, 
      setLang, 
      theme, 
      setTheme, 
      t, 
      isMinoModalOpen,
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
