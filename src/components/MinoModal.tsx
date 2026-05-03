import React, { useContext } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { AppContext } from '../context/AppContext';

export const MinoModal = () => {
  const { theme, lang, isMinoModalOpen, setIsMinoModalOpen } = useContext(AppContext);
  
  if (!isMinoModalOpen) return null;

  const t = lang === 'es' ? {
    title: 'Mino - Registro Inicial',
    sub: 'Únete a la red estratégica de minería, energía e Gobierno y relaciones públicas.',
    name: 'Nombre Completo',
    email: 'Correo Electrónico',
    company: 'Empresa',
    message: 'Mensaje / Interés',
    submit: 'Enviar Registro',
    close: 'Cerrar'
  } : {
    title: 'Mino - Initial Registration',
    sub: 'Join the strategic network of mining, energy, and Government and Public Relations.',
    name: 'Full Name',
    email: 'Email Address',
    company: 'Company',
    message: 'Message / Interest',
    submit: 'Submit Registration',
    close: 'Close'
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsMinoModalOpen(false)}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className={`relative w-full max-w-2xl overflow-hidden shadow-3xl ${theme === 'dark' ? 'bg-charcoal border border-white/10 rounded-lg' : 'bg-white border border-slate-200/60 rounded-2xl'}`}
        >
          <div className={`h-36 relative flex items-center px-10 overflow-hidden ${theme === 'dark' ? 'bg-gold' : 'bg-gold-deep'}`}>
            <div className="absolute right-0 top-0 w-64 h-64 bg-black/10 rounded-full -mr-20 -mt-20 blur-3xl" />
            <div className="relative z-10">
              <h2 className={`text-4xl font-helvetica font-black tracking-tighter uppercase mb-1 ${theme === 'dark' ? 'text-black' : 'text-white'}`}>{t.title}</h2>
              <p className={`font-bold text-xs uppercase tracking-[0.2em] ${theme === 'dark' ? 'text-black/50' : 'text-white/60'}`}>{t.sub}</p>
            </div>
            <button 
              onClick={() => setIsMinoModalOpen(false)}
              className={`absolute top-8 right-8 p-3 rounded-full transition-all hover:scale-110 active:scale-90 ${theme === 'dark' ? 'bg-black/10 hover:bg-black/20 text-black' : 'bg-white/10 hover:bg-white/20 text-white'}`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-12">
            <form className="grid gap-8" onSubmit={(e) => { e.preventDefault(); setIsMinoModalOpen(false); }}>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className={`text-[11px] font-black uppercase tracking-[0.2em] ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>{t.name}</label>
                  <input type="text" placeholder="John Doe" className={`w-full px-5 py-4 rounded-xl border outline-none transition-all ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white focus:border-gold' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-gold focus:bg-white'}`} required />
                </div>
                <div className="space-y-3">
                  <label className={`text-[11px] font-black uppercase tracking-[0.2em] ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>{t.email}</label>
                  <input type="email" placeholder="john@company.com" className={`w-full px-5 py-4 rounded-xl border outline-none transition-all ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white focus:border-gold' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-gold focus:bg-white'}`} required />
                </div>
              </div>
              <div className="space-y-3">
                <label className={`text-[11px] font-black uppercase tracking-[0.2em] ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>{t.company}</label>
                <input type="text" placeholder="Your Company Ltd." className={`w-full px-5 py-4 rounded-xl border outline-none transition-all ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white focus:border-gold' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-gold focus:bg-white'}`} required />
              </div>
              <div className="space-y-3">
                <label className={`text-[11px] font-black uppercase tracking-[0.2em] ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>{t.message}</label>
                <textarea rows={4} placeholder="How can we help you?" className={`w-full px-5 py-4 rounded-xl border outline-none transition-all resize-none ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white focus:border-gold' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-gold focus:bg-white'}`} required />
              </div>
              <button type="submit" className={theme === 'dark' ? 'btn-gold w-full mt-2' : 'btn-primary-light w-full mt-2'}>
                {t.submit}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
