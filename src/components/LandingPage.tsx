import React, { useState, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NetworkBackground } from './NetworkBackground';
import { ArrowRight, Globe, Zap, Shield, ChevronRight, Menu, X, Sun, Moon, Languages, ChevronDown, Check } from 'lucide-react';

type Language = 'en' | 'es';
type Theme = 'dark' | 'light';

const translations = {
  en: {
    nav: ['Solutions', 'Industries', 'Process', 'About'],
    contact: 'Contact Us',
    badge: 'Global Strategic Partner',
    heroTitle: 'Building strategic connections in ',
    heroTitleHighlight: 'high-impact',
    heroTitleEnd: ' industries',
    heroSub: 'We bridge the gap between vision and execution in mining, energy, and infrastructure. Accelerating global growth through elite networking and strategic intelligence.',
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
    diffTitleHighlight: 'choose Building Conenctions',
    diffItems: [
      { title: "Elite Network", desc: "Access to decision-makers that aren't on any public directory." },
      { title: "Deep Domain Expertise", desc: "Decades of experience in mining, energy, and infrastructure." },
      { title: "Absolute Discretion", desc: "High-stakes strategic work requires the highest level of confidentiality." }
    ],
    yearsExp: 'Years of Strategic Excellence',
    whereWeAre: 'Where we are',
    clients: ['Anglo American', 'BHP', 'Rio Tinto', 'Glencore', 'Vale', 'Freeport-McMoRan', 'Barrick Gold', 'Newmont'],
    locations: ['Colombia', 'Chile', 'Peru', 'Australia', 'Canada', 'South Africa', 'Brazil', 'Mexico', 'USA'],
    ctaTitle: 'Ready to scale your ',
    ctaTitleHighlight: 'global footprint?',
    ctaSub: 'Join the network of industry pioneers shaping the future of infrastructure.',
    ctaBtn: 'Schedule a Strategic Consultation',
    footerDesc: 'Strategic connections for high-impact industries. Global reach, local intelligence, absolute discretion.',
    footerRights: '© 2026 BUILDING CONENCTIONS STRATEGIC PARTNERS. ALL RIGHTS RESERVED.'
  },
  es: {
    nav: ['Soluciones', 'Industrias', 'Proceso', 'Nosotros'],
    contact: 'Contáctanos',
    badge: 'Socio Estratégico Global',
    heroTitle: 'Construyendo conexiones estratégicas en industrias de ',
    heroTitleHighlight: 'alto impacto',
    heroTitleEnd: '',
    heroSub: 'Cerramos la brecha entre la visión y la ejecución en minería, energía e infraestructura. Acelerando el crecimiento global a través de redes de élite e inteligencia estratégica.',
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
    diffTitleHighlight: 'eligen Building Conenctions',
    diffItems: [
      { title: "Red de Élite", desc: "Acceso a tomadores de decisiones que no están en ningún directorio público." },
      { title: "Experiencia Profunda", desc: "Décadas de experiencia en minería, energía e infraestructura." },
      { title: "Discreción Absoluta", desc: "El trabajo estratégico de alto nivel requiere el más alto nivel de confidencialidad." }
    ],
    yearsExp: 'Años de Excelencia Estratégica',
    whereWeAre: 'En donde estamos',
    clients: ['Anglo American', 'BHP', 'Rio Tinto', 'Glencore', 'Vale', 'Freeport-McMoRan', 'Barrick Gold', 'Newmont'],
    locations: ['Colombia', 'Chile', 'Perú', 'Australia', 'Canadá', 'Sudáfrica', 'Brasil', 'México', 'Estados Unidos'],
    ctaTitle: '¿Listo para escalar su ',
    ctaTitleHighlight: 'huella global?',
    ctaSub: 'Únase a la red de pioneros de la industria que dan forma al futuro de la infraestructura.',
    ctaBtn: 'Programar una Consulta Estratégica',
    footerDesc: 'Conexiones estratégicas para industrias de alto impacto. Alcance global, inteligencia local, discreción absoluta.',
    footerRights: '© 2026 BUILDING CONENCTIONS STRATEGIC PARTNERS. TODOS LOS DERECHOS RESERVADOS.'
  }
};

const AppContext = createContext<{
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

const Logo = ({ className = "w-8 h-8" }: { className?: string }) => (
  <img 
    src="https://storage.googleapis.com/aistudio-build-assets/3obsvayrmxfpx44asrww57/logo.png" 
    alt="Building Connections Logo" 
    className={className} 
    referrerPolicy="no-referrer"
  />
);

const MinoModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const { theme, lang } = useContext(AppContext);
  const t = lang === 'es' ? {
    title: 'Mino - Registro Inicial',
    sub: 'Únete a la red estratégica de minería e infraestructura.',
    name: 'Nombre Completo',
    email: 'Correo Electrónico',
    company: 'Empresa',
    message: 'Mensaje / Interés',
    submit: 'Enviar Registro',
    close: 'Cerrar'
  } : {
    title: 'Mino - Initial Registration',
    sub: 'Join the strategic network of mining and infrastructure.',
    name: 'Full Name',
    email: 'Email Address',
    company: 'Company',
    message: 'Message / Interest',
    submit: 'Submit Registration',
    close: 'Close'
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={`relative w-full max-w-2xl overflow-hidden rounded-sm shadow-2xl ${theme === 'dark' ? 'bg-charcoal border border-white/10' : 'bg-white border border-slate-200'}`}
          >
            <div className="h-32 bg-gold relative flex items-center px-10 overflow-hidden">
              <div className="absolute right-0 top-0 w-64 h-64 bg-black/10 rounded-full -mr-20 -mt-20 blur-3xl" />
              <div className="relative z-10">
                <h2 className="text-3xl font-helvetica font-black text-black tracking-tighter uppercase">{t.title}</h2>
                <p className="text-black/60 font-bold text-xs uppercase tracking-widest">{t.sub}</p>
              </div>
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-full bg-black/10 hover:bg-black/20 text-black transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-10">
              <form className="grid gap-6" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className={`text-[10px] font-black uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-400'}`}>{t.name}</label>
                    <input type="text" className={`w-full px-4 py-3 rounded-sm border outline-none transition-all ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white focus:border-gold' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-gold'}`} required />
                  </div>
                  <div className="space-y-2">
                    <label className={`text-[10px] font-black uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-400'}`}>{t.email}</label>
                    <input type="email" className={`w-full px-4 py-3 rounded-sm border outline-none transition-all ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white focus:border-gold' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-gold'}`} required />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className={`text-[10px] font-black uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-400'}`}>{t.company}</label>
                  <input type="text" className={`w-full px-4 py-3 rounded-sm border outline-none transition-all ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white focus:border-gold' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-gold'}`} required />
                </div>
                <div className="space-y-2">
                  <label className={`text-[10px] font-black uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-400'}`}>{t.message}</label>
                  <textarea rows={3} className={`w-full px-4 py-3 rounded-sm border outline-none transition-all resize-none ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white focus:border-gold' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-gold'}`} required />
                </div>
                <button type="submit" className="w-full py-5 bg-gold hover:bg-gold-hover text-black font-black uppercase tracking-widest text-sm rounded-sm transition-all shadow-xl shadow-gold/20 hover:shadow-gold/40 active:scale-[0.98]">
                  {t.submit}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const LoginPage = () => {
  const { theme, lang, t: trans } = useContext(AppContext);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isForgotOpen, setIsForgotOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [isResetSent, setIsResetSent] = useState(false);
  
  const t = lang === 'es' ? {
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
  } : {
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
  };

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsResetSent(true);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-6 relative overflow-hidden ${theme === 'dark' ? 'bg-charcoal' : 'bg-white'}`}>
      <NetworkBackground />
      
      <motion.div
        key={isRegistering ? 'register' : 'login'}
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`relative z-10 w-full max-w-md p-10 rounded-sm shadow-2xl border ${theme === 'dark' ? 'bg-black/40 backdrop-blur-xl border-white/10' : 'bg-white border-slate-200'}`}
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/10 mb-6">
            <Logo className="w-10 h-10 text-gold" />
          </div>
          <h1 className={`text-3xl font-helvetica font-black tracking-tighter uppercase mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            {isRegistering ? t.registerTitle : t.welcome}
          </h1>
          <p className={`text-xs font-bold uppercase tracking-[0.2em] ${theme === 'dark' ? 'text-white/40' : 'text-slate-400'}`}>
            {isRegistering ? t.registerSub : t.sub}
          </p>
        </div>

        {!isRegistering ? (
          <>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label className={`text-[10px] font-black uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-400'}`}>{t.email}</label>
                <input type="email" className={`w-full px-4 py-4 rounded-sm border outline-none transition-all ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white focus:border-gold' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-gold'}`} placeholder="name@company.com" required />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className={`text-[10px] font-black uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-400'}`}>{t.password}</label>
                  <button 
                    type="button"
                    onClick={() => {
                      setIsForgotOpen(true);
                      setIsResetSent(false);
                      setResetEmail('');
                    }}
                    className="text-[10px] font-bold text-gold hover:underline"
                  >
                    {t.forgot}
                  </button>
                </div>
                <input type="password" className={`w-full px-4 py-4 rounded-sm border outline-none transition-all ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white focus:border-gold' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-gold'}`} placeholder="••••••••" required />
              </div>
              <button type="submit" className="w-full py-5 bg-gold hover:bg-gold-hover text-black font-black uppercase tracking-widest text-sm rounded-sm transition-all shadow-xl shadow-gold/20 hover:shadow-gold/40 active:scale-[0.98]">
                {t.login}
              </button>
            </form>

            <div className="mt-10 pt-10 border-t border-white/5 text-center">
              <p className={`text-xs font-bold ${theme === 'dark' ? 'text-white/30' : 'text-slate-400'}`}>
                {t.noAccount} <button onClick={() => setIsRegistering(true)} className="text-gold hover:underline">{t.request}</button>
              </p>
            </div>
          </>
        ) : (
          <>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-1">
                <label className={`text-[10px] font-black uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-400'}`}>{t.fullName}</label>
                <input type="text" className={`w-full px-4 py-3 rounded-sm border outline-none transition-all ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white focus:border-gold' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-gold'}`} required />
              </div>
              <div className="space-y-1">
                <label className={`text-[10px] font-black uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-400'}`}>{t.email}</label>
                <input type="email" className={`w-full px-4 py-3 rounded-sm border outline-none transition-all ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white focus:border-gold' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-gold'}`} required />
              </div>
              <div className="space-y-1">
                <label className={`text-[10px] font-black uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-400'}`}>{t.company}</label>
                <input type="text" className={`w-full px-4 py-3 rounded-sm border outline-none transition-all ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white focus:border-gold' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-gold'}`} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className={`text-[10px] font-black uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-400'}`}>{t.camara}</label>
                  <input type="text" className={`w-full px-4 py-3 rounded-sm border outline-none transition-all ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white focus:border-gold' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-gold'}`} required />
                </div>
                <div className="space-y-1">
                  <label className={`text-[10px] font-black uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-400'}`}>{t.rut}</label>
                  <input type="text" className={`w-full px-4 py-3 rounded-sm border outline-none transition-all ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white focus:border-gold' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-gold'}`} required />
                </div>
              </div>
              <button type="submit" className="w-full py-5 mt-4 bg-gold hover:bg-gold-hover text-black font-black uppercase tracking-widest text-sm rounded-sm transition-all shadow-xl shadow-gold/20 hover:shadow-gold/40 active:scale-[0.98]">
                {t.submitRequest}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-white/5 text-center">
              <button onClick={() => setIsRegistering(false)} className="text-[10px] font-black uppercase tracking-widest text-gold hover:underline">
                {t.backToLogin}
              </button>
            </div>
          </>
        )}
      </motion.div>

      {/* Forgot Password Modal */}
      <AnimatePresence>
        {isForgotOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsForgotOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className={`relative w-full max-w-md overflow-hidden rounded-sm shadow-2xl ${theme === 'dark' ? 'bg-charcoal border border-white/10' : 'bg-white border border-slate-200'}`}
            >
              <div className="h-24 bg-gold relative flex items-center px-8 overflow-hidden">
                <div className="absolute right-0 top-0 w-48 h-48 bg-black/10 rounded-full -mr-16 -mt-16 blur-2xl" />
                <div className="relative z-10">
                  <h2 className="text-2xl font-helvetica font-black text-black tracking-tighter uppercase">{t.forgotTitle}</h2>
                  <p className="text-black/60 font-bold text-[10px] uppercase tracking-widest">{t.forgotSub}</p>
                </div>
                <button 
                  onClick={() => setIsForgotOpen(false)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/10 hover:bg-black/20 text-black transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-8">
                {!isResetSent ? (
                  <form className="space-y-6" onSubmit={handleResetSubmit}>
                    <div className="space-y-2">
                      <label className={`text-[10px] font-black uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-400'}`}>{t.email}</label>
                      <input 
                        type="email" 
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        className={`w-full px-4 py-4 rounded-sm border outline-none transition-all ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white focus:border-gold' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-gold'}`} 
                        placeholder="name@company.com" 
                        required 
                      />
                    </div>
                    <button type="submit" className="w-full py-5 bg-gold hover:bg-gold-hover text-black font-black uppercase tracking-widest text-sm rounded-sm transition-all shadow-xl shadow-gold/20 hover:shadow-gold/40 active:scale-[0.98]">
                      {t.send}
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-4">
                    <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-gold"
                      >
                        <Check className="w-8 h-8" />
                      </motion.div>
                    </div>
                    <p className={`text-sm font-bold leading-relaxed mb-8 ${theme === 'dark' ? 'text-white/80' : 'text-slate-600'}`}>
                      {t.resetSuccess}
                    </p>
                    <button 
                      onClick={() => setIsForgotOpen(false)}
                      className={`text-[10px] font-black uppercase tracking-widest text-gold hover:underline`}
                    >
                      {t.close}
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const { lang, setLang, theme, setTheme, t, setIsMinoModalOpen } = useContext(AppContext);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${theme === 'dark' ? 'glass-dark' : 'glass-light'}`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div 
          className="flex items-center gap-3 group cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <Logo className="w-9 h-9 text-gold group-hover:scale-110 transition-transform" />
          <span className={`text-2xl font-helvetica font-bold tracking-tighter transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>BUILDING CONENCTIONS</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {t.nav.map((item, i) => {
            const isAbout = i === 3;
            if (isAbout) {
              return (
                <div 
                  key={i} 
                  className="relative"
                  onMouseEnter={() => setIsAboutOpen(true)}
                  onMouseLeave={() => setIsAboutOpen(false)}
                >
                  <button 
                    className={`flex items-center gap-1 text-sm font-semibold transition-colors ${theme === 'dark' ? 'text-white/70 hover:text-gold' : 'text-slate-600 hover:text-gold'}`}
                    onClick={() => setIsAboutOpen(!isAboutOpen)}
                  >
                    {item} <ChevronDown className={`w-4 h-4 transition-transform ${isAboutOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <AnimatePresence>
                    {isAboutOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className={`absolute top-full right-0 mt-2 w-48 rounded-sm shadow-2xl border overflow-hidden ${theme === 'dark' ? 'bg-charcoal border-white/10' : 'bg-white border-slate-200'}`}
                      >
                        <a 
                          href="#about" 
                          className={`block px-6 py-4 text-sm font-bold transition-colors ${theme === 'dark' ? 'text-white/70 hover:bg-white/5 hover:text-gold' : 'text-slate-600 hover:bg-slate-50 hover:text-gold'}`}
                          onClick={() => setIsAboutOpen(false)}
                        >
                          {item}
                        </a>
                        <a 
                          href="/mino" 
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`block px-6 py-4 text-sm font-bold transition-colors ${theme === 'dark' ? 'text-white/70 hover:bg-white/5 hover:text-gold' : 'text-slate-600 hover:bg-slate-50 hover:text-gold'}`}
                          onClick={() => setIsAboutOpen(false)}
                        >
                          Mino
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }
            return (
              <a key={i} href={`#${translations.en.nav[i].toLowerCase()}`} className={`text-sm font-semibold transition-colors ${theme === 'dark' ? 'text-white/70 hover:text-gold' : 'text-slate-600 hover:text-gold'}`}>
                {item}
              </a>
            );
          })}
          
          <div className={`flex items-center gap-4 border-l pl-8 ml-4 ${theme === 'dark' ? 'border-white/10' : 'border-slate-200'}`}>
            <button 
              onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
              className={`p-2 rounded-full transition-all ${theme === 'dark' ? 'hover:bg-white/5 text-white/70' : 'hover:bg-slate-100 text-slate-600'}`}
              title="Change Language"
            >
              <div className="flex items-center gap-1.5">
                <Languages className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">{lang}</span>
              </div>
            </button>

            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className={`p-2 rounded-full transition-all ${theme === 'dark' ? 'hover:bg-white/5 text-white/70' : 'hover:bg-slate-100 text-slate-600'}`}
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button className="px-6 py-2.5 bg-gold hover:bg-gold-hover text-black text-sm font-bold rounded-sm transition-all shadow-lg shadow-gold/10 hover:shadow-gold/20 active:scale-95">
              {t.contact}
            </button>
          </div>
        </div>

        <button className={`md:hidden p-2 rounded-lg ${theme === 'dark' ? 'text-white hover:bg-white/5' : 'text-slate-900 hover:bg-slate-100'}`} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden border-b overflow-hidden shadow-2xl ${theme === 'dark' ? 'bg-charcoal border-white/5' : 'bg-white border-slate-200'} px-6 py-8 flex flex-col gap-6`}
          >
            {t.nav.map((item, i) => {
              const isAbout = i === 3;
              if (isAbout) {
                return (
                  <div key={i} className="flex flex-col gap-4">
                    <div className={`text-lg font-bold ${theme === 'dark' ? 'text-white/70' : 'text-slate-700'}`}>
                      {item}
                    </div>
                    <div className="flex flex-col gap-4 pl-4 border-l-2 border-gold/30">
                      <a href="#about" className={`text-base font-bold ${theme === 'dark' ? 'text-white/50' : 'text-slate-500'}`} onClick={() => setIsOpen(false)}>
                        {item}
                      </a>
                      <a 
                        href="/mino" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-left text-base font-bold ${theme === 'dark' ? 'text-white/50' : 'text-slate-500'}`}
                        onClick={() => setIsOpen(false)}
                      >
                        Mino
                      </a>
                    </div>
                  </div>
                );
              }
              return (
                <a key={i} href={`#${translations.en.nav[i].toLowerCase()}`} className={`text-lg font-bold ${theme === 'dark' ? 'text-white/70' : 'text-slate-700'}`} onClick={() => setIsOpen(false)}>
                  {item}
                </a>
              );
            })}
            <div className={`flex items-center justify-between pt-6 border-t ${theme === 'dark' ? 'border-white/10' : 'border-slate-100'}`}>
              <button onClick={() => setLang(lang === 'en' ? 'es' : 'en')} className="flex items-center gap-2 text-gold font-bold text-sm uppercase tracking-widest">
                <Languages className="w-5 h-5" /> {lang === 'en' ? 'Español' : 'English'}
              </button>
              <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className={`p-3 rounded-full transition-colors ${theme === 'dark' ? 'bg-white/5 text-white' : 'bg-slate-100 text-slate-900'}`}>
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
            <button className="w-full py-4 bg-gold text-black font-bold rounded-sm shadow-xl shadow-gold/20">
              {t.contact}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { t, theme } = useContext(AppContext);
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-bold uppercase tracking-widest mb-8 text-[10px] transition-colors ${theme === 'dark' ? 'bg-gold/10 border border-gold/20 text-gold' : 'bg-gold/15 border border-gold/30 text-gold-hover'}`}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gold"></span>
            </span>
            {t.badge}
          </div>
          <h1 className={`text-5xl md:text-7xl font-bold leading-[1.05] mb-8 tracking-tight transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            {t.heroTitle}<span className={theme === 'dark' ? 'text-gold' : 'text-gold-contrast'}>{t.heroTitleHighlight}</span>{t.heroTitleEnd}
          </h1>
          <p className={`text-lg md:text-xl mb-12 leading-relaxed max-w-2xl transition-colors ${theme === 'dark' ? 'text-white/60' : 'text-slate-500 font-medium'}`}>
            {t.heroSub}
          </p>
          <div className="flex flex-col sm:flex-row gap-5">
            <button className="px-10 py-4.5 bg-gold hover:bg-gold-hover text-black font-bold rounded-sm flex items-center justify-center gap-2 transition-all group shadow-xl shadow-gold/10 hover:shadow-gold/25 active:scale-95">
              {t.getStarted} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className={`px-10 py-4.5 border font-bold rounded-sm transition-all active:scale-95 ${theme === 'dark' ? 'border-white/20 hover:bg-white/5 text-white' : 'border-slate-300 hover:bg-slate-100 text-slate-900'}`}>
              {t.portfolio}
            </button>
          </div>
        </motion.div>
      </div>
      
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
        <div className="w-px h-16 bg-linear-to-b from-gold to-transparent"></div>
      </div>
    </section>
  );
};

const SocialProof = () => {
  const { t, theme } = useContext(AppContext);
  return (
    <section className={`py-12 border-y transition-all duration-500 overflow-hidden ${theme === 'dark' ? 'bg-black border-white/5' : 'bg-white border-slate-100'}`}>
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <p className={`text-center text-[10px] font-black uppercase tracking-[0.4em] transition-colors ${theme === 'dark' ? 'text-white/30' : 'text-slate-300'}`}>
          {t.socialProof}
        </p>
      </div>
      
      <div className="relative flex overflow-hidden">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex gap-20 items-center whitespace-nowrap px-10"
        >
          {[...t.clients, ...t.clients].map((client, i) => (
            <span key={i} className={`text-2xl font-helvetica font-black uppercase tracking-tighter opacity-40 hover:opacity-100 transition-opacity cursor-default ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              {client}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const LocationMarquee = () => {
  const { t, theme } = useContext(AppContext);
  
  const partners = [
    { 
      name: "Cámara de Comercio de Bogotá", 
      logo: "https://storage.googleapis.com/aistudio-build-assets/3obsvayrmxfpx44asrww57/logo_1.png" 
    },
    { 
      name: "ParqueE", 
      logo: "https://parquee.com.co/wp-content/uploads/2021/06/Logo-Parque-E-01.png" 
    },
    { 
      name: "Alcaldía de Medellín", 
      logo: "https://www.medellin.gov.co/irj/go/km/docs/pccdesign/medellin/Temas/Alcaldia/Logos/Logo_Alcaldia_Medellin.png" 
    }
  ];

  return (
    <section className={`py-12 border-y transition-all duration-500 overflow-hidden ${theme === 'dark' ? 'bg-black border-white/5' : 'bg-white border-slate-100'}`}>
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <p className={`text-center text-[10px] font-black uppercase tracking-[0.4em] transition-colors ${theme === 'dark' ? 'text-white/30' : 'text-slate-300'} mb-12`}>
          {t.whereWeAre}
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-16 md:gap-24">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <img 
                src={partner.logo} 
                alt={partner.name} 
                className={`h-12 md:h-16 object-contain transition-all duration-500 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 ${theme === 'dark' ? 'brightness-0 invert' : ''}`}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  // Fallback to text if image fails to load
                  (e.target as HTMLImageElement).style.display = 'none';
                  const parent = (e.target as HTMLImageElement).parentElement;
                  if (parent) {
                    const span = document.createElement('span');
                    span.className = `text-sm font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-400'}`;
                    span.innerText = partner.name;
                    parent.appendChild(span);
                  }
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="relative flex overflow-hidden mt-12">
        <motion.div 
          animate={{ x: [-1000, 0] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="flex gap-20 items-center whitespace-nowrap px-10"
        >
          {[...t.locations, ...t.locations].map((location, i) => (
            <div key={i} className="flex items-center gap-4">
              <Globe className="w-5 h-5 text-gold opacity-50" />
              <span className={`text-2xl font-helvetica font-black uppercase tracking-tighter opacity-40 hover:opacity-100 transition-opacity cursor-default ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                {location}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Services = () => {
  const { t, theme } = useContext(AppContext);
  const icons = [<Globe className="w-8 h-8 text-gold" />, <Zap className="w-8 h-8 text-gold" />, <Shield className="w-8 h-8 text-gold" />];

  return (
    <section id="solutions" className={`py-32 transition-colors duration-500 ${theme === 'dark' ? 'bg-charcoal' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-24">
          <h2 className={`text-4xl md:text-5xl font-bold mb-8 transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            {t.servicesTitle}<span className={theme === 'dark' ? 'text-gold' : 'text-gold-contrast'}>{t.servicesTitleHighlight}</span>
          </h2>
          <div className="w-24 h-1.5 bg-gold rounded-full"></div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-10">
          {t.services.map((service, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -12 }}
              className={`p-12 border rounded-sm transition-all duration-500 group relative overflow-hidden ${theme === 'dark' ? 'card-dark' : 'card-light'}`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 -mr-16 -mt-16 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
              <div className="mb-10 relative z-10 group-hover:scale-110 transition-transform duration-500">
                {React.cloneElement(icons[index] as React.ReactElement, { className: `w-8 h-8 ${theme === 'dark' ? 'text-gold' : 'text-gold-contrast'}` })}
              </div>
              <h3 className={`text-2xl font-bold mb-5 relative z-10 transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{service.title}</h3>
              <p className={`leading-relaxed relative z-10 transition-colors ${theme === 'dark' ? 'text-white/50' : 'text-slate-500 font-medium'}`}>
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Process = () => {
  const { t, theme } = useContext(AppContext);

  return (
    <section id="process" className={`py-32 relative overflow-hidden transition-colors duration-500 ${theme === 'dark' ? 'bg-black' : 'bg-slate-50'}`}>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <h2 className={`text-4xl md:text-5xl font-bold mb-8 transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{t.processTitle}</h2>
          <p className={`max-w-xl mx-auto text-lg transition-colors ${theme === 'dark' ? 'text-white/50' : 'text-slate-600 font-medium'}`}>{t.processSub}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-20 relative">
          <div className={`hidden md:block absolute top-1/2 left-0 right-0 h-px -translate-y-1/2 z-0 ${theme === 'dark' ? 'bg-white/10' : 'bg-slate-200'}`}></div>
          
          {t.steps.map((step, index) => (
            <div key={index} className="relative z-10 flex flex-col items-center text-center group">
              <div className={`w-24 h-24 border-2 rounded-full flex items-center justify-center mb-10 transition-all duration-500 group-hover:border-gold group-hover:scale-110 ${theme === 'dark' ? 'bg-charcoal border-gold/30 shadow-[0_0_40px_rgba(225,180,109,0.1)]' : 'bg-white border-slate-200 shadow-[0_10px_30px_rgba(0,0,0,0.05)]'}`}>
                <span className={`font-display font-bold text-3xl ${theme === 'dark' ? 'text-gold' : 'text-gold-contrast'}`}>{step.number}</span>
              </div>
              <h3 className={`text-2xl font-bold mb-5 transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{step.title}</h3>
              <p className={`leading-relaxed transition-colors ${theme === 'dark' ? 'text-white/50' : 'text-slate-500 font-medium'}`}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Differentiation = () => {
  const { t, theme } = useContext(AppContext);
  return (
    <section className={`py-32 transition-colors duration-500 ${theme === 'dark' ? 'bg-charcoal' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div>
            <h2 className={`text-4xl md:text-5xl font-bold mb-10 transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              {t.diffTitle}<span className={theme === 'dark' ? 'text-gold' : 'text-gold-contrast'}>{t.diffTitleHighlight}</span>
            </h2>
            <div className="space-y-10">
              {t.diffItems.map((item, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={i} 
                  className="flex gap-8"
                >
                  <div className={`mt-1 p-2 rounded-lg ${theme === 'dark' ? 'bg-gold/10' : 'bg-gold/20'}`}><ChevronRight className={theme === 'dark' ? 'text-gold' : 'text-gold-contrast'} /></div>
                  <div>
                    <h4 className={`text-xl font-bold mb-3 transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{item.title}</h4>
                    <p className={`text-lg transition-colors ${theme === 'dark' ? 'text-white/50' : 'text-slate-500 font-medium'}`}>{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="relative group">
            <div className={`aspect-square rounded-sm border p-10 transition-all duration-700 group-hover:scale-[1.02] ${theme === 'dark' ? 'bg-linear-to-br from-gold/20 to-transparent border-gold/10' : 'bg-linear-to-br from-gold/10 to-transparent border-gold/20'}`}>
              <div className={`w-full h-full border rounded-sm flex items-center justify-center p-16 text-center transition-all duration-500 ${theme === 'dark' ? 'border-white/5 bg-black/40 shadow-2xl shadow-black' : 'border-slate-100 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)]'}`}>
                <div>
                  <div className={`text-7xl font-bold mb-6 tracking-tighter ${theme === 'dark' ? 'text-gold' : 'text-gold-contrast'}`}>15+</div>
                  <div className={`text-xs font-black uppercase tracking-[0.3em] transition-colors ${theme === 'dark' ? 'text-white/40' : 'text-slate-400'}`}>{t.yearsExp}</div>
                </div>
              </div>
            </div>
            <div className="absolute -top-6 -right-6 w-32 h-32 border-t-2 border-r-2 border-gold/30 transition-all duration-500 group-hover:translate-x-2 group-hover:-translate-y-2"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 border-b-2 border-l-2 border-gold/30 transition-all duration-500 group-hover:-translate-x-2 group-hover:translate-y-2"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FinalCTA = () => {
  const { t, theme } = useContext(AppContext);
  return (
    <section className={`py-40 border-t transition-all duration-500 ${theme === 'dark' ? 'bg-black border-white/5' : 'bg-slate-50 border-slate-200'}`}>
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className={`text-4xl md:text-6xl font-bold mb-10 leading-tight transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
          {t.ctaTitle}<span className={theme === 'dark' ? 'text-gold' : 'text-gold-contrast'}>{t.ctaTitleHighlight}</span>
        </h2>
        <p className={`text-xl mb-16 transition-colors ${theme === 'dark' ? 'text-white/60' : 'text-slate-500 font-medium'}`}>{t.ctaSub}</p>
        <button className="px-14 py-6 bg-gold hover:bg-gold-hover text-black font-bold text-xl rounded-sm transition-all shadow-2xl shadow-gold/20 hover:shadow-gold/40 active:scale-95">
          {t.ctaBtn}
        </button>
      </div>
    </section>
  );
};

const Footer = () => {
  const { t, theme } = useContext(AppContext);
  return (
    <footer className={`py-24 border-t transition-colors duration-500 ${theme === 'dark' ? 'bg-black border-white/5' : 'bg-white border-slate-200'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-16 mb-24">
          <div className="col-span-2">
            <div 
              className="flex items-center gap-3 mb-8 cursor-pointer group"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <Logo className="w-8 h-8 text-gold group-hover:scale-110 transition-transform" />
              <span className={`text-2xl font-helvetica font-bold tracking-tighter transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>BUILDING CONENCTIONS</span>
            </div>
            <p className={`max-w-sm leading-relaxed text-lg transition-colors ${theme === 'dark' ? 'text-white/40' : 'text-slate-500 font-medium'}`}>
              {t.footerDesc}
            </p>
          </div>
          <div>
            <h5 className="font-black mb-8 uppercase text-[10px] tracking-[0.3em] text-gold">Solutions</h5>
            <ul className={`space-y-5 text-sm transition-colors ${theme === 'dark' ? 'text-white/50' : 'text-slate-600 font-semibold'}`}>
              <li><a href="#" className="hover:text-gold transition-colors">Mining</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Energy</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Infrastructure</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-black mb-8 uppercase text-[10px] tracking-[0.3em] text-gold">Company</h5>
            <ul className={`space-y-5 text-sm transition-colors ${theme === 'dark' ? 'text-white/50' : 'text-slate-600 font-semibold'}`}>
              <li><a href="#" className="hover:text-gold transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className={`pt-10 border-t flex flex-col md:flex-row justify-between items-center gap-6 ${theme === 'dark' ? 'border-white/5' : 'border-slate-100'}`}>
          <p className={`text-xs font-bold transition-colors ${theme === 'dark' ? 'text-white/20' : 'text-slate-400'}`}>{t.footerRights}</p>
          <div className="flex gap-8">
            {['LinkedIn', 'Twitter', 'Facebook'].map(social => (
              <a key={social} href="#" className={`text-xs font-bold transition-colors ${theme === 'dark' ? 'text-white/20 hover:text-gold' : 'text-slate-400 hover:text-gold'}`}>{social}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function LandingPage() {
  const [lang, setLang] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>('dark');
  const [isMinoModalOpen, setIsMinoModalOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  // Simple routing
  if (currentPath === '/mino') {
    return (
      <AppContext.Provider value={{ lang, setLang, theme, setTheme, t: translations[lang], setIsMinoModalOpen }}>
        <LoginPage />
      </AppContext.Provider>
    );
  }

  return (
    <AppContext.Provider value={{ lang, setLang, theme, setTheme, t: translations[lang], setIsMinoModalOpen }}>
      <div className={`min-h-screen transition-colors duration-300 relative ${theme === 'dark' ? 'bg-charcoal' : 'bg-white'}`}>
        <NetworkBackground />
        <Navbar />
        <Hero />
        <SocialProof />
        <Services />
        <LocationMarquee />
        <Process />
        <Differentiation />
        <FinalCTA />
        <Footer />
        <MinoModal isOpen={isMinoModalOpen} onClose={() => setIsMinoModalOpen(false)} />
      </div>
    </AppContext.Provider>
  );
}

