import React, { useContext } from 'react';
import { motion } from 'motion/react';
import { Globe, ArrowRight, ShieldCheck, Landmark, Users2, FileText, BarChart, MapPin } from 'lucide-react';
import { NetworkBackground } from './NetworkBackground';
import Logo from './Logo';
import { AppContext } from '../context/AppContext';

const GovPage = () => {
  const { theme, lang } = useContext(AppContext);
  
  const content = lang === 'es' ? {
    badge: 'Relaciones Gubernamentales',
    title: 'Gobierno y ',
    titleHighlight: 'Relaciones Públicas',
    sub: 'Gestionamos la convergencia entre el sector privado y lo público, impulsando proyectos de alto impacto para el bienestar regional en Colombia.',
    teamTitle: 'Equipo de Alto Nivel Técnico',
    teamText: 'Contamos con un equipo interdisciplinario con conocimiento profundo del Congreso de la República. Nuestra experticia técnica nos permite asesorar la planeación y ejecución de proyectos con los más altos estándares de excelencia.',
    appTitle: 'Gestión de Actores Públicos',
    appSub: 'Plataforma para la articulación institucional',
    appText: 'Hemos desarrollado un aplicativo web especializado para la gestión de proyectos que involucra a alcaldes, gobernadores y congresistas. Esta herramienta permite un seguimiento ético y transparente del lobby, facilitando la planeación conjunta para el desarrollo de las zonas más necesitadas de Colombia.',
    features: [
      { title: 'Lobby Ético', desc: 'Representación transparente ante el Congreso y entidades gubernamentales.', icon: <ShieldCheck className="w-6 h-6" /> },
      { title: 'Articulación Regional', desc: 'Conexión efectiva con alcaldías y gobernaciones en todo el país.', icon: <MapPin className="w-6 h-6" /> },
      { title: 'Planeación Estratégica', desc: 'Asesoría técnica para convertir visiones en proyectos viables.', icon: <FileText className="w-6 h-6" /> }
    ]
  } : {
    badge: 'Government Relations',
    title: 'Government and ',
    titleHighlight: 'Public Relations',
    sub: 'We manage the convergence between the private and public sectors, driving high-impact projects for regional welfare in Colombia.',
    teamTitle: 'High-Level Technical Team',
    teamText: 'We have an interdisciplinary team with deep knowledge of the Congress of the Republic. Our technical expertise allows us to advise the planning and execution of projects with the highest standards of excellence.',
    appTitle: 'Public Actor Management',
    appSub: 'Platform for institutional articulation',
    appText: 'We have developed a specialized web application for project management involving mayors, governors, and congressmen. This tool allows for ethical and transparent monitoring of lobbying, facilitating joint planning for the development of Colombia\'s most needed areas.',
    features: [
      { title: 'Ethical Lobbying', desc: 'Transparent representation before Congress and government entities.', icon: <ShieldCheck className="w-6 h-6" /> },
      { title: 'Regional Articulation', desc: 'Effective connection with city halls and governorships across the country.', icon: <MapPin className="w-6 h-6" /> },
      { title: 'Strategic Planning', desc: 'Technical advice to turn visions into viable projects.', icon: <FileText className="w-6 h-6" /> }
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
            <h2 className="text-4xl font-bold mb-8 uppercase tracking-tighter">{content.teamTitle}</h2>
            <div className="w-20 h-1.5 bg-gold mb-8 rounded-full"></div>
            <p className={`text-lg leading-relaxed ${theme === 'dark' ? 'text-white/60' : 'text-slate-600'}`}>
              {content.teamText}
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
                <Landmark className={theme === 'dark' ? 'text-gold' : 'text-gold-deep'} />
                <h3 className="text-3xl font-black uppercase tracking-tighter">{content.appTitle}</h3>
              </div>
              <p className={`text-lg font-bold mb-8 ${theme === 'dark' ? 'text-gold' : 'text-gold-deep'}`}>{content.appSub}</p>
              <p className={`text-lg leading-relaxed ${theme === 'dark' ? 'text-white/70' : 'text-slate-700 font-medium'}`}>
                {content.appText}
              </p>
            </div>
            
            <div className="flex-shrink-0">
               <div className={`w-64 h-64 border-4 rounded-3xl flex flex-col items-center justify-center gap-6 ${theme === 'dark' ? 'bg-charcoal border-white/10' : 'bg-white border-gold/30'}`}>
                  <Logo className={`w-24 h-24 ${theme === 'dark' ? 'text-gold' : 'text-gold-deep'}`} />
                  <span className="font-helvetica font-black text-2xl tracking-widest text-gold text-center">PUBLIC RELATIONS</span>
               </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default GovPage;
