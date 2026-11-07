import React, { useContext } from 'react';
import { motion } from 'motion/react';
import { Globe, ArrowRight, ArrowLeft, Zap, Shield, Database, LayoutPanelTop, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { NetworkBackground } from './NetworkBackground';
import Logo from './Logo';
import { AppContext } from '../context/AppContext';
import { TerritorialFormalization } from './TerritorialFormalization';
import { MinoAppLoop } from './MinoAppLoop';
import { BarequerosSection } from './BarequerosSection';

const MiningPage = () => {
  const { theme, lang, setIsContactModalOpen } = useContext(AppContext);
  
  const content = lang === 'es' ? {
    badge: 'Experiencia Sectorial',
    title: 'Minería en ',
    titleHighlight: 'Colombia',
    sub: 'Liderando la transformación digital del sector extractivo a través de inteligencia estratégica y soluciones tecnológicas de vanguardia.',
    experienceTitle: 'Nuestra Trayectoria',
    experienceText: 'Con décadas de experiencia en el territorio colombiano, hemos navegado los desafíos complejos de la minería de oro, carbón y esmeraldas, conectando a los grandes actores con oportunidades de alto impacto.',
    minoTitle: 'Mino™: Marketplace Industrial',
    minoSub: 'Plataforma líder para el sector minero-industrial',
    minoText: 'Desarrollamos "Mino", un ecosistema digital diseñado específicamente para optimizar la cadena de suministro y la gestión de activos en el sector industrial y minero. Mino permite una conexión eficiente entre proveedores, operadores e inversionistas, garantizando transparencia y eficiencia operativa.',
    features: [
      { title: 'Optimización de Activos', desc: 'Gestión inteligente de maquinaria y recursos mineros.', icon: <Zap className="w-6 h-6" /> },
      { title: 'Conexión Estratégica', desc: 'Networking directo con tomadores de decisiones en el sector.', icon: <Globe className="w-6 h-6" /> },
      { title: 'Inteligencia de Datos', desc: 'Análisis predictivo para operaciones mineras seguras.', icon: <BarChart3 className="w-6 h-6" /> }
    ]
  } : {
    badge: 'Sector Expertise',
    title: 'Mining in ',
    titleHighlight: 'Colombia',
    sub: 'Leading the digital transformation of the extractive sector through strategic intelligence and cutting-edge technological solutions.',
    experienceTitle: 'Our Track Record',
    experienceText: 'With decades of experience in Colombian territory, we have navigated the complex challenges of gold, coal, and emerald mining, connecting major players with high-impact opportunities.',
    minoTitle: 'Mino™: Industrial Marketplace',
    minoSub: 'Leading platform for the mining-industrial sector',
    minoText: 'We developed "Mino", a digital ecosystem specifically designed to optimize the supply chain and asset management in the industrial and mining sector. Mino enables efficient connection between suppliers, operators, and investors, ensuring transparency and operational efficiency.',
    features: [
      { title: 'Asset Optimization', desc: 'Intelligent management of mining machinery and resources.', icon: <Zap className="w-6 h-6" /> },
      { title: 'Strategic Connection', desc: 'Direct networking with key decision-makers in the sector.', icon: <Globe className="w-6 h-6" /> },
      { title: 'Data Intelligence', desc: 'Predictive analysis for safe mining operations.', icon: <BarChart3 className="w-6 h-6" /> }
    ]
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 overflow-hidden ${theme === 'dark' ? 'bg-charcoal text-white' : 'bg-[#FAF8F5] text-[#1C1917]'}`}>
      <NetworkBackground />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <Link
          to="/"
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider mb-12 transition-all duration-200 ${
            theme === 'dark'
              ? 'bg-white/5 hover:bg-white/10 text-white/80 border border-white/10'
              : 'bg-white hover:bg-[#F4EFE6] text-[#1C1917] border border-[#E8DEC8] shadow-xs'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          {lang === 'es' ? 'Volver al Inicio' : 'Back to Home'}
        </Link>

        <div className="flex flex-col items-center text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`p-4 rounded-2xl mb-8 ${theme === 'dark' ? 'bg-gold/10' : 'bg-white border border-[#E8DEC8] shadow-xs'}`}
          >
            <Logo className={`w-16 h-16 ${theme === 'dark' ? 'text-gold' : 'text-gold-deep'}`} />
          </motion.div>
          
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-bold uppercase tracking-widest mb-8 text-[10px] transition-colors ${theme === 'dark' ? 'bg-gold/10 border border-gold/20 text-gold' : 'bg-[#F7F3EB] border border-[#E8DEC8] text-gold-deep'}`}>
            {content.badge}
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 max-w-4xl">
            {content.title}<span className={theme === 'dark' ? 'text-gold' : 'text-gold-deep'}>{content.titleHighlight}</span>
          </h1>
          
          <p className={`text-xl md:text-2xl max-w-3xl leading-relaxed ${theme === 'dark' ? 'text-white/70' : 'text-[#44403C] font-medium'}`}>
            {content.sub}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-20 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-8 uppercase tracking-tighter">{content.experienceTitle}</h2>
            <div className={`w-20 h-1.5 ${theme === 'dark' ? 'bg-gold' : 'bg-gold-deep'} mb-8 rounded-full`}></div>
            <p className={`text-lg leading-relaxed ${theme === 'dark' ? 'text-white/60' : 'text-[#44403C]'}`}>
              {content.experienceText}
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 gap-6">
            {content.features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`p-8 border rounded-2xl transition-all duration-300 cursor-default group hover:-translate-y-1.5 ${
                  theme === 'dark' 
                    ? 'bg-white/5 border-white/10 hover:bg-white/[0.08] hover:border-gold/60 hover:shadow-[0_16px_40px_rgba(229,184,108,0.18)] hover:ring-1 hover:ring-gold/30' 
                    : 'bg-white border-[#E8DEC8] shadow-xs hover:border-gold-deep/60 hover:shadow-[0_16px_40px_rgba(158,112,32,0.12)] hover:ring-1 hover:ring-gold-deep/20'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 ${
                  theme === 'dark' ? 'bg-gold/20 text-gold' : 'bg-[#F7F3EB] text-gold-deep border border-[#E8DEC8]'
                }`}>
                  {feature.icon}
                </div>
                <h4 className={`text-xl font-bold mb-2 transition-colors duration-200 ${
                  theme === 'dark' ? 'text-white group-hover:text-gold' : 'text-[#1C1917] group-hover:text-gold-deep'
                }`}>
                  {feature.title}
                </h4>
                <p className={`text-sm transition-colors duration-200 ${
                  theme === 'dark' ? 'text-white/40 group-hover:text-white/70' : 'text-[#78716C] group-hover:text-[#44403C]'
                }`}>
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mino Web App Live Interactive Loop Showcase */}
        <div className="mb-32">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-bold uppercase tracking-widest mb-4 text-[10px] ${
              theme === 'dark' ? 'bg-gold/10 border border-gold/20 text-gold' : 'bg-[#F7F3EB] border border-[#E8DEC8] text-gold-deep'
            }`}>
              <Database className="w-3.5 h-3.5" />
              <span>{content.minoSub}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">
              {content.minoTitle}
            </h2>
            <p className={`text-lg leading-relaxed ${theme === 'dark' ? 'text-white/70' : 'text-[#44403C]'}`}>
              {content.minoText}
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <MinoAppLoop />
          </motion.div>
        </div>
      </div>

      {/* Dedicated Remote Mining Formalization Section */}
      <div className="relative z-10 -mx-6 sm:-mx-0">
        <TerritorialFormalization />
      </div>

      {/* Comunidades de Barequeros Tradicionales (Abajo de Formalización Minera) */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 pb-32">
        <BarequerosSection />
      </div>
    </div>
  );
};

export default MiningPage;
