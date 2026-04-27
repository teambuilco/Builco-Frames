import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check } from 'lucide-react';
import { NetworkBackground } from './NetworkBackground';
import Logo from './Logo';

import { AppContext } from '../context/AppContext';

const MinoPage = () => {
  const { theme, t } = useContext(AppContext);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isForgotOpen, setIsForgotOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [isResetSent, setIsResetSent] = useState(false);
  
  const minoT = t.mino;

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
        className={`relative z-10 w-full max-w-md p-12 shadow-3xl border transition-all duration-500 ${theme === 'dark' ? 'bg-black/40 backdrop-blur-xl border-white/10 rounded-lg' : 'bg-white border-slate-200/60 rounded-2xl'}`}
      >
        <div className="text-center mb-12">
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-8 transition-all ${theme === 'dark' ? 'bg-gold/10' : 'bg-gold-soft'}`}>
            <Logo className={`w-12 h-12 ${theme === 'dark' ? 'text-gold' : 'text-gold-deep'}`} />
          </div>
          <h1 className={`text-4xl font-helvetica font-black tracking-tighter uppercase mb-3 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            {isRegistering ? minoT.registerTitle : minoT.welcome}
          </h1>
          <p className={`text-[11px] font-black uppercase tracking-[0.3em] ${theme === 'dark' ? 'text-white/40' : 'text-slate-400'}`}>
            {isRegistering ? minoT.registerSub : minoT.sub}
          </p>
        </div>

        {!isRegistering ? (
          <>
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-3">
                <label className={`text-[11px] font-black uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>{minoT.email}</label>
                <input type="email" className={`w-full px-5 py-4 rounded-xl border outline-none transition-all ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white focus:border-gold' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-gold focus:bg-white'}`} placeholder="name@company.com" required />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className={`text-[11px] font-black uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>{minoT.password}</label>
                  <button type="button" onClick={() => setIsForgotOpen(true)} className={`text-[11px] font-black uppercase tracking-widest hover:translate-x-1 transition-transform ${theme === 'dark' ? 'text-gold' : 'text-gold-deep'}`}>
                    {minoT.forgot}
                  </button>
                </div>
                <input type="password" className={`w-full px-5 py-4 rounded-xl border outline-none transition-all ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white focus:border-gold' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-gold focus:bg-white'}`} placeholder="••••••••" required />
              </div>
              <button type="submit" className={theme === 'dark' ? 'btn-gold w-full py-5' : 'btn-primary-light w-full py-5'}>
                {minoT.login}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-white/5 text-center">
              <p className={`text-[10px] font-black uppercase tracking-widest mb-4 ${theme === 'dark' ? 'text-white/30' : 'text-slate-400'}`}>
                {minoT.noAccount}
              </p>
              <button onClick={() => setIsRegistering(true)} className={`text-[10px] font-black uppercase tracking-widest hover:underline ${theme === 'dark' ? 'text-gold' : 'text-gold-deep'}`}>
                {minoT.request}
              </button>
            </div>
          </>
        ) : (
          <>
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className={`text-[11px] font-black uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>{minoT.fullName}</label>
                  <input type="text" className={`w-full px-4 py-4 rounded-xl border outline-none transition-all ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white focus:border-gold' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-gold focus:bg-white'}`} required />
                </div>
                <div className="space-y-2">
                  <label className={`text-[11px] font-black uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>{minoT.email}</label>
                  <input type="email" className={`w-full px-4 py-4 rounded-xl border outline-none transition-all ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white focus:border-gold' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-gold focus:bg-white'}`} required />
                </div>
              </div>
              <div className="space-y-2">
                <label className={`text-[11px] font-black uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>{minoT.company}</label>
                <input type="text" className={`w-full px-4 py-4 rounded-xl border outline-none transition-all ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white focus:border-gold' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-gold focus:bg-white'}`} required />
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className={`text-[11px] font-black uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>{minoT.camara}</label>
                  <input type="text" className={`w-full px-4 py-4 rounded-xl border outline-none transition-all ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white focus:border-gold' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-gold focus:bg-white'}`} required />
                </div>
                <div className="space-y-2">
                  <label className={`text-[11px] font-black uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>{minoT.rut}</label>
                  <input type="text" className={`w-full px-4 py-4 rounded-xl border outline-none transition-all ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white focus:border-gold' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-gold focus:bg-white'}`} required />
                </div>
              </div>
              <button type="submit" className={theme === 'dark' ? 'btn-gold w-full mt-4 py-5' : 'btn-primary-light w-full mt-4 py-5'}>
                {minoT.submitRequest}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-white/5 text-center">
              <button onClick={() => setIsRegistering(false)} className={`text-[10px] font-black uppercase tracking-widest hover:underline ${theme === 'dark' ? 'text-gold' : 'text-gold-deep'}`}>
                {minoT.backToLogin}
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
              <div className={`h-24 relative flex items-center px-8 overflow-hidden ${theme === 'dark' ? 'bg-gold' : 'bg-gold-deep'}`}>
                <div className="absolute right-0 top-0 w-48 h-48 bg-black/10 rounded-full -mr-16 -mt-16 blur-2xl" />
                <div className="relative z-10">
                  <h2 className={`text-2xl font-helvetica font-black tracking-tighter uppercase ${theme === 'dark' ? 'text-black' : 'text-white'}`}>{minoT.forgotTitle}</h2>
                  <p className={`font-bold text-[10px] uppercase tracking-widest ${theme === 'dark' ? 'text-black/60' : 'text-white/60'}`}>{minoT.forgotSub}</p>
                </div>
                <button 
                  onClick={() => setIsForgotOpen(false)}
                  className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${theme === 'dark' ? 'bg-black/10 hover:bg-black/20 text-black' : 'bg-white/10 hover:bg-white/20 text-white'}`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-8">
                {!isResetSent ? (
                  <form className="space-y-6" onSubmit={handleResetSubmit}>
                    <div className="space-y-2">
                      <label className={`text-[10px] font-black uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-400'}`}>{minoT.email}</label>
                      <input 
                        type="email" 
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        className={`w-full px-4 py-4 rounded-sm border outline-none transition-all ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white focus:border-gold' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-gold'}`} 
                        placeholder="name@company.com" 
                        required 
                      />
                    </div>
                    <button type="submit" className={`w-full py-5 font-black uppercase tracking-widest text-sm rounded-sm transition-all shadow-xl active:scale-[0.98] ${theme === 'dark' ? 'bg-gold hover:bg-gold-hover text-black shadow-gold/20 hover:shadow-gold/40' : 'bg-slate-900 hover:bg-slate-800 text-white shadow-slate-200'}`}>
                      {minoT.send}
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-4">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ${theme === 'dark' ? 'bg-gold/10' : 'bg-gold-soft'}`}>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className={theme === 'dark' ? 'text-gold' : 'text-gold-deep'}
                      >
                        <Check className="w-8 h-8" />
                      </motion.div>
                    </div>
                    <p className={`text-sm font-bold leading-relaxed mb-8 ${theme === 'dark' ? 'text-white/80' : 'text-slate-600'}`}>
                      {minoT.resetSuccess}
                    </p>
                    <button 
                      onClick={() => setIsForgotOpen(false)}
                      className={`text-[10px] font-black uppercase tracking-widest hover:underline ${theme === 'dark' ? 'text-gold' : 'text-gold-deep'}`}
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
