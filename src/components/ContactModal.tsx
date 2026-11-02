import React, { useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, CheckCircle2, Mail, User, MessageSquare, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  }
  const errorJson = JSON.stringify(errInfo);
  console.error('Firestore Error: ', errorJson);
  throw new Error(errorJson);
}

export const ContactModal: React.FC = () => {
  const { theme, t, isContactModalOpen, setIsContactModalOpen } = useContext(AppContext);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  
  const onClose = () => setIsContactModalOpen(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const ct = t.contactForm;

  const handleRedirectHome = () => {
    onClose();
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 300);
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const path = 'contactInquiries';
    try {
      await addDoc(collection(db, path), {
        ...formData,
        createdAt: serverTimestamp()
      });
      setIsSubmitted(true);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
    // Reset submission state shortly after closing to avoid flicker
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 300);
  };

  // Auto-redirect to home page after 3.5 seconds on successful submission
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSubmitted && isContactModalOpen) {
      timer = setTimeout(() => {
        handleRedirectHome();
      }, 3500);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isSubmitted, isContactModalOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isContactModalOpen) {
        handleClose();
      }
    };
    if (isContactModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isContactModalOpen]);

  return (
    <AnimatePresence>
      {isContactModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className={`relative w-full max-w-xl overflow-hidden shadow-3xl ${
              theme === 'dark' 
                ? 'bg-charcoal border border-white/10 rounded-lg' 
                : 'bg-white border border-slate-200/80 rounded-2xl'
            }`}
          >
            {!isSubmitted ? (
              <>
                <div className={`h-36 relative flex items-center px-10 overflow-hidden ${theme === 'dark' ? 'bg-gold' : 'bg-linear-to-r from-[#926E24] via-[#A67E2D] to-[#805F1C]'}`}>
                  <div className="absolute right-0 top-0 w-64 h-64 bg-black/10 rounded-full -mr-20 -mt-20 blur-3xl pointer-events-none" />
                  <div className="relative z-10">
                    <h2 className={`text-3xl md:text-4xl font-helvetica font-black tracking-tighter uppercase mb-1 ${theme === 'dark' ? 'text-black' : 'text-white'}`}>
                      {ct.title}
                    </h2>
                    <p className={`font-bold text-[10px] uppercase tracking-[0.2em] ${theme === 'dark' ? 'text-black/50' : 'text-white/80'}`}>
                      {ct.sub}
                    </p>
                  </div>
                  <button 
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleClose();
                    }}
                    aria-label="Cerrar ventana"
                    className={`absolute top-6 right-6 z-30 p-3 rounded-full transition-all hover:scale-110 active:scale-90 cursor-pointer ${theme === 'dark' ? 'bg-black/10 hover:bg-black/20 text-black' : 'bg-white/15 hover:bg-white/25 text-white'}`}
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
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your Name" 
                        className={`w-full px-5 py-4 rounded-xl border outline-none transition-all ${
                          theme === 'dark' 
                            ? 'bg-white/5 border-white/10 text-white focus:border-gold' 
                            : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-gold-deep focus:bg-white'
                        }`} 
                        disabled={isSubmitting}
                        required 
                      />
                    </div>

                    <div className="space-y-3">
                      <label className={`text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-2 ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>
                        <Mail className="w-3 h-3" /> {ct.email}
                      </label>
                      <input 
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@company.com" 
                        className={`w-full px-5 py-4 rounded-xl border outline-none transition-all ${
                          theme === 'dark' 
                            ? 'bg-white/5 border-white/10 text-white focus:border-gold' 
                            : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-gold-deep focus:bg-white'
                        }`} 
                        disabled={isSubmitting}
                        required 
                      />
                    </div>

                    <div className="space-y-3">
                      <label className={`text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-2 ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>
                        <MessageSquare className="w-3 h-3" /> {ct.message}
                      </label>
                      <textarea 
                        rows={4} 
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="How can we assist you strategically?" 
                        className={`w-full px-5 py-4 rounded-xl border outline-none transition-all resize-none ${
                          theme === 'dark' 
                            ? 'bg-white/5 border-white/10 text-white focus:border-gold' 
                            : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-gold-deep focus:bg-white'
                        }`} 
                        disabled={isSubmitting}
                        required 
                      />
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className={`flex items-center justify-center gap-3 w-full py-5 font-black uppercase tracking-widest text-sm rounded-xl transition-all shadow-xl active:scale-[0.98] ${
                        theme === 'dark' ? 'btn-gold' : 'btn-primary-light'
                      } ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                        </>
                      ) : (
                        <>
                          {ct.submit} <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-10 md:p-14 text-center space-y-6"
              >
                <div className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center ${theme === 'dark' ? 'bg-gold/20 ring-4 ring-gold/10' : 'bg-[#F9F6F0] ring-4 ring-[#926E24]/10'}`}>
                  <CheckCircle2 className={`w-10 h-10 ${theme === 'dark' ? 'text-gold' : 'text-gold-deep'}`} />
                </div>
                <div className="space-y-3">
                  <h2 className={`text-2xl md:text-3xl font-black uppercase tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    {ct.successTitle}
                  </h2>
                  <p className={`text-base md:text-lg font-medium leading-relaxed max-w-md mx-auto ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                    {ct.successMessage}
                  </p>
                </div>

                {/* Auto-redirect visual progress bar */}
                <div className="pt-2 max-w-xs mx-auto">
                  <p className={`text-[11px] font-mono mb-2 ${theme === 'dark' ? 'text-gold/80' : 'text-[#7E5E1A]'}`}>
                    {ct.redirecting || 'Redirigiendo a la página de inicio...'}
                  </p>
                  <div className={`w-full h-1.5 rounded-full overflow-hidden ${theme === 'dark' ? 'bg-white/10' : 'bg-slate-200'}`}>
                    <motion.div 
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 3.5, ease: "linear" }}
                      className={`h-full rounded-full ${theme === 'dark' ? 'bg-gold' : 'bg-gold-deep'}`}
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button 
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleRedirectHome();
                    }}
                    className={`px-10 py-4 font-black uppercase tracking-widest text-xs rounded-xl transition-all cursor-pointer shadow-lg active:scale-95 ${
                      theme === 'dark' ? 'btn-gold' : 'btn-primary-light'
                    }`}
                  >
                    {ct.close}
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
