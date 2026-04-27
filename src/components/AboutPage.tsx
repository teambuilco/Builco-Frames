import React, { useEffect, useRef, useContext } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Globe, Users, Target, Shield } from 'lucide-react';
import Logo from './Logo';
import { AppContext } from '../context/AppContext';

const AboutPage = () => {
  const { theme } = useContext(AppContext);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  return (
    <div className={`relative min-h-screen overflow-hidden font-sans transition-colors duration-500 ${theme === 'dark' ? 'bg-black text-white' : 'bg-[#FCFCFB] text-slate-900'}`}>
      {/* Background Video - Film Strip Style */}
      <div className={`absolute inset-0 z-0 ${theme === 'dark' ? 'opacity-40' : 'opacity-10'}`}>
        <div className={`absolute inset-0 bg-gradient-to-b from-inherit via-transparent to-inherit z-10`} />
        <div className={`absolute inset-0 bg-gradient-to-r from-inherit via-transparent to-inherit z-10`} />
        
        {/* Film Strip Overlay Effect */}
        <div className="absolute inset-0 z-20 pointer-events-none opacity-20">
          <div className={`h-full w-full border-x-[40px] border-dashed ${theme === 'dark' ? 'border-white/10' : 'border-slate-900/10'}`} />
        </div>

        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover grayscale brightness-50"
        >
          <source 
            src="https://assets.mixkit.co/videos/preview/mixkit-miner-working-in-a-mine-4286-large.mp4" 
            type="video/mp4" 
          />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Content */}
      <div className="relative z-30 max-w-5xl mx-auto px-6 py-20">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => window.close()}
          className={`flex items-center gap-3 transition-all mb-16 px-6 py-3 rounded-full border-2 group hover:scale-105 active:scale-95 ${theme === 'dark' ? 'border-gold/30 text-gold hover:border-gold hover:text-white bg-gold/5' : 'border-slate-200 text-slate-700 hover:border-slate-900 hover:text-slate-900 bg-white shadow-sm'}`}
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-black uppercase tracking-[0.2em]">Regresar</span>
        </motion.button>

        <header className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-6 mb-12">
              <Logo className={`w-14 h-14 ${theme === 'dark' ? 'text-gold' : 'text-gold-deep'}`} />
              <div className={`h-14 w-px ${theme === 'dark' ? 'bg-white/20' : 'bg-slate-900/20'}`} />
              <span className={`text-2xl font-black uppercase tracking-[0.3em] ${theme === 'dark' ? 'text-white/50' : 'text-slate-400'}`}>Builco</span>
            </div>
            <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-none mb-10">
              Nuestra <span className={theme === 'dark' ? 'text-gold' : 'text-gold-deep'}>Historia</span>
            </h1>
            <div className={`w-40 h-2.5 mb-12 rounded-full ${theme === 'dark' ? 'bg-gold shadow-[0_0_20px_rgba(225,180,109,0.3)]' : 'bg-gold-deep'}`} />
            <p className={`text-2xl md:text-3xl max-w-3xl font-medium leading-[1.4] ${theme === 'dark' ? 'text-white/70' : 'text-slate-600'}`}>
              Builco nació en las profundidades de la tierra, donde el esfuerzo humano se encuentra con la riqueza mineral.
            </p>
          </motion.div>
        </header>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <div className={`p-10 border transition-all duration-700 hover:translate-y-[-4px] ${theme === 'dark' ? 'border-white/10 bg-white/5 rounded-lg' : 'border-slate-200/60 bg-white/80 shadow-lg shadow-slate-100 rounded-2xl'}`}>
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-4">
                <Target className={`w-8 h-8 ${theme === 'dark' ? 'text-gold' : 'text-gold-deep'}`} /> El Origen
              </h2>
              <p className={`text-lg leading-relaxed ${theme === 'dark' ? 'text-white/60' : 'text-slate-500 font-medium'}`}>
                Fundada en 2015, Building Connections (Builco) surgió de una necesidad crítica en el sector minero: la falta de una red estratégica que conectara a los actores clave con tecnología de vanguardia y servicios de consultoría de alto nivel.
              </p>
            </div>

            <div className={`p-10 border transition-all duration-700 hover:translate-y-[-4px] ${theme === 'dark' ? 'border-white/10 bg-white/5 rounded-lg' : 'border-slate-200/60 bg-white/80 shadow-lg shadow-slate-100 rounded-2xl'}`}>
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-4">
                <Users className={`w-8 h-8 ${theme === 'dark' ? 'text-gold' : 'text-gold-deep'}`} /> Nuestra Gente
              </h2>
              <p className={`text-lg leading-relaxed ${theme === 'dark' ? 'text-white/60' : 'text-slate-500 font-medium'}`}>
                Creemos que el corazón de la minería no son las máquinas, sino las personas. Por eso, nuestra plataforma Mino está diseñada para empoderar a cada trabajador, desde el tajo hasta la gerencia, facilitando una comunicación transparente y eficiente.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-10"
          >
            <div className={`p-10 border transition-all duration-700 hover:translate-y-[-4px] ${theme === 'dark' ? 'border-white/10 bg-white/5 rounded-lg' : 'border-slate-200/60 bg-white/80 shadow-lg shadow-slate-100 rounded-2xl'}`}>
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-4">
                <Globe className={`w-8 h-8 ${theme === 'dark' ? 'text-gold' : 'text-gold-deep'}`} /> Impacto Global
              </h2>
              <p className={`text-lg leading-relaxed ${theme === 'dark' ? 'text-white/60' : 'text-slate-500 font-medium'}`}>
                Lo que comenzó como una iniciativa local en las regiones mineras de Colombia, hoy se proyecta como un estándar internacional de conectividad y eficiencia operativa en la industria extractiva global.
              </p>
            </div>

            <div className={`p-10 border transition-all duration-700 hover:translate-y-[-4px] ${theme === 'dark' ? 'border-white/10 bg-white/5 rounded-lg' : 'border-slate-200/60 bg-white/80 shadow-lg shadow-slate-100 rounded-2xl'}`}>
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-4">
                <Shield className={`w-8 h-8 ${theme === 'dark' ? 'text-gold' : 'text-gold-deep'}`} /> Compromiso
              </h2>
              <p className={`text-lg leading-relaxed ${theme === 'dark' ? 'text-white/60' : 'text-slate-500 font-medium'}`}>
                Nuestro compromiso es con la seguridad, la sostenibilidad y la innovación. Cada conexión que construimos es un paso hacia una minería más humana y tecnológicamente avanzada.
              </p>
            </div>
          </motion.div>
        </div>

        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className={`mt-32 pt-12 border-t text-center ${theme === 'dark' ? 'border-white/10' : 'border-slate-200'}`}
        >
          <div className="flex justify-center mb-8">
            <Logo className={`w-10 h-10 opacity-50 grayscale ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`} />
          </div>
          <p className={`text-sm font-black uppercase tracking-[0.5em] ${theme === 'dark' ? 'text-white/30' : 'text-slate-400'}`}>
            Building Connections &copy; 2026 - Forjando el Futuro
          </p>
        </motion.footer>
      </div>

      {/* Film Grain Effect */}
      <div 
        className="absolute inset-0 z-40 pointer-events-none opacity-[0.03] mix-blend-overlay"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
    </div>
  );
};

export default AboutPage;
