import React, { useContext } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Shield, Lock, FileText, Globe, CheckCircle2, AlertCircle } from 'lucide-react';
import Logo from './Logo';
import { AppContext } from '../context/AppContext';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  const { theme, t } = useContext(AppContext);
  const pt = t.privacy;

  const getIcon = (index: number) => {
    switch (index) {
      case 0: return <Globe className="w-6 h-6 text-gold" />;
      case 1: return <CheckCircle2 className="w-6 h-6 text-gold" />;
      case 2: return <FileText className="w-6 h-6 text-gold" />;
      case 3: return <Lock className="w-6 h-6 text-gold" />;
      case 4: return <AlertCircle className="w-6 h-6 text-gold" />;
      default: return <Shield className="w-6 h-6 text-gold" />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 10 }}
            className={`relative w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] ${
              theme === 'dark' 
                ? 'bg-charcoal border border-white/10 rounded-lg' 
                : 'bg-white border border-slate-200/60 rounded-2xl'
            }`}
          >
            {/* Header */}
            <div className={`p-8 md:p-10 relative overflow-hidden border-b ${
              theme === 'dark' ? 'border-white/10 bg-white/[0.02]' : 'border-slate-100 bg-slate-50/50'
            }`}>
              <div className="flex flex-col md:flex-row md:items-center gap-6 relative z-10">
                <div className={`p-4 rounded-2xl w-fit ${theme === 'dark' ? 'bg-gold/10' : 'bg-gold-soft'}`}>
                  <Shield className={`w-10 h-10 ${theme === 'dark' ? 'text-gold' : 'text-gold-deep'}`} />
                </div>
                <div>
                  <h2 className={`text-3xl md:text-4xl font-helvetica font-black tracking-tighter uppercase mb-2 ${
                    theme === 'dark' ? 'text-white' : 'text-slate-900'
                  }`}>
                    {pt.title}
                  </h2>
                  <div className="flex items-center gap-3">
                    <div className={`h-px w-8 ${theme === 'dark' ? 'bg-gold/30' : 'bg-gold-deep/30'}`} />
                    <p className={`text-[11px] font-black uppercase tracking-[0.3em] ${
                      theme === 'dark' ? 'text-gold/60' : 'text-gold-deep/70'
                    }`}>
                      {pt.sub}
                    </p>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={onClose}
                className={`absolute top-8 right-8 p-3 rounded-full transition-all hover:scale-110 active:scale-95 ${
                  theme === 'dark' ? 'bg-white/5 hover:bg-white/10 text-white' : 'bg-slate-200 hover:bg-slate-300 text-slate-800'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className={`p-8 md:p-16 overflow-y-auto max-h-[60vh] custom-scrollbar ${
              theme === 'dark' ? 'text-white/60' : 'text-slate-500'
            }`}>
              <div className="max-w-3xl mx-auto space-y-16">
                {pt.content.map((section, idx) => (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="group"
                  >
                    <div className="flex gap-6">
                      <div className="flex-shrink-0 mt-1">
                        {getIcon(idx)}
                      </div>
                      <div className="space-y-4">
                        <h3 className={`text-xl font-bold uppercase tracking-tight transition-colors ${
                          theme === 'dark' ? 'text-white group-hover:text-gold' : 'text-slate-900 group-hover:text-gold-deep'
                        }`}>
                          {section.title}
                        </h3>
                        <p className={`text-lg leading-relaxed font-medium transition-colors ${
                          theme === 'dark' ? 'group-hover:text-white/90' : 'group-hover:text-slate-900'
                        }`}>
                          {section.text}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className={`mt-24 pt-12 border-t text-center ${
                theme === 'dark' ? 'border-white/5' : 'border-slate-100'
              }`}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-current opacity-20 mb-4">
                  <Logo className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">Certified Entity</span>
                </div>
                <p className="text-xs font-black uppercase tracking-[0.3em] opacity-30">
                  Building Connections Strategic Partners • {new Date().getFullYear()}
                </p>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className={`p-8 md:px-16 border-t flex justify-end ${
              theme === 'dark' ? 'border-white/10 bg-white/[0.01]' : 'border-slate-100 bg-slate-50/30'
            }`}>
              <button 
                onClick={onClose}
                className={theme === 'dark' ? 'btn-gold min-w-[200px]' : 'btn-primary-light min-w-[200px]'}
              >
                {t.mino.close}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
