import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Check, 
  ArrowLeft, 
  ArrowDown, 
  ShieldCheck, 
  Scale, 
  Leaf, 
  TrendingUp, 
  Users, 
  Sparkles, 
  Building2, 
  GraduationCap, 
  SunMedium, 
  Award, 
  CheckCircle2, 
  Lock, 
  ArrowRight,
  Database,
  Coins,
  HeartPulse,
  Droplets,
  Calculator,
  Wallet,
  CheckCheck,
  Zap,
  Info,
  FileText
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { NetworkBackground } from './NetworkBackground';
import Logo from './Logo';
import { AppContext } from '../context/AppContext';
import { MinoAppLoop } from './MinoAppLoop';
import { BarequerosSection } from './BarequerosSection';
import barequeroRealImg from '../assets/images/barequero_batea_real.jpg';
import { ManagedMarketplace } from './ManagedMarketplace';

const MinoPage = () => {
  const { theme, lang, t, setIsPrivacyModalOpen } = useContext(AppContext);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isForgotOpen, setIsForgotOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [isResetSent, setIsResetSent] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyError, setPrivacyError] = useState(false);
  const [isMarketplaceUnlocked, setIsMarketplaceUnlocked] = useState(false);
  
  const minoT = t.mino;
  const isDark = theme === 'dark';

  // Ensure page always starts at top when opened
  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsResetSent(true);
    const target = e.currentTarget as HTMLFormElement;
    const email = (target.elements.namedItem('email') as HTMLInputElement)?.value || '';
    try {
      await fetch('/api/send-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Usuario Mino (Restablecimiento)',
          email: email || 'usuario@mino.co',
          message: `Solicitud de restablecimiento de contraseña para: ${email}`,
          targetEmail: 'teambuilco@gmail.com'
        })
      });
    } catch {
      // ignore
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) {
      setPrivacyError(true);
      return;
    }
    setPrivacyError(false);
    setFormSubmitted(true);
    const target = e.currentTarget as HTMLFormElement;
    const inputs = target.querySelectorAll('input');
    const values: Record<string, string> = {};
    inputs.forEach((input, idx) => {
      values[input.name || input.placeholder || `campo_${idx}`] = input.value;
    });

    try {
      await fetch('/api/send-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values['Nombre'] || values['Carlos Restrepo'] || 'Solicitante Terminal Mino',
          email: values['Correo'] || values['carlos@mineria.com'] || 'contacto@builco.co',
          message: `Solicitud de acceso a terminal Mino. Datos: ${JSON.stringify(values, null, 2)}`,
          targetEmail: 'teambuilco@gmail.com'
        })
      });
    } catch {
      // ignore
    }

    setTimeout(() => {
      setFormSubmitted(false);
    }, 4500);
  };

  const scrollToForm = () => {
    const el = document.getElementById('mino-auth-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Benefits list
  const benefits = lang === 'es' ? [
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />,
      title: "Trazabilidad Criptográfica de Origen",
      badge: "Cadena de Custodia",
      desc: "Registro digital inviolable desde el aluvión en el río hasta el refinador o comprador institucional, garantizando un mineral 100% ético, legal y libre de conflicto.",
      metric: "100% Auditabilidad Zero-Trust"
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-gold" />,
      title: "Comercio Justo y Liquidación Inmediata",
      badge: "Precios Internacionales",
      desc: "Cotizaciones en tiempo real indexadas a estándares LBMA y NYMEX en dólares o pesos colombianos, eliminando la intermediación usurera en los territorios.",
      metric: "+35% Ingreso Real al Minero"
    },
    {
      icon: <Scale className="w-6 h-6 text-blue-500" />,
      title: "Formalización Digital & RUCOM Integrado",
      badge: "Cumplimiento Legal",
      desc: "Articulación ágil con la Agencia Nacional de Minería (ANM), DIAN y Cámaras de Comercio para la gestión simplificada de personerías jurídicas y salvoconductos.",
      metric: "Tiempo de Trámite -70%"
    },
    {
      icon: <Coins className="w-6 h-6 text-amber-500" />,
      title: "Bancarización e Inclusión Financiera",
      badge: "Autonomía Económica",
      desc: "Creación de historial crediticio verificable y pagos directos en cuentas bancarias comerciales para asociaciones y familias barequeras tradicionalmente excluidas.",
      metric: "Bancarización Segura"
    },
    {
      icon: <Leaf className="w-6 h-6 text-emerald-400" />,
      title: "Minería Limpia & Cero Mercurio",
      badge: "Sostenibilidad",
      desc: "Incentivo a la concentración gravimétrica libre de químicos tóxicos, certificando oro ecológico con sobreprecios de sostenibilidad en mercados globales.",
      metric: "0.00 ppm Mercurio"
    },
    {
      icon: <Building2 className="w-6 h-6 text-purple-400" />,
      title: "Seguridad Jurídica para Compradores",
      badge: "Due Diligence Institucional",
      desc: "Pasaportes digitales descargables con verificación SHA-256 para fondos de inversión, joyerías y entidades soberanas que exigen estándares ESG rigurosos.",
      metric: "Garantía de Origen Legal"
    }
  ] : [
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />,
      title: "Cryptographic Traceability of Origin",
      badge: "Chain of Custody",
      desc: "Immutable digital registry from the riverbank to the refinery or institutional buyer, certifying 100% legal, conflict-free, and ethical minerals.",
      metric: "100% Zero-Trust Auditability"
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-gold" />,
      title: "Fair Trade & Instant Settlement",
      badge: "Global Pricing",
      desc: "Real-time pricing indexed to LBMA and NYMEX benchmarks in USD, eradicating predatory territorial middlemen and returning true value to miners.",
      metric: "+35% Net Miner Income"
    },
    {
      icon: <Scale className="w-6 h-6 text-blue-500" />,
      title: "Digital Formalization & Regulatory Compliance",
      badge: "Legal Certainty",
      desc: "Seamless integration with the National Mining Agency (ANM) and Chambers of Commerce for fast-tracked registration, concessions, and permits.",
      metric: "-70% Processing Time"
    },
    {
      icon: <Coins className="w-6 h-6 text-amber-500" />,
      title: "Banking & Financial Inclusion",
      badge: "Economic Autonomy",
      desc: "Building verified credit histories and delivering direct bank deposits to traditional panning families previously excluded from the formal financial system.",
      metric: "Secured Direct Banking"
    },
    {
      icon: <Leaf className="w-6 h-6 text-emerald-400" />,
      title: "Clean Mining & Zero Mercury",
      badge: "ESG Stewardship",
      desc: "Verification of clean gravimetric separation without toxic chemicals, unlocking premium international prices for eco-certified green gold.",
      metric: "0.00 ppm Mercury"
    },
    {
      icon: <Building2 className="w-6 h-6 text-purple-400" />,
      title: "Institutional Buyer Due Diligence",
      badge: "Enterprise Security",
      desc: "Downloadable digital passports with SHA-256 hash validation for sovereign buyers, luxury jewellers, and ESG-conscious investment desks.",
      metric: "Certified Legal Proof"
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-500 relative overflow-hidden ${isDark ? 'bg-charcoal text-white' : 'bg-[#FAFAFA] text-slate-900'}`}>
      <NetworkBackground />
      
      {/* Top Header & Navigation */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 pt-8 pb-4 flex flex-wrap items-center justify-between gap-4">
        <Link
          to="/"
          onClick={() => {
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
          }}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
            isDark
              ? 'bg-white/5 hover:bg-white/10 text-white/80 border border-white/10'
              : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/90 shadow-sm'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{lang === 'es' ? 'Volver al Inicio' : 'Back to Home'}</span>
        </Link>

        <div className="flex items-center gap-3">
          <span className={`text-[11px] font-mono font-bold px-3 py-1.5 rounded-full border flex items-center gap-2 ${
            isDark ? 'bg-gold/10 border-gold/30 text-gold' : 'bg-[#F9F6F0] border-[#E8DCC4] text-gold-deep'
          }`}>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            MINO™ PLATFORM v2.8
          </span>
          <button
            onClick={scrollToForm}
            className={`hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
              isDark 
                ? 'bg-gold text-black hover:bg-gold-hover shadow-lg shadow-gold/20' 
                : 'bg-slate-900 text-white hover:bg-slate-800 shadow-md'
            }`}
          >
            <span>{lang === 'es' ? 'Acceder al Formulario' : 'Go to Access Form'}</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8 space-y-24">

        {/* ========================================================= */}
        {/* 1. PRIMERO: BENEFICIOS DEL APLICATIVO WEB                */}
        {/* ========================================================= */}
        <section id="beneficios-mino" className="space-y-12">
          {/* Hero Banner for Benefits */}
          <div className="text-center max-w-4xl mx-auto space-y-5 pt-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-black tracking-widest uppercase border bg-gold/10 border-gold/30 text-gold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === 'es' ? 'Tecnología para una Minería Responsable' : 'Technology for Responsible Mining'}</span>
            </div>

            <h1 className={`text-3xl sm:text-5xl lg:text-6xl font-helvetica font-black tracking-tighter uppercase leading-[1.08] ${
              isDark ? 'text-white' : 'text-slate-950'
            }`}>
              {lang === 'es' ? (
                <>Beneficios del <span className="text-gold">Aplicativo Web</span> Mino™</>
              ) : (
                <>Benefits of the <span className="text-gold">Mino™ Web</span> Application</>
              )}
            </h1>

            <p className={`text-base sm:text-lg leading-relaxed max-w-2xl mx-auto ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}>
              {lang === 'es'
                ? 'Una infraestructura digital de extremo a extremo diseñada para conectar la minería tradicional y artesanal con mercados globales de alto valor, formalización ágil y trazabilidad inviolable.'
                : 'An end-to-end digital infrastructure built to connect artisanal and traditional miners with high-value global markets, fast-track formalization, and tamper-proof traceability.'}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                onClick={scrollToForm}
                className={`px-6 py-3.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                  isDark
                    ? 'bg-gold hover:bg-gold-hover text-black shadow-xl shadow-gold/20 hover:scale-[1.02]'
                    : 'bg-slate-900 hover:bg-slate-800 text-white shadow-xl shadow-slate-900/10 hover:scale-[1.02]'
                }`}
              >
                <span>{lang === 'es' ? 'Iniciar Sesión / Solicitar Acceso' : 'Log In / Request Access'}</span>
                <ArrowDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Benefits Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                className={`p-6 sm:p-7 rounded-2xl border transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 ${
                  isDark
                    ? 'bg-white/4 hover:bg-white/7 border-white/10 hover:border-gold/40 shadow-xl'
                    : 'bg-white border-slate-200/90 hover:border-gold/50 shadow-sm hover:shadow-xl'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                      isDark ? 'bg-white/5 border border-white/10' : 'bg-slate-100 border border-slate-200'
                    }`}>
                      {b.icon}
                    </div>
                    <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                      isDark ? 'bg-white/5 text-slate-300 border-white/10' : 'bg-slate-100 text-slate-700 border-slate-200'
                    }`}>
                      {b.badge}
                    </span>
                  </div>

                  <h3 className={`text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-950'}`}>
                    {b.title}
                  </h3>

                  <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {b.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between text-xs font-mono">
                  <span className={`text-[11px] font-bold ${isDark ? 'text-gold' : 'text-gold-deep'}`}>
                    {b.metric}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Live Web Application Interactive Preview */}
          <div className="pt-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div>
                <span className="text-[11px] font-black uppercase tracking-widest text-gold flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5" />
                  {lang === 'es' ? 'Simulador en Vivo del Aplicativo Web' : 'Live Web Application Simulator'}
                </span>
                <h3 className={`text-xl sm:text-2xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-950'}`}>
                  {lang === 'es' ? 'Explora la Plataforma Mino™ en Funcionamiento' : 'Explore the Mino™ Platform in Action'}
                </h3>
              </div>
              <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {lang === 'es' ? 'Transición automática entre módulos operativos' : 'Automated cycle between live operational modules'}
              </span>
            </div>

            <MinoAppLoop />
          </div>
        </section>

        {/* ========================================================= */}
        {/* 2. LUEGO: IMAGEN DE BAREQUEROS Y DESARROLLO COMUNITARIO   */}
        {/* ========================================================= */}
        <BarequerosSection onCtaClick={scrollToForm} />

        {/* ========================================================= */}
        {/* 3. FINALIZANDO: EL FORMULARIO QUE ESTÁ EN PANTALLA       */}
        {/* ========================================================= */}
        <section id="mino-auth-form" className="pt-6 pb-12 space-y-8 scroll-mt-20">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-black tracking-widest uppercase border ${
              isMarketplaceUnlocked 
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                : 'bg-gold/10 border-gold/30 text-gold'
            }`}>
              {isMarketplaceUnlocked ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
              <span>
                {isMarketplaceUnlocked
                  ? (lang === 'es' ? 'Documentos Aprobados • Marketplace Gerenciado' : 'Approved Documents • Managed Marketplace')
                  : (lang === 'es' ? 'Acceso Seguro a la Plataforma' : 'Secure Platform Access')}
              </span>
            </div>

            <h2 className={`text-3xl sm:text-4xl font-helvetica font-black tracking-tighter uppercase ${
              isDark ? 'text-white' : 'text-slate-950'
            }`}>
              {isMarketplaceUnlocked
                ? (lang === 'es' ? 'Comercialización de Minerales Críticos' : 'Critical Minerals Trading Platform')
                : (isRegistering 
                    ? (lang === 'es' ? 'Solicitud de Registro e Ingreso' : 'Access & Registration Request')
                    : (lang === 'es' ? 'Ingreso al Terminal Mino™' : 'Log In to Mino™ Terminal'))}
            </h2>

            <p className={`text-xs sm:text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {isMarketplaceUnlocked
                ? (lang === 'es'
                    ? 'Plataforma comercial para la compraventa de minerales críticos formalizados en Colombia con custodia en bóveda y liquidación en escrow.'
                    : 'Commercial platform for buying and selling verified critical minerals in Colombia with vault custody and escrow settlement.')
                : (isRegistering
                    ? (lang === 'es' ? 'Complete sus datos corporativos o institucionales para habilitar su terminal cifrada.' : 'Complete your institutional details to enable your encrypted terminal.')
                    : (lang === 'es' ? 'Ingrese sus credenciales de usuario verificadas para acceder a su espacio de trabajo.' : 'Enter your verified credentials to access your secure workspace.'))}
            </p>
          </div>

          {/* Form Card / Marketplace Container */}
          <div className="flex justify-center w-full">
            <motion.div
              key={isMarketplaceUnlocked ? 'marketplace' : (isRegistering ? 'register' : 'login')}
              initial={{ opacity: 0, scale: 0.98, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`relative z-10 w-full transition-all duration-300 rounded-3xl ${
                isMarketplaceUnlocked
                  ? 'max-w-6xl p-0 bg-transparent border-0'
                  : `max-w-xl p-8 sm:p-12 shadow-3xl border ${
                      isDark 
                        ? 'bg-black/60 backdrop-blur-xl border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.8)]' 
                        : 'bg-white border-slate-200/90 shadow-2xl'
                    }`
              }`}
            >
              {isMarketplaceUnlocked ? (
                <ManagedMarketplace 
                  lang={lang} 
                  isDark={isDark} 
                  onExitMarketplace={() => setIsMarketplaceUnlocked(false)} 
                />
              ) : (
                <>
                  <div className="text-center mb-8">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-5 transition-all ${
                      isDark ? 'bg-gold/10 border border-gold/20' : 'bg-[#F9F6F0] border border-[#E8DCC4]'
                    }`}>
                      <Logo className="w-11 h-11 drop-shadow-sm" />
                    </div>
                    <h3 className={`text-2xl sm:text-3xl font-helvetica font-black tracking-tighter uppercase mb-2 ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}>
                      {isRegistering ? minoT.registerTitle : minoT.welcome}
                    </h3>
                    <p className={`text-[11px] font-black uppercase tracking-[0.25em] ${
                      isDark ? 'text-white/40' : 'text-slate-400'
                    }`}>
                      {isRegistering ? minoT.registerSub : minoT.sub}
                    </p>
                  </div>

                  {/* Banner de Acceso con Documentos Aprobados */}
                  <div className={`mb-8 p-5 rounded-2xl border transition-all text-center ${
                    isDark 
                      ? 'bg-emerald-950/20 border-emerald-500/30' 
                      : 'bg-emerald-50/80 border-emerald-300 shadow-sm'
                  }`}>
                    <div className="flex items-center justify-center gap-2 mb-1.5 text-emerald-500 font-bold text-xs uppercase tracking-wider">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Documentación Aprobada para Comercialización</span>
                    </div>
                    <p className={`text-xs mb-3.5 max-w-md mx-auto ${isDark ? 'text-white/80' : 'text-slate-600'}`}>
                      {lang === 'es'
                        ? '¿Tus documentos de RUCOM y ANM ya están aprobados? Ingresa a la plataforma para comercializar minerales críticos en Colombia.'
                        : 'Are your RUCOM and ANM documents approved? Enter the platform to trade critical minerals in Colombia.'}
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsMarketplaceUnlocked(true)}
                      className={`w-full py-3.5 px-4 rounded-xl font-black uppercase tracking-wider text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-95 ${
                        isDark ? 'btn-gold' : 'btn-primary-light'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Entrar al Marketplace de Minerales Críticos</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {formSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-8 text-center space-y-5"
                    >
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto ${
                        isDark ? 'bg-gold/15 text-gold border border-gold/30' : 'bg-[#F9F6F0] text-gold-deep border border-[#E8DCC4]'
                      }`}>
                        <Check className="w-8 h-8" />
                      </div>
                      <div>
                        <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 inline-block mb-3">
                          ✓ Documentos Pre-Aprobados
                        </span>
                        <h4 className={`text-xl font-black uppercase ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {lang === 'es' ? 'Acceso Comercial Aprobado' : 'Commercial Access Approved'}
                        </h4>
                        <p className={`text-xs max-w-sm mx-auto mt-2 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                          {lang === 'es'
                            ? 'Sus documentos de comercialización han sido aprobados exitosamente. Ya puede entrar al marketplace gerenciado de minerales críticos en Colombia.'
                            : 'Your commercial documents have been approved successfully. You can now access to buy and sell formalized critical minerals in Colombia.'}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setFormSubmitted(false);
                          setIsMarketplaceUnlocked(true);
                        }}
                        className={`w-full py-4 rounded-xl font-black uppercase tracking-wider text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl active:scale-95 ${
                          isDark ? 'btn-gold' : 'btn-primary-light'
                        }`}
                      >
                        <span>Ingresar a la Plataforma Marketplace</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ) : !isRegistering ? (
                <>
                  <form className="space-y-6" onSubmit={handleFormSubmit}>
                    <div className="space-y-2">
                      <label className={`text-[11px] font-black uppercase tracking-widest ${
                        isDark ? 'text-white/50' : 'text-slate-600'
                      }`}>
                        {minoT.email}
                      </label>
                      <input 
                        type="email" 
                        className={`w-full px-5 py-4 rounded-xl border outline-none transition-all ${
                          isDark 
                            ? 'bg-white/5 border-white/10 text-white focus:border-gold focus:bg-white/8' 
                            : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-gold-deep focus:bg-white'
                        }`} 
                        placeholder="name@company.com" 
                        required 
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className={`text-[11px] font-black uppercase tracking-widest ${
                          isDark ? 'text-white/50' : 'text-slate-600'
                        }`}>
                          {minoT.password}
                        </label>
                        <button 
                          type="button" 
                          onClick={() => setIsForgotOpen(true)} 
                          className={`text-[11px] font-black uppercase tracking-widest hover:underline transition-all cursor-pointer ${
                            isDark ? 'text-gold' : 'text-gold-deep'
                          }`}
                        >
                          {minoT.forgot}
                        </button>
                      </div>
                      <input 
                        type="password" 
                        className={`w-full px-5 py-4 rounded-xl border outline-none transition-all ${
                          isDark 
                            ? 'bg-white/5 border-white/10 text-white focus:border-gold focus:bg-white/8' 
                            : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-gold-deep focus:bg-white'
                        }`} 
                        placeholder="••••••••" 
                        required 
                      />
                    </div>

                    {/* Botón de Aceptación de Términos de Privacidad y Habeas Data */}
                    <div className="space-y-2 pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          setTermsAccepted(!termsAccepted);
                          setPrivacyError(false);
                        }}
                        className={`w-full p-4 rounded-xl border text-left transition-all flex items-start gap-3.5 cursor-pointer select-none group ${
                          termsAccepted
                            ? isDark
                              ? 'bg-gold/15 border-gold text-white ring-1 ring-gold/40'
                              : 'bg-[#FAF6EC] border-[#926E24] text-slate-900 ring-1 ring-[#926E24]/30'
                            : privacyError
                              ? 'bg-red-500/10 border-red-500/60 text-red-200 animate-pulse'
                              : isDark
                                ? 'bg-white/5 border-white/10 text-white/70 hover:border-white/25 hover:bg-white/8'
                                : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-100/80'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 mt-0.5 rounded-md flex items-center justify-center transition-all shrink-0 border ${
                            termsAccepted
                              ? isDark
                                ? 'bg-gold border-gold text-black shadow-sm'
                                : 'bg-[#926E24] border-[#926E24] text-white shadow-sm'
                              : isDark
                                ? 'border-white/30 bg-black/40 group-hover:border-gold'
                                : 'border-slate-300 bg-white group-hover:border-[#926E24]'
                          }`}
                        >
                          {termsAccepted && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>

                        <div className="flex-1 text-xs leading-relaxed">
                          <span className="font-bold flex items-center gap-1.5">
                            <ShieldCheck className="w-3.5 h-3.5 text-gold shrink-0" />
                            {lang === 'es'
                              ? 'Acepto los Términos de Privacidad y Política de Habeas Data'
                              : 'I accept Privacy Terms and Habeas Data Policy'}
                          </span>
                          <span className={`block text-[11px] mt-0.5 ${isDark ? 'text-white/40' : 'text-slate-500'}`}>
                            {lang === 'es'
                              ? 'Tratamiento seguro de datos conforme a la Ley 1581 de 2012 y Decreto 1377 de 2013.'
                              : 'Secure data handling under Statutory Law 1581 of 2012 and international standards.'}
                          </span>
                        </div>
                      </button>

                      <div className="flex items-center justify-between px-1 text-[11px]">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            setIsPrivacyModalOpen(true);
                          }}
                          className={`font-semibold hover:underline flex items-center gap-1 cursor-pointer ${
                            isDark ? 'text-gold hover:text-gold-light' : 'text-[#805F1C] hover:text-[#926E24]'
                          }`}
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>{lang === 'es' ? 'Ver Políticas y Habeas Data' : 'View Privacy & Habeas Data'}</span>
                        </button>

                        <span className={`text-[10px] uppercase font-mono tracking-wider ${termsAccepted ? 'text-emerald-400 font-bold' : privacyError ? 'text-red-400 font-bold' : isDark ? 'text-white/30' : 'text-slate-400'}`}>
                          {termsAccepted ? (lang === 'es' ? '✓ Aceptado' : '✓ Accepted') : (lang === 'es' ? '* Requerido' : '* Required')}
                        </span>
                      </div>

                      {privacyError && (
                        <p className="text-[11px] text-red-400 font-semibold px-1">
                          {lang === 'es' 
                            ? 'Por favor acepte los términos de privacidad y Habeas Data para continuar.' 
                            : 'Please accept the privacy and Habeas Data terms to continue.'}
                        </p>
                      )}
                    </div>

                    <button 
                      type="submit" 
                      className={`w-full py-5 rounded-xl font-black uppercase tracking-wider text-xs transition-all shadow-xl cursor-pointer ${
                        !termsAccepted ? 'opacity-85' : ''
                      } ${
                        isDark ? 'btn-gold shadow-gold/20' : 'btn-primary-light shadow-slate-300'
                      }`}
                    >
                      {minoT.login}
                    </button>
                  </form>

                  <div className="mt-8 pt-6 border-t border-slate-200/60 dark:border-white/10 text-center">
                    <p className={`text-[11px] font-bold uppercase tracking-wider mb-2 ${
                      isDark ? 'text-white/40' : 'text-slate-400'
                    }`}>
                      {minoT.noAccount}
                    </p>
                    <button 
                      onClick={() => setIsRegistering(true)} 
                      className={`text-xs font-black uppercase tracking-wider hover:underline transition-all cursor-pointer ${
                        isDark ? 'text-gold' : 'text-gold-deep'
                      }`}
                    >
                      {minoT.request}
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <form className="space-y-5" onSubmit={handleFormSubmit}>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className={`text-[11px] font-black uppercase tracking-widest ${
                          isDark ? 'text-white/50' : 'text-slate-600'
                        }`}>
                          {minoT.fullName}
                        </label>
                        <input 
                          type="text" 
                          placeholder="Carlos Restrepo"
                          className={`w-full px-4 py-3.5 rounded-xl border outline-none transition-all ${
                            isDark 
                              ? 'bg-white/5 border-white/10 text-white focus:border-gold' 
                              : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-gold-deep focus:bg-white'
                          }`} 
                          required 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className={`text-[11px] font-black uppercase tracking-widest ${
                          isDark ? 'text-white/50' : 'text-slate-600'
                        }`}>
                          {minoT.email}
                        </label>
                        <input 
                          type="email" 
                          placeholder="carlos@mineria.com"
                          className={`w-full px-4 py-3.5 rounded-xl border outline-none transition-all ${
                            isDark 
                              ? 'bg-white/5 border-white/10 text-white focus:border-gold' 
                              : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-gold-deep focus:bg-white'
                          }`} 
                          required 
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className={`text-[11px] font-black uppercase tracking-widest ${
                        isDark ? 'text-white/50' : 'text-slate-600'
                      }`}>
                        {minoT.company}
                      </label>
                      <input 
                        type="text" 
                        placeholder="Asociación Minera / Entidad"
                        className={`w-full px-4 py-3.5 rounded-xl border outline-none transition-all ${
                          isDark 
                            ? 'bg-white/5 border-white/10 text-white focus:border-gold' 
                            : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-gold-deep focus:bg-white'
                        }`} 
                        required 
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className={`text-[11px] font-black uppercase tracking-widest ${
                          isDark ? 'text-white/50' : 'text-slate-600'
                        }`}>
                          {minoT.camara}
                        </label>
                        <input 
                          type="text" 
                          placeholder="Matrícula Mercantil / Código"
                          className={`w-full px-4 py-3.5 rounded-xl border outline-none transition-all ${
                            isDark 
                              ? 'bg-white/5 border-white/10 text-white focus:border-gold' 
                              : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-gold-deep focus:bg-white'
                          }`} 
                          required 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className={`text-[11px] font-black uppercase tracking-widest ${
                          isDark ? 'text-white/50' : 'text-slate-600'
                        }`}>
                          {minoT.rut}
                        </label>
                        <input 
                          type="text" 
                          placeholder="NIT / RUT / Cédula"
                          className={`w-full px-4 py-3.5 rounded-xl border outline-none transition-all ${
                            isDark 
                              ? 'bg-white/5 border-white/10 text-white focus:border-gold' 
                              : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-gold-deep focus:bg-white'
                          }`} 
                          required 
                        />
                      </div>
                    </div>

                    {/* Botón de Aceptación de Términos de Privacidad y Habeas Data */}
                    <div className="space-y-2 pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setTermsAccepted(!termsAccepted);
                          setPrivacyError(false);
                        }}
                        className={`w-full p-4 rounded-xl border text-left transition-all flex items-start gap-3.5 cursor-pointer select-none group ${
                          termsAccepted
                            ? isDark
                              ? 'bg-gold/15 border-gold text-white ring-1 ring-gold/40'
                              : 'bg-[#FAF6EC] border-[#926E24] text-slate-900 ring-1 ring-[#926E24]/30'
                            : privacyError
                              ? 'bg-red-500/10 border-red-500/60 text-red-200 animate-pulse'
                              : isDark
                                ? 'bg-white/5 border-white/10 text-white/70 hover:border-white/25 hover:bg-white/8'
                                : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-100/80'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 mt-0.5 rounded-md flex items-center justify-center transition-all shrink-0 border ${
                            termsAccepted
                              ? isDark
                                ? 'bg-gold border-gold text-black shadow-sm'
                                : 'bg-[#926E24] border-[#926E24] text-white shadow-sm'
                              : isDark
                                ? 'border-white/30 bg-black/40 group-hover:border-gold'
                                : 'border-slate-300 bg-white group-hover:border-[#926E24]'
                          }`}
                        >
                          {termsAccepted && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>

                        <div className="flex-1 text-xs leading-relaxed">
                          <span className="font-bold flex items-center gap-1.5">
                            <ShieldCheck className="w-3.5 h-3.5 text-gold shrink-0" />
                            {lang === 'es'
                              ? 'Acepto los Términos de Privacidad y Política de Habeas Data'
                              : 'I accept Privacy Terms and Habeas Data Policy'}
                          </span>
                          <span className={`block text-[11px] mt-0.5 ${isDark ? 'text-white/40' : 'text-slate-500'}`}>
                            {lang === 'es'
                              ? 'Tratamiento seguro de datos conforme a la Ley 1581 de 2012 y Decreto 1377 de 2013.'
                              : 'Secure data handling under Statutory Law 1581 of 2012 and international standards.'}
                          </span>
                        </div>
                      </button>

                      <div className="flex items-center justify-between px-1 text-[11px]">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            setIsPrivacyModalOpen(true);
                          }}
                          className={`font-semibold hover:underline flex items-center gap-1 cursor-pointer ${
                            isDark ? 'text-gold hover:text-gold-light' : 'text-[#805F1C] hover:text-[#926E24]'
                          }`}
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>{lang === 'es' ? 'Ver Políticas y Habeas Data' : 'View Privacy & Habeas Data'}</span>
                        </button>

                        <span className={`text-[10px] uppercase font-mono tracking-wider ${termsAccepted ? 'text-emerald-400 font-bold' : privacyError ? 'text-red-400 font-bold' : isDark ? 'text-white/30' : 'text-slate-400'}`}>
                          {termsAccepted ? (lang === 'es' ? '✓ Aceptado' : '✓ Accepted') : (lang === 'es' ? '* Requerido' : '* Required')}
                        </span>
                      </div>

                      {privacyError && (
                        <p className="text-[11px] text-red-400 font-semibold px-1">
                          {lang === 'es' 
                            ? 'Por favor acepte los términos de privacidad y Habeas Data para continuar.' 
                            : 'Please accept the privacy and Habeas Data terms to continue.'}
                        </p>
                      )}
                    </div>

                    <button 
                      type="submit" 
                      className={`w-full py-5 mt-4 rounded-xl font-black uppercase tracking-wider text-xs transition-all shadow-xl cursor-pointer ${
                        !termsAccepted ? 'opacity-85' : ''
                      } ${
                        isDark ? 'btn-gold shadow-gold/20' : 'btn-primary-light shadow-slate-300'
                      }`}
                    >
                      {minoT.submitRequest}
                    </button>
                  </form>

                  <div className="mt-8 pt-6 border-t border-slate-200/60 dark:border-white/10 text-center">
                    <button 
                      onClick={() => setIsRegistering(false)} 
                      className={`text-xs font-black uppercase tracking-wider hover:underline transition-all cursor-pointer ${
                        isDark ? 'text-gold' : 'text-gold-deep'
                      }`}
                    >
                      {minoT.backToLogin}
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </motion.div>
          </div>
        </section>

      </div>

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
              className={`relative w-full max-w-md overflow-hidden rounded-2xl shadow-2xl ${
                isDark ? 'bg-charcoal border border-white/10' : 'bg-white border border-slate-200'
              }`}
            >
              <div className={`h-24 relative flex items-center px-8 overflow-hidden ${
                isDark ? 'bg-gold' : 'bg-gold-deep'
              }`}>
                <div className="absolute right-0 top-0 w-48 h-48 bg-black/10 rounded-full -mr-16 -mt-16 blur-2xl" />
                <div className="relative z-10">
                  <h3 className={`text-2xl font-helvetica font-black tracking-tighter uppercase ${
                    isDark ? 'text-black' : 'text-white'
                  }`}>
                    {minoT.forgotTitle}
                  </h3>
                  <p className={`font-bold text-[10px] uppercase tracking-widest ${
                    isDark ? 'text-black/60' : 'text-white/60'
                  }`}>
                    {minoT.forgotSub}
                  </p>
                </div>
                <button 
                  onClick={() => setIsForgotOpen(false)}
                  className={`absolute top-4 right-4 p-2 rounded-full transition-colors cursor-pointer ${
                    isDark ? 'bg-black/10 hover:bg-black/20 text-black' : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-8">
                {!isResetSent ? (
                  <form className="space-y-6" onSubmit={handleResetSubmit}>
                    <div className="space-y-2">
                      <label className={`text-[10px] font-black uppercase tracking-widest ${
                        isDark ? 'text-white/40' : 'text-slate-400'
                      }`}>
                        {minoT.email}
                      </label>
                      <input 
                        type="email" 
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        className={`w-full px-4 py-4 rounded-xl border outline-none transition-all ${
                          isDark 
                            ? 'bg-white/5 border-white/10 text-white focus:border-gold' 
                            : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-gold'
                        }`} 
                        placeholder="name@company.com" 
                        required 
                      />
                    </div>
                    <button 
                      type="submit" 
                      className={`w-full py-5 font-black uppercase tracking-widest text-xs rounded-xl transition-all shadow-xl active:scale-[0.98] cursor-pointer ${
                        isDark 
                          ? 'bg-gold hover:bg-gold-hover text-black shadow-gold/20 hover:shadow-gold/40' 
                          : 'bg-slate-900 hover:bg-slate-800 text-white shadow-slate-200'
                      }`}
                    >
                      {minoT.send}
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-4">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ${
                      isDark ? 'bg-gold/10' : 'bg-gold-soft'
                    }`}>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className={isDark ? 'text-gold' : 'text-gold-deep'}
                      >
                        <Check className="w-8 h-8" />
                      </motion.div>
                    </div>
                    <p className={`text-sm font-bold leading-relaxed mb-8 ${
                      isDark ? 'text-white/80' : 'text-slate-600'
                    }`}>
                      {minoT.resetSuccess}
                    </p>
                    <button 
                      onClick={() => {
                        setIsForgotOpen(false);
                        setIsResetSent(false);
                      }}
                      className={`text-[10px] font-black uppercase tracking-widest hover:underline cursor-pointer ${
                        isDark ? 'text-gold' : 'text-gold-deep'
                      }`}
                    >
                      {minoT.close}
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

export default MinoPage;

