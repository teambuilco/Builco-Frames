import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowUpRight, ShieldCheck, FileText } from 'lucide-react';
import Logo from './Logo';
import { AppContext } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { t, theme, lang, setIsPrivacyModalOpen, setIsContactModalOpen } = useContext(AppContext);
  const isDark = theme === 'dark';
  const navigate = useNavigate();
  const privacySeg = t.footerPrivacySegment;

  return (
    <footer className={`relative z-10 py-20 border-t transition-colors duration-300 ${
      isDark ? 'bg-[#0A0C0F] border-white/10' : 'bg-[#FAF8F5] border-[#E8DEC8]'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-14">
          <div className="col-span-2 space-y-6">
            <div 
              className="flex items-center gap-3.5 cursor-pointer group"
              onClick={() => {
                navigate('/');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <div className={`p-1.5 sm:p-2 rounded-xl transition-all duration-300 group-hover:scale-105 flex items-center justify-center ${
                isDark 
                  ? 'bg-gold/10 border border-gold/20 shadow-[0_0_15px_rgba(212,175,55,0.15)]' 
                  : 'bg-gradient-to-br from-[#FFFFFF] to-[#F7F3EB] shadow-[0_2px_12px_rgba(158,112,32,0.12)] border border-[#E8DEC8]'
              }`}>
                <Logo className="w-8 h-8 sm:w-9 sm:h-9" />
              </div>
              <div className="flex flex-col">
                <span className={`text-xl font-helvetica font-bold tracking-tight ${isDark ? 'text-white' : 'text-[#1C1917]'}`}>
                  BUILDING CONNECTIONS
                </span>
                <span className={`text-[9px] font-bold tracking-[0.25em] uppercase -mt-0.5 ${
                  isDark ? 'text-gold/70' : 'text-gold-deep'
                }`}>
                  Strategic Partners
                </span>
              </div>
            </div>
            <p className={`max-w-sm leading-relaxed text-sm ${
              isDark ? 'text-white' : 'text-[#44403C]'
            }`}>
              {t.footerDesc}
            </p>
          </div>

          <div>
            <h5 className={`font-bold mb-5 uppercase text-xs tracking-wider ${
              isDark ? 'text-gold' : 'text-gold-deep'
            }`}>
              {lang === 'es' ? 'Verticales de Negocio' : 'Business Verticals'}
            </h5>
            <ul className="space-y-3.5 text-sm">
              <li>
                <Link to="/mining" className={`transition-colors font-medium ${isDark ? 'text-slate-300 hover:text-gold' : 'text-[#44403C] hover:text-[#1C1917]'}`}>
                  {lang === 'es' ? 'Minería y Recursos' : 'Mining & Resources'}
                </Link>
              </li>
              <li>
                <Link to="/energy" className={`transition-colors font-medium ${isDark ? 'text-slate-300 hover:text-gold' : 'text-[#44403C] hover:text-[#1C1917]'}`}>
                  {lang === 'es' ? 'Energía y Transición' : 'Energy & Transition'}
                </Link>
              </li>
              <li>
                <Link to="/government" className={`transition-colors font-medium ${isDark ? 'text-slate-300 hover:text-gold' : 'text-[#44403C] hover:text-[#1C1917]'}`}>
                  {lang === 'es' ? 'Relaciones Públicas' : 'Public Relations'}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className={`font-bold mb-5 uppercase text-xs tracking-wider ${
              isDark ? 'text-gold' : 'text-gold-deep'
            }`}>
              {lang === 'es' ? 'Institucional' : 'Company'}
            </h5>
            <ul className="space-y-3.5 text-sm">
              <li>
                <Link to="/about" className={`transition-colors font-medium ${isDark ? 'text-slate-300 hover:text-gold' : 'text-[#44403C] hover:text-[#1C1917]'}`}>
                  {lang === 'es' ? 'Historia y Misión' : 'Our Story & Mission'}
                </Link>
              </li>
              <li>
                <Link to="/mino" className={`transition-colors font-medium ${isDark ? 'text-slate-300 hover:text-gold' : 'text-[#44403C] hover:text-[#1C1917]'}`}>
                  Mino™ Platform
                </Link>
              </li>
              <li>
                <button 
                  onClick={() => setIsContactModalOpen(true)} 
                  className={`transition-colors font-medium text-left cursor-pointer ${isDark ? 'text-slate-300 hover:text-gold' : 'text-[#44403C] hover:text-[#1C1917]'}`}
                >
                  {t.contact}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setIsPrivacyModalOpen(true)} 
                  className={`transition-colors font-medium text-left cursor-pointer ${isDark ? 'text-slate-300 hover:text-gold' : 'text-[#44403C] hover:text-[#1C1917]'}`}
                >
                  {lang === 'es' ? 'Políticas de Privacidad y Habeas Data' : 'Privacy Policy & Habeas Data'}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Dedicated Regulatory Privacy & Habeas Data Segment */}
        <div className={`mb-14 p-6 sm:p-8 rounded-2xl border transition-all duration-300 relative overflow-hidden ${
          isDark 
            ? 'bg-gradient-to-r from-[#111622]/90 via-[#0d121c]/90 to-[#141b29]/90 border-gold/30 shadow-[0_10px_30px_rgba(0,0,0,0.4)]' 
            : 'bg-gradient-to-r from-white via-[#FAF8F5] to-white border-[#E8DEC8] shadow-sm'
        }`}>
          <div className="absolute top-0 right-0 w-80 h-80 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider ${
                  isDark ? 'bg-gold/15 text-gold border border-gold/30' : 'bg-[#F7F3EB] text-gold-deep border border-[#E8DEC8]'
                }`}>
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {privacySeg?.badge || 'Gobernanza Institucional & Habeas Data'}
                </span>
                <span className={`text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded border ${
                  isDark ? 'border-white/10 text-slate-300 bg-white/5' : 'border-[#E8DEC8] text-[#44403C] bg-white'
                }`}>
                  {privacySeg?.lawTag || 'Ley Estatutaria 1581 de 2012'}
                </span>
              </div>

              <h4 className={`text-xl sm:text-2xl font-helvetica font-black tracking-tight ${
                isDark ? 'text-white' : 'text-[#1C1917]'
              }`}>
                {privacySeg?.title || (lang === 'es' ? 'Políticas de Privacidad y Habeas Data' : 'Privacy Policy & Habeas Data')}
              </h4>

              <p className={`text-sm leading-relaxed ${
                isDark ? 'text-slate-300' : 'text-[#44403C]'
              }`}>
                {privacySeg?.desc || (lang === 'es'
                  ? 'Consulte nuestro marco oficial de protección de datos personales y política de Habeas Data conforme a la Ley Estatutaria 1581 de 2012, Decreto 1377 de 2013 y estándares internacionales de privacidad.'
                  : 'Access our official data protection framework and Habeas Data policy in accordance with Colombian Statutory Law 1581/2012, Decree 1377/2013, and international privacy standards.')}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-shrink-0">
              <button
                type="button"
                onClick={() => setIsPrivacyModalOpen(true)}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-gold to-[#d4af37] hover:from-[#e5c158] hover:to-[#c59e2b] text-black font-bold text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-gold/20 active:scale-95 cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>{privacySeg?.viewPdf || (lang === 'es' ? 'Ver Documento Oficial en PDF' : 'View Official PDF Document')}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className={`pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4 text-xs ${
          isDark ? 'border-gold/20 text-gold' : 'border-[#E8DEC8] text-[#57534E]'
        }`}>
          <p className={isDark ? 'text-gold' : 'text-[#57534E]'}>{t.footerRights}</p>
          <div className={`flex flex-wrap items-center gap-4 sm:gap-6 font-semibold ${isDark ? 'text-gold' : 'text-[#57534E]'}`}>
            <button
              onClick={() => setIsPrivacyModalOpen(true)}
              className="hover:underline opacity-90 hover:opacity-100 cursor-pointer transition-opacity flex items-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{lang === 'es' ? 'Políticas & Habeas Data' : 'Privacy & Habeas Data'}</span>
            </button>
            <a
              href="https://www.linkedin.com/company/builco-co"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline opacity-90 hover:opacity-100 cursor-pointer transition-opacity"
            >
              LinkedIn
            </a>
            <a
              href="https://www.instagram.com/builco.co/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline opacity-90 hover:opacity-100 cursor-pointer transition-opacity"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
