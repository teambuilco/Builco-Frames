import React, { useState, useContext } from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  Award, 
  Droplets, 
  Sparkles, 
  TrendingUp, 
  CheckCheck, 
  HeartPulse, 
  SunMedium, 
  Calculator, 
  X, 
  Check, 
  ArrowRight, 
  Lock 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { AppContext } from '../context/AppContext';
import barequeroRealImg from '../assets/images/barequero_batea_real.jpg';

interface BarequerosSectionProps {
  onCtaClick?: () => void;
  className?: string;
}

export const BarequerosSection: React.FC<BarequerosSectionProps> = ({ 
  onCtaClick,
  className = ""
}) => {
  const { theme, lang, setIsContactModalOpen } = useContext(AppContext);
  const isDark = theme === 'dark';
  const navigate = useNavigate();
  const [barequeroGrams, setBarequeroGrams] = useState<number>(15);

  const handleCta = () => {
    if (onCtaClick) {
      onCtaClick();
    } else {
      setIsContactModalOpen(true);
    }
  };

  return (
    <section id="comunidad-barequeros" className={`space-y-12 ${className}`}>
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-black tracking-widest uppercase border bg-emerald-500/10 border-emerald-500/30 text-emerald-400">
          <Users className="w-3.5 h-3.5" />
          <span>{lang === 'es' ? 'Impacto Social & Territorial' : 'Social & Territorial Impact'}</span>
        </div>
        
        <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-helvetica font-black tracking-tighter uppercase ${
          isDark ? 'text-white' : 'text-slate-950'
        }`}>
          {lang === 'es' ? (
            <>Comunidades de <span className="text-gold">Barequeros</span> Tradicionales</>
          ) : (
            <>Traditional <span className="text-gold">Barequeros</span> Communities</>
          )}
        </h2>

        <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          {lang === 'es'
            ? 'El barequeo artesanal con batea de madera es el corazón ancestral de la minería de subsistencia en Colombia. Dignificamos este oficio milenario cerrando las brechas de intermediación y convirtiendo cada gramo de oro en bienestar directo, salud y escuelas solares para las familias ribereñas.'
            : 'Artisanal panning with traditional wooden bateas represents the ancestral heritage of subsistence mining in Colombia. We empower this ancestral practice by eradicating predatory intermediaries and converting every gram of gold into direct community welfare, healthcare, and solar-powered schools.'}
        </p>

        {/* Badge: Labor Ancestral */}
        <div className="inline-flex items-center p-1.5 rounded-2xl border border-gold/30 bg-black/40 backdrop-blur-md mt-2 shadow-lg shadow-gold/5">
          <button
            type="button"
            className="px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 bg-gold text-black shadow-lg font-bold shadow-gold/20 cursor-default"
          >
            <Award className="w-3.5 h-3.5" />
            <span>{lang === 'es' ? 'Labor Ancestral' : 'Ancestral Labor'}</span>
          </button>
        </div>
      </div>

      {/* High-impact Barequeros Image Showcase with Watermark */}
      <div className={`relative rounded-3xl overflow-hidden border shadow-2xl transition-all ${
        isDark ? 'bg-black/60 border-white/15' : 'bg-white border-slate-200/90 shadow-xl'
      }`}>
        <div className="relative aspect-16/9 sm:aspect-21/9 max-h-[580px] w-full overflow-hidden bg-black">
          <motion.img 
            key="real-image"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            src={barequeroRealImg} 
            alt={lang === 'es' ? 'Barequero tradicional en el río lavando arena con batea de madera y sombrero tradicional' : 'Traditional barequero panning gold with wooden batea in muddy river wearing traditional straw hat'}
            className="w-full h-full object-cover object-center transform hover:scale-[1.01] transition-transform duration-700" 
          />
          
          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/25 to-black/30 pointer-events-none" />

          {/* Badges on top of image */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex flex-wrap gap-2 z-10 max-w-[60%] sm:max-w-none">
            <span className="px-3 py-1.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-950/80 backdrop-blur-md text-gold border border-gold/40 flex items-center gap-1.5 shadow-lg">
              <Award className="w-3.5 h-3.5" />
              {lang === 'es' ? 'Labor Ancestral' : 'Ancestral Labor'}
            </span>
            <span className="px-3 py-1.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-amber-200 border border-white/20 flex items-center gap-1.5 shadow-lg">
              <Droplets className="w-3.5 h-3.5 text-blue-400" />
              {lang === 'es' ? 'Batea de Madera Ancestral' : 'Ancestral Wooden Batea'}
            </span>
          </div>

          {/* Marca de agua del logo en la parte derecha superior */}
          <div 
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 pointer-events-none select-none"
            aria-label="Watermark Logo"
          >
            <div className="flex items-center gap-2.5 px-3.5 sm:px-4 py-2 rounded-2xl bg-black/65 backdrop-blur-md border border-white/20 shadow-2xl">
              <Logo className="w-7 h-7 sm:w-8 sm:h-8 drop-shadow-[0_2px_10px_rgba(212,175,55,0.7)]" />
              <div className="flex flex-col text-left">
                <span className="text-[10px] sm:text-[11px] font-helvetica font-black tracking-widest uppercase text-white/95 leading-none">
                  MINO<span className="text-gold">™</span>
                </span>
                <span className="text-[7px] sm:text-[8px] font-mono font-bold tracking-widest uppercase text-white/70 leading-tight">
                  ORO SÓLIDO
                </span>
              </div>
            </div>
          </div>

          {/* Caption Overlay at bottom of image */}
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 z-10 text-white space-y-1">
            <span className="text-[11px] font-mono font-bold text-gold uppercase tracking-wider block">
              {lang === 'es' ? 'Cuencas Aluviales de Colombia • Sabiduría del Río' : 'Colombian River Basins • Ancestral River Knowledge'}
            </span>
            <p className="text-sm sm:text-base font-bold text-white max-w-3xl drop-shadow-md">
              {lang === 'es'
                ? 'La batea de madera en el caudal del río: el trabajo diario del barequero que durante siglos sostuvo la economía sin protección social. Transformamos este sudor en prosperidad garantizada.'
                : 'The wooden batea in river currents: traditional subsistence miners who sustained territories for centuries without social safety nets. We transform this labor into sovereign prosperity.'}
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 6 GRANDES PILARES DE BENEFICIOS PARA COMUNIDADES DE BAREQUEROS */}
      {/* ========================================================= */}
      <div className="space-y-6 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <span className="text-[11px] font-black uppercase tracking-widest text-gold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              {lang === 'es' ? 'Ecosistema de Dignificación Minera' : 'Mining Empowerment Ecosystem'}
            </span>
            <h3 className={`text-2xl sm:text-3xl font-helvetica font-black tracking-tight uppercase ${
              isDark ? 'text-white' : 'text-slate-950'
            }`}>
              {lang === 'es' ? 'Beneficios Directos para las Comunidades Barequeras' : 'Direct Benefits for Barequeros Communities'}
            </h3>
          </div>
          <p className={`text-xs max-w-md ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {lang === 'es'
              ? 'Diseñado junto a asociaciones locales, ingenieros mineros, sociólogos y Juntas de Acción Comunal.'
              : 'Engineered alongside local community boards, mining engineers, sociologists, and miner councils.'}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Beneficio 1 */}
          <div className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 ${
            isDark 
              ? 'bg-white/4 hover:bg-white/7 border-white/10 hover:border-gold/40 shadow-xl' 
              : 'bg-white border-slate-200/90 hover:border-gold/50 shadow-md hover:shadow-xl'
          }`}>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-gold/15 text-gold border border-gold/30 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-gold/10 text-gold border border-gold/20">
                  {lang === 'es' ? '+35% a +40% Ingreso' : '+35% to +40% Income'}
                </span>
              </div>

              <h4 className={`text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-950'}`}>
                {lang === 'es' ? 'Liquidación Justa y Pago Inmediato' : 'Fair Instant Payment Settlement'}
              </h4>

              <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {lang === 'es'
                  ? 'Eliminación radical del intermediario usurero. Liquidación a cotización internacional oficial en tiempo real directamente en la billetera móvil del barequero o en efectivo en centros certificados.'
                  : 'Elimination of predatory local middlemen. Real-time international market settlement deposited immediately into mobile wallets or verified community cash stations.'}
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between text-xs font-mono">
              <span className={`font-bold ${isDark ? 'text-gold' : 'text-gold-deep'}`}>
                {lang === 'es' ? 'Sin descuentos de balanza' : 'Zero calibration discounts'}
              </span>
              <CheckCheck className="w-4 h-4 text-emerald-500" />
            </div>
          </div>

          {/* Beneficio 2 */}
          <div className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 ${
            isDark 
              ? 'bg-white/4 hover:bg-white/7 border-white/10 hover:border-emerald-500/40 shadow-xl' 
              : 'bg-white border-slate-200/90 hover:border-emerald-500/50 shadow-md hover:shadow-xl'
          }`}>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                  <HeartPulse className="w-6 h-6" />
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {lang === 'es' ? '100% Cobertura Familiar' : '100% Family Coverage'}
                </span>
              </div>

              <h4 className={`text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-950'}`}>
                {lang === 'es' ? 'Seguridad Social, Salud & ARL en Territorio' : 'Health & Occupational Hazard Insurance'}
              </h4>

              <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {lang === 'es'
                  ? 'Afiliación subsidiada a EPS y cobertura de riesgos laborales (ARL adaptada al trabajo en ríos). Entrega de dotación ergonómica y brigadas médicas especializadas periódicas.'
                  : 'Full healthcare enrollment and specialized occupational risk coverage for river labor. Includes safety gear and routine toxicological health screenings.'}
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-emerald-400">
                {lang === 'es' ? 'Protección en faena de río' : 'River hazards insurance'}
              </span>
              <CheckCheck className="w-4 h-4 text-emerald-500" />
            </div>
          </div>

          {/* Beneficio 3 */}
          <div className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 ${
            isDark 
              ? 'bg-white/4 hover:bg-white/7 border-white/10 hover:border-blue-500/40 shadow-xl' 
              : 'bg-white border-slate-200/90 hover:border-blue-500/50 shadow-md hover:shadow-xl'
          }`}>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-blue-500/15 text-blue-400 border border-blue-500/30 flex items-center justify-center">
                  <Droplets className="w-6 h-6" />
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  {lang === 'es' ? '0% Químicos Tóxicos' : '0% Toxic Chemicals'}
                </span>
              </div>

              <h4 className={`text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-950'}`}>
                {lang === 'es' ? 'Centros Gravimétricos & Cero Mercurio' : 'Gravimetric Centers & Zero Mercury'}
              </h4>

              <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {lang === 'es'
                  ? 'Acceso comunitario gratuito a mesas concentradoras y espirales gravimétricas de alta precisión. Aumenta la recuperación de oro fino del 45% al 92% sin usar ni una sola gota de mercurio.'
                  : 'Free community access to clean gravimetric shaker tables and spirals, increasing fine gold recovery from 45% to over 92% without using toxic mercury or cyanides.'}
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-blue-400">
                {lang === 'es' ? '+92% Recuperación neta' : '+92% Net Recovery'}
              </span>
              <CheckCheck className="w-4 h-4 text-emerald-500" />
            </div>
          </div>

          {/* Beneficio 4 */}
          <div className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 ${
            isDark 
              ? 'bg-white/4 hover:bg-white/7 border-white/10 hover:border-purple-500/40 shadow-xl' 
              : 'bg-white border-slate-200/90 hover:border-purple-500/50 shadow-md hover:shadow-xl'
          }`}>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-purple-500/15 text-purple-400 border border-purple-500/30 flex items-center justify-center">
                  <SunMedium className="w-6 h-6" />
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  {lang === 'es' ? 'Fondo 3% Directo' : 'Direct 3% Trust Fund'}
                </span>
              </div>

              <h4 className={`text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-950'}`}>
                {lang === 'es' ? 'Escuelas Solares & Conectividad Rural' : 'Solar Schools & Rural Internet'}
              </h4>

              <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {lang === 'es'
                  ? 'Por cada gramo trazado, los compradores institucionales aportan al Fideicomiso Comunitario para electrificación solar autónoma, internet satelital en escuelas veredales y filtros de agua potable.'
                  : 'Every traded gram feeds an institutional community trust fund financing off-grid solar arrays, satellite connectivity for veredal schools, and potable water filtration systems.'}
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-purple-400">
                {lang === 'es' ? 'Educación para hijos de mineros' : 'Education for miners children'}
              </span>
              <CheckCheck className="w-4 h-4 text-emerald-500" />
            </div>
          </div>

          {/* Beneficio 5 */}
          <div className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 ${
            isDark 
              ? 'bg-white/4 hover:bg-white/7 border-white/10 hover:border-gold/40 shadow-xl' 
              : 'bg-white border-slate-200/90 hover:border-gold/50 shadow-md hover:shadow-xl'
          }`}>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-gold/15 text-gold border border-gold/30 flex items-center justify-center">
                  <Award className="w-6 h-6" />
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-gold/10 text-gold border border-gold/20">
                  {lang === 'es' ? 'Cédula Digital RUCOM' : 'Digital Mining ID'}
                </span>
              </div>

              <h4 className={`text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-950'}`}>
                {lang === 'es' ? 'Blindaje Jurídico & Dignidad Laboral' : 'Legal Shield & Worker Dignity'}
              </h4>

              <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {lang === 'es'
                  ? 'Emisión de Cédula Minera Criptográfica con código QR validado ante la ANM. Protege al barequero contra decomisos arbitrarios y transforma la estigmatización en reconocimiento soberano.'
                  : 'Cryptographic mining credentials with encrypted QR verification accredited before the National Mining Agency, preventing arbitrary seizures and securing civil protection.'}
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between text-xs font-mono">
              <span className={`font-bold ${isDark ? 'text-gold' : 'text-gold-deep'}`}>
                {lang === 'es' ? 'Reconocimiento legal pleno' : 'Full legal recognition'}
              </span>
              <CheckCheck className="w-4 h-4 text-emerald-500" />
            </div>
          </div>

          {/* Beneficio 6 */}
          <div className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 ${
            isDark 
              ? 'bg-white/4 hover:bg-white/7 border-white/10 hover:border-pink-500/40 shadow-xl' 
              : 'bg-white border-slate-200/90 hover:border-pink-500/50 shadow-md hover:shadow-xl'
          }`}>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-pink-500/15 text-pink-400 border border-pink-500/30 flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-pink-500/10 text-pink-400 border border-pink-500/20">
                  {lang === 'es' ? '45%+ Mujeres Mineras' : '45%+ Women Miners'}
                </span>
              </div>

              <h4 className={`text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-950'}`}>
                {lang === 'es' ? 'Autonomía y Microcréditos para Mujeres' : 'Economic Autonomy for Women Miners'}
              </h4>

              <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {lang === 'es'
                  ? 'Inclusión financiera prioritaria para mujeres barequeras cabeza de hogar. Cuentas bancarias a su propio nombre y acceso a fondos de microcrédito para proyectos agropecuarios y de economía circular.'
                  : 'Direct banking and credit lines tailored for women heads of household, fostering family wealth generation, agricultural ventures, and circular local entrepreneurship.'}
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-pink-400">
                {lang === 'es' ? 'Bancarización sin intermediarios' : 'Direct unmediated banking'}
              </span>
              <CheckCheck className="w-4 h-4 text-emerald-500" />
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* CALCULADORA INTERACTIVA DE BENEFICIOS PARA EL BAREQUERO    */}
      {/* ========================================================= */}
      <div className={`p-6 sm:p-8 rounded-3xl border shadow-2xl transition-all ${
        isDark ? 'bg-black/60 border-gold/30' : 'bg-linear-to-br from-amber-50/70 via-white to-slate-50 border-amber-200 shadow-xl'
      }`}>
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-gold flex items-center justify-center gap-1.5">
              <Calculator className="w-3.5 h-3.5" />
              {lang === 'es' ? 'Simulador de Impacto Financiero en el Territorio' : 'Territorial Financial Impact Simulator'}
            </span>
            <h3 className={`text-2xl sm:text-3xl font-helvetica font-black tracking-tight uppercase ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              {lang === 'es' ? '¿Cuánto Gana una Familia Barequera con el Modelo?' : 'How Much Does a Barequero Family Gain?'}
            </h3>
            <p className={`text-xs sm:text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {lang === 'es'
                ? 'Seleccione la producción mensual aproximada de oro aluvial para comparar el canal informal frente al modelo soberano formalizado.'
                : 'Select approximate monthly alluvial gold production to compare the informal middleman channel versus the formalized model.'}
            </p>
          </div>

          {/* Selector buttons for grams */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[5, 10, 15, 25, 40].map((grams) => (
              <button
                key={grams}
                type="button"
                onClick={() => setBarequeroGrams(grams)}
                className={`px-5 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  barequeroGrams === grams
                    ? 'bg-gold text-black shadow-lg shadow-gold/30 scale-105 border-gold'
                    : isDark
                      ? 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300'
                }`}
              >
                {grams} {lang === 'es' ? 'Gramos / Mes' : 'Grams / Mo'}
              </button>
            ))}
          </div>

          {/* Interactive Side-by-Side Comparison */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Canal Tradicional */}
            <div className={`p-6 rounded-2xl border ${
              isDark ? 'bg-red-950/15 border-red-500/30' : 'bg-red-50/80 border-red-200'
            } space-y-4`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-400">
                  {lang === 'es' ? 'Canal Informal / Intermediario Local' : 'Traditional Middleman Channel'}
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-400 font-mono font-bold">
                  {lang === 'es' ? 'Pérdida -32%' : '-32% Haircut'}
                </span>
              </div>

              <div>
                <span className={`block text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  {lang === 'es' ? 'Ingreso pagado al barequero:' : 'Paid out to miner:'}
                </span>
                <span className="text-2xl sm:text-3xl font-black font-mono text-red-400">
                  ${(barequeroGrams * 244800).toLocaleString('es-CO')} <span className="text-xs text-red-400/80 font-sans">COP</span>
                </span>
              </div>

              <ul className="space-y-2 text-xs pt-2 border-t border-red-500/20">
                <li className="flex items-center gap-2 text-red-400/90">
                  <X className="w-3.5 h-3.5 shrink-0" />
                  <span>{lang === 'es' ? 'Descuento abusivo de intermediario en balanza' : 'Predatory weigh-in calibration cuts'}</span>
                </li>
                <li className="flex items-center gap-2 text-red-400/90">
                  <X className="w-3.5 h-3.5 shrink-0" />
                  <span>{lang === 'es' ? 'Cero afiliación a EPS ni cobertura de riesgos' : 'Zero health insurance or accident coverage'}</span>
                </li>
                <li className="flex items-center gap-2 text-red-400/90">
                  <X className="w-3.5 h-3.5 shrink-0" />
                  <span>{lang === 'es' ? 'Uso forzado de mercurio tóxico para separar' : 'Toxic mercury contamination'}</span>
                </li>
                <li className="flex items-center gap-2 text-red-400/90">
                  <X className="w-3.5 h-3.5 shrink-0" />
                  <span>{lang === 'es' ? 'Cero inversión en la escuela o vereda' : 'Zero community infrastructure support'}</span>
                </li>
              </ul>
            </div>

            {/* Modelo Soberano */}
            <div className={`p-6 rounded-2xl border ${
              isDark ? 'bg-gold/10 border-gold/40 shadow-xl' : 'bg-white border-gold shadow-lg'
            } space-y-4`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-gold flex items-center gap-1.5">
                  <Logo className="w-4 h-4 text-gold" />
                  {lang === 'es' ? 'Modelo Soberano Bancarizado' : 'Sovereign Banked Model'}
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-bold">
                  {lang === 'es' ? 'LBMA' : 'LBMA'}
                </span>
              </div>

              <div>
                <span className={`block text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  {lang === 'es' ? 'Ingreso directo al barequero:' : 'Direct miner income:'}
                </span>
                <span className="text-2xl sm:text-3xl font-black font-mono text-emerald-400">
                  ${(barequeroGrams * 360000).toLocaleString('es-CO')} <span className="text-xs text-emerald-400/80 font-sans">COP</span>
                </span>
              </div>

              <div className="p-3 rounded-xl bg-gold/15 border border-gold/30 flex items-center justify-between">
                <span className="text-xs font-bold text-gold">
                  {lang === 'es' ? 'Ganancia extra para la familia:' : 'Extra income for the family:'}
                </span>
                <span className="text-sm font-black font-mono text-gold">
                  +${(barequeroGrams * 115200).toLocaleString('es-CO')} COP
                </span>
              </div>

              <ul className="space-y-2 text-xs pt-2 border-t border-gold/20">
                <li className="flex items-center gap-2 text-emerald-400">
                  <Check className="w-3.5 h-3.5 shrink-0" />
                  <span>{lang === 'es' ? 'Seguridad social (EPS + ARL) cubierta' : 'Full health & labor insurance included'}</span>
                </li>
                <li className="flex items-center gap-2 text-purple-400">
                  <SunMedium className="w-3.5 h-3.5 shrink-0" />
                  <span>
                    {lang === 'es' 
                      ? `+$${(barequeroGrams * 360000 * 0.03).toLocaleString('es-CO')} COP aportados al fondo de escuelas solares` 
                      : `+$${(barequeroGrams * 360000 * 0.03).toLocaleString('es-CO')} COP to solar schools trust`}
                  </span>
                </li>
                <li className="flex items-center gap-2 text-blue-400">
                  <Droplets className="w-3.5 h-3.5 shrink-0" />
                  <span>{lang === 'es' ? '0.00 ppm mercurio (100% concentración gravimétrica)' : 'Zero mercury pollution (clean gravimetric)'}</span>
                </li>
                <li className="flex items-center gap-2 text-gold">
                  <Award className="w-3.5 h-3.5 shrink-0" />
                  <span>{lang === 'es' ? 'Cédula Minera oficial con QR criptográfico' : 'Official cryptographic QR mining ID'}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Callout Footer */}
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={handleCta}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg ${
                isDark ? 'btn-gold shadow-gold/20' : 'btn-primary-light shadow-slate-300'
              }`}
            >
              <Lock className="w-4 h-4" />
              <span>{lang === 'es' ? 'Solicitar Ingreso a la Red de Barequeros' : 'Join the Barequeros Network'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
