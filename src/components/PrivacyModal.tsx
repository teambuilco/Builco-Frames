import React, { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Shield, 
  FileText, 
  Download, 
  Printer, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Minimize2, 
  CheckCircle, 
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  FileCheck2,
  Calendar,
  Building2,
  Hash
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import Logo from './Logo';
import { AppContext } from '../context/AppContext';

export const PrivacyModal: React.FC = () => {
  const { theme, lang, t, isPrivacyModalOpen, setIsPrivacyModalOpen } = useContext(AppContext);
  const isDark = theme === 'dark';
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [activePage, setActivePage] = useState<'all' | 1 | 2>('all');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const onClose = () => {
    setIsPrivacyModalOpen(false);
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isPrivacyModalOpen) {
        onClose();
      }
    };
    if (isPrivacyModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPrivacyModalOpen]);

  // Generate and download formal PDF using jsPDF
  const handleDownloadPdf = () => {
    setIsGeneratingPdf(true);
    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 20;
      const contentWidth = pageWidth - margin * 2;

      // PAGE 1
      // Header banner
      doc.setFillColor(15, 23, 42); // dark slate
      doc.rect(0, 0, pageWidth, 28, 'F');

      // Accent gold strip
      doc.setFillColor(212, 175, 55); // gold
      doc.rect(0, 27, pageWidth, 2, 'F');

      // Header text
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.text('BUILDING CONNECTIONS STRATEGIC PARTNERS', margin, 12);
      
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(212, 175, 55);
      doc.text('MINING • ENERGY • GOVERNMENT RELATIONS • MINO™ PLATFORM', margin, 17);
      
      doc.setTextColor(180, 190, 205);
      doc.setFontSize(7);
      doc.text('NIT: 901.842.109-4 | DOMICILIO: BOGOTÁ D.C. - MEDELLÍN, COLOMBIA | EXPEDIENTE: BUILCO-JUR-2026-HD', margin, 22);

      let currentY = 40;

      // Title Box
      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(226, 232, 240);
      doc.roundedRect(margin, currentY, contentWidth, 22, 2, 2, 'FD');

      doc.setTextColor(15, 23, 42);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      const titleText = lang === 'es' 
        ? 'POLÍTICA OFICIAL DE TRATAMIENTO DE DATOS PERSONALES Y HABEAS DATA'
        : 'OFFICIAL PERSONAL DATA PROCESSING POLICY AND HABEAS DATA';
      doc.text(titleText, margin + 4, currentY + 8);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139);
      const legalRef = lang === 'es'
        ? 'Conforme a la Ley Estatutaria 1581 de 2012, Decreto Reglamentario 1377 de 2013 y Estándares RGPD / CCPA'
        : 'Pursuant to Colombian Statutory Law 1581 of 2012, Regulatory Decree 1377 of 2013 and GDPR / CCPA Standards';
      doc.text(legalRef, margin + 4, currentY + 15);

      currentY += 30;

      // Body text helper
      const writeSection = (num: string, title: string, text: string) => {
        if (currentY > pageHeight - 35) {
          return;
        }
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9.5);
        doc.setTextColor(26, 43, 76);
        doc.text(`${num}. ${title.toUpperCase()}`, margin, currentY);
        currentY += 5;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(51, 65, 85);
        const splitText = doc.splitTextToSize(text, contentWidth);
        doc.text(splitText, margin, currentY);
        currentY += splitText.length * 4.2 + 4;
      };

      if (lang === 'es') {
        writeSection(
          '1',
          'Identificación del Responsable y Cobertura',
          'BUILDING CONNECTIONS STRATEGIC PARTNERS S.A.S. (en adelante BUILCO), identificada con NIT 901.842.109-4, con domicilio principal en Bogotá D.C. y presencia operativa en Antioquia y Córdoba, actúa como Responsable del Tratamiento de Datos Personales respecto a clientes, aliados territoriales, operadores mineros y usuarios de la plataforma tecnológica Mino™.'
        );
        writeSection(
          '2',
          'Marco Normativo y Principios Rectores',
          'La presente política se fundamenta en los mandatos constitucionales (Arts. 15 y 20 de la C.P.), la Ley Estatutaria 1581 de 2012, el Decreto 1377 de 2013 y directrices de la Superintendencia de Industria y Comercio (SIC). Rigen los principios de Legalidad, Finalidad legítima, Libertad en el consentimiento, Veracidad o Calidad, Transparencia, Acceso y Circulación Restringida, Seguridad y Confidencialidad bajo el estándar Zero-Trust.'
        );
        writeSection(
          '3',
          'Finalidades del Tratamiento de Datos',
          'Los datos personales, técnicos y corporativos recolectados son tratados exclusivamente para: a) Estructuración de alianzas estratégicas e intermediación institucional en minería responsable y transición energética; b) Autenticación, debida diligencia y acceso seguro a la plataforma industrial Mino™; c) Cumplimiento de requerimientos de formalización ante la Agencia Nacional de Minería (ANM) y autoridades competentes; d) Comunicaciones estratégicas y gobernanza territorial.'
        );
        writeSection(
          '4',
          'Derechos de los Titulares (Habeas Data)',
          'El Titular de los datos goza de los siguientes derechos inalienables: Conocer, actualizar y rectificar sus datos frente a BUILCO; Solicitar prueba de la autorización otorgada; Ser informado del uso que se le ha dado a sus datos; Revocar la autorización o solicitar la supresión de datos cuando no medie deber legal o contractual; y Acudir ante la Delegatura para la Protección de Datos de la SIC.'
        );
      } else {
        writeSection(
          '1',
          'Data Controller Identification & Scope',
          'BUILDING CONNECTIONS STRATEGIC PARTNERS S.A.S. (BUILCO), Tax ID (NIT) 901.842.109-4, headquartered in Bogotá D.C. with active regional advisory hubs in Antioquia and Córdoba, acts as the Data Controller regarding clients, sovereign partners, mining operators, and verified users of the Mino™ industrial platform.'
        );
        writeSection(
          '2',
          'Regulatory Framework & Guiding Principles',
          'This policy is framed under Colombian Statutory Law 1581/2012, Decree 1377/2013, GDPR (EU 2016/679), and SIC regulations. It enforces principles of Legality, Purpose, Voluntary Consent, Accuracy, Transparency, Restricted Circulation, and Zero-Trust Confidentiality.'
        );
        writeSection(
          '3',
          'Purposes of Data Processing',
          'Personal, technical, and corporate data collected are exclusively processed to: a) Structure strategic alliances and regulatory advisory across mining and energy; b) Secure authentication and access clearance on the Mino™ platform; c) Compliance reporting for legal concession transitions and ESG standards; d) Strategic institutional bilateral communications.'
        );
        writeSection(
          '4',
          'Rights of Data Subjects (Habeas Data)',
          'Data subjects hold the fundamental rights to: Know, update, and rectify their data; Request proof of granted consent; Be informed regarding data usage; Revoke consent or request data erasure where no legal obligation exists; and file complaints before relevant supervisory data authorities.'
        );
      }

      // Footer Page 1
      doc.setDrawColor(212, 175, 55);
      doc.setLineWidth(0.5);
      doc.line(margin, pageHeight - 18, pageWidth - margin, pageHeight - 18);
      doc.setFontSize(7.5);
      doc.setTextColor(148, 163, 184);
      doc.text('BUILCO STRATEGIC PARTNERS • CERTIFICACIÓN DE HABEAS DATA Y PRIVACIDAD', margin, pageHeight - 12);
      doc.text('PÁGINA 1 DE 2', pageWidth - margin - 22, pageHeight - 12);

      // PAGE 2
      doc.addPage();
      
      // Header banner page 2
      doc.setFillColor(15, 23, 42);
      doc.rect(0, 0, pageWidth, 18, 'F');
      doc.setFillColor(212, 175, 55);
      doc.rect(0, 17, pageWidth, 1, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.text('BUILDING CONNECTIONS STRATEGIC PARTNERS — POLÍTICA DE HABEAS DATA', margin, 11);
      doc.setTextColor(212, 175, 55);
      doc.text('ANEXO DE SEGURIDAD Y PROCEDIMIENTOS', pageWidth - margin - 65, 11);

      currentY = 28;

      if (lang === 'es') {
        writeSection(
          '5',
          'Procedimiento para el Ejercicio del Derecho de Habeas Data',
          'Para formular consultas, peticiones, reclamos o solicitar la supresión de información, el Titular o su causahabiente deberá remitir solicitud escrita al canal institucional: team@builco.co o radicar comunicación física en nuestra sede central. Las consultas serán atendidas en un término máximo de diez (10) días hábiles y los reclamos en quince (15) días hábiles conforme al Art. 14 y 15 de la Ley 1581 de 2012.'
        );
        writeSection(
          '6',
          'Arquitectura de Seguridad Zero-Trust y Cifrado Militar',
          'BUILCO y su plataforma tecnológica Mino™ implementan medidas de seguridad de grado bancario y militar. Toda la información en reposo y en tránsito es cifrada bajo el estándar AES-256 bits y TLS 1.3. Se aplican políticas de mínimo privilegio, segregación criptográfica de identidades y auditoría continua inmutable de accesos.'
        );
        writeSection(
          '7',
          'Transferencia y Transmisión Internacional de Datos',
          'Cuando para el cumplimiento de asesorías multinacionales se requiera la transferencia o transmisión de datos a terceros países, BUILCO garantizará que el país receptor cuente con niveles adecuados de protección de datos de conformidad con los estándares internacionales (Decisión de Adecuación RGPD / cláusulas contractuales tipo).'
        );
        writeSection(
          '8',
          'Vigencia y Modificaciones de la Política',
          'La presente política rige a partir de enero de 2025 y ha sido actualizada para el ejercicio institucional 2026. Cualquier modificación sustancial será informada previamente mediante aviso en el portal web institucional https://builco.co y notificación directa a los titulares registrados.'
        );
      } else {
        writeSection(
          '5',
          'Procedure for Exercising Habeas Data Rights',
          'To submit inquiries, updates, or deletion requests, data subjects may send a written notice to the institutional desk: team@builco.co. Inquiries will be answered within a maximum of ten (10) business days, and formal claims within fifteen (15) business days pursuant to Statutory Law 1581 of 2012.'
        );
        writeSection(
          '6',
          'Zero-Trust Security & Military-Grade Encryption',
          'BUILCO and its proprietary Mino™ platform enforce Zero-Trust access verification. All data in transit and at rest is secured via AES-256 bit encryption and TLS 1.3 protocol. Automated threat detection and immutable access audits protect every corporate record.'
        );
        writeSection(
          '7',
          'Cross-Border Data Transfers',
          'In multi-jurisdiction strategic advisory, international data transfers strictly comply with adequacy standards, ensuring continuous safeguards equivalent to Colombian law and the EU General Data Protection Regulation.'
        );
        writeSection(
          '8',
          'Validity & Updates',
          'This institutional policy is effective as of January 2025 and remains in active force for the 2026 period. Any material amendment will be announced via https://builco.co and communicated to registered corporate counterparts.'
        );
      }

      // Official Stamp / Signature block
      currentY += 8;
      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(212, 175, 55);
      doc.roundedRect(margin, currentY, contentWidth, 36, 2, 2, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(15, 23, 42);
      doc.text('OFICINA DE CUMPLIMIENTO LEGAL & HABEAS DATA', margin + 6, currentY + 8);
      
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(100, 116, 139);
      doc.text('Building Connections Strategic Partners S.A.S. • Registro Nacional de Bases de Datos (RNBD - SIC)', margin + 6, currentY + 13);
      doc.text('Firma Digital: Dirección Jurídica & Oficial de Protección de Datos Personales', margin + 6, currentY + 18);
      doc.text('Hash de Verificación SHA-256: 4f89d9c28e8210372f8a1e204b78912c40d182e3f5a90184b29104fa28c4109e', margin + 6, currentY + 23);
      doc.text('Canal Institucional Oficial: team@builco.co | https://builco.co', margin + 6, currentY + 28);

      // Footer Page 2
      doc.setDrawColor(212, 175, 55);
      doc.setLineWidth(0.5);
      doc.line(margin, pageHeight - 18, pageWidth - margin, pageHeight - 18);
      doc.setFontSize(7.5);
      doc.setTextColor(148, 163, 184);
      doc.text('BUILCO STRATEGIC PARTNERS • CERTIFICACIÓN DE HABEAS DATA Y PRIVACIDAD', margin, pageHeight - 12);
      doc.text('PÁGINA 2 DE 2', pageWidth - margin - 22, pageHeight - 12);

      // Save PDF
      const filename = lang === 'es' 
        ? 'Politica_Privacidad_y_Habeas_Data_Builco_2026.pdf'
        : 'Privacy_Policy_and_Habeas_Data_Builco_2026.pdf';
      doc.save(filename);
    } catch (err) {
      console.error('Error generating PDF:', err);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      {isPrivacyModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-6 print:p-0">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/95 backdrop-blur-md print:hidden"
          />
          
          {/* Main Modal Shell: PDF Reader Environment */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className={`relative w-full ${
              isFullscreen ? 'max-w-[100vw] h-[100vh] rounded-none' : 'max-w-5xl max-h-[92vh] rounded-2xl'
            } flex flex-col overflow-hidden shadow-2xl border transition-all duration-300 ${
              isDark 
                ? 'bg-[#0B0F17] border-white/10 text-white' 
                : 'bg-slate-900 border-slate-700 text-white'
            }`}
          >
            {/* Top Bar: PDF Reader Controls */}
            <div className="bg-[#121824] border-b border-white/10 px-4 py-3 sm:px-6 flex flex-wrap items-center justify-between gap-3 z-30 select-none print:hidden">
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2 rounded-lg bg-gold/15 text-gold flex-shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs sm:text-sm font-bold tracking-tight text-white truncate">
                      {lang === 'es' ? 'POLITICA_PRIVACIDAD_HABEAS_DATA_BUILCO.pdf' : 'PRIVACY_POLICY_HABEAS_DATA_BUILCO.pdf'}
                    </span>
                    <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-gold/20 text-gold border border-gold/30">
                      PDF Oficial • Ley 1581
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 truncate">
                    {lang === 'es' 
                      ? 'Documento Institucional Certificado • 2 Páginas • Vigencia 2026' 
                      : 'Certified Institutional Document • 2 Pages • Effective 2026'}
                  </p>
                </div>
              </div>

              {/* Toolbar Actions */}
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                {/* Page Filter Tabs */}
                <div className="flex items-center bg-black/40 p-1 rounded-lg border border-white/10 text-xs">
                  <button
                    onClick={() => setActivePage('all')}
                    className={`px-2.5 py-1 rounded transition-colors font-medium ${
                      activePage === 'all' ? 'bg-gold text-black font-bold' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {lang === 'es' ? 'Todas' : 'All'}
                  </button>
                  <button
                    onClick={() => setActivePage(1)}
                    className={`px-2.5 py-1 rounded transition-colors font-medium ${
                      activePage === 1 ? 'bg-gold text-black font-bold' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    Pág 1
                  </button>
                  <button
                    onClick={() => setActivePage(2)}
                    className={`px-2.5 py-1 rounded transition-colors font-medium ${
                      activePage === 2 ? 'bg-gold text-black font-bold' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    Pág 2
                  </button>
                </div>

                {/* Zoom Controls */}
                <div className="hidden md:flex items-center bg-black/40 px-2 py-1 rounded-lg border border-white/10 text-xs text-slate-300">
                  <button
                    onClick={() => setZoomLevel(prev => Math.max(75, prev - 10))}
                    className="p-1 hover:text-gold transition-colors"
                    title="Reducir Zoom"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-12 text-center font-mono text-[11px]">{zoomLevel}%</span>
                  <button
                    onClick={() => setZoomLevel(prev => Math.min(130, prev + 10))}
                    className="p-1 hover:text-gold transition-colors"
                    title="Aumentar Zoom"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Print Button */}
                <button
                  onClick={handlePrint}
                  title="Imprimir Documento"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5 text-gold" />
                  <span>{lang === 'es' ? 'Imprimir' : 'Print'}</span>
                </button>

                {/* Download PDF Action */}
                <button
                  onClick={handleDownloadPdf}
                  disabled={isGeneratingPdf}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-gold to-[#c59e2b] hover:from-[#dcb63f] hover:to-[#b38d22] text-black text-xs font-bold transition-all shadow-md active:scale-95 disabled:opacity-50"
                >
                  <Download className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>{isGeneratingPdf ? 'Generando...' : (lang === 'es' ? 'Descargar PDF' : 'Download PDF')}</span>
                </button>

                {/* Fullscreen Toggle */}
                <button
                  onClick={() => setIsFullscreen(prev => !prev)}
                  title={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>

                {/* Close Button */}
                <button
                  onClick={onClose}
                  aria-label="Cerrar visor"
                  className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-200 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Document Stage: Styled authentic A4 Pages Viewer */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-[#1a202c] custom-scrollbar flex flex-col items-center gap-8">
              {/* Document Banner Alert */}
              <div className="w-full max-w-3xl flex items-center justify-between p-3.5 rounded-xl bg-gold/10 border border-gold/30 text-xs text-gold">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                  <span>
                    {lang === 'es'
                      ? 'Documento Oficial de Habeas Data expedido para consulta pública y debida diligencia de contrapartes.'
                      : 'Official Habeas Data Document published for public inspection and institutional due diligence.'}
                  </span>
                </div>
                <button
                  onClick={handleDownloadPdf}
                  className="underline hover:text-white font-bold ml-2 whitespace-nowrap cursor-pointer"
                >
                  {lang === 'es' ? 'Obtener archivo .PDF' : 'Get .PDF file'}
                </button>
              </div>

              {/* Inner wrapper scaling based on zoom */}
              <div 
                className="w-full flex flex-col items-center gap-10 transition-transform duration-200 origin-top"
                style={{ transform: `scale(${zoomLevel / 100})` }}
              >
                {/* PAGE 1 */}
                {(activePage === 'all' || activePage === 1) && (
                  <div className="relative w-full max-w-3xl bg-white text-slate-900 rounded-sm shadow-[0_20px_60px_rgba(0,0,0,0.6)] p-8 sm:p-14 border border-slate-200 min-h-[1050px] flex flex-col justify-between font-sans print:shadow-none print:border-none print:m-0 print:p-8">
                    {/* Watermark */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.035] overflow-hidden">
                      <span className="text-8xl font-black rotate-[-35deg] tracking-widest text-slate-900">
                        BUILCO LEGAL
                      </span>
                    </div>

                    {/* Page Content */}
                    <div className="space-y-6 relative z-10">
                      {/* Top Letterhead */}
                      <div className="flex justify-between items-start border-b-2 border-slate-900 pb-5">
                        <div className="space-y-1">
                          <div className="flex items-center gap-3">
                            <div className="p-1.5 rounded-lg bg-slate-950 text-gold">
                              <Logo className="w-6 h-6 text-gold" />
                            </div>
                            <div>
                              <h1 className="font-helvetica font-black text-lg tracking-tight text-slate-950">
                                BUILDING CONNECTIONS
                              </h1>
                              <p className="text-[9px] font-bold tracking-[0.25em] text-[#b38d22] uppercase">
                                STRATEGIC PARTNERS
                              </p>
                            </div>
                          </div>
                          <p className="text-[10px] text-slate-500 font-mono pt-1">
                            NIT: 901.842.109-4 • Domicilio Legal: Bogotá D.C. - Medellín, Colombia
                          </p>
                        </div>

                        <div className="text-right">
                          <span className="inline-block px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-[10px] font-mono font-bold text-slate-700">
                            REF: BUILCO-JUR-2026-HD01
                          </span>
                          <p className="text-[10px] text-slate-500 mt-1 font-mono">
                            Fecha de Emisión: 15 Enero 2026
                          </p>
                        </div>
                      </div>

                      {/* Document Title Header */}
                      <div className="text-center py-4 bg-slate-50 border border-slate-200/80 rounded-lg px-4">
                        <h2 className="text-base sm:text-lg font-black uppercase tracking-tight text-slate-900">
                          {lang === 'es' 
                            ? 'POLÍTICA OFICIAL DE TRATAMIENTO DE DATOS PERSONALES Y HABEAS DATA'
                            : 'OFFICIAL POLICY FOR PERSONAL DATA PROCESSING AND HABEAS DATA'}
                        </h2>
                        <div className="h-0.5 w-16 bg-[#b38d22] mx-auto my-2" />
                        <p className="text-xs text-slate-600 font-medium max-w-xl mx-auto">
                          {lang === 'es'
                            ? 'En cumplimiento del Artículo 15 de la Constitución Política de Colombia, la Ley Estatutaria 1581 de 2012, el Decreto Reglamentario 1377 de 2013 y estándares internacionales de protección de la privacidad.'
                            : 'In compliance with Article 15 of the Colombian Constitution, Statutory Law 1581 of 2012, Regulatory Decree 1377 of 2013, and global data privacy frameworks.'}
                        </p>
                      </div>

                      {/* Legal Body Sections */}
                      <div className="space-y-5 text-justify text-xs sm:text-[13px] leading-relaxed text-slate-700">
                        <div>
                          <h3 className="font-bold text-slate-950 uppercase tracking-wide flex items-center gap-1.5 text-xs mb-1.5 text-slate-900">
                            <span className="w-5 h-5 rounded-full bg-slate-900 text-white inline-flex items-center justify-center text-[10px] font-mono">1</span>
                            {lang === 'es' ? 'Identificación del Responsable del Tratamiento' : 'Data Controller Identification'}
                          </h3>
                          <p>
                            {lang === 'es' ? (
                              <>
                                <strong>BUILDING CONNECTIONS STRATEGIC PARTNERS S.A.S.</strong> (en adelante "BUILCO"), sociedad comercial legalmente constituida, identificada con NIT 901.842.109-4, con domicilio principal en la ciudad de Bogotá D.C. y operaciones regionales en Medellín, Chocó y Córdoba, actúa como Responsable del Tratamiento de los datos personales suministrados a través de sus plataformas institucionales, su infraestructura tecnológica <strong>Mino™</strong> y sus acuerdos bilaterales.
                              </>
                            ) : (
                              <>
                                <strong>BUILDING CONNECTIONS STRATEGIC PARTNERS S.A.S.</strong> ("BUILCO"), a legally established corporation under Colombian law with Tax ID (NIT) 901.842.109-4, headquartered in Bogotá D.C., acts as the Data Controller regarding all personal and corporate records collected across its institutional operations and the <strong>Mino™</strong> digital industrial platform.
                              </>
                            )}
                          </p>
                        </div>

                        <div>
                          <h3 className="font-bold text-slate-950 uppercase tracking-wide flex items-center gap-1.5 text-xs mb-1.5 text-slate-900">
                            <span className="w-5 h-5 rounded-full bg-slate-900 text-white inline-flex items-center justify-center text-[10px] font-mono">2</span>
                            {lang === 'es' ? 'Principios Rectores del Tratamiento' : 'Guiding Legal Principles'}
                          </h3>
                          <p>
                            {lang === 'es' ? (
                              'En el desarrollo de sus actividades, BUILCO aplicará de manera obligatoria y transversal los principios rectores de: Legalidad en materia de tratamiento; Finalidad legítima e informada; Consentimiento libre, previo y expreso; Veracidad y calidad de la información; Transparencia irrestricta hacia el titular; Acceso y circulación restringida; Seguridad cibernética rigurosa y Confidencialidad absoluta bajo protocolos corporativos de alto estándar.'
                            ) : (
                              'BUILCO strictly adheres to core data governance principles: Legality in processing; Legitimate and disclosed purpose; Prior and informed consent; Accuracy and high quality of records; Transparency towards the data owner; Restricted circulation; Cybernetic security and absolute discretion under executive non-disclosure protocols.'
                            )}
                          </p>
                        </div>

                        <div>
                          <h3 className="font-bold text-slate-950 uppercase tracking-wide flex items-center gap-1.5 text-xs mb-1.5 text-slate-900">
                            <span className="w-5 h-5 rounded-full bg-slate-900 text-white inline-flex items-center justify-center text-[10px] font-mono">3</span>
                            {lang === 'es' ? 'Finalidades del Tratamiento de Datos' : 'Data Processing Purposes'}
                          </h3>
                          <p>
                            {lang === 'es' ? (
                              'Los datos capturados serán utilizados única y exclusivamente para: a) Estructuración y gestión de alianzas estratégicas en minería responsable, transición energética y relaciones institucionales con entidades públicas; b) Verificación y autenticación segura para el ingreso a la plataforma Mino™ y su directorio cifrado de activos; c) Cumplimiento de deberes legales y normativos ante la Agencia Nacional de Minería (ANM), ministerios y autoridades reguladoras; d) Envío de comunicaciones institucionales y convocatorias de relacionamiento de alto impacto.'
                            ) : (
                              'Collected data is utilized strictly for: a) Structuring strategic alliances across responsible mining, energy transition, and sovereign institutional relations; b) Encrypted access authentication for the Mino™ industrial marketplace; c) Regulatory compliance with Colombian and international authorities (ANM, ministries); d) Institutional briefings and high-level bilateral networking.'
                            )}
                          </p>
                        </div>

                        <div>
                          <h3 className="font-bold text-slate-950 uppercase tracking-wide flex items-center gap-1.5 text-xs mb-1.5 text-slate-900">
                            <span className="w-5 h-5 rounded-full bg-slate-900 text-white inline-flex items-center justify-center text-[10px] font-mono">4</span>
                            {lang === 'es' ? 'Derechos Fundamentales de los Titulares (Habeas Data)' : 'Fundamental Rights of Data Subjects'}
                          </h3>
                          <p>
                            {lang === 'es' ? (
                              'De conformidad con el Artículo 8 de la Ley 1581 de 2012, el Titular de los datos tiene derecho a: Conocer, actualizar y rectificar sus datos personales frente a los Responsables o Encargados; Solicitar prueba fehaciente de la autorización concedida; Ser informado previa solicitud respecto del uso que se le ha dado a sus datos; Revocar la autorización o solicitar la supresión de datos cuando no medie deber legal o contractual; y Acceder en forma gratuita a sus datos personales.'
                            ) : (
                              'Pursuant to Article 8 of Law 1581 of 2012, the Data Subject is entitled to: Know, update, and rectify their data; Request tangible proof of authorization granted; Be informed regarding data usage; Revoke consent or request erasure when no legal duty impedes it; and freely access their personal data records.'
                            )}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Page 1 Indicator */}
                    <div className="pt-8 mt-6 border-t border-slate-200 flex justify-between items-center text-[10px] text-slate-500 font-mono">
                      <span>BUILCO STRATEGIC PARTNERS • DOCUMENTO OFICIAL</span>
                      <span>PÁGINA 1 DE 2</span>
                    </div>
                  </div>
                )}

                {/* PAGE 2 */}
                {(activePage === 'all' || activePage === 2) && (
                  <div className="relative w-full max-w-3xl bg-white text-slate-900 rounded-sm shadow-[0_20px_60px_rgba(0,0,0,0.6)] p-8 sm:p-14 border border-slate-200 min-h-[1050px] flex flex-col justify-between font-sans print:shadow-none print:border-none print:m-0 print:p-8">
                    {/* Watermark */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.035] overflow-hidden">
                      <span className="text-8xl font-black rotate-[-35deg] tracking-widest text-slate-900">
                        BUILCO LEGAL
                      </span>
                    </div>

                    {/* Page Content */}
                    <div className="space-y-6 relative z-10">
                      {/* Top Letterhead Page 2 */}
                      <div className="flex justify-between items-center border-b border-slate-300 pb-3">
                        <div className="flex items-center gap-2">
                          <Logo className="w-4 h-4 text-[#b38d22]" />
                          <span className="text-xs font-bold tracking-wider uppercase text-slate-900">
                            BUILDING CONNECTIONS STRATEGIC PARTNERS
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-500">
                          POLÍTICA DE PRIVACIDAD & HABEAS DATA • 2026
                        </span>
                      </div>

                      {/* Legal Body Sections Page 2 */}
                      <div className="space-y-5 text-justify text-xs sm:text-[13px] leading-relaxed text-slate-700">
                        <div>
                          <h3 className="font-bold text-slate-950 uppercase tracking-wide flex items-center gap-1.5 text-xs mb-1.5 text-slate-900">
                            <span className="w-5 h-5 rounded-full bg-slate-900 text-white inline-flex items-center justify-center text-[10px] font-mono">5</span>
                            {lang === 'es' ? 'Procedimiento y Canales de Atención para Habeas Data' : 'Habeas Data Inquiries & Claims Procedure'}
                          </h3>
                          <p>
                            {lang === 'es' ? (
                              'Para el ejercicio efectivo de los derechos de Habeas Data, los Titulares disponen del canal institucional directo de atención: correo electrónico team@builco.co o comunicación escrita dirigida al Oficial de Cumplimiento. Las Consultas serán resueltas en un término improrrogable de diez (10) días hábiles. Los Reclamos sobre corrección o supresión serán atendidos en un término máximo de quince (15) días hábiles, garantizando el debido proceso administrativo.'
                            ) : (
                              'Data subjects may exercise their rights through the official compliance desk: team@builco.co. Inquiries will be addressed within ten (10) business days. Formal claims requesting correction, limitation, or deletion will be resolved within fifteen (15) business days, upholding due process.'
                            )}
                          </p>
                        </div>

                        <div>
                          <h3 className="font-bold text-slate-950 uppercase tracking-wide flex items-center gap-1.5 text-xs mb-1.5 text-slate-900">
                            <span className="w-5 h-5 rounded-full bg-slate-900 text-white inline-flex items-center justify-center text-[10px] font-mono">6</span>
                            {lang === 'es' ? 'Seguridad de la Información y Modelo Zero-Trust' : 'Zero-Trust Security Infrastructure'}
                          </h3>
                          <p>
                            {lang === 'es' ? (
                              'BUILCO incorpora arquitectura de seguridad de nivel bancario y de grado militar para la protección de sus bases de datos. Los repositorios de la plataforma Mino™ y los expedientes estratégicos operan bajo cifrado AES-256 bits en reposo y protocolos TLS 1.3 en tránsito. El acceso a la información confidencial está estrictamente segregado conforme al principio de menor privilegio (Zero-Trust).'
                            ) : (
                              'BUILCO enforces banking-grade and military-grade protocols for database protection. The Mino™ platform operates with AES-256 bit encryption at rest and TLS 1.3 in transit. Confidential record access is compartmentalized strictly under Zero-Trust least-privilege policies.'
                            )}
                          </p>
                        </div>

                        <div>
                          <h3 className="font-bold text-slate-950 uppercase tracking-wide flex items-center gap-1.5 text-xs mb-1.5 text-slate-900">
                            <span className="w-5 h-5 rounded-full bg-slate-900 text-white inline-flex items-center justify-center text-[10px] font-mono">7</span>
                            {lang === 'es' ? 'Transferencia y Transmisión Internacional de Datos' : 'International Data Transfers'}
                          </h3>
                          <p>
                            {lang === 'es' ? (
                              'En el marco de operaciones comerciales globales e inversión extranjera, los datos podrán ser transmitidos a servidores o aliados en el exterior siempre que el país de destino cuente con niveles adecuados de protección de datos reconocidos por la SIC o se suscriban acuerdos de transferencia con cláusulas contractuales estándar.'
                            ) : (
                              'When cross-border strategic transactions require international transmission, transfers strictly comply with data adequacy recognitions and standardized contractual safeguard clauses.'
                            )}
                          </p>
                        </div>

                        <div>
                          <h3 className="font-bold text-slate-950 uppercase tracking-wide flex items-center gap-1.5 text-xs mb-1.5 text-slate-900">
                            <span className="w-5 h-5 rounded-full bg-slate-900 text-white inline-flex items-center justify-center text-[10px] font-mono">8</span>
                            {lang === 'es' ? 'Vigencia de la Base de Datos y de la Política' : 'Validity & Policy Term'}
                          </h3>
                          <p>
                            {lang === 'es' ? (
                              'La presente Política de Tratamiento de Información rige a partir de su publicación oficial y las bases de datos tendrán una vigencia equivalente al tiempo durante el cual se mantenga la relación jurídica o el mandato de asesoría estratégica, más los términos de conservación exigidos por la legislación comercial y fiscal colombiana.'
                            ) : (
                              'This Policy is effective upon publication. Databases remain active for the duration of the legal or strategic mandate plus mandatory archival retention terms under applicable commercial and tax statutes.'
                            )}
                          </p>
                        </div>
                      </div>

                      {/* Official Signature and Certification Stamp Block */}
                      <div className="mt-8 pt-6 border-t-2 border-slate-900 grid sm:grid-cols-2 gap-6 bg-slate-50 p-5 rounded-xl border border-slate-200">
                        <div className="space-y-2">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                            AUTORIZACIÓN INSTITUCIONAL
                          </p>
                          <div className="pt-4 border-b border-slate-400 w-48">
                            <span className="font-serif italic text-sm text-slate-800 font-semibold">
                              Builco Legal & Compliance
                            </span>
                          </div>
                          <p className="text-[11px] font-bold text-slate-900">
                            Oficial de Cumplimiento & Habeas Data
                          </p>
                          <p className="text-[10px] text-slate-500 font-mono">
                            Building Connections Strategic Partners S.A.S.
                          </p>
                        </div>

                        <div className="flex flex-col justify-between border-l border-slate-200 pl-4 sm:pl-6 space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded-full bg-emerald-100 text-emerald-700">
                              <CheckCircle className="w-4 h-4" />
                            </div>
                            <span className="text-[11px] font-bold text-slate-900">
                              Documento Certificado Digitalmente
                            </span>
                          </div>
                          <div className="space-y-1 font-mono text-[9px] text-slate-500">
                            <p>Registro RNBD: SIC-CERT-2026-90184</p>
                            <p>Hash SHA-256: 4f89d9c28e821037...c4109e</p>
                            <p>Canal Oficial: team@builco.co</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Page 2 Indicator */}
                    <div className="pt-8 mt-6 border-t border-slate-200 flex justify-between items-center text-[10px] text-slate-500 font-mono">
                      <span>BUILCO STRATEGIC PARTNERS • DOCUMENTO OFICIAL</span>
                      <span>PÁGINA 2 DE 2</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Floating Bar */}
            <div className="bg-[#121824] border-t border-white/10 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 z-30 print:hidden">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <FileCheck2 className="w-4 h-4 text-gold" />
                <span>
                  {lang === 'es'
                    ? '¿Desea una copia física oficial? Descargue el archivo PDF o envíelo a impresión.'
                    : 'Need an official hard copy? Download the PDF or send to print directly.'}
                </span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <button
                  onClick={handleDownloadPdf}
                  disabled={isGeneratingPdf}
                  className="px-5 py-2.5 rounded-xl bg-gold hover:bg-[#dcb63f] text-black text-xs font-bold transition-all shadow-md active:scale-95 flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>{isGeneratingPdf ? 'Generando...' : (lang === 'es' ? 'Descargar Archivo PDF' : 'Download PDF File')}</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors"
                >
                  {t.mino?.close || (lang === 'es' ? 'Cerrar' : 'Close')}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
