import React, { useContext } from 'react';
import { motion } from 'motion/react';
import { Globe, ArrowRight, Zap, Shield, Database, LayoutPanelTop, BarChart3 } from 'lucide-react';
import { NetworkBackground } from './NetworkBackground';
import Logo from './Logo';
import { AppContext } from '../context/AppContext';

const MiningPage = () => {
  const { theme, lang } = useContext(AppContext);
  
  const content = lang === 'es' ? {
    badge: 'Experiencia Sectorial',
    title: 'Minería en ',
    titleHighlight: 'Colombia',
    sub: 'Liderando la transformación digital del sector extractivo a través de inteligencia estratégica y soluciones tecnológicas de vanguardia.',
    experienceTitle: 'Nuestra Trayectoria',
    experienceText: 'Con décadas de experiencia en el territorio colombiano, hemos navegado los desafíos complejos de la minería de oro, carbón y esmeraldas, conectando a los grandes actores con oportunidades de alto impacto.',
    minoTitle: 'Mino: El Marketplace Industrial',
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
    minoTitle: 'Mino: The Industrial Marketplace',
    minoSub: 'Leading platform for the mining-industrial sector',
    minoText: 'We developed "Mino", a digital ecosystem specifically designed to optimize the supply chain and asset management in the industrial and mining sector. Mino enables efficient connection between suppliers, operators, and investors, ensuring transparency and operational efficiency.',
    features: [
      { title: 'Asset Optimization', desc: 'Intelligent management of mining machinery and resources.', icon: <Zap className="w-6 h-6" /> },
      { title: 'Strategic Connection', desc: 'Direct networking with key decision-makers in the sector.', icon: <Globe className="w-6 h-6" /> },
      { title: 'Data Intelligence', desc: 'Predictive analysis for safe mining operations.', icon: <BarChart3 className="w-6 h-6" /> }
    ]
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 overflow-hidden ${theme === 'dark' ? 'bg-charcoal text-white' : 'bg-white text-slate-900'}`}>
      <NetworkBackground />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col items-center text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`p-4 rounded-2xl mb-8 ${theme === 'dark' ? 'bg-gold/10' : 'bg-gold-soft'}`}
          >
            <Logo className={`w-16 h-16 ${theme === 'dark' ? 'text-gold' : 'text-gold-deep'}`} />
          </motion.div>
          
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-bold uppercase tracking-widest mb-8 text-[10px] transition-colors ${theme === 'dark' ? 'bg-gold/10 border border-gold/20 text-gold' : 'bg-gold-soft border border-gold-deep/20 text-gold-deep'}`}>
            {content.badge}
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 max-w-4xl">
            {content.title}<span className={theme === 'dark' ? 'text-gold' : 'text-gold-deep'}>{content.titleHighlight}</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/60 max-w-3xl leading-relaxed">
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
            <div className="w-20 h-1.5 bg-gold mb-8 rounded-full"></div>
            <p className={`text-lg leading-relaxed ${theme === 'dark' ? 'text-white/60' : 'text-slate-600'}`}>
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
                className={`p-8 border rounded-sm ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`}
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 ${theme === 'dark' ? 'bg-gold/20 text-gold' : 'bg-gold-soft text-gold-deep'}`}>
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold mb-2">{feature.title}</h4>
                <p className={`text-sm ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`p-16 rounded-sm border relative overflow-hidden ${theme === 'dark' ? 'bg-black border-gold/20' : 'bg-gold-soft border-gold-deep/20'}`}
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 -mr-48 -mt-48 rounded-full blur-3xl"></div>
          <div className="relative z-10 flex flex-col md:flex-row gap-16 items-center">
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center gap-4 mb-6 justify-center md:justify-start">
                <Database className={theme === 'dark' ? 'text-gold' : 'text-gold-deep'} />
                <h3 className="text-3xl font-black uppercase tracking-tighter">{content.minoTitle}</h3>
              </div>
              <p className={`text-lg font-bold mb-8 ${theme === 'dark' ? 'text-gold' : 'text-gold-deep'}`}>{content.minoSub}</p>
              <p className={`text-lg leading-relaxed ${theme === 'dark' ? 'text-white/70' : 'text-slate-700 font-medium'}`}>
                {content.minoText}
              </p>
            </div>
            
            <div className="flex-shrink-0">
               <div className={`w-64 h-64 border-4 rounded-3xl flex flex-col items-center justify-center gap-6 ${theme === 'dark' ? 'bg-charcoal border-white/10' : 'bg-white border-gold/30'}`}>
                  <Logo className={`w-24 h-24 ${theme === 'dark' ? 'text-gold' : 'text-gold-deep'}`} />
                  <span className="font-helvetica font-black text-2xl tracking-widest text-gold text-center">MINO</span>
               </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MiningPage;
