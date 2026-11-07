import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Search, 
  TrendingUp, 
  FileText, 
  CheckCircle2, 
  Lock, 
  Plus, 
  ArrowUpRight, 
  Scale, 
  Building2, 
  Sparkles, 
  X, 
  Send, 
  Clock, 
  Coins, 
  ArrowRight,
  SlidersHorizontal,
  ChevronRight,
  Database,
  ExternalLink,
  Info
} from 'lucide-react';

export interface MineralLot {
  id: string;
  title: string;
  mineralType: 'oro' | 'cobre' | 'niquel' | 'coltan' | 'tierras_raras';
  categoryLabel: string;
  gradePurity: string;
  quantity: string;
  quantityUnits: string;
  priceUsd: number;
  pricePerUnit: string;
  originMunicipality: string;
  originDepartment: string;
  mineSource: string;
  rucomCode: string;
  anmPermit: string;
  laboratory: string;
  custodyVault: string;
  esgBadge: string;
  hashVerification: string;
  status: 'disponible' | 'en_proceso_cierre' | 'reservado';
  featured?: boolean;
}

const INITIAL_LOTS: MineralLot[] = [
  {
    id: 'LOT-CO-ORO-942',
    title: 'Lote Oro Fino 94% • Aluvial Certificado',
    mineralType: 'oro',
    categoryLabel: 'Oro Aluvial Responsable',
    gradePurity: '94.2% Pureza Ley (22.6k)',
    quantity: '25.0 kg',
    quantityUnits: '803.75 oz troy',
    priceUsd: 1888554,
    pricePerUnit: '$75.54 USD / g',
    originMunicipality: 'San José de Uré',
    originDepartment: 'Sur de Córdoba',
    mineSource: 'Mina Berlín • Barequeros Formalizados',
    rucomCode: 'RUCOM-ANM-CO-849201',
    anmPermit: 'Subcontrato de Formalización ANM-2024',
    laboratory: 'SGS Minerales Colombia (Certificado #SGS-MED-994)',
    custodyVault: 'Bóveda Blindada Prosegur • Medellín',
    esgBadge: 'Cero Mercurio • Gravimetría Limpia',
    hashVerification: '0x9d4a82c610b83e42f9b231da7e5f9c01',
    status: 'disponible',
    featured: true
  },
  {
    id: 'LOT-CH-CUP-285',
    title: 'Concentrado de Cobre Nativo de Alta Ley',
    mineralType: 'cobre',
    categoryLabel: 'Cobre Transición Energética',
    gradePurity: '28.5% Cu + 4.2 g/t Au',
    quantity: '60.0 Toneladas',
    quantityUnits: 'Big Bags de 1.5 T',
    priceUsd: 142500,
    pricePerUnit: '$2,375 USD / Tonelada',
    originMunicipality: 'Carmen de Atrato',
    originDepartment: 'Chocó',
    mineSource: 'Concesión Minera La Esperanza',
    rucomCode: 'RUCOM-ANM-CH-319024',
    anmPermit: 'Título Minero Vigente ANM FJZ-081',
    laboratory: 'Inspectorate Bureau Veritas',
    custodyVault: 'Patio Logístico Buenaventura',
    esgBadge: 'Cadena de Custodia Legal Auditada',
    hashVerification: '0x4f8e21a97d530bc71a932bce123f8902',
    status: 'disponible',
    featured: true
  },
  {
    id: 'LOT-CO-NIQ-182',
    title: 'Lote Níquel y Cobalto Grado Batería',
    mineralType: 'niquel',
    categoryLabel: 'Níquel & Cobalto Crítico',
    gradePurity: '1.82% Ni • 0.12% Co',
    quantity: '120.0 Toneladas',
    quantityUnits: 'Lote a Granel Tamizado',
    priceUsd: 216000,
    pricePerUnit: '$1,800 USD / Tonelada',
    originMunicipality: 'Montelíbano',
    originDepartment: 'Córdoba',
    mineSource: 'Alianza Productiva Cerromatoso Hub',
    rucomCode: 'RUCOM-ANM-CO-620194',
    anmPermit: 'Pacto Territorial Sostenible 2025',
    laboratory: 'Laboratorio Químico Minero Nacional',
    custodyVault: 'Centro de Acopio Regional Córdoba',
    esgBadge: 'Economía Circular Post-Extractiva',
    hashVerification: '0x7b19ce402f1a63bda98c5412ef60aa31',
    status: 'disponible'
  },
  {
    id: 'LOT-VI-COL-450',
    title: 'Tantalita-Columbita (Coltán) Trazable',
    mineralType: 'coltan',
    categoryLabel: 'Coltán & Minerales Estratégicos',
    gradePurity: '45.0% Ta2O5 • 28.0% Nb2O5',
    quantity: '4.5 Toneladas',
    quantityUnits: 'Tambores Sellados 250kg',
    priceUsd: 382500,
    pricePerUnit: '$85,000 USD / Tonelada',
    originMunicipality: 'Cumaribo',
    originDepartment: 'Vichada',
    mineSource: 'Reserva Minera Especial Autorizada',
    rucomCode: 'RUCOM-ANM-VI-992140',
    anmPermit: 'Autorización Especial ANM No-Conflicto',
    laboratory: 'SGS Minerals International',
    custodyVault: 'Zona Franca Bogotá • Custodia Fiscal',
    esgBadge: '100% Conflicto-Free Verificado',
    hashVerification: '0x3a90e8d5f6b21c4309a87d12f45ea091',
    status: 'disponible'
  },
  {
    id: 'LOT-GU-REE-120',
    title: 'Tierras Raras Pesadas & Monacita Certificada',
    mineralType: 'tierras_raras',
    categoryLabel: 'Tierras Raras (REE)',
    gradePurity: '12.4% Óxidos Totales REO (Nd, Pr, Dy)',
    quantity: '8.0 Toneladas',
    quantityUnits: 'Contenedores Herméticos',
    priceUsd: 196000,
    pricePerUnit: '$24,500 USD / Tonelada',
    originMunicipality: 'Inírida',
    originDepartment: 'Guainía',
    mineSource: 'Proyecto Exploración Estratégica Soberana',
    rucomCode: 'RUCOM-ANM-GU-110294',
    anmPermit: 'Permiso Especial de Fomento Minero ANM',
    laboratory: 'Bureau Veritas Geochem',
    custodyVault: 'Bóveda Aeropuerto El Dorado Bogotá',
    esgBadge: 'Soberanía Tecnológica Nacional',
    hashVerification: '0x1e88fd9203a74b5c6d123e45f901ab88',
    status: 'disponible'
  }
];

interface ManagedMarketplaceProps {
  lang: 'es' | 'en';
  isDark: boolean;
  onExitMarketplace?: () => void;
}

export const ManagedMarketplace: React.FC<ManagedMarketplaceProps> = ({
  lang,
  isDark,
  onExitMarketplace
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLot, setSelectedLot] = useState<MineralLot | null>(null);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [orderSubmitting, setOrderSubmitting] = useState(false);
  const [orderSubmittedSuccess, setOrderSubmittedSuccess] = useState(false);
  const [userRole, setUserRole] = useState<'buyer' | 'seller'>('buyer');

  // Formulario de Publicación de Lote Minero
  const [newLotForm, setNewLotForm] = useState({
    mineral: 'Oro Aluvial Cero Mercurio',
    volume: '',
    purity: '',
    municipality: '',
    department: 'Córdoba',
    rucom: '',
    expectedPrice: '',
    contactPhone: ''
  });
  const [publishSubmitted, setPublishSubmitted] = useState(false);

  // Filtrado de lotes
  const filteredLots = INITIAL_LOTS.filter((lot) => {
    const matchesCategory = selectedCategory === 'all' || lot.mineralType === selectedCategory;
    const matchesSearch = 
      lot.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lot.originMunicipality.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lot.originDepartment.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lot.rucomCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lot.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLot) return;
    setOrderSubmitting(true);

    try {
      await fetch('/api/send-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Comprador Marketplace Mino',
          email: 'contacto@builco.co',
          message: `[ORDEN DE COMPRA MARKETPLACE GERENCIADO]\n` +
                   `Lote ID: ${selectedLot.id}\n` +
                   `Mineral: ${selectedLot.title}\n` +
                   `Volumen: ${selectedLot.quantity} (${selectedLot.quantityUnits})\n` +
                   `Precio de Cierre: $${selectedLot.priceUsd.toLocaleString()} USD\n` +
                   `Origen: ${selectedLot.originMunicipality}, ${selectedLot.originDepartment}\n` +
                   `RUCOM: ${selectedLot.rucomCode}\n` +
                   `Laboratorio: ${selectedLot.laboratory}\n` +
                   `Custodia: ${selectedLot.custodyVault}\n` +
                   `Rol: Comprador Institucional Verificado`,
          targetEmail: 'teambuilco@gmail.com'
        })
      });
    } catch {
      // ignore
    }

    setOrderSubmitting(false);
    setOrderSubmittedSuccess(true);
    setTimeout(() => {
      setOrderSubmittedSuccess(false);
      setSelectedLot(null);
    }, 3500);
  };

  const handlePublishSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/send-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Productor Minero Verificado',
          email: 'teambuilco@gmail.com',
          message: `[NUEVA OFERTA DE MINERAL CRÍTICO PARA EL MARKETPLACE]\n` +
                   `Mineral: ${newLotForm.mineral}\n` +
                   `Volumen Estimado: ${newLotForm.volume}\n` +
                   `Ley / Pureza: ${newLotForm.purity}\n` +
                   `Ubicación: ${newLotForm.municipality}, ${newLotForm.department}\n` +
                   `Código RUCOM: ${newLotForm.rucom}\n` +
                   `Precio Esperado: ${newLotForm.expectedPrice}\n` +
                   `Contacto / Teléfono: ${newLotForm.contactPhone}`,
          targetEmail: 'teambuilco@gmail.com'
        })
      });
    } catch {
      // ignore
    }

    setPublishSubmitted(true);
    setTimeout(() => {
      setPublishSubmitted(false);
      setIsPublishModalOpen(false);
      setNewLotForm({
        mineral: 'Oro Aluvial Cero Mercurio',
        volume: '',
        purity: '',
        municipality: '',
        department: 'Córdoba',
        rucom: '',
        expectedPrice: '',
        contactPhone: ''
      });
    }, 3000);
  };

  return (
    <div className={`w-full transition-all duration-300 ${isDark ? 'text-white' : 'text-slate-900'}`}>
      {/* Header del Marketplace Gerenciado */}
      <div className={`p-6 sm:p-8 rounded-3xl border mb-8 ${
        isDark 
          ? 'bg-linear-to-b from-[#18191D] to-[#111215] border-white/10 shadow-2xl' 
          : 'bg-linear-to-b from-white to-slate-50 border-slate-200/90 shadow-xl'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-6 border-b border-white/10 dark:border-white/10 border-slate-200">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                DOCUMENTOS APROBADOS • TERMINAL COMERCIAL ACTIVA
              </span>
              <span className="hidden sm:inline-block text-[11px] font-mono text-gold opacity-90">
                RUCOM & ANM COMPLIANT
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-helvetica font-black uppercase tracking-tight">
              Mino™ Marketplace Gerenciado
            </h1>
            <p className={`text-xs sm:text-sm mt-1 max-w-2xl ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Plataforma institucional para la comercialización segura, directa y transparente de minerales críticos formalizados en Colombia con custodia en bóveda y liquidación en escrow.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsPublishModalOpen(true)}
              className={`px-5 py-3 rounded-xl font-black uppercase tracking-wider text-xs transition-all flex items-center gap-2 cursor-pointer shadow-lg active:scale-95 ${
                isDark ? 'btn-gold' : 'btn-primary-light'
              }`}
            >
              <Plus className="w-4 h-4" />
              <span>Publicar Lote Minero</span>
            </button>

            {onExitMarketplace && (
              <button
                onClick={onExitMarketplace}
                className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                  isDark 
                    ? 'border-white/10 text-white/60 hover:text-white hover:bg-white/5' 
                    : 'border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                }`}
                title="Cerrar Terminal"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* 3 Pilares del Marketplace Gerenciado */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
          <div className={`p-4 rounded-2xl border flex items-center gap-3.5 ${
            isDark ? 'bg-white/3 border-white/5' : 'bg-white border-slate-200/70 shadow-xs'
          }`}>
            <div className="w-10 h-10 rounded-xl bg-gold/15 text-gold flex items-center justify-center shrink-0">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-black uppercase tracking-wider">Ensayes Certificados</div>
              <div className={`text-[11px] ${isDark ? 'text-white/50' : 'text-slate-500'}`}>
                Laboratorios SGS & Inspectorate
              </div>
            </div>
          </div>

          <div className={`p-4 rounded-2xl border flex items-center gap-3.5 ${
            isDark ? 'bg-white/3 border-white/5' : 'bg-white border-slate-200/70 shadow-xs'
          }`}>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-black uppercase tracking-wider">Bóveda & Escrow</div>
              <div className={`text-[11px] ${isDark ? 'text-white/50' : 'text-slate-500'}`}>
                Custodia blindada y pago seguro
              </div>
            </div>
          </div>

          <div className={`p-4 rounded-2xl border flex items-center gap-3.5 ${
            isDark ? 'bg-white/3 border-white/5' : 'bg-white border-slate-200/70 shadow-xs'
          }`}>
            <div className="w-10 h-10 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center shrink-0">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-black uppercase tracking-wider">Trazabilidad ANM</div>
              <div className={`text-[11px] ${isDark ? 'text-white/50' : 'text-slate-500'}`}>
                RUCOM y salvoconductos digitales
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controles de Búsqueda y Categorías */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-white/40' : 'text-slate-400'}`} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por mineral, municipio (San José de Uré, Chocó...), RUCOM..."
            className={`w-full pl-11 pr-4 py-3.5 rounded-2xl border outline-none text-xs transition-all ${
              isDark
                ? 'bg-[#18191D] border-white/10 text-white placeholder-white/30 focus:border-gold'
                : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-gold-deep shadow-xs'
            }`}
          />
        </div>

        {/* Botones de Categorías de Minerales Críticos */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {[
            { id: 'all', label: 'Todos los Lotes' },
            { id: 'oro', label: 'Oro Cero Mercurio' },
            { id: 'cobre', label: 'Cobre Nativo' },
            { id: 'niquel', label: 'Níquel & Cobalto' },
            { id: 'coltan', label: 'Coltán Regulado' },
            { id: 'tierras_raras', label: 'Tierras Raras' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? isDark
                    ? 'bg-gold text-black shadow-lg shadow-gold/20'
                    : 'bg-[#926E24] text-white shadow-md'
                  : isDark
                    ? 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100/80 shadow-xs'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Lotes del Marketplace */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        {filteredLots.map((lot) => (
          <div
            key={lot.id}
            className={`rounded-3xl border p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:scale-[1.01] ${
              isDark 
                ? 'bg-[#16171B] border-white/10 hover:border-gold/40 shadow-xl' 
                : 'bg-white border-slate-200 hover:border-gold-deep/50 shadow-md'
            }`}
          >
            <div>
              {/* Badge superior y ID */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase bg-gold/15 text-gold border border-gold/30">
                  {lot.categoryLabel}
                </span>
                <span className={`text-[11px] font-mono ${isDark ? 'text-white/40' : 'text-slate-400'}`}>
                  {lot.id}
                </span>
              </div>

              {/* Título y Precio */}
              <h3 className="text-xl font-helvetica font-black uppercase tracking-tight mb-2">
                {lot.title}
              </h3>

              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-2xl sm:text-3xl font-black text-gold">
                  ${lot.priceUsd.toLocaleString()} USD
                </span>
                <span className={`text-xs font-mono ${isDark ? 'text-white/50' : 'text-slate-500'}`}>
                  ({lot.pricePerUnit})
                </span>
              </div>

              {/* Especificaciones Técnicas */}
              <div className={`grid grid-cols-2 gap-3 p-4 rounded-2xl mb-6 text-xs ${
                isDark ? 'bg-black/30 border border-white/5' : 'bg-slate-50 border border-slate-100'
              }`}>
                <div>
                  <span className={`block text-[10px] font-mono uppercase ${isDark ? 'text-white/40' : 'text-slate-400'}`}>
                    Pureza / Ley Certificada
                  </span>
                  <span className="font-bold text-sm">{lot.gradePurity}</span>
                </div>
                <div>
                  <span className={`block text-[10px] font-mono uppercase ${isDark ? 'text-white/40' : 'text-slate-400'}`}>
                    Volumen Disponible
                  </span>
                  <span className="font-bold text-sm">{lot.quantity}</span>
                </div>
                <div>
                  <span className={`block text-[10px] font-mono uppercase ${isDark ? 'text-white/40' : 'text-slate-400'}`}>
                    Origen & Municipio
                  </span>
                  <span className="font-medium truncate block">{lot.originMunicipality}, {lot.originDepartment}</span>
                </div>
                <div>
                  <span className={`block text-[10px] font-mono uppercase ${isDark ? 'text-white/40' : 'text-slate-400'}`}>
                    RUCOM Vigente
                  </span>
                  <span className="font-mono font-bold text-emerald-400">{lot.rucomCode}</span>
                </div>
              </div>

              {/* Trazabilidad y Custodia */}
              <div className="space-y-2 mb-6 text-xs">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className={`truncate ${isDark ? 'text-white/70' : 'text-slate-600'}`}>
                    Laboratorio: <strong className={isDark ? 'text-white' : 'text-slate-900'}>{lot.laboratory}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-gold shrink-0" />
                  <span className={`truncate ${isDark ? 'text-white/70' : 'text-slate-600'}`}>
                    Ubicación de Custodia: <strong className={isDark ? 'text-white' : 'text-slate-900'}>{lot.custodyVault}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-emerald-500 font-bold">{lot.esgBadge}</span>
                </div>
              </div>
            </div>

            {/* Botón de Acción para Comprar / Ofertar */}
            <div className="pt-4 border-t border-white/10 dark:border-white/10 border-slate-100 flex items-center justify-between gap-4">
              <span className={`text-[10px] font-mono uppercase truncate ${isDark ? 'text-white/40' : 'text-slate-400'}`}>
                Hash: {lot.hashVerification.slice(0, 14)}...
              </span>
              <button
                onClick={() => setSelectedLot(lot)}
                className={`px-6 py-3 rounded-xl font-black uppercase tracking-wider text-xs transition-all flex items-center gap-2 cursor-pointer shadow-md active:scale-95 ${
                  isDark ? 'btn-gold' : 'btn-primary-light'
                }`}
              >
                <span>Emitir Orden Gerenciada</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredLots.length === 0 && (
        <div className={`p-12 text-center rounded-3xl border mb-12 ${
          isDark ? 'bg-white/3 border-white/10 text-white/60' : 'bg-slate-50 border-slate-200 text-slate-500'
        }`}>
          <Search className="w-8 h-8 mx-auto mb-3 opacity-40" />
          <h4 className="text-base font-bold mb-1">No se encontraron lotes para este criterio</h4>
          <p className="text-xs">Intente seleccionando "Todos los Lotes" o ajustando su búsqueda.</p>
        </div>
      )}

      {/* Modal de Emisión de Orden de Compra Gerenciada */}
      <AnimatePresence>
        {selectedLot && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLot(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={`relative z-10 w-full max-w-lg p-8 sm:p-10 rounded-3xl shadow-3xl border overflow-hidden ${
                isDark ? 'bg-[#18191D] border-white/15' : 'bg-white border-slate-200'
              }`}
            >
              <button
                onClick={() => setSelectedLot(null)}
                className={`absolute top-5 right-5 p-2 rounded-full cursor-pointer transition-all ${
                  isDark ? 'text-white/60 hover:text-white hover:bg-white/10' : 'text-slate-400 hover:text-slate-800 hover:bg-slate-100'
                }`}
              >
                <X className="w-5 h-5" />
              </button>

              {!orderSubmittedSuccess ? (
                <>
                  <div className="mb-6">
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest bg-gold/15 text-gold border border-gold/30">
                      Mesa de Corretaje Gerenciado
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight mt-2">
                      Orden de Liquidación en Escrow
                    </h3>
                    <p className={`text-xs mt-1 ${isDark ? 'text-white/60' : 'text-slate-500'}`}>
                      Se emitirá una orden formal supervisada por Builco para el lote {selectedLot.id}.
                    </p>
                  </div>

                  {/* Resumen del Lote */}
                  <div className={`p-4 rounded-2xl mb-6 space-y-2 text-xs ${
                    isDark ? 'bg-black/40 border border-white/5' : 'bg-slate-50 border border-slate-200'
                  }`}>
                    <div className="flex justify-between font-bold">
                      <span>{selectedLot.title}</span>
                      <span className="text-gold">${selectedLot.priceUsd.toLocaleString()} USD</span>
                    </div>
                    <div className="flex justify-between text-[11px] opacity-80">
                      <span>Volumen: {selectedLot.quantity}</span>
                      <span>Origen: {selectedLot.originMunicipality}</span>
                    </div>
                    <div className="flex justify-between text-[11px] font-mono text-emerald-400">
                      <span>RUCOM: {selectedLot.rucomCode}</span>
                      <span>En Bóveda Blindada</span>
                    </div>
                  </div>

                  <form onSubmit={handleOrderSubmit} className="space-y-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5 opacity-70">
                        Entidad o Fondo Comprador
                      </label>
                      <input
                        type="text"
                        placeholder="Ej. Sovereign Asset Fund / Joyería Internacional"
                        required
                        className={`w-full px-4 py-3 rounded-xl border text-xs outline-none ${
                          isDark ? 'bg-white/5 border-white/10 text-white focus:border-gold' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-gold-deep'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5 opacity-70">
                        Correo de Contacto Institucional
                      </label>
                      <input
                        type="email"
                        placeholder="representante@fondo.com"
                        required
                        className={`w-full px-4 py-3 rounded-xl border text-xs outline-none ${
                          isDark ? 'bg-white/5 border-white/10 text-white focus:border-gold' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-gold-deep'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5 opacity-70">
                        Términos de Liquidación Deseados
                      </label>
                      <select
                        className={`w-full px-4 py-3 rounded-xl border text-xs outline-none ${
                          isDark ? 'bg-[#18191D] border-white/10 text-white focus:border-gold' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-gold-deep'
                        }`}
                      >
                        <option value="escrow_100">Depósito en Garantía Escrow 100% Contra Ensayes</option>
                        <option value="forward_30">Contrato Forward a 30 Días con Entrega en Refinería</option>
                        <option value="spot_medellin">Liquidación Spot Inmediata en Bóveda Medellín</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={orderSubmitting}
                      className={`w-full py-4 rounded-xl font-black uppercase tracking-wider text-xs transition-all shadow-xl cursor-pointer ${
                        orderSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                      } ${
                        isDark ? 'btn-gold' : 'btn-primary-light'
                      }`}
                    >
                      {orderSubmitting ? 'Procesando Orden...' : 'Confirmar y Enviar Orden a la Mesa'}
                    </button>
                  </form>
                </>
              ) : (
                <div className="py-8 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-black uppercase">Orden Emitida Exitosamente</h3>
                  <p className="text-xs max-w-sm mx-auto opacity-80 leading-relaxed">
                    La orden de compra para el lote <strong>{selectedLot.id}</strong> ha sido radicada directamente con la mesa gerenciada de Builco. Un corredor institucional se pondrá en contacto para formalizar el contrato escrow.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal de Publicación de Nuevo Lote para Vendedores */}
      <AnimatePresence>
        {isPublishModalOpen && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPublishModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={`relative z-10 w-full max-w-xl p-8 sm:p-10 rounded-3xl shadow-3xl border overflow-hidden ${
                isDark ? 'bg-[#18191D] border-white/15' : 'bg-white border-slate-200'
              }`}
            >
              <button
                onClick={() => setIsPublishModalOpen(false)}
                className={`absolute top-5 right-5 p-2 rounded-full cursor-pointer transition-all ${
                  isDark ? 'text-white/60 hover:text-white hover:bg-white/10' : 'text-slate-400 hover:text-slate-800 hover:bg-slate-100'
                }`}
              >
                <X className="w-5 h-5" />
              </button>

              {!publishSubmitted ? (
                <>
                  <div className="mb-6">
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest bg-gold/15 text-gold border border-gold/30">
                      Registro de Minerales Formalizados
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight mt-2">
                      Publicar Lote en el Marketplace
                    </h3>
                    <p className={`text-xs mt-1 ${isDark ? 'text-white/60' : 'text-slate-500'}`}>
                      Inscriba su producción minera formal para que la mesa de Builco gestione los ensayes, la custodia y la venta a compradores institucionales.
                    </p>
                  </div>

                  <form onSubmit={handlePublishSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5 opacity-70">
                          Mineral Crítico
                        </label>
                        <select
                          value={newLotForm.mineral}
                          onChange={(e) => setNewLotForm({ ...newLotForm, mineral: e.target.value })}
                          className={`w-full px-4 py-3 rounded-xl border text-xs outline-none ${
                            isDark ? 'bg-[#18191D] border-white/10 text-white focus:border-gold' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-gold-deep'
                          }`}
                        >
                          <option value="Oro Aluvial Cero Mercurio">Oro Aluvial Cero Mercurio</option>
                          <option value="Cobre Nativo / Concentrado">Cobre Nativo / Concentrado</option>
                          <option value="Níquel y Cobalto">Níquel y Cobalto</option>
                          <option value="Coltán / Tantalio">Coltán / Tantalio</option>
                          <option value="Tierras Raras (REE)">Tierras Raras (REE)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5 opacity-70">
                          Volumen / Peso
                        </label>
                        <input
                          type="text"
                          value={newLotForm.volume}
                          onChange={(e) => setNewLotForm({ ...newLotForm, volume: e.target.value })}
                          placeholder="Ej. 15 kg / 40 Toneladas"
                          required
                          className={`w-full px-4 py-3 rounded-xl border text-xs outline-none ${
                            isDark ? 'bg-white/5 border-white/10 text-white focus:border-gold' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-gold-deep'
                          }`}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5 opacity-70">
                          Municipio de Origen
                        </label>
                        <input
                          type="text"
                          value={newLotForm.municipality}
                          onChange={(e) => setNewLotForm({ ...newLotForm, municipality: e.target.value })}
                          placeholder="Ej. San José de Uré"
                          required
                          className={`w-full px-4 py-3 rounded-xl border text-xs outline-none ${
                            isDark ? 'bg-white/5 border-white/10 text-white focus:border-gold' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-gold-deep'
                          }`}
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5 opacity-70">
                          Código RUCOM Vigente
                        </label>
                        <input
                          type="text"
                          value={newLotForm.rucom}
                          onChange={(e) => setNewLotForm({ ...newLotForm, rucom: e.target.value })}
                          placeholder="Ej. RUCOM-ANM-849201"
                          required
                          className={`w-full px-4 py-3 rounded-xl border text-xs outline-none ${
                            isDark ? 'bg-white/5 border-white/10 text-white focus:border-gold' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-gold-deep'
                          }`}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5 opacity-70">
                          Ley / Pureza Estimada
                        </label>
                        <input
                          type="text"
                          value={newLotForm.purity}
                          onChange={(e) => setNewLotForm({ ...newLotForm, purity: e.target.value })}
                          placeholder="Ej. 94% Au / 28% Cu"
                          required
                          className={`w-full px-4 py-3 rounded-xl border text-xs outline-none ${
                            isDark ? 'bg-white/5 border-white/10 text-white focus:border-gold' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-gold-deep'
                          }`}
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5 opacity-70">
                          Teléfono de Contacto
                        </label>
                        <input
                          type="text"
                          value={newLotForm.contactPhone}
                          onChange={(e) => setNewLotForm({ ...newLotForm, contactPhone: e.target.value })}
                          placeholder="+57 300 000 0000"
                          required
                          className={`w-full px-4 py-3 rounded-xl border text-xs outline-none ${
                            isDark ? 'bg-white/5 border-white/10 text-white focus:border-gold' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-gold-deep'
                          }`}
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className={`w-full py-4 rounded-xl font-black uppercase tracking-wider text-xs transition-all shadow-xl cursor-pointer ${
                        isDark ? 'btn-gold' : 'btn-primary-light'
                      }`}
                    >
                      Registrar Lote para Validación de la Mesa
                    </button>
                  </form>
                </>
              ) : (
                <div className="py-8 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-black uppercase">Lote Registrado Exitosamente</h3>
                  <p className="text-xs max-w-sm mx-auto opacity-80 leading-relaxed">
                    La información de su lote minero ha sido enviada al equipo de comercialización gerenciada de Builco. Nos pondremos en contacto para coordinar la toma de muestras, ensayes y depósito en custodia blindada.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
