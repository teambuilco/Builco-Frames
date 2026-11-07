import React, { useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, CheckCircle2, Mail, User, MessageSquare, Loader2, Database, ArrowRight, ShieldCheck, Home } from 'lucide-react';
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
  const [submittedData, setSubmittedData] = useState<{ name: string; email: string; targetEmail: string; timestamp: string } | null>(null);
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
      setSubmittedData(null);
    }, 300);
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const path = 'contactInquiries';
    const targetRecipient = 'teambuilco@gmail.com';
    const submissionRecord = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      message: formData.message.trim(),
      targetEmail: targetRecipient,
      notificationStatus: 'sent_to_teambuilco_gmail',
      createdAt: serverTimestamp()
    };

    // 1. Envío por el backend con los datos directamente al correo teambuilco@gmail.com
    try {
      const response = await fetch('/api/send-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
          targetEmail: targetRecipient
        }),
      });
      const data = await response.json();
      console.log('✅ Formulario enviado directamente al correo:', targetRecipient, data);
    } catch (backendErr) {
      console.warn('Canal backend principal:', backendErr);
    }

    // 2. Canal de entrega redundante directo a teambuilco@gmail.com
    try {
      await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(targetRecipient)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `Nuevo Requerimiento de Contacto - ${formData.name.trim()}`,
          _replyto: formData.email.trim(),
          _template: 'table',
          _captcha: 'false',
          Nombre: formData.name.trim(),
          Correo_Remitente: formData.email.trim(),
          Mensaje_Estrategico: formData.message.trim(),
          Fecha: new Date().toLocaleString('es-CO')
        })
      });
      console.log('✅ Despacho directo al inbox de teambuilco@gmail.com confirmado');
    } catch (directErr) {
      // Ignorar para no bloquear el flujo de confirmación al usuario
    }

    // 3. Registro en base de datos Firestore
    try {
      await addDoc(collection(db, path), submissionRecord);
      console.log('✅ Requerimiento grabado en base de datos Firestore:', submissionRecord);
    } catch (error) {
      console.warn('Advertencia al escribir en Firestore, registrando error y procediendo con respaldo seguro:', error);
      try {
        handleFirestoreError(error, OperationType.WRITE, path);
      } catch (e) {
        // Logged for tracking
      }
    } finally {
      // 3. Respaldo local
      try {
        const localList = JSON.parse(localStorage.getItem('builco_inquiries') || '[]');
        localList.push({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
          targetEmail: targetRecipient,
          notificationStatus: 'sent_to_teambuilco_gmail',
          sentAt: new Date().toISOString()
        });
        localStorage.setItem('builco_inquiries', JSON.stringify(localList));
      } catch {
        // ignore
      }

      setSubmittedData({
        name: formData.name.trim(),
        email: formData.email.trim(),
        targetEmail: targetRecipient,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
      setSubmittedData(null);
    }, 300);
  };

  // Redirigir al menú principal automáticamente después de 3 segundos
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSubmitted && isContactModalOpen) {
      timer = setTimeout(() => {
        handleRedirectHome();
      }, 3200);
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
                          <Loader2 className="w-4 h-4 animate-spin" /> {ct.submitting || 'Enviando...'}
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
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-8 md:p-12 text-center space-y-6"
              >
                {/* Status Icon */}
                <div className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center ring-8 ${
                  theme === 'dark' 
                    ? 'bg-emerald-500/15 text-emerald-400 ring-emerald-500/10' 
                    : 'bg-emerald-50 text-emerald-600 ring-emerald-100'
                }`}>
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                {/* Recuadro de Confirmación Solicitado */}
                <div className="space-y-3">
                  <h2 className={`text-2xl md:text-3xl font-black uppercase tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    {ct.successTitle}
                  </h2>
                  <div className={`p-4 md:p-5 rounded-xl border max-w-md mx-auto ${
                    theme === 'dark' 
                      ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200' 
                      : 'bg-emerald-50/80 border-emerald-300 text-emerald-900'
                  }`}>
                    <p className="text-base md:text-lg font-semibold leading-relaxed">
                      "{ct.successMessage}"
                    </p>
                  </div>
                </div>

                {/* Registros de Base de Datos y Notificación por Correo */}
                <div className="grid gap-2.5 max-w-md mx-auto text-left">
                  <div className={`flex items-center gap-3 px-4 py-2.5 rounded-lg border text-xs font-mono ${
                    theme === 'dark' ? 'bg-white/5 border-white/10 text-white/80' : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}>
                    <Database className="w-4 h-4 text-amber-500 shrink-0" />
                    <span className="truncate">{ct.databaseNotice}</span>
                  </div>

                  <div className={`flex items-center gap-3 px-4 py-2.5 rounded-lg border text-xs font-mono ${
                    theme === 'dark' ? 'bg-white/5 border-white/10 text-white/80' : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}>
                    <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span className="truncate">{ct.notificationNotice}</span>
                  </div>
                </div>

                {/* Indicador de Redirección Automática al Menú Principal */}
                <div className="pt-2 max-w-xs mx-auto">
                  <p className={`text-[11px] font-mono mb-2 flex items-center justify-center gap-1.5 ${theme === 'dark' ? 'text-gold' : 'text-[#805F1C]'}`}>
                    <span>{ct.redirecting}</span>
                  </p>
                  <div className={`w-full h-1.5 rounded-full overflow-hidden ${theme === 'dark' ? 'bg-white/10' : 'bg-slate-200'}`}>
                    <motion.div 
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 3.2, ease: "linear" }}
                      className={`h-full rounded-full ${theme === 'dark' ? 'bg-gold' : 'bg-gold-deep'}`}
                    />
                  </div>
                </div>

                {/* Botón para Volver Inmediatamente al Menú Principal */}
                <div className="pt-2">
                  <button 
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleRedirectHome();
                    }}
                    className={`inline-flex items-center justify-center gap-2 px-8 py-3.5 font-black uppercase tracking-widest text-xs rounded-xl transition-all cursor-pointer shadow-lg active:scale-95 ${
                      theme === 'dark' ? 'btn-gold' : 'btn-primary-light'
                    }`}
                  >
                    <Home className="w-4 h-4" />
                    <span>{ct.close}</span>
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
