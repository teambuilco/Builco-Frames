import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  ArrowRight,
  ArrowDown,
  ShieldCheck, 
  Scale, 
  Leaf, 
  TrendingUp, 
  Sparkles, 
  Building2, 
  GraduationCap,
  Coins,
  CheckCircle2,
  Database,
  Lock,
  Check,
  FileText,
  Send,
  Loader2,
  Building,
  Phone,
  MapPin,
  User,
  Mail,
  Shield,
  Layers
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { NetworkBackground } from './NetworkBackground';
import Logo from './Logo';
import { AppContext } from '../context/AppContext';
import { MinoAppLoop } from './MinoAppLoop';
import { BarequerosSection } from './BarequerosSection';

const MinoPage = () => {
  const { theme, lang, t, setIsContactModalOpen, setIsPrivacyModalOpen } = useContext(AppContext);
  const isDark = theme === 'dark';
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    organization: '',
    taxId: '',
    rucomCode: '',
    mineralInterest: 'Oro de Aluvión (Trazabilidad y Liquidación)',
    region: '',
    notes: ''
  });

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyError, setPrivacyError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [countdown, setCountdown] = useState(6);

  // Auto-retorno al menú principal al enviar requerimiento
  React.useEffect(() => {
    if (!isSubmitted) return;
    setCountdown(6);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          navigate('/');
          window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isSubmitted, navigate]);

  // Ensure page always starts at top when opened
  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  const scrollToAccessForm = () => {
    const el = document.getElementById('mino-access-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) {
      setPrivacyError(true);
      return;
    }
    setPrivacyError(false);
    setIsSubmitting(true);

    const targetRecipient = 'teambuilco@gmail.com';
    const messageDetails = `SOLICITUD FORMAL DE ACCESO A LA PLATAFORMA MINO™:
--------------------------------------------------
• Solicitante: ${formData.fullName.trim()}
• Correo Institucional: ${formData.email.trim()}
• Teléfono / WhatsApp: ${formData.phone.trim()}
• Empresa / Asociación / Titular: ${formData.organization.trim()}
• NIT / Cédula / RUT: ${formData.taxId.trim()}
• Código RUCOM / Registro Minero: ${formData.rucomCode.trim() || 'En trámite de formalización'}
• Mineral de Interés Comercial: ${formData.mineralInterest}
• Territorio / Departamento: ${formData.region.trim() || 'Colombia'}
• Requerimiento / Mensaje:
${formData.notes.trim() || 'Solicitud de habilitación de terminal institucional cifrada para trazabilidad y comercialización de minerales críticos.'}
--------------------------------------------------
Fecha: ${new Date().toLocaleString('es-CO')}`;

    const submissionRecord = {
      name: formData.fullName.trim(),
      email: formData.email.trim(),
      message: messageDetails,
      targetEmail: targetRecipient,
      notificationStatus: 'sent_to_teambuilco_gmail',
      createdAt: serverTimestamp()
    };

    // 1. Envío al backend directo a teambuilco@gmail.com
    try {
      await fetch('/api/send-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.fullName.trim(),
          email: formData.email.trim(),
          message: messageDetails,
          targetEmail: targetRecipient
        })
      });
    } catch (err) {
      console.warn('API send-contact fallback warning:', err);
    }

    // 2. Envío directo Formspree de respaldo
    try {
      await fetch('https://formspree.io/f/xbldwzzd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          _subject: `Solicitud Acceso Mino™: ${formData.organization || formData.fullName}`,
          Solicitante: formData.fullName,
          Correo: formData.email,
          Telefono: formData.phone,
          Organizacion: formData.organization,
          NIT_Cedula: formData.taxId,
          RUCOM: formData.rucomCode,
          Mineral: formData.mineralInterest,
          Region: formData.region,
          Mensaje: formData.notes
        })
      });
    } catch {
      // ignore
    }

    // 3. Grabación segura en Firestore
    try {
      await addDoc(collection(db, 'contactInquiries'), submissionRecord);
    } catch (err) {
      console.warn('Firestore write warning:', err);
    }

    // 4. Respaldo local
    try {
      const local = JSON.parse(localStorage.getItem('builco_mino_requests') || '[]');
      local.push({
        ...formData,
        submittedAt: new Date().toISOString()
      });
      localStorage.setItem('builco_mino_requests', JSON.stringify(local));
    } catch {
      // ignore
    }

    setIsSubmitting(false);
    setIsSubmitted(true);
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
    <div className={`min-h-screen transition-colors duration-500 relative overflow-hidden ${isDark ? 'bg-charcoal text-white' : 'bg-[#FAF8F5] text-[#1C1917]'}`}>
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
              : 'bg-white hover:bg-[#F3EFE6] text-[#44403C] border border-[#E8DEC8] shadow-sm'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{lang === 'es' ? 'Volver al Inicio' : 'Back to Home'}</span>
        </Link>

        <div className="flex items-center gap-3">
          <span className={`text-[11px] font-mono font-bold px-3 py-1.5 rounded-full border flex items-center gap-2 ${
            isDark ? 'bg-gold/10 border-gold/30 text-gold' : 'bg-[#F7F3EB] border-[#E8DEC8] text-gold-deep'
          }`}>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            MINO™ PLATFORM v2.8
          </span>
          <button
            onClick={scrollToAccessForm}
            className={`hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
              isDark 
                ? 'btn-gold' 
                : 'btn-primary-light'
            }`}
          >
            <span>{lang === 'es' ? 'Solicitar Acceso Mino™' : 'Request Mino™ Access'}</span>
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
              isDark ? 'text-white' : 'text-[#1C1917]'
            }`}>
              {lang === 'es' ? (
                <>Beneficios del <span className={isDark ? 'text-gold' : 'text-gold-deep'}>Aplicativo Web</span> Mino™</>
              ) : (
                <>Benefits of the <span className={isDark ? 'text-gold' : 'text-gold-deep'}>Mino™ Web</span> Application</>
              )}
            </h1>

            <p className={`text-base sm:text-lg leading-relaxed max-w-2xl mx-auto ${
              isDark ? 'text-slate-300' : 'text-[#44403C]'
            }`}>
              {lang === 'es'
                ? 'Una infraestructura digital de extremo a extremo diseñada para conectar la minería tradicional y artesanal con mercados globales de alto valor, formalización ágil y trazabilidad inviolable.'
                : 'An end-to-end digital infrastructure built to connect artisanal and traditional miners with high-value global markets, fast-track formalization, and tamper-proof traceability.'}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                onClick={scrollToAccessForm}
                className={`px-6 py-3.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                  isDark
                    ? 'btn-gold shadow-xl shadow-gold/20 hover:scale-[1.02]'
                    : 'btn-primary-light hover:scale-[1.02]'
                }`}
              >
                <span>{lang === 'es' ? 'Solicitar Acceso a la Plataforma' : 'Request Platform Access'}</span>
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
                    : 'bg-white border-[#E8DEC8] hover:border-gold-deep/40 shadow-sm hover:shadow-xl'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                      isDark ? 'bg-white/5 border border-white/10' : 'bg-[#F4EFE6] border border-[#E8DEC8]'
                    }`}>
                      {b.icon}
                    </div>
                    <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                      isDark ? 'bg-white/5 text-slate-300 border-white/10' : 'bg-[#F4EFE6] text-[#44403C] border-[#E8DEC8]'
                    }`}>
                      {b.badge}
                    </span>
                  </div>

                  <h3 className={`text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-[#1C1917]'}`}>
                    {b.title}
                  </h3>

                  <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-[#44403C]'}`}>
                    {b.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E8DEC8] dark:border-white/10 flex items-center justify-between text-xs font-mono">
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
                <h3 className={`text-xl sm:text-2xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-[#1C1917]'}`}>
                  {lang === 'es' ? 'Explora la Plataforma Mino™ en Funcionamiento' : 'Explore the Mino™ Platform in Action'}
                </h3>
              </div>
              <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-[#78716C]'}`}>
                {lang === 'es' ? 'Transición automática entre módulos operativos' : 'Automated cycle between live operational modules'}
              </span>
            </div>

            <MinoAppLoop />
          </div>
        </section>

        {/* ========================================================= */}
        {/* 2. COMUNIDADES DE BAREQUEROS Y DESARROLLO TERRITORIAL     */}
        {/* ========================================================= */}
        <BarequerosSection onCtaClick={scrollToAccessForm} />

        {/* ========================================================= */}
        {/* 3. FORMULARIO PARA SOLICITAR ACCESO A MINO™               */}
        {/* ========================================================= */}
        <section id="mino-access-form" className="pt-8 pb-16 space-y-8 scroll-mt-20">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-black tracking-widest uppercase border ${
              isDark ? 'bg-gold/10 border-gold/30 text-gold' : 'bg-[#F7F3EB] border-[#E8DEC8] text-gold-deep'
            }`}>
              <Lock className="w-3.5 h-3.5" />
              <span>
                {lang === 'es' ? 'Habilitación de Terminal • Acceso Oficial' : 'Terminal Activation • Official Access'}
              </span>
            </div>

            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-helvetica font-black tracking-tighter uppercase ${
              isDark ? 'text-white' : 'text-[#1C1917]'
            }`}>
              {lang === 'es' ? <>Solicitar Acceso a <span className={isDark ? 'text-gold' : 'text-gold-deep'}>Mino™</span></> : <>Request Access to <span className={isDark ? 'text-gold' : 'text-gold-deep'}>Mino™</span></>}
            </h2>

            <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-[#44403C]'}`}>
              {lang === 'es'
                ? 'Complete sus datos corporativos o de asociación minera para habilitar su terminal cifrada y acceder a la red de trazabilidad, liquidación justa y comercialización.'
                : 'Submit your institutional or mining association details to activate your encrypted terminal and join the verified supply network.'}
            </p>
          </div>

          {/* Form Container */}
          <div className="flex justify-center w-full">
            <motion.div
              key={isSubmitted ? 'submitted-view' : 'form-view'}
              initial={{ opacity: 0, scale: 0.98, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`relative z-10 w-full transition-all duration-300 rounded-3xl max-w-2xl p-8 sm:p-12 border ${
                isDark 
                  ? 'bg-[#121620] backdrop-blur-xl border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.8)]' 
                  : 'bg-[#FAF8F5] border-[#E8DEC8] shadow-[0_25px_60px_rgba(28,25,23,0.1)]'
              }`}
            >
              {isSubmitted ? (
                /* Vista de Confirmación con el recuadro solicitado */
                <div className="text-center space-y-6 py-4">
                  {/* Status Icon */}
                  <div className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center ring-8 ${
                    isDark 
                      ? 'bg-emerald-500/15 text-emerald-400 ring-emerald-500/10' 
                      : 'bg-emerald-50 text-emerald-700 ring-emerald-100 border border-emerald-200'
                  }`}>
                    <CheckCircle2 className="w-9 h-9" />
                  </div>

                  {/* Recuadro de Confirmación Solicitado */}
                  <div className="space-y-3">
                    <h3 className={`text-2xl sm:text-3xl font-helvetica font-black uppercase tracking-tight ${isDark ? 'text-white' : 'text-[#1C1917]'}`}>
                      {lang === 'es' ? 'Solicitud Recibida con Éxito' : 'Request Received Successfully'}
                    </h3>
                    <div className={`p-4 md:p-5 rounded-xl border max-w-lg mx-auto ${
                      isDark 
                        ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200' 
                        : 'bg-emerald-50/90 border-emerald-300 text-emerald-950 shadow-xs'
                    }`}>
                      <p className="text-base sm:text-lg font-semibold leading-relaxed">
                        "{lang === 'es' 
                          ? 'Su requerimiento se ha enviado, nos estaremos colocando en contacto pronto.' 
                          : 'Your request has been submitted, we will be in touch shortly.'}"
                      </p>
                    </div>
                  </div>

                  {/* Detalle de Registro y Notificación */}
                  <div className="grid gap-2.5 max-w-md mx-auto text-left text-xs font-mono">
                    <div className={`flex items-center gap-3 px-4 py-2.5 rounded-lg border ${
                      isDark ? 'bg-white/5 border-white/10 text-white/80' : 'bg-[#F7F3EB] border-[#E8DEC8] text-[#44403C]'
                    }`}>
                      <Database className="w-4 h-4 text-amber-500 shrink-0" />
                      <span className="truncate">
                        {lang === 'es' ? 'Grabado en Base de Datos de Alianzas' : 'Saved in Alliance Database'}
                      </span>
                    </div>
                    <div className={`flex items-center gap-3 px-4 py-2.5 rounded-lg border ${
                      isDark ? 'bg-white/5 border-white/10 text-white/80' : 'bg-[#F7F3EB] border-[#E8DEC8] text-[#44403C]'
                    }`}>
                      <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span className="truncate">
                        {lang === 'es' ? 'Notificación despachada a teambuilco@gmail.com' : 'Notification dispatched to teambuilco@gmail.com'}
                      </span>
                    </div>
                  </div>

                  {/* Cuenta regresiva de retorno automático */}
                  <p className={`text-xs font-medium ${isDark ? 'text-white/60' : 'text-[#78716C]'}`}>
                    {lang === 'es' 
                      ? `Volviendo al menú principal automáticamente en ${countdown} segundos...` 
                      : `Returning to main menu automatically in ${countdown} seconds...`}
                  </p>

                  {/* Acciones */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        navigate('/');
                        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                      }}
                      className={`w-full sm:w-auto px-6 py-3.5 rounded-xl font-black uppercase tracking-wider text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-95 ${
                        isDark ? 'btn-gold' : 'btn-primary-light'
                      }`}
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>{lang === 'es' ? 'Volver al Menú Principal Ahora' : 'Return to Main Menu Now'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          fullName: '',
                          email: '',
                          phone: '',
                          organization: '',
                          taxId: '',
                          rucomCode: '',
                          mineralInterest: 'Oro de Aluvión (Trazabilidad y Liquidación)',
                          region: '',
                          notes: ''
                        });
                        setTermsAccepted(false);
                      }}
                      className={`w-full sm:w-auto px-5 py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs border transition-all cursor-pointer ${
                        isDark 
                          ? 'border-white/15 text-white/70 hover:bg-white/10' 
                          : 'border-[#E8DEC8] text-[#44403C] hover:bg-[#F3EFE6]'
                      }`}
                    >
                      {lang === 'es' ? 'Enviar Otra Solicitud' : 'Submit Another Request'}
                    </button>
                  </div>
                </div>
              ) : (
                /* Formulario Inicial para Solicitar Acceso */
                <>
                  <div className="text-center mb-8">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 transition-all ${
                      isDark ? 'bg-gold/10 border border-gold/20' : 'bg-[#F7F3EB] border border-[#E8DEC8]'
                    }`}>
                      <Logo className="w-11 h-11 drop-shadow-sm" />
                    </div>
                    <h3 className={`text-2xl sm:text-3xl font-helvetica font-black tracking-tighter uppercase mb-2 ${
                      isDark ? 'text-white' : 'text-[#1C1917]'
                    }`}>
                      {lang === 'es' ? 'Registro e Ingreso a Mino™' : 'Mino™ Access & Registration'}
                    </h3>
                    <p className={`text-[11px] font-black uppercase tracking-[0.25em] ${
                      isDark ? 'text-white/40' : 'text-[#78716C]'
                    }`}>
                      {lang === 'es' ? 'Terminal Cifrada para el Sector Minero-Industrial' : 'Encrypted Terminal for the Mining-Industrial Sector'}
                    </p>
                  </div>

                  {/* Formulario Principal */}
                  <form className="space-y-5" onSubmit={handleFormSubmit}>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className={`text-[11px] font-black uppercase tracking-widest flex items-center gap-1.5 ${
                          isDark ? 'text-white/50' : 'text-[#78716C]'
                        }`}>
                          <User className="w-3 h-3 text-gold-deep" />
                          <span>{lang === 'es' ? 'Nombre Completo / Titular' : 'Full Name / Representative'} *</span>
                        </label>
                        <input 
                          type="text" 
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="Carlos Restrepo"
                          className={`w-full px-4 py-3.5 rounded-xl border outline-none transition-all ${
                            isDark 
                              ? 'bg-white/5 border-white/10 text-white focus:border-gold' 
                              : 'bg-white border-[#E8DEC8] text-[#1C1917] placeholder:text-[#A8A29E] focus:border-gold-deep focus:bg-white shadow-xs'
                          }`} 
                          required 
                        />
                      </div>

                      <div className="space-y-2">
                        <label className={`text-[11px] font-black uppercase tracking-widest flex items-center gap-1.5 ${
                          isDark ? 'text-white/50' : 'text-[#78716C]'
                        }`}>
                          <Mail className="w-3 h-3 text-gold-deep" />
                          <span>{lang === 'es' ? 'Correo Electrónico' : 'Email Address'} *</span>
                        </label>
                        <input 
                          type="email" 
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="carlos@mineria.com"
                          className={`w-full px-4 py-3.5 rounded-xl border outline-none transition-all ${
                            isDark 
                              ? 'bg-white/5 border-white/10 text-white focus:border-gold' 
                              : 'bg-white border-[#E8DEC8] text-[#1C1917] placeholder:text-[#A8A29E] focus:border-gold-deep focus:bg-white shadow-xs'
                          }`} 
                          required 
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className={`text-[11px] font-black uppercase tracking-widest flex items-center gap-1.5 ${
                          isDark ? 'text-white/50' : 'text-[#78716C]'
                        }`}>
                          <Building className="w-3 h-3 text-gold-deep" />
                          <span>{lang === 'es' ? 'Empresa / Asociación Minera' : 'Company / Association'} *</span>
                        </label>
                        <input 
                          type="text" 
                          value={formData.organization}
                          onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                          placeholder="Asociación Minera del San Jorge"
                          className={`w-full px-4 py-3.5 rounded-xl border outline-none transition-all ${
                            isDark 
                              ? 'bg-white/5 border-white/10 text-white focus:border-gold' 
                              : 'bg-white border-[#E8DEC8] text-[#1C1917] placeholder:text-[#A8A29E] focus:border-gold-deep focus:bg-white shadow-xs'
                          }`} 
                          required 
                        />
                      </div>

                      <div className="space-y-2">
                        <label className={`text-[11px] font-black uppercase tracking-widest flex items-center gap-1.5 ${
                          isDark ? 'text-white/50' : 'text-[#78716C]'
                        }`}>
                          <Phone className="w-3 h-3 text-gold-deep" />
                          <span>{lang === 'es' ? 'Teléfono / WhatsApp' : 'Phone / WhatsApp'} *</span>
                        </label>
                        <input 
                          type="tel" 
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+57 310 000 0000"
                          className={`w-full px-4 py-3.5 rounded-xl border outline-none transition-all ${
                            isDark 
                              ? 'bg-white/5 border-white/10 text-white focus:border-gold' 
                              : 'bg-white border-[#E8DEC8] text-[#1C1917] placeholder:text-[#A8A29E] focus:border-gold-deep focus:bg-white shadow-xs'
                          }`} 
                          required 
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className={`text-[11px] font-black uppercase tracking-widest flex items-center gap-1.5 ${
                          isDark ? 'text-white/50' : 'text-[#78716C]'
                        }`}>
                          <Shield className="w-3 h-3 text-gold-deep" />
                          <span>{lang === 'es' ? 'NIT / RUT / Cédula' : 'Tax ID / National ID'} *</span>
                        </label>
                        <input 
                          type="text" 
                          value={formData.taxId}
                          onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
                          placeholder="901.842.109-4"
                          className={`w-full px-4 py-3.5 rounded-xl border outline-none transition-all ${
                            isDark 
                              ? 'bg-white/5 border-white/10 text-white focus:border-gold' 
                              : 'bg-white border-[#E8DEC8] text-[#1C1917] placeholder:text-[#A8A29E] focus:border-gold-deep focus:bg-white shadow-xs'
                          }`} 
                          required 
                        />
                      </div>

                      <div className="space-y-2">
                        <label className={`text-[11px] font-black uppercase tracking-widest flex items-center gap-1.5 ${
                          isDark ? 'text-white/50' : 'text-[#78716C]'
                        }`}>
                          <FileText className="w-3 h-3 text-gold-deep" />
                          <span>{lang === 'es' ? 'Código RUCOM / Título Minero' : 'RUCOM / Mining License'}</span>
                        </label>
                        <input 
                          type="text" 
                          value={formData.rucomCode}
                          onChange={(e) => setFormData({ ...formData, rucomCode: e.target.value })}
                          placeholder={lang === 'es' ? 'RUC-2026-CO (Opcional)' : 'RUCOM Code (Optional)'}
                          className={`w-full px-4 py-3.5 rounded-xl border outline-none transition-all ${
                            isDark 
                              ? 'bg-white/5 border-white/10 text-white focus:border-gold' 
                              : 'bg-white border-[#E8DEC8] text-[#1C1917] placeholder:text-[#A8A29E] focus:border-gold-deep focus:bg-white shadow-xs'
                          }`} 
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className={`text-[11px] font-black uppercase tracking-widest flex items-center gap-1.5 ${
                          isDark ? 'text-white/50' : 'text-[#78716C]'
                        }`}>
                          <Layers className="w-3 h-3 text-gold-deep" />
                          <span>{lang === 'es' ? 'Mineral de Interés' : 'Mineral of Interest'}</span>
                        </label>
                        <select 
                          value={formData.mineralInterest}
                          onChange={(e) => setFormData({ ...formData, mineralInterest: e.target.value })}
                          className={`w-full px-4 py-3.5 rounded-xl border outline-none transition-all cursor-pointer ${
                            isDark 
                              ? 'bg-[#181D28] border-white/10 text-white focus:border-gold' 
                              : 'bg-white border-[#E8DEC8] text-[#1C1917] focus:border-gold-deep shadow-xs'
                          }`}
                        >
                          <option value="Oro de Aluvión (Trazabilidad y Liquidación)">Oro de Aluvión / Batea (Trazabilidad)</option>
                          <option value="Cobre y Concentrados">Cobre y Concentrados</option>
                          <option value="Coltán y Niobio">Coltán y Niobio / Tantalio</option>
                          <option value="Níquel y Polimetálicos">Níquel y Polimetálicos</option>
                          <option value="Tierras Raras (Neodimio, Praseodimio)">Tierras Raras (REE)</option>
                          <option value="Formalización Territorial y Bancarización">Formalización Territorial & Alianzas</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className={`text-[11px] font-black uppercase tracking-widest flex items-center gap-1.5 ${
                          isDark ? 'text-white/50' : 'text-[#78716C]'
                        }`}>
                          <MapPin className="w-3 h-3 text-gold-deep" />
                          <span>{lang === 'es' ? 'Municipio / Departamento' : 'Location / Municipality'}</span>
                        </label>
                        <input 
                          type="text" 
                          value={formData.region}
                          onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                          placeholder={lang === 'es' ? 'Ej: Montelíbano, Córdoba' : 'e.g., Montelíbano, Córdoba'}
                          className={`w-full px-4 py-3.5 rounded-xl border outline-none transition-all ${
                            isDark 
                              ? 'bg-white/5 border-white/10 text-white focus:border-gold' 
                              : 'bg-white border-[#E8DEC8] text-[#1C1917] placeholder:text-[#A8A29E] focus:border-gold-deep focus:bg-white shadow-xs'
                          }`} 
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className={`text-[11px] font-black uppercase tracking-widest flex items-center gap-1.5 ${
                        isDark ? 'text-white/50' : 'text-[#78716C]'
                      }`}>
                        <FileText className="w-3 h-3 text-gold-deep" />
                        <span>{lang === 'es' ? 'Detalles de la Operación / Requerimiento' : 'Operational Details / Request'}</span>
                      </label>
                      <textarea 
                        rows={3}
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder={lang === 'es' ? 'Describa el volumen estimado de producción o los objetivos de formalización y comercialización...' : 'Describe estimated production volume or commercialization objectives...'}
                        className={`w-full px-4 py-3.5 rounded-xl border outline-none transition-all resize-none ${
                          isDark 
                            ? 'bg-white/5 border-white/10 text-white focus:border-gold' 
                            : 'bg-white border-[#E8DEC8] text-[#1C1917] placeholder:text-[#A8A29E] focus:border-gold-deep focus:bg-white shadow-xs'
                        }`} 
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
                              : 'bg-[#F7F3EB] border-gold-deep text-[#1C1917] ring-1 ring-gold-deep/30'
                            : privacyError
                              ? 'bg-red-500/10 border-red-500/60 text-red-700 animate-pulse'
                              : isDark
                                ? 'bg-white/5 border-white/10 text-white/70 hover:border-white/25 hover:bg-white/8'
                                : 'bg-white border-[#E8DEC8] text-[#57534E] hover:border-[#D7CEBE] hover:bg-[#F3EFE6]'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 mt-0.5 rounded-md flex items-center justify-center transition-all shrink-0 border ${
                            termsAccepted
                              ? isDark
                                ? 'bg-gold border-gold text-black shadow-sm'
                                : 'bg-gold-deep border-gold-deep text-white shadow-sm'
                              : isDark
                                ? 'border-white/30 bg-black/40 group-hover:border-gold'
                                : 'border-[#D7CEBE] bg-white group-hover:border-gold-deep'
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
                          <span className={`block text-[11px] mt-0.5 ${isDark ? 'text-white/40' : 'text-[#78716C]'}`}>
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
                            isDark ? 'text-gold hover:text-gold-light' : 'text-gold-deep hover:text-gold-hover'
                          }`}
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>{lang === 'es' ? 'Ver Políticas y Habeas Data' : 'View Privacy & Habeas Data'}</span>
                        </button>

                        <span className={`text-[10px] uppercase font-mono tracking-wider ${termsAccepted ? 'text-emerald-500 font-bold' : privacyError ? 'text-red-500 font-bold' : isDark ? 'text-white/30' : 'text-[#78716C]'}`}>
                          {termsAccepted ? (lang === 'es' ? '✓ Aceptado' : '✓ Accepted') : (lang === 'es' ? '* Requerido' : '* Required')}
                        </span>
                      </div>

                      {privacyError && (
                        <p className="text-[11px] text-red-500 font-semibold px-1">
                          {lang === 'es' 
                            ? 'Por favor acepte los términos de privacidad y Habeas Data para continuar.' 
                            : 'Please accept the privacy and Habeas Data terms to continue.'}
                        </p>
                      )}
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className={`w-full py-5 rounded-xl font-black uppercase tracking-wider text-xs transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] ${
                        !termsAccepted ? 'opacity-90' : ''
                      } ${
                        isDark ? 'btn-gold shadow-gold/20' : 'btn-primary-light'
                      } ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>{lang === 'es' ? 'Enviando Solicitud...' : 'Submitting Request...'}</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>{lang === 'es' ? 'Enviar Solicitud de Acceso a Mino™' : 'Submit Mino™ Access Request'}</span>
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MinoPage;

