import React, { useEffect, useContext } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  Globe,
  Users,
  Target,
  Shield,
  Handshake,
  Sprout,
  Fingerprint,
  Lightbulb,
  FlaskConical,
  Rocket,
  Leaf
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { NetworkBackground } from './NetworkBackground';
import { Footer } from './Footer';
import { AppContext } from '../context/AppContext';

const AboutPage = () => {
  const { theme, lang, setIsContactModalOpen } = useContext(AppContext);
  const isDark = theme === 'dark';

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  const content = lang === 'es' ? {
    back: 'Volver al Inicio',
    kicker: 'Building Connections · Identidad Corporativa',
    headlinePre: 'Nuestra ',
    headlineHighlight: 'Historia',
    intro: 'Builco nació en las profundidades de la tierra, donde el esfuerzo humano se encuentra con la riqueza mineral y la visión estratégica.',
    pillarsKicker: 'Propósito & Trayectoria',
    pillarsTitle: 'Pilares Fundacionales',
    pillars: [
      {
        icon: Target,
        title: 'El Origen',
        desc: 'Fundada en 2025, Building Connections (Builco) surgió de una necesidad crítica en el sector minero: la falta de una red estratégica que conectara a los actores clave con tecnología de vanguardia y servicios de consultoría de alto nivel.'
      },
      {
        icon: Users,
        title: 'Nuestra Gente',
        desc: 'Creemos que el corazón de la minería no son las máquinas, sino las personas. Por eso, nuestra plataforma Mino está diseñada para empoderar a cada trabajador, desde el territorio hasta la gerencia, facilitando una comunicación transparente y eficiente.'
      },
      {
        icon: Globe,
        title: 'Impacto Global',
        desc: 'Lo que comenzó como una iniciativa local en las regiones mineras de Colombia, hoy se proyecta como un estándar internacional de conectividad y eficiencia operativa en la industria extractiva global.'
      },
      {
        icon: Shield,
        title: 'Compromiso',
        desc: 'Nuestro compromiso es con la seguridad, la sostenibilidad y la innovación. Cada conexión que construimos es un paso hacia una minería más humana, trazable y tecnológicamente avanzada.'
      }
    ],
    valuesKicker: 'Cultura Corporativa',
    valuesTitlePre: 'Valores ',
    valuesTitleHighlight: 'Builco',
    valuesSubtitle: 'Los principios que guían cada alianza, decisión y operación en territorio.',
    values: [
      {
        icon: Handshake,
        title: 'Relaciones antes que transacciones',
        desc: 'Establecemos lazos duraderos y significativos, priorizando el valor mutuo sobre el beneficio inmediato.'
      },
      {
        icon: Sprout,
        title: 'Crecemos para que otros crezcan',
        desc: 'Nuestro éxito se mide por el impacto positivo y el crecimiento que generamos en nuestros clientes y aliados.'
      },
      {
        icon: Fingerprint,
        title: 'Autenticidad como principio',
        desc: 'Operamos con transparencia y honestidad, siendo fieles a nuestros valores y a quienes somos.'
      },
      {
        icon: Lightbulb,
        title: 'Valentía para reinventar',
        desc: 'Abrazamos el cambio y desafiamos el status quo, buscando nuevas y mejores formas de hacer las cosas.'
      },
      {
        icon: FlaskConical,
        title: 'Cultura Beta',
        desc: 'Estamos en constante aprendizaje y evolución, siempre abiertos a probar, adaptar y mejorar nuestros procesos.'
      },
      {
        icon: Rocket,
        title: 'Innovar y generar impacto',
        desc: 'Buscamos soluciones creativas y disruptivas que dejen una huella positiva y duradera en la sociedad.'
      },
      {
        icon: Leaf,
        title: 'Responsabilidad con el mañana',
        desc: 'Actuamos pensando en las futuras generaciones, comprometiéndonos con prácticas sostenibles y éticas.'
      }
    ],
    ctaLabel: 'Iniciar Conversación Estratégica',
    footerText: 'Building Connections © 2026 · Todos los derechos reservados'
  } : {
    back: 'Back to Home',
    kicker: 'Building Connections · Corporate Identity',
    headlinePre: 'Our ',
    headlineHighlight: 'Story',
    intro: 'Builco was born in the depths of the earth, where human endeavor converges with strategic mineral wealth and institutional vision.',
    pillarsKicker: 'Purpose & Trajectory',
    pillarsTitle: 'Foundational Pillars',
    pillars: [
      {
        icon: Target,
        title: 'The Origin',
        desc: 'Founded in 2025, Building Connections (Builco) emerged from a critical imperative across the industrial sector: the absence of a strategic network connecting key decision-makers with state-of-the-art technology and high-level advisory.'
      },
      {
        icon: Users,
        title: 'Our People',
        desc: 'We believe that the true pulse of high-impact industries lies in people, not machinery. That is why our proprietary Mino platform is engineered to empower teams from frontline operations to executive boardrooms, fostering transparent execution.'
      },
      {
        icon: Globe,
        title: 'Global Impact',
        desc: 'What originated as a focused initiative in the mineral corridors of Latin America has expanded into an international standard for strategic connectivity and operational excellence across global markets.'
      },
      {
        icon: Shield,
        title: 'Institutional Commitment',
        desc: 'Our commitment is anchored in sovereign discretion, ESG sustainability, and transformative technology. Every alliance we architect is a step toward more resilient, transparent, and forward-looking sectors.'
      }
    ],
    valuesKicker: 'Corporate Culture',
    valuesTitlePre: 'Builco ',
    valuesTitleHighlight: 'Values',
    valuesSubtitle: 'The core principles guiding every alliance, decision, and territorial operation.',
    values: [
      {
        icon: Handshake,
        title: 'Relationships before transactions',
        desc: 'We build lasting, meaningful bonds, prioritizing mutual long-term value over immediate gain.'
      },
      {
        icon: Sprout,
        title: 'We grow so others can grow',
        desc: 'Our success is measured by the positive impact and growth we generate for our clients and partners.'
      },
      {
        icon: Fingerprint,
        title: 'Authenticity as a principle',
        desc: 'We operate with transparency and honesty, staying faithful to our values and who we are.'
      },
      {
        icon: Lightbulb,
        title: 'Courage to reinvent',
        desc: 'We embrace change and challenge the status quo, seeking new and better ways of doing things.'
      },
      {
        icon: FlaskConical,
        title: 'Beta Culture',
        desc: 'We are in constant learning and evolution, always open to testing, adapting, and improving our processes.'
      },
      {
        icon: Rocket,
        title: 'Innovate and create impact',
        desc: 'We pursue creative, disruptive solutions that leave a positive and lasting mark on society.'
      },
      {
        icon: Leaf,
        title: 'Responsibility for tomorrow',
        desc: 'We act with future generations in mind, committing ourselves to sustainable and ethical practices.'
      }
    ],
    ctaLabel: 'Start Strategic Conversation',
    footerText: 'Building Connections © 2026 · All rights reserved'
  };

  const firstSixValues = content.values.slice(0, 6);
  const seventhValue = content.values[6];
  const SeventhIcon = seventhValue.icon;

  return (
    <div className={`min-h-screen transition-colors duration-300 relative overflow-hidden ${
      isDark ? 'bg-charcoal text-white' : 'bg-[#FAF8F5] text-[#1C1917]'
    }`}>
      {/* Mismo fondo interactivo de red de la página principal */}
      <NetworkBackground />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-16">
        {/* Navegación de regreso */}
        <div className="mb-10">
          <Link
            to="/"
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold tracking-tight transition-all duration-200 ${
              isDark
                ? 'bg-white/5 hover:bg-white/10 text-white/80 border border-white/10'
                : 'bg-white hover:bg-[#F3EFE6] text-[#1C1917] border border-[#E8DEC8] shadow-xs'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{content.back}</span>
          </Link>
        </div>

        {/* Hero / Cabecera Editorial */}
        <header className="text-center max-w-4xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <div className={`p-3 rounded-2xl mb-6 transition-all ${
              isDark
                ? 'bg-black/80 border border-gold/30 shadow-[0_0_25px_rgba(229,184,108,0.18)]'
                : 'bg-black border border-neutral-900 shadow-lg'
            }`}>
              <Logo className="w-11 h-11 drop-shadow-[0_2px_10px_rgba(212,175,55,0.45)]" />
            </div>

            <p className={`text-xs font-semibold tracking-wider uppercase mb-4 ${
              isDark ? 'text-gold' : 'text-gold-deep'
            }`}>
              {content.kicker}
            </p>

            <h1 className={`text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.08] tracking-tight mb-6 text-balance ${
              isDark ? 'text-white' : 'text-slate-950'
            }`}>
              {content.headlinePre}
              <span className={isDark ? 'text-gold' : 'text-gold-deep'}>
                {content.headlineHighlight}
              </span>
            </h1>

            <p className={`text-lg sm:text-xl leading-relaxed max-w-2xl font-normal ${
              isDark ? 'text-slate-200/90' : 'text-[#44403C]'
            }`}>
              {content.intro}
            </p>
          </motion.div>
        </header>

        {/* Pilares Fundacionales */}
        <section className="mb-24">
          <div className="mb-10 text-center sm:text-left">
            <p className={`text-xs font-semibold uppercase tracking-wider mb-2 ${
              isDark ? 'text-gold' : 'text-gold-deep'
            }`}>
              {content.pillarsKicker}
            </p>
            <h2 className={`text-3xl sm:text-4xl font-bold tracking-tight ${
              isDark ? 'text-white' : 'text-[#1C1917]'
            }`}>
              {content.pillarsTitle}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {content.pillars.map((pillar, idx) => {
              const IconComponent = pillar.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.06 }}
                  className={`p-8 group ${isDark ? 'card-dark' : 'card-light'}`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-105 ${
                    isDark
                      ? 'bg-gold/15 text-gold border border-gold/25'
                      : 'bg-[#F7F3EB] text-gold-deep border border-[#E8DEC8]'
                  }`}>
                    <IconComponent className="w-6 h-6 stroke-[1.75]" aria-hidden="true" />
                  </div>
                  <h3 className={`text-xl font-bold tracking-tight mb-3 transition-colors ${
                    isDark ? 'text-white group-hover:text-gold' : 'text-[#1C1917] group-hover:text-gold-deep'
                  }`}>
                    {pillar.title}
                  </h3>
                  <p className={`text-sm sm:text-base leading-relaxed ${
                    isDark ? 'text-slate-300' : 'text-[#44403C]'
                  }`}>
                    {pillar.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Valores Builco */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className={`pt-16 border-t ${isDark ? 'border-white/10' : 'border-[#E8DEC8]'}`}
        >
          <div className="mb-12 text-center sm:text-left">
            <p className={`text-xs font-semibold uppercase tracking-wider mb-2 ${
              isDark ? 'text-gold' : 'text-gold-deep'
            }`}>
              {content.valuesKicker}
            </p>
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3 ${
              isDark ? 'text-white' : 'text-[#1C1917]'
            }`}>
              {content.valuesTitlePre}
              <span className={isDark ? 'text-gold' : 'text-gold-deep'}>
                {content.valuesTitleHighlight}
              </span>
            </h2>
            <p className={`text-base sm:text-lg max-w-2xl leading-relaxed ${
              isDark ? 'text-slate-300' : 'text-[#44403C]'
            }`}>
              {content.valuesSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {firstSixValues.map((val, idx) => {
              const IconComponent = val.icon;
              return (
                <div
                  key={idx}
                  className={`p-7 flex flex-col justify-between group ${
                    isDark ? 'card-dark' : 'card-light'
                  }`}
                >
                  <div>
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-105 ${
                      isDark
                        ? 'bg-gold/15 text-gold border border-gold/25'
                        : 'bg-[#F7F3EB] text-gold-deep border border-[#E8DEC8]'
                    }`}>
                      <IconComponent className="w-5 h-5 stroke-[1.75]" aria-hidden="true" />
                    </div>
                    <h3 className={`text-lg font-bold tracking-tight leading-snug mb-2.5 transition-colors ${
                      isDark ? 'text-white group-hover:text-gold' : 'text-[#1C1917] group-hover:text-gold-deep'
                    }`}>
                      {val.title}
                    </h3>
                    <p className={`text-sm leading-relaxed ${
                      isDark ? 'text-slate-300' : 'text-[#44403C]'
                    }`}>
                      {val.desc}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* Séptimo valor equilibrado a ancho completo en escritorio */}
            <div
              className={`sm:col-span-2 lg:col-span-3 p-7 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 group ${
                isDark ? 'card-dark' : 'card-light'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-5 max-w-3xl">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105 ${
                  isDark
                    ? 'bg-gold/15 text-gold border border-gold/25'
                    : 'bg-[#F7F3EB] text-gold-deep border border-[#E8DEC8]'
                }`}>
                  <SeventhIcon className="w-6 h-6 stroke-[1.75]" aria-hidden="true" />
                </div>
                <div>
                  <h3 className={`text-xl font-bold tracking-tight leading-snug mb-2 transition-colors ${
                    isDark ? 'text-white group-hover:text-gold' : 'text-[#1C1917] group-hover:text-gold-deep'
                  }`}>
                    {seventhValue.title}
                  </h3>
                  <p className={`text-sm sm:text-base leading-relaxed ${
                    isDark ? 'text-slate-300' : 'text-[#44403C]'
                  }`}>
                    {seventhValue.desc}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsContactModalOpen(true)}
                className={`${
                  isDark ? 'btn-gold' : 'btn-primary-light'
                } inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs sm:text-sm whitespace-nowrap shrink-0 cursor-pointer`}
              >
                <span>{content.ctaLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.section>
      </div>

      <Footer />
    </div>
  );
};

export default AboutPage;
