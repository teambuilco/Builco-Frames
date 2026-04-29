import React, { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, CheckCircle2, Mail, User, MessageSquare } from 'lucide-react';
import { AppContext } from '../context/AppContext';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const { theme, t } = useContext(AppContext);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const ct = t.contactForm;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleClose = () => {
    onClose();
    // Reset submission state shortly after closing to avoid flicker
    setTimeout(() => setIsSubmitted(false), 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className={`relative w-full max-w-xl overflow-hidden shadow-3xl ${
              theme === 'dark' 
                ? 'bg-charcoal border border-white/10 rounded-lg' 
                : 'bg-white border border-slate-200/60 rounded-2xl'
            }`}
          >
            {!isSubmitted ? (
              <>
                <div className={`h-36 relative flex items-center px-10 overflow-hidden ${theme === 'dark' ? 'bg-gold' : 'bg-gold-deep'}`}>
                  <div className="absolute right-0 top-0 w-64 h-64 bg-black/10 rounded-full -mr-20 -mt-20 blur-3xl" />
                  <div className="relative z-10">
                    <h2 className={`text-3xl md:text-4xl font-helvetica font-black tracking-tighter uppercase mb-1 ${theme === 'dark' ? 'text-black' : 'text-white'}`}>
                      {ct.title}
                    </h2>
                    <p className={`font-bold text-[10px] uppercase tracking-[0.2em] ${theme === 'dark' ? 'text-black/50' : 'text-white/60'}`}>
                      {ct.sub}
                    </p>
                  </div>
                  <button 
                    onClick={handleClose}
                    className={`absolute top-8 right-8 p-3 rounded-full transition-all hover:scale-110 active:scale-90 ${theme === 'dark' ? 'bg-black/10 hover:bg-black/20 text-black' : 'bg-white/10 hover:bg-white/20 text-white'}`}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-10 md:p-12">
                  <form className="grid gap-8" onSubmit={handleSubmit}>
                    <div className="space-y-3">
                      <label className={`text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-2 ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>
                        <User className="w-3 h-3" /> {ct.name}
                      </label>
                      <input 
                        type="text" 
                        placeholder="Your Name" 
                        className={`w-full px-5 py-4 rounded-xl border outline-none transition-all ${
                          theme === 'dark' 
                            ? 'bg-white/5 border-white/10 text-white focus:border-gold' 
                            : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-gold focus:bg-white'
                        }`} 
                        required 
                      />
                    </div>

                    <div className="space-y-3">
                      <label className={`text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-2 ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>
                        <Mail className="w-3 h-3" /> {ct.email}
                      </label>
                      <input 
                        type="email" 
                        placeholder="name@company.com" 
                        className={`w-full px-5 py-4 rounded-xl border outline-none transition-all ${
                          theme === 'dark' 
                            ? 'bg-white/5 border-white/10 text-white focus:border-gold' 
                            : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-gold focus:bg-white'
                        }`} 
                        required 
                      />
                    </div>

                    <div className="space-y-3">
                      <label className={`text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-2 ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>
                        <MessageSquare className="w-3 h-3" /> {ct.message}
                      </label>
                      <textarea 
                        rows={4} 
                        placeholder="How can we assist you strategically?" 
                        className={`w-full px-5 py-4 rounded-xl border outline-none transition-all resize-none ${
                          theme === 'dark' 
                            ? 'bg-white/5 border-white/10 text-white focus:border-gold' 
                            : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-gold focus:bg-white'
                        }`} 
                        required 
                      />
                    </div>

                    <button 
                      type="submit" 
                      className={`flex items-center justify-center gap-3 w-full py-5 font-black uppercase tracking-widest text-sm rounded-xl transition-all shadow-xl active:scale-[0.98] ${
                        theme === 'dark' ? 'btn-gold' : 'btn-primary-light'
                      }`}
                    >
                      {ct.submit} <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-16 text-center space-y-8"
              >
                <div className={`w-24 h-24 rounded-full mx-auto flex items-center justify-center ${theme === 'dark' ? 'bg-gold/20' : 'bg-gold-soft'}`}>
                  <CheckCircle2 className={`w-12 h-12 ${theme === 'dark' ? 'text-gold' : 'text-gold-deep'}`} />
                </div>
                <div className="space-y-4">
                  <h2 className={`text-4xl font-black uppercase tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    {ct.successTitle}
                  </h2>
                  <p className={`text-lg font-medium leading-relaxed max-w-sm mx-auto ${theme === 'dark' ? 'text-white/60' : 'text-slate-500'}`}>
                    {ct.successMessage}
                  </p>
                </div>
                <button 
                  onClick={handleClose}
                  className={`px-12 py-5 font-black uppercase tracking-widest text-sm rounded-xl transition-all ${
                    theme === 'dark' ? 'btn-gold' : 'btn-primary-light'
                  }`}
                >
                  {ct.close}
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
