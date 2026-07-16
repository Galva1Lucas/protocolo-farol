import React, { useState, useEffect } from 'react';
// @ts-ignore
import testimonial1 from './assets/images/testimonial_1_1783998272948.jpg';
// @ts-ignore
import testimonial2 from './assets/images/testimonial_2_1783998285472.jpg';
// @ts-ignore
import testimonial3 from './assets/images/testimonial_3_1783998295289.jpg';
// @ts-ignore
import testimonial4 from './assets/images/testimonial_4_1783998305850.jpg';
import { 
  Flame, 
  Lock, 
  Zap, 
  Mail, 
  Shield, 
  Check, 
  MessageSquare, 
  Activity, 
  Users, 
  LineChart, 
  FileText, 
  Clock, 
  HelpCircle, 
  BookOpen, 
  ClipboardList, 
  User, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle, 
  AlertTriangle, 
  FileCheck, 
  ArrowRight, 
  ShieldCheck, 
  ThumbsUp,
  Award,
  Sparkles,
  X,
  CreditCard,
  CheckSquare,
  ChevronLeft,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

export default function App() {
  // Helper to preserve URL tracking parameters on checkout redirects
  const appendUtms = (url: string) => {
    if (typeof window === 'undefined') return url;
    const search = window.location.search;
    if (!search) return url;
    const separator = url.includes('?') ? '&' : '?';
    const cleanSearch = search.startsWith('?') ? search.substring(1) : search;
    return `${url}${separator}${cleanSearch}`;
  };

  // Live countdown timer state (starts at 10 hours, 5 minutes, 20 seconds)
  const [timeLeft, setTimeLeft] = useState(36320); // in seconds
  
  // Accordion state for FAQs
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Carousels State
  const [activeMobileSlide, setActiveMobileSlide] = useState(0);
  const [activeTestimonialSlide, setActiveTestimonialSlide] = useState(0);

  // Drag/Swipe state for Testimonial Carousel
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [dragEndX, setDragEndX] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setDragStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setDragEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (dragStartX === null || dragEndX === null) return;
    const distance = dragStartX - dragEndX;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setActiveTestimonialSlide((prev) => (prev === 3 ? 3 : prev + 1));
    }
    if (isRightSwipe) {
      setActiveTestimonialSlide((prev) => (prev === 0 ? 0 : prev - 1));
    }
    setDragStartX(null);
    setDragEndX(null);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragStartX !== null) {
      setDragEndX(e.clientX);
    }
  };

  const handleMouseUp = () => {
    if (dragStartX !== null && dragEndX !== null) {
      const distance = dragStartX - dragEndX;
      const isLeftSwipe = distance > 50;
      const isRightSwipe = distance < -50;

      if (isLeftSwipe) {
        setActiveTestimonialSlide((prev) => (prev === 3 ? 3 : prev + 1));
      }
      if (isRightSwipe) {
        setActiveTestimonialSlide((prev) => (prev === 0 ? 0 : prev - 1));
      }
    }
    setDragStartX(null);
    setDragEndX(null);
  };

  // Popups State
  const [isInitialUpgradeOpen, setIsInitialUpgradeOpen] = useState(false);
  const [isBasicRescueOpen, setIsBasicRescueOpen] = useState(false);
  const [isExitPopup1Open, setIsExitPopup1Open] = useState(false);
  const [isExitPopup2Open, setIsExitPopup2Open] = useState(false);
  
  // Track if exit popups have been shown to prevent annoying repeat triggers
  const [exitPopup1Shown, setExitPopup1Shown] = useState(false);
  const [exitPopup2Shown, setExitPopup2Shown] = useState(false);

  // Active checkout plan configuration
  const [activePlan, setActivePlan] = useState<{
    id: 'inicial' | 'completo_full' | 'completo_discount_25' | 'completo_discount_19';
    name: string;
    price: number;
  }>({
    id: 'completo_full',
    name: 'FAROL Completo',
    price: 37.90
  });

  // Simple checkout state
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card'>('pix');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [isG1ModalOpen, setIsG1ModalOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 1 ? prev - 1 : 36320));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Mobile 2-image carousel automatic slide timer
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveMobileSlide((prev) => (prev === 0 ? 1 : 0));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Exit intent simulation triggers (highly optimized & 100% compliant with Facebook Ads policies)
  useEffect(() => {
    // 1. Mouse leave top of screen (Desktop)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 20 && !exitPopup1Shown && !isCheckoutOpen && !isInitialUpgradeOpen && !isExitPopup2Open) {
        setIsExitPopup1Open(true);
        setExitPopup1Shown(true);
      }
    };

    // 2. Smart Mobile Trigger: Scrolling up quickly (simulates looking for address/navigation bar)
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDiff = lastScrollY - currentScrollY;
      
      // If user has scrolled down a bit (> 150px) and then scrolls up quickly (diff > 25px)
      if (currentScrollY > 150 && scrollDiff > 25 && !exitPopup1Shown && !isCheckoutOpen && !isInitialUpgradeOpen && !isExitPopup2Open) {
        setIsExitPopup1Open(true);
        setExitPopup1Shown(true);
      }
      lastScrollY = currentScrollY;
    };

    // 3. Smart Timeout: Trigger after 55 seconds on page without checking out
    const timeoutTrigger = setTimeout(() => {
      if (!exitPopup1Shown && !isCheckoutOpen && !isInitialUpgradeOpen && !isExitPopup2Open) {
        setIsExitPopup1Open(true);
        setExitPopup1Shown(true);
      }
    }, 55000);

    // 4. Visibility change (Switching tabs / minimizing browser on mobile)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && !exitPopup1Shown && !isCheckoutOpen && !isInitialUpgradeOpen && !isExitPopup2Open) {
        setIsExitPopup1Open(true);
        setExitPopup1Shown(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearTimeout(timeoutTrigger);
    };
  }, [exitPopup1Shown, isCheckoutOpen, isInitialUpgradeOpen, isExitPopup2Open]);

  // Format countdown
  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return [
      hours.toString().padStart(2, '0'),
      minutes.toString().padStart(2, '0'),
      seconds.toString().padStart(2, '0')
    ].join(':');
  };

  // Actions for plan selection
  const handleSelectInicialPlan = () => {
    // Before going to checkout, trigger the Upgrade Popup
    setIsInitialUpgradeOpen(true);
  };

  const handleSelectCompletoPlan = () => {
    window.location.href = appendUtms("https://pay.wiapy.com/reyx-NibShoc");
  };

  // Popup 1 Actions: Upgrade offered when clicking Initial Plan
  const handleUpgradeToCompleto = () => {
    setIsInitialUpgradeOpen(false);
    window.location.href = appendUtms("https://pay.wiapy.com/HPjNOxj6PDr3");
  };

  const handleDeclineUpgrade = () => {
    setIsInitialUpgradeOpen(false);
    setIsBasicRescueOpen(true);
  };

  // Exit Popup 1 Actions
  const handleAcceptExitPopup1 = () => {
    setIsExitPopup1Open(false);
    window.location.href = appendUtms("https://pay.wiapy.com/HPjNOxj6PDr3");
  };

  const handleDeclineExitPopup1 = () => {
    setIsExitPopup1Open(false);
    // Immediately open Exit Popup 2 as requested: "Se o usuário fechar o primeiro exit popup, mostrar um segundo popup."
    if (!exitPopup2Shown) {
      setIsExitPopup2Open(true);
      setExitPopup2Shown(true);
    }
  };

  // Exit Popup 2 Actions
  const handleAcceptExitPopup2 = () => {
    setIsExitPopup2Open(false);
    window.location.href = appendUtms("https://pay.wiapy.com/L8Ba5XUywWt3");
  };

  const handleDeclineExitPopup2 = () => {
    setIsExitPopup2Open(false);
  };

  // Submit mock checkout
  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerEmail) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setCheckoutSuccess(true);
    }, 1500);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-farol-cream text-slate-800 antialiased flex flex-col selection:bg-emerald-500/10 selection:text-farol-navy font-sans">
      
      {/* 1. BARRA DE NOTIFICAÇÃO SUPERIOR (TOPBAR - NOT FIXED/SCROLLS WITH PAGE) */}
      <div className="bg-emerald-500 text-slate-950 py-2.5 px-4 text-xs md:text-sm font-semibold shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-2 flex-wrap text-center">
          <Flame className="w-4 h-4 text-amber-300 fill-amber-300 animate-bounce flex-shrink-0" />
          <span className="text-white font-extrabold uppercase tracking-wide">
            Oferta válida só para hoje
          </span>
          <span className="text-white/90">•</span>
          <span className="text-white/95">termina em:</span>
          <span className="bg-emerald-700/80 text-white font-mono px-2 py-0.5 rounded font-black tracking-widest text-xs md:text-sm shadow-inner border border-emerald-600/60">
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>

      {/* 2. CABEÇALHO PRINCIPAL (HERO SECTION - FUNDO ESCURO) */}
      <header className="bg-farol-navy text-white relative overflow-hidden pt-6 pb-16 md:pt-10 md:pb-24 border-b border-slate-800">
        {/* Subtle decorative background lights */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-slate-700/20 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10 text-center">
          
          {/* Tag de Segmentação (Badge) & Prova Social Alinhada e Menor */}
          <div className="flex flex-col items-center gap-3 mb-6">
            <div className="inline-flex items-center gap-2 bg-slate-800/60 border border-slate-700/80 text-white/90 text-xs md:text-sm font-extrabold tracking-wider px-5 py-2 rounded-full uppercase">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              Para professoras da Educação Infantil (creche e pré-escola)
            </div>
            
            {/* Elemento de Prova Social Inicial (Menor e abaixo da tag principal) */}
            <div className="flex items-center gap-2 bg-slate-800/30 border border-slate-700/40 py-1.5 px-4 rounded-full">
              {/* Stacked Avatars (Menores) */}
              <div className="flex -space-x-1.5">
                <img 
                  src="https://i.ibb.co/R40zW70Z/unnamed-2.jpg" 
                  alt="Profissional 1" 
                  referrerPolicy="no-referrer"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="w-5 h-5 rounded-full border border-farol-navy object-cover" 
                />
                <img 
                  src="https://i.ibb.co/7xd75bRY/1769739638747.webp" 
                  alt="Profissional 2" 
                  referrerPolicy="no-referrer"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="w-5 h-5 rounded-full border border-farol-navy object-cover" 
                />
                <img 
                  src="https://i.ibb.co/F489Z1HB/dep2.jpg" 
                  alt="Profissional 3" 
                  referrerPolicy="no-referrer"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="w-5 h-5 rounded-full border border-farol-navy object-cover" 
                />
              </div>
              <span className="text-white/80 text-xs font-semibold tracking-wide">
                + 1.287 profissionais já usam
              </span>
            </div>
          </div>

          {/* Hero Main Heading with Requested Highlights (No underline) */}
          <h1 className="font-display font-extrabold text-3xl md:text-5xl lg:text-6xl leading-[1.15] text-balance max-w-4xl mx-auto mb-6">
            Saiba exatamente o que{' '}
            <span className="text-emerald-400">observar</span>,{' '}
            <span className="text-emerald-400 font-black">registrar</span> e{' '}
            <span className="text-emerald-400">acompanhar</span>{' '}
            no desenvolvimento dos seus alunos
          </h1>

          {/* ESPAÇO PARA O MOCKUP (Entre Headline e Subtext) */}
          <div className="my-10 max-w-3xl mx-auto relative group">
            {/* Elegant glow effect */}
            <div className="absolute inset-0 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>
            
            <img 
              src="https://i.ibb.co/GfBQD1G1/Whats-App-Image-2026-07-14-at-17-17-05-11zon.webp" 
              alt="Protocolo FAROL™ Mockup Completo" 
              referrerPolicy="no-referrer"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="relative z-10 mx-auto max-w-2xl w-full h-auto rounded-3xl border-2 border-emerald-500/30 shadow-2xl drop-shadow-[0_20px_50px_rgba(16,185,129,0.15)] transform hover:scale-[1.02] transition-transform duration-500 animate-soft-pulse" 
            />
          </div>

          <p className="text-slate-100 text-lg sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed mb-8 font-semibold">
            O <strong className="text-white font-extrabold">Protocolo FAROL™</strong> reúne um método prático e materiais digitais para ajudar professoras a organizar o acompanhamento infantil com mais segurança.
          </p>

          {/* Action Button */}
          <div className="max-w-md mx-auto">
            <button 
              onClick={() => scrollToSection('plans')}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-base md:text-lg px-8 py-4.5 rounded-2xl shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all duration-300 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 group animate-cta-pulse"
            >
              Quero acompanhar meus alunos com mais segurança
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Delicate BNCC Card */}
          <div className="max-w-md mx-auto mt-4 px-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center backdrop-blur-sm">
              <p className="text-slate-100 text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 leading-relaxed">
                <Sparkles className="w-4 h-4 text-emerald-400 flex-shrink-0 animate-pulse" />
                Método organizado e alinhado à BNCC para creche e pré-escola
              </p>
            </div>
          </div>

          {/* Trust badges footer of header */}
          <div className="pt-5 max-w-3xl mx-auto border-t border-slate-800/50 mt-5 px-4">
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 justify-items-center sm:flex sm:flex-row sm:flex-wrap sm:items-center sm:justify-center text-slate-300 text-xs sm:text-sm font-bold">
              <span className="flex items-center gap-1.5 justify-center">
                <Lock className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                Compra Segura
              </span>
              <span className="text-slate-700 hidden sm:inline">•</span>
              <span className="flex items-center gap-1.5 justify-center">
                <Zap className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                Acesso imediato à plataforma
              </span>
              <span className="text-slate-700 hidden sm:inline">•</span>
              <span className="flex items-center gap-1.5 justify-center">
                <FileCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                Materiais para baixar
              </span>
              <span className="text-slate-700 hidden sm:inline">•</span>
              <span className="flex items-center gap-1.5 justify-center">
                <Shield className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                Garantia de 7 dias
              </span>
            </div>
          </div>

        </div>
      </header>

      {/* SEÇÃO DE IDENTIFICAÇÃO */}
      <section className="py-16 md:py-24 max-w-5xl mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="font-display font-extrabold text-2xl md:text-4xl text-farol-navy leading-snug">
            Você já percebeu que uma criança da sua turma precisava de mais atenção, mas ficou sem saber como acompanhar?
          </h2>
          <div className="w-16 h-1 bg-emerald-500 mx-auto rounded-full"></div>
          <p className="text-slate-800 text-lg md:text-xl font-bold">
            Na rotina da Educação Infantil, as professoras observam diversos sinais todos os dias:
          </p>
        </div>

        {/* Signals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          
          {/* Signal: Comunicação */}
          <div className="bg-white border border-slate-300 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-5 font-bold">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="font-display font-extrabold text-lg text-farol-navy mb-2">Comunicação</h3>
              <p className="text-base text-slate-800 leading-relaxed font-semibold">
                Dificuldades para se expressar, interagir ou acompanhar atividades que envolvem linguagem.
              </p>
            </div>
          </div>

          {/* Signal: Coordenação e movimento */}
          <div className="bg-white border border-slate-300 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-5 font-bold">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="font-display font-extrabold text-lg text-farol-navy mb-2">Coordenação e movimento</h3>
              <p className="text-base text-slate-800 leading-relaxed font-semibold">
                Desafios relacionados à coordenação motora, equilíbrio e percepção corporal.
              </p>
            </div>
          </div>

          {/* Signal: Socialização */}
          <div className="bg-white border border-slate-300 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-5 font-bold">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-display font-extrabold text-lg text-farol-navy mb-2">Socialização</h3>
              <p className="text-base text-slate-800 leading-relaxed font-semibold">
                Dificuldades para interagir, participar de atividades coletivas ou criar vínculos.
              </p>
            </div>
          </div>

          {/* Signal: Desenvolvimento Infantil */}
          <div className="bg-white border border-slate-300 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-5 font-bold">
                <LineChart className="w-5 h-5" />
              </div>
              <h3 className="font-display font-extrabold text-lg text-farol-navy mb-2">Desenvolvimento infantil</h3>
              <p className="text-base text-slate-800 leading-relaxed font-semibold">
                Diferenças no ritmo de evolução entre crianças da mesma faixa etária.
              </p>
            </div>
          </div>

        </div>

        {/* But questions always arise */}
        <div className="bg-farol-soft rounded-2xl p-8 max-w-3xl mx-auto border-2 border-slate-300">
          <p className="font-display font-black text-xl text-farol-navy text-center mb-6">
            Mas muitas vezes surgem dúvidas:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 flex-shrink-0"></span>
              <p className="text-base text-slate-900 font-extrabold">"Estou observando os pontos certos?"</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 flex-shrink-0"></span>
              <p className="text-base text-slate-900 font-extrabold">"Como registrar essa evolução?"</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 flex-shrink-0"></span>
              <p className="text-base text-slate-900 font-extrabold">"Como organizar essas informações?"</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 flex-shrink-0"></span>
              <p className="text-base text-slate-900 font-extrabold">"Como conversar com os responsáveis?"</p>
            </div>
          </div>
        </div>

      </section>

      {/* SEÇÃO DO PROBLEMA */}
      <section className="py-20 md:py-28 bg-white border-y border-slate-200/60">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="font-display font-extrabold text-2xl md:text-4xl text-farol-navy">
              Observar faz parte da rotina. Organizar essas informações é o desafio.
            </h2>
            <p className="text-slate-800 text-lg md:text-xl font-bold">
              Sem um processo organizado, muitas professoras acabam:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* Problem 1 */}
            <div className="flex gap-4 items-start bg-farol-cream border border-slate-300 p-6 rounded-2xl shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-display font-black text-lg text-farol-navy">Fazendo registros espalhados</h3>
                <p className="text-base text-slate-800 leading-relaxed font-semibold">
                  Anotações em folhas, cadernos e arquivos diferentes que tornam difícil acompanhar a evolução.
                </p>
              </div>
            </div>

            {/* Problem 2 */}
            <div className="flex gap-4 items-start bg-farol-cream border border-slate-300 p-6 rounded-2xl shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-display font-black text-lg text-farol-navy">Perdendo tempo criando relatórios</h3>
                <p className="text-base text-slate-800 leading-relaxed font-semibold">
                  Horas tentando lembrar detalhes de cada criança para montar pareceres e registros.
                </p>
              </div>
            </div>

            {/* Problem 3 */}
            <div className="flex gap-4 items-start bg-farol-cream border border-slate-300 p-6 rounded-2xl shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-display font-black text-lg text-farol-navy">Sem saber exatamente o que acompanhar</h3>
                <p className="text-base text-slate-800 leading-relaxed font-semibold">
                  Dificuldade para organizar quais habilidades observar durante o desenvolvimento infantil.
                </p>
              </div>
            </div>

            {/* Problem 4 */}
            <div className="flex gap-4 items-start bg-farol-cream border border-slate-300 p-6 rounded-2xl shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-display font-black text-lg text-farol-navy">Insegurança nas conversas com famílias</h3>
                <p className="text-base text-slate-800 leading-relaxed font-semibold">
                  Falta de registros claros para apresentar a evolução das crianças.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* APRESENTAÇÃO DO MÉTODO */}
      <section className="py-20 md:py-28 bg-farol-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto px-4 md:px-6 relative z-10">
          
          <div className="text-center space-y-4 mb-16">
            <span className="text-emerald-400 text-xs font-extrabold uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full">
              O Método
            </span>
            <h2 className="font-display font-extrabold text-3xl md:text-5xl text-white">
              Conheça o Protocolo FAROL™
            </h2>
            <p className="text-emerald-400 font-extrabold text-xl sm:text-2xl">
              Um caminho organizado para acompanhar o desenvolvimento infantil
            </p>
            <p className="text-slate-100 text-base md:text-lg leading-relaxed max-w-2xl mx-auto font-semibold">
              O FAROL transforma observações do dia a dia em registros estruturados, ajudando você a saber o que observar, como registrar e como acompanhar cada criança de forma contínua.
            </p>
          </div>

          {/* Method Roadmap */}
          <div className="bg-slate-800/80 border border-slate-700 rounded-3xl p-6 md:p-10 space-y-8 shadow-2xl">
            <h3 className="font-display font-black text-xl text-center text-emerald-400 uppercase tracking-wider">
              O método FAROL™ em 5 etapas
            </h3>

            <div className="divide-y divide-slate-700">
              
              {/* Step F */}
              <div className="flex gap-4 py-5 items-start">
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-slate-950 font-display font-black text-lg flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-500/10">
                  F
                </div>
                <div>
                  <h4 className="font-display font-extrabold text-lg text-white">F — Foco nos sinais</h4>
                  <p className="text-base text-slate-100 leading-relaxed mt-1 font-bold">
                    Observe os principais pontos do desenvolvimento infantil durante a rotina escolar.
                  </p>
                </div>
              </div>

              {/* Step A */}
              <div className="flex gap-4 py-5 items-start">
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-slate-950 font-display font-black text-lg flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-500/10">
                  A
                </div>
                <div>
                  <h4 className="font-display font-extrabold text-lg text-white">A — Acompanhamento das habilidades</h4>
                  <p className="text-base text-slate-100 leading-relaxed mt-1 font-bold">
                    Organize as informações importantes de cada criança de forma estruturada.
                  </p>
                </div>
              </div>

              {/* Step R */}
              <div className="flex gap-4 py-5 items-start">
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-slate-950 font-display font-black text-lg flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-500/10">
                  R
                </div>
                <div>
                  <h4 className="font-display font-extrabold text-lg text-white">R — Registro da evolução</h4>
                  <p className="text-base text-slate-100 leading-relaxed mt-1 font-bold">
                    Transforme observações in loco em registros claros, limpos e organizados.
                  </p>
                </div>
              </div>

              {/* Step O */}
              <div className="flex gap-4 py-5 items-start">
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-slate-950 font-display font-black text-lg flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-500/10">
                  O
                </div>
                <div>
                  <h4 className="font-display font-extrabold text-lg text-white">O — Organização dos próximos passos</h4>
                  <p className="text-base text-slate-100 leading-relaxed mt-1 font-bold">
                    Tenha mais clareza sobre quais habilidades podem ser estimuladas com planejamento pedagógico.
                  </p>
                </div>
              </div>

              {/* Step L */}
              <div className="flex gap-4 py-5 items-start">
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-slate-950 font-display font-black text-lg flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-500/10">
                  L
                </div>
                <div>
                  <h4 className="font-display font-extrabold text-lg text-white">L — Linha de desenvolvimento</h4>
                  <p className="text-base text-slate-100 leading-relaxed mt-1 font-bold">
                    Acompanhe avanços, mudanças e marcos durante todo o ano letivo de forma sequencial.
                  </p>
                </div>
              </div>

            </div>

            {/* Carousel Automático Infinito no Mobile com duas imagens */}
            <div className="block md:hidden mt-8 pt-8 border-t border-slate-700/50">
              <p className="text-xs text-emerald-400 font-extrabold uppercase tracking-widest text-center mb-4 flex items-center justify-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                Visualização do Material
              </p>
              
              <div className="relative w-full max-w-xs mx-auto aspect-[1/1.45] rounded-2xl overflow-hidden border border-slate-700 shadow-2xl bg-slate-900/60 animate-soft-pulse">
                <div 
                  className="flex w-full h-full transition-transform duration-700 ease-in-out" 
                  style={{ transform: `translateX(-${activeMobileSlide * 100}%)` }}
                >
                  {/* Slide 1 */}
                  <div className="w-full h-full flex-shrink-0">
                    <img 
                      src="https://i.ibb.co/CsYCtKxz/Gemini-Generated-Image-z4nx8jz4nx8jz4nx.webp" 
                      alt="Material Protocolo FAROL 1" 
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Slide 2 */}
                  <div className="w-full h-full flex-shrink-0">
                    <img 
                      src="https://i.ibb.co/SzrXRjs/34271d9c-8698-4224-ab77-18abbfca6d9b.webp" 
                      alt="Material Protocolo FAROL 2" 
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                {/* Dots indicator */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
                  {[0, 1].map((idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveMobileSlide(idx)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${activeMobileSlide === idx ? 'bg-emerald-400 w-4' : 'bg-white/30 hover:bg-white/50'}`}
                    />
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* BENEFÍCIOS */}
      <section className="py-20 md:py-28 max-w-4xl mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="font-display font-extrabold text-2xl md:text-4xl text-farol-navy mb-3">
            Com o Protocolo FAROL™, você consegue:
          </h2>
          <div className="w-12 h-1 bg-emerald-500 mx-auto rounded-full"></div>
        </div>

        <div className="bg-white border border-slate-200/60 rounded-3xl p-6 md:p-10 shadow-sm space-y-6">
          {[
            "Observar seus alunos com mais clareza no cotidiano escolar.",
            "Registrar informações importantes de cada criança com objetividade.",
            "Acompanhar a evolução dos marcos de desenvolvimento durante todo o ano letivo.",
            "Organizar seus registros pedagógicos em modelos fáceis de consultar.",
            "Ter mais segurança e autoridade profissional nas conversas com os responsáveis."
          ].map((benefit, idx) => (
            <div key={idx} className="flex gap-4 items-start">
              <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
              <p className="text-slate-700 text-base md:text-lg leading-relaxed font-semibold">
                {benefit}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ENTREGÁVEIS */}
      <section className="py-20 md:py-28 bg-white border-t border-slate-200/60">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="font-display font-extrabold text-2xl md:text-4xl text-farol-navy">
              Tudo o que você encontra na Plataforma Protocolo FAROL™
            </h2>
            <p className="text-slate-600 text-sm md:text-base">
              Após a compra, você recebe acesso imediato à Plataforma Protocolo FAROL™, onde todos os materiais ficam organizados para consultar, baixar e imprimir sempre que precisar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Guide */}
            <div className="bg-farol-cream border border-slate-200/60 rounded-2xl p-6 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-5">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-farol-navy mb-2">Guia do Protocolo FAROL™</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                O guia completo do método FAROL™, disponível na plataforma para consultar sempre que precisar.
              </p>
            </div>

            {/* Checklist */}
            <div className="bg-farol-cream border border-slate-200/60 rounded-2xl p-6 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-5">
                <ClipboardList className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-farol-navy mb-2">Checklist de Desenvolvimento Infantil</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Checklist digital organizado por faixas etárias e áreas do desenvolvimento, pronto para consultar, baixar e imprimir.
              </p>
              <div className="flex flex-wrap gap-1.5">
                {['Comunicação', 'Socialização', 'Autonomia', 'Cognição', 'Psicomotricidade'].map((area, idx) => (
                  <span key={idx} className="bg-white px-2.5 py-1 rounded-md text-xs font-semibold text-slate-700 border border-slate-200/50">
                    {area}
                  </span>
                ))}
              </div>
            </div>

            {/* Ficha */}
            <div className="bg-farol-cream border border-slate-200/60 rounded-2xl p-6 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-5">
                <User className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-farol-navy mb-2">Ficha Individual da Criança</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Modelo digital pronto para preencher, baixar e imprimir para cada aluno.
              </p>
            </div>

            {/* Evolution */}
            <div className="bg-farol-cream border border-slate-200/60 rounded-2xl p-6 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-5">
                <LineChart className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-farol-navy mb-2">Registro de Evolução</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Modelo de acompanhamento da evolução da criança durante o ano letivo, disponível para download e impressão.
              </p>
            </div>

            {/* Script Meeting */}
            <div className="bg-farol-cream border border-slate-200/60 rounded-2xl p-6 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-5">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-farol-navy mb-2">Roteiro de Conversa com Responsáveis</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Guia prático para conduzir reuniões com responsáveis de forma mais organizada e segura.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* BÔNUS SEÇÃO */}
      <section className="bg-farol-soft py-20 md:py-28 border-b border-slate-200/60">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-widest font-extrabold text-amber-600 bg-amber-100/50 border border-amber-200/60 px-3.5 py-1.5 rounded-full inline-block">
              Exclusivo do Plano Completo
            </span>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-farol-navy">
              No plano completo você ainda recebe:
            </h2>
            <p className="text-slate-600 text-base">
              Estes dois materiais de apoio complementares de alto valor pedagógico:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Bonus 1 */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200/60 shadow-sm flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center">
                  <FileCheck className="w-6 h-6" />
                </div>
                
                {/* Visual Mockup for Bonus 1 */}
                <div className="relative w-full rounded-2xl border border-amber-200/50 overflow-hidden my-4 bg-slate-50 shadow-[0_0_25px_rgba(245,158,11,0.18)] flex items-center justify-center">
                  {/* Golden glowing pulse backgrounds */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-amber-400/20 rounded-full blur-3xl pointer-events-none animate-glow-pulse"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-amber-300/15 rounded-full blur-2xl pointer-events-none animate-pulse"></div>
                  <img 
                    src="https://i.ibb.co/20D85TsW/watermarked-img-3210390099611778018.webp" 
                    alt="Kit de Pareceres" 
                    className="relative z-10 w-full h-auto object-contain block" 
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                    draggable="false"
                  />
                </div>

                <h3 className="font-display font-bold text-lg text-farol-navy">
                  Kit de Pareceres Descritivos da Educação Infantil
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Modelos de textos estruturados e sugestões profissionais prontas para facilitar seus registros e a montagem de relatórios pedagógicos periódicos.
                </p>
              </div>
              <div className="pt-6">
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full uppercase">
                  ✓ Incluído Grátis
                </span>
              </div>
            </div>

            {/* Bonus 2 */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200/60 shadow-sm flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center">
                  <Activity className="w-6 h-6" />
                </div>
                
                {/* Visual Mockup for Bonus 2 */}
                <div className="relative w-full rounded-2xl border border-amber-200/50 overflow-hidden my-4 bg-slate-50 shadow-[0_0_25px_rgba(245,158,11,0.18)] flex items-center justify-center">
                  {/* Golden glowing pulse backgrounds */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-amber-400/20 rounded-full blur-3xl pointer-events-none animate-glow-pulse"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-amber-300/15 rounded-full blur-2xl pointer-events-none animate-pulse"></div>
                  <img 
                    src="https://i.ibb.co/PGmByRXs/Gemini-Generated-Image-n9jepxn9jepxn9je-11zon.webp" 
                    alt="Banco de Atividades de Psicomotricidade" 
                    className="relative z-10 w-full h-auto object-contain block" 
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                    draggable="false"
                  />
                </div>

                <h3 className="font-display font-bold text-lg text-farol-navy">
                  Banco de Atividades de Psicomotricidade
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Atividades práticas e dinâmicas prontas para aplicar em sala de aula ou pátio para estimular:
                </p>
                <div className="grid grid-cols-2 gap-2 pt-2 text-xs font-semibold text-slate-700">
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Coord. Motora Fina</span>
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Coord. Motora Ampla</span>
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Equilíbrio Corporal</span>
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Percepção Corporal</span>
                </div>
              </div>
              <div className="pt-6">
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full uppercase">
                  ✓ Incluído Grátis
                </span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* TRANSFORMAÇÃO */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          
          <div className="text-center mb-16">
            <h2 className="font-display font-extrabold text-2xl md:text-4xl text-farol-navy">
              Antes vs Depois do FAROL™
            </h2>
            <div className="w-12 h-1 bg-emerald-500 mx-auto rounded-full mt-3"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Antes */}
            <div className="bg-red-50/20 border border-red-200 rounded-3xl p-6 md:p-8 space-y-5">
              <h3 className="font-display font-extrabold text-xl text-red-700 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Antes do FAROL™
              </h3>
              <ul className="space-y-3">
                <li className="flex gap-2 items-start text-sm text-slate-700">
                  <span className="text-red-500 font-bold">•</span>
                  <span>Observações espalhadas e difíceis de organizar de forma consistente.</span>
                </li>
                <li className="flex gap-2 items-start text-sm text-slate-700">
                  <span className="text-red-500 font-bold">•</span>
                  <span>Muito tempo gasto criando registros pedagógicos complexos do absoluto zero.</span>
                </li>
                <li className="flex gap-2 items-start text-sm text-slate-700">
                  <span className="text-red-500 font-bold">•</span>
                  <span>Insegurança sobre quais marcos de desenvolvimento realmente acompanhar e cobrar.</span>
                </li>
              </ul>
            </div>

            {/* Depois */}
            <div className="bg-emerald-50/20 border border-emerald-200 rounded-3xl p-6 md:p-8 space-y-5">
              <h3 className="font-display font-extrabold text-xl text-emerald-700 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Depois do FAROL™
              </h3>
              <ul className="space-y-3">
                <li className="flex gap-2 items-start text-sm text-slate-700">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Um caminho claro, lógico e visual para acompanhar o desenvolvimento de cada criança.</span>
                </li>
                <li className="flex gap-2 items-start text-sm text-slate-700">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Registros pedagógicos perfeitamente organizados e padronizados durante todo o ano letivo.</span>
                </li>
                <li className="flex gap-2 items-start text-sm text-slate-700">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Mais confiança, autoridade e embasamento profissional nas conversas com famílias.</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* SEÇÃO CARROSSEL DE DEPOIMENTOS/QUEM JÁ ACOMPANHA */}
      <section className="py-20 md:py-28 bg-farol-soft border-t border-slate-200/50">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs uppercase tracking-widest font-extrabold text-emerald-600 bg-emerald-100/55 border border-emerald-200 px-3.5 py-1.5 rounded-full inline-block">
              Comunidade FAROL
            </span>
            <h2 className="font-display font-extrabold text-2xl md:text-4xl text-farol-navy leading-snug">
              Quem já acompanha pelo Protocolo FAROL™
            </h2>
            <div className="w-16 h-1 bg-emerald-500 mx-auto rounded-full"></div>
            <p className="text-slate-600 text-sm md:text-base">
              Professoras que passaram a registrar e acompanhar o desenvolvimento com mais segurança.
            </p>
          </div>

          {/* Testimonial Carousel */}
          <div className="relative max-w-4xl mx-auto">
            {/* Carousel Container */}
            <div 
              className="overflow-hidden rounded-3xl border border-slate-200/60 bg-white shadow-lg select-none cursor-grab active:cursor-grabbing touch-pan-y"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <div 
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${activeTestimonialSlide * 100}%)` }}
              >
                {/* Image 1 */}
                <div className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-12 items-center">
                  <div className="md:col-span-7 aspect-[4/3] md:aspect-auto md:h-[400px] overflow-hidden bg-slate-100">
                    <img 
                      src="https://i.ibb.co/9m1nfdp5/images.jpg" 
                      alt="Núcleo Regional de Educação de Cascavel com o Protocolo FAROL" 
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                      draggable="false"
                    />
                  </div>
                  <div className="md:col-span-5 p-6 md:p-8 space-y-4">
                    <div className="flex gap-1 text-amber-400 community-stars">
                      {'★'.repeat(5).split('').map((char, i) => (
                        <span key={i} className="text-lg community-star">★</span>
                      ))}
                    </div>
                    <blockquote className="text-slate-600 text-sm md:text-base italic leading-relaxed">
                      "O acompanhamento do desenvolvimento infantil e a inclusão escolar ganharam um norte seguro com o Protocolo FAROL™. Ele permite que nossas professoras registrem de forma precisa cada evolução, garantindo um acompanhamento pedagógico de excelência."
                    </blockquote>
                    <div className="space-y-3">
                      <div>
                        <cite className="not-italic font-display font-bold text-slate-800 text-sm block">Núcleo Regional de Educação de Cascavel</cite>
                        <span className="text-xs text-slate-600">Instituição de Ensino / PR</span>
                      </div>
                      
                      <button
                        onClick={() => setIsG1ModalOpen(true)}
                        className="inline-flex items-center gap-2 text-xs font-bold text-red-600 hover:text-red-700 transition-colors cursor-pointer bg-red-50 hover:bg-red-100/80 px-3 py-1.5 rounded-full border border-red-200/50"
                      >
                        <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
                        Ver Reportagem no G1
                      </button>
                    </div>
                  </div>
                </div>

                {/* Image 2 */}
                <div className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-12 items-center">
                  <div className="md:col-span-7 aspect-[4/3] md:aspect-auto md:h-[400px] overflow-hidden bg-slate-100">
                    <img 
                      src="https://i.ibb.co/jk4FtMVq/837a4412-a611-4b20-abb7-7650c57e6233.jpg" 
                      alt="Cláudia Regina utilizando o material do Protocolo" 
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                      draggable="false"
                    />
                  </div>
                  <div className="md:col-span-5 p-6 md:p-8 space-y-4">
                    <div className="flex gap-1 text-amber-400 community-stars">
                      {'★'.repeat(5).split('').map((char, i) => (
                        <span key={i} className="text-lg community-star">★</span>
                      ))}
                    </div>
                    <blockquote className="text-slate-600 text-sm md:text-base italic leading-relaxed">
                      "As conversas com as famílias dos alunos se tornaram muito mais profissionais. Apresentar os avanços das crianças usando a ficha individual passa muita credibilidade e autoridade pedagógica."
                    </blockquote>
                    <div>
                      <cite className="not-italic font-display font-bold text-slate-800 text-sm block">Cláudia Regina</cite>
                      <span className="text-xs text-slate-600">Coordenadora Pedagógica</span>
                    </div>
                  </div>
                </div>

                {/* Image 3 */}
                <div className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-12 items-center">
                  <div className="md:col-span-7 aspect-[4/3] md:aspect-auto md:h-[400px] overflow-hidden bg-slate-100">
                    <img 
                      src="https://i.ibb.co/8n0sQpQ5/watermarked-img-17021003520081533906.jpg" 
                      alt="Patrícia Mendes utilizando o material do Protocolo" 
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                      draggable="false"
                    />
                  </div>
                  <div className="md:col-span-5 p-6 md:p-8 space-y-4">
                    <div className="flex gap-1 text-amber-400 community-stars">
                      {'★'.repeat(5).split('').map((char, i) => (
                        <span key={i} className="text-lg community-star">★</span>
                      ))}
                    </div>
                    <blockquote className="text-slate-600 text-sm md:text-base italic leading-relaxed">
                      "Com o checklist em mãos, eu sei exatamente o que observar a cada semana. Não perco mais tempo tentando lembrar dos acontecimentos no final do semestre para formular o relatório."
                    </blockquote>
                    <div>
                      <cite className="not-italic font-display font-bold text-slate-800 text-sm block">Patrícia Mendes</cite>
                      <span className="text-xs text-slate-600">Professora de Creche (Berçário II)</span>
                    </div>
                  </div>
                </div>

                {/* Image 4 */}
                <div className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-12 items-center">
                  <div className="md:col-span-7 aspect-[4/3] md:aspect-auto md:h-[400px] overflow-hidden bg-slate-100">
                    <img 
                      src="https://i.ibb.co/1fwWLy7j/54902958827-6f1142ec18-k.jpg" 
                      alt="Renata Alencar utilizando o material do Protocolo" 
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                      draggable="false"
                    />
                  </div>
                  <div className="md:col-span-5 p-6 md:p-8 space-y-4">
                    <div className="flex gap-1 text-amber-400 community-stars">
                      {'★'.repeat(5).split('').map((char, i) => (
                        <span key={i} className="text-lg community-star">★</span>
                      ))}
                    </div>
                    <blockquote className="text-slate-600 text-sm md:text-base italic leading-relaxed">
                      "As crianças se desenvolvem visivelmente mais quando temos um planejamento estruturado. O Banco de Atividades de Psicomotricidade é excelente para integrar ao planejamento diário!"
                    </blockquote>
                    <div>
                      <cite className="not-italic font-display font-bold text-slate-800 text-sm block">Renata Alencar</cite>
                      <span className="text-xs text-slate-600">Pedagoga e Especialista em Psicomotricidade</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Carousel Indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {[0, 1, 2, 3].map((idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTestimonialSlide(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${activeTestimonialSlide === idx ? 'bg-emerald-500 w-6' : 'bg-slate-300 hover:bg-slate-400'}`}
                />
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* SEÇÃO DE PLANOS */}
      <section id="plans" className="py-20 md:py-28 bg-white border-y border-slate-200/60">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="font-display font-extrabold text-2xl md:text-4xl text-farol-navy">
              Escolha o protocolo ideal para sua rotina
            </h2>
            <p className="text-slate-600 text-base">
              Selecione o plano ideal para você começar a preencher e organizar os registros da sua turma hoje mesmo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
            
            {/* PLANO INICIAL */}
            <div className="bg-farol-cream border-2 border-emerald-500 rounded-3xl p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-all">
              <div className="space-y-6">
                <div>
                  <h3 className="font-display font-extrabold text-xl text-farol-navy">FAROL Inicial</h3>
                  <p className="text-sm text-slate-700 mt-1 font-medium">
                    Para começar a organizar o acompanhamento dos seus alunos na Educação Infantil.
                  </p>
                </div>

                {/* Mockup do Kit Inicial */}
                <div className="relative w-full aspect-[2.1] bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden flex items-center justify-center p-2 my-2">
                  <img 
                    src="https://i.ibb.co/0VVRGHrb/7df446e8-1c7f-4b37-9c7c-d1661ebf58c3.jpg" 
                    alt="Mockup FAROL Inicial" 
                    className="w-full h-full object-contain" 
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                    draggable="false"
                  />
                </div>

                <div className="py-4 border-y border-slate-200/60 space-y-1">
                  <span className="text-xs text-slate-500 line-through block font-medium">de R$ 97</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-slate-700">R$</span>
                    <span className="text-5xl font-black text-farol-navy">19,90</span>
                  </div>
                  <span className="text-xs text-slate-700 block font-semibold">Pagamento único. Acesso imediato no e-mail.</span>
                </div>

                <div className="space-y-3">
                  <p className="font-bold text-xs text-slate-700 uppercase tracking-wider">Inclui:</p>
                  <ul className="space-y-2.5">
                    <li className="flex items-start gap-2 text-sm text-slate-600">
                      <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5 stroke-[3]" />
                      <span>Protocolo FAROL™</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-slate-600">
                      <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5 stroke-[3]" />
                      <span>Checklist de Desenvolvimento Infantil</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-slate-600">
                      <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5 stroke-[3]" />
                      <span>Ficha Individual da Criança</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-slate-600">
                      <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5 stroke-[3]" />
                      <span>Registro de Evolução</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="pt-8">
                <button 
                  onClick={handleSelectInicialPlan}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl text-sm transition-all shadow active:scale-[0.98] cursor-pointer animate-cta-pulse"
                >
                  Quero o FAROL Inicial
                </button>
              </div>
            </div>

            {/* PLANO COMPLETO (Fundo Azul Premium para Máximo Destaque) */}
            <div className="bg-gradient-to-br from-[#0c1a30] to-[#162e58] border-2 border-emerald-400 rounded-3xl p-8 flex flex-col justify-between shadow-2xl relative scale-100 md:scale-[1.03] hover:shadow-emerald-500/10 transition-all text-white">
              <div className="absolute top-0 right-6 -translate-y-1/2 bg-emerald-400 text-slate-950 font-display font-black text-xs uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md animate-pulse">
                RECOMENDADO
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-display font-extrabold text-xl text-white flex items-center gap-1.5">
                    FAROL Completo
                  </h3>
                  <p className="text-sm text-slate-200 mt-1 font-medium">
                    O pacote completo com todos os bônus e modelos adicionais para facilitar a sua rotina diária.
                  </p>
                </div>

                {/* Mockup do Kit Completo Sem Card com Fundo Brilhante Pulsante */}
                <div className="relative w-full flex items-center justify-center my-4">
                  {/* Fundo Brilhante Pulsando */}
                  <div className="absolute inset-x-8 inset-y-4 rounded-full bg-emerald-400/25 blur-2xl animate-glow-pulse pointer-events-none"></div>
                  
                  <img 
                    src="https://i.ibb.co/GfBQD1G1/Whats-App-Image-2026-07-14-at-17-17-05-11zon.webp" 
                    alt="Mockup FAROL Completo" 
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                    className="relative z-10 w-full h-auto rounded-2xl border-2 border-emerald-400/30 shadow-xl animate-soft-pulse" 
                  />
                </div>

                <div className="py-4 border-y border-slate-800 space-y-1">
                  <span className="text-xs text-slate-300 line-through block font-medium">de R$ 297</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-emerald-400">R$</span>
                    <span className="text-5xl font-black text-emerald-400 price-pulse-emerald inline-block">37,90</span>
                  </div>
                  <span className="text-xs text-emerald-400 font-bold block">Acesso vitalício · Economize R$ 268 em Bônus</span>
                </div>

                <div className="space-y-3">
                  <p className="font-extrabold text-xs text-slate-200 uppercase tracking-wider">Tudo do Inicial + Bônus:</p>
                  <ul className="space-y-2.5">
                    <li className="flex items-start gap-2 text-sm text-premium-green">
                      <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5 stroke-[3]" />
                      <span>Protocolo FAROL™ + Checklist</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-premium-green">
                      <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5 stroke-[3]" />
                      <span>Ficha Individual + Registro de Evolução</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-premium-gold">
                      <Check className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5 stroke-[3]" />
                      <span>Bônus: Kit de Pareceres Descritivos</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-premium-gold">
                      <Check className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5 stroke-[3]" />
                      <span>Bônus: Banco de Atividades Psicomotoras</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-premium-gold">
                      <Check className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5 stroke-[3]" />
                      <span>Bônus: Roteiro de Reunião com Famílias</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="pt-8">
                <a 
                  href={appendUtms("https://pay.wiapy.com/reyx-NibShoc")}
                  className="w-full block text-center bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black py-4 rounded-xl text-sm transition-all shadow-lg shadow-emerald-400/20 active:scale-[0.98] cursor-pointer animate-cta-pulse"
                >
                  Quero o FAROL Completo
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ESPECIALISTA */}
      <section className="py-20 md:py-28 bg-farol-soft border-t border-slate-200/50">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <div className="bg-white rounded-3xl border border-slate-200/60 p-8 md:p-12 shadow-sm">
            <div className="flex flex-col md:flex-row items-center gap-8">
              
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-tr from-[#0a1931] to-[#15305b] border-4 border-emerald-500 overflow-hidden flex items-center justify-center relative shadow-xl">
                  <img 
                    src="https://i.ibb.co/JwBYc7c7/autora.webp" 
                    alt="Roseli Ribeiro" 
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover" 
                  />
                </div>
                <p className="mt-4 font-display font-extrabold text-slate-800 text-base">Roseli Ribeiro</p>
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mt-0.5">Pedagoga & Especialista</span>
              </div>

              <div className="space-y-4">
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider inline-block">
                  A Especialista
                </span>
                <h2 className="font-display font-extrabold text-2xl md:text-3xl text-farol-navy">
                  Conheça Roseli Ribeiro
                </h2>
                <p className="text-slate-700 font-semibold text-sm">
                  Pedagoga e especialista com mais de 15 anos de atuação prática na Educação Infantil.
                </p>
                <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                  Roseli Ribeiro desenvolveu o Protocolo FAROL™ com o objetivo de ajudar professoras da Educação Infantil a terem um processo mais simples, claro e organizado para observar, registrar e acompanhar o desenvolvimento das crianças no ambiente escolar.
                </p>

                {/* Stats row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                  <div className="bg-trust-green rounded-2xl p-5 shadow-md flex flex-col justify-center space-y-1 transform hover:scale-[1.02] transition-all duration-300">
                    <span className="block font-display font-black text-2xl md:text-3xl text-white">+15 Anos</span>
                    <span className="block text-xs md:text-sm text-emerald-100 font-bold leading-tight">De experiência dedicada à Educação Infantil</span>
                  </div>
                  <div className="bg-trust-green rounded-2xl p-5 shadow-md flex flex-col justify-center space-y-1 transform hover:scale-[1.02] transition-all duration-300">
                    <span className="block font-display font-black text-2xl md:text-3xl text-white">+1.200</span>
                    <span className="block text-xs md:text-sm text-emerald-100 font-bold leading-tight">Professoras e escolas utilizando o Protocolo</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* GARANTIA */}
      <section className="py-16 md:py-24 bg-farol-cream border-b border-slate-200/50">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <div className="bg-white border border-slate-200/60 rounded-3xl p-8 md:p-12 text-center shadow-sm max-w-2xl mx-auto space-y-6">
            
            <img 
              src="https://i.ibb.co/d0FBFT12/7dias.webp" 
              alt="Selo de 7 Dias de Garantia" 
              referrerPolicy="no-referrer"
              loading="lazy"
              decoding="async"
              className="w-28 h-28 object-contain mx-auto mb-2" 
            />

            <h2 className="font-display font-extrabold text-2xl md:text-3xl text-farol-navy">
              Garantia de 7 dias
            </h2>

            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              Conheça o Protocolo FAROL™ e veja como ele pode ajudar a estruturar e facilitar a sua rotina escolar.
            </p>

            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              Se o material não fizer sentido para a sua rotina, basta solicitar o reembolso por e-mail dentro do prazo de garantia de 7 dias. Devolvemos 100% do seu investimento sem qualquer burocracia.
            </p>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-center gap-6 text-xs text-slate-700 font-semibold">
              <span className="flex items-center gap-1.5"><Lock className="w-4 h-4 text-emerald-500" /> Compra Segura</span>
              <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-emerald-500" /> Garantia Total</span>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          
          <div className="text-center mb-12">
            <h2 className="font-display font-extrabold text-2xl md:text-4xl text-farol-navy">
              Perguntas frequentes
            </h2>
            <p className="text-slate-700 text-sm mt-2 font-medium">
              Se você tem qualquer dúvida, nós temos as respostas:
            </p>
          </div>

          <div className="space-y-3">
            {faqItems.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="border border-slate-200/60 rounded-2xl overflow-hidden bg-farol-cream/30">
                  <button 
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between px-6 py-4.5 text-left hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <span className="font-bold text-farol-navy text-sm md:text-base pr-4">
                      {item.q}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-slate-400 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-white">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-farol-navy text-slate-200 py-12 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center space-y-6">
          
          <p className="text-white font-extrabold text-lg tracking-wide">
            Protocolo FAROL™
          </p>
          
          <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
            Acompanhamento, desenvolvimento e registros pedagógicos práticos e profissionais na Educação Infantil.
          </p>

          <p className="text-xs text-slate-400 font-medium">
            suporte@protocolofarol.com.br
          </p>

          {/* Compliance Links required by Facebook / Google Ads */}
          <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-xs text-slate-400 pt-2 font-medium">
            <button 
              onClick={() => setIsPrivacyOpen(true)} 
              className="hover:text-emerald-400 transition-colors cursor-pointer"
            >
              Política de Privacidade
            </button>
            <span className="text-slate-800 hidden sm:inline">|</span>
            <button 
              onClick={() => setIsTermsOpen(true)} 
              className="hover:text-emerald-400 transition-colors cursor-pointer"
            >
              Termos de Uso
            </button>
            <span className="text-slate-800 hidden sm:inline">|</span>
            <a 
              href="mailto:suporte@protocolofarol.com.br" 
              className="hover:text-emerald-400 transition-colors"
            >
              Suporte Técnico
            </a>
          </div>

          <div className="border-t border-slate-800/80 pt-6 text-[11px] text-slate-400 leading-relaxed space-y-4">
            <p>
              Material de apoio profissional digital. Os resultados e utilidades variam conforme a aplicação de cada professor na respectiva turma escolar.
            </p>
            <p>
              © {new Date().getFullYear()} Protocolo FAROL™. Todos os direitos reservados.
            </p>
          </div>

          {/* Facebook Ads Platform Disclaimer */}
          <div className="text-[10px] text-slate-500 max-w-2xl mx-auto leading-relaxed pt-4 border-t border-slate-800/50">
            <p>
              Este site não faz parte do site do Facebook ou do Facebook Inc. Além disso, este site NÃO é endossado pelo Facebook de nenhuma maneira. FACEBOOK é uma marca comercial da FACEBOOK, Inc.
            </p>
          </div>

        </div>
      </footer>


      {/* ========================================================
          1) POPUP APÓS CLIQUE NO PLANO INICIAL (UPGRADE OFFER)
          ======================================================== */}
      {isInitialUpgradeOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-2xl md:rounded-3xl max-w-md w-full shadow-2xl overflow-hidden border border-slate-100 animate-in fade-in-50 zoom-in-95 duration-200 max-h-[92vh] flex flex-col">
            
            {/* Header */}
            <div className="bg-amber-500/10 p-4 md:p-5 border-b border-slate-100 text-center relative flex-shrink-0">
              <span className="bg-amber-600 text-white text-[9px] md:text-[10px] uppercase font-black px-2.5 py-0.5 md:py-1 rounded-full inline-block mb-1.5 md:mb-2 animate-pulse">
                Oportunidade única
              </span>
              <h3 className="font-display font-black text-base md:text-xl text-farol-navy leading-tight text-balance">
                Espere! Você pode levar o Protocolo FAROL™ completo por uma condição especial.
              </h3>
            </div>
 
            {/* Body */}
            <div className="p-4 md:p-6 overflow-y-auto space-y-4 md:space-y-5">
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed text-center">
                Além dos materiais essenciais, você recebe os bônus que ajudam no dia a dia da sala de aula.
              </p>

              {/* Mockup do Kit Completo */}
              <div className="relative w-full my-2 flex items-center justify-center">
                <img 
                  src="https://i.ibb.co/GfBQD1G1/Whats-App-Image-2026-07-14-at-17-17-05-11zon.webp" 
                  alt="Mockup FAROL Completo" 
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto rounded-2xl border border-slate-300 shadow-md animate-soft-pulse" 
                />
              </div>
 
              {/* Checklist */}
              <ul className="space-y-2 bg-farol-cream/50 p-3 md:p-4 rounded-xl md:rounded-2xl border border-slate-200/50 text-xs md:text-sm">
                <li className="flex items-start gap-2 md:gap-2.5 text-slate-700">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5 stroke-[3]" />
                  <span>Kit de Pareceres Descritivos da Educação Infantil</span>
                </li>
                <li className="flex items-start gap-2 md:gap-2.5 text-slate-700">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5 stroke-[3]" />
                  <span>Banco de Atividades de Psicomotricidade</span>
                </li>
                <li className="flex items-start gap-2 md:gap-2.5 text-slate-700">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5 stroke-[3]" />
                  <span>Roteiro de Conversa com Responsáveis</span>
                </li>
                <li className="flex items-start gap-2 md:gap-2.5 text-slate-700">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5 stroke-[3]" />
                  <span className="font-semibold text-farol-navy">Todos os materiais editáveis em Word</span>
                </li>
              </ul>
 
              {/* Special Offer Pricing */}
              <div className="text-center bg-amber-50 p-2.5 md:p-3.5 rounded-xl border border-amber-100 space-y-0.5">
                <span className="text-[10px] md:text-xs text-slate-400 line-through">De R$37,90 por apenas</span>
                <div className="text-2xl md:text-3xl font-black text-farol-navy">R$ 25,90 <span className="text-[10px] md:text-xs text-amber-700 font-extrabold uppercase">hoje</span></div>
              </div>
 
              {/* Actions */}
              <div className="space-y-2">
                <a 
                  href={appendUtms("https://pay.wiapy.com/HPjNOxj6PDr3")}
                  className="w-full block text-center bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-3 md:py-4 rounded-xl text-xs md:text-base shadow-lg shadow-emerald-500/15 transition-all active:scale-[0.98] cursor-pointer"
                >
                  Quero o FAROL Completo
                </a>
                <button 
                  onClick={handleDeclineUpgrade}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-500 font-bold py-2 md:py-3 rounded-xl text-[10px] md:text-xs transition-all cursor-pointer"
                >
                  Não quero os bônus, prefiro o Plano Básico de R$ 19,90
                </button>
              </div>
 
            </div>
 
          </div>
        </div>
      )}


      {/* ========================================================
          1B) REGASTE DO PLANO BÁSICO PARA O COMPLETO (R$ 19,90)
          ======================================================== */}
      {isBasicRescueOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4">
          <div className="bg-[#0c1a30] rounded-2xl md:rounded-3xl max-w-md w-full shadow-2xl overflow-hidden border-2 border-emerald-400 animate-in fade-in-50 zoom-in-95 duration-200 max-h-[95vh] flex flex-col text-white">
            
            {/* Header */}
            <div className="bg-emerald-500/10 p-5 border-b border-slate-800/60 text-center relative flex-shrink-0">
              <span className="bg-emerald-500 text-slate-950 text-[10px] md:text-xs uppercase font-black px-3 py-1 rounded-full inline-block mb-2 animate-pulse">
                Oferta Especial
              </span>
              <h3 className="font-display font-black text-lg md:text-xl text-white leading-tight">
                Leve o FAROL Completo pelo preço do Plano Inicial!
              </h3>
            </div>
 
            {/* Body */}
            <div className="p-5 overflow-y-auto space-y-4">
              <p className="text-xs md:text-sm text-slate-200 leading-relaxed text-center font-medium">
                Aproveite esta condição exclusiva e receba todos os bônus por apenas R$ 19,90.
              </p>

              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-2 text-xs md:text-sm">
                <p className="font-bold text-emerald-400 text-center uppercase tracking-wider mb-2 text-xs">Você recebe:</p>
                <ul className="space-y-2.5 text-slate-200">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5 stroke-[3]" />
                    <span className="font-medium text-slate-100">Kit de Pareceres Descritivos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5 stroke-[3]" />
                    <span className="font-medium text-slate-100">Banco de Atividades de Psicomotricidade</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5 stroke-[3]" />
                    <span className="font-medium text-slate-100">Roteiro de Conversa com Responsáveis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5 stroke-[3]" />
                    <span className="font-medium text-slate-100">Arquivos em Word e PDF</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5 stroke-[3]" />
                    <span className="font-medium text-slate-100">Acesso vitalício</span>
                  </li>
                </ul>
              </div>

              {/* Special Offer Pricing */}
              <div className="text-center bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20 space-y-0.5">
                <span className="text-xs text-slate-400 line-through">De R$ 37,90 por apenas</span>
                <div className="text-2xl md:text-3xl font-black text-emerald-400">
                  R$ 19,90
                </div>
              </div>
 
              {/* Actions */}
              <div className="space-y-2">
                <a 
                  href={appendUtms("https://pay.wiapy.com/L8Ba5XUywWt3")}
                  className="w-full block text-center bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black py-3.5 rounded-xl text-sm md:text-base shadow-lg shadow-emerald-400/20 transition-all active:scale-[0.98] cursor-pointer animate-cta-pulse"
                >
                  Sim! Quero o FAROL Completo por R$ 19,90
                </a>
                <a 
                  href={appendUtms("https://pay.wiapy.com/L8Ba5XUywWt3")} // Redirect to basic plan as requested/simulated (which is the complete at discount R$ 19,90 anyway!)
                  className="w-full block text-center bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-2 rounded-xl text-xs transition-all cursor-pointer"
                >
                  Não, vou continuar com o Plano Inicial
                </a>
              </div>
 
            </div>
 
          </div>
        </div>
      )}


      {/* ========================================================
          2) EXIT POPUP 1
          ======================================================== */}
      {isExitPopup1Open && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-2xl md:rounded-3xl max-w-sm w-full shadow-2xl overflow-hidden border border-slate-100 animate-in fade-in-50 zoom-in-95 duration-200 max-h-[92vh] flex flex-col">
            
            {/* Minimal Header */}
            <div className="p-4 md:p-5 border-b border-slate-100 text-center bg-emerald-500/10 flex-shrink-0">
              <span className="bg-red-500 text-white text-[9px] uppercase font-black px-2.5 py-0.5 rounded-full inline-block mb-1.5 animate-pulse">
                Não vá embora ainda!
              </span>
              <h3 className="font-display font-black text-base md:text-lg text-farol-navy leading-snug">
                Antes de sair...
              </h3>
              <p className="text-xs text-slate-500 mt-1 font-semibold">
                Você ainda pode organizar sua rotina pedagógica com o Protocolo FAROL™.
              </p>
            </div>

            {/* Body */}
            <div className="p-4 md:p-5 overflow-y-auto space-y-4">
              <p className="text-xs text-slate-600 text-center leading-relaxed">
                Leve agora o plano completo com todos os bônus por uma condition especial.
              </p>

              {/* Mockup do Kit Completo */}
              <div className="relative w-full my-1 flex items-center justify-center">
                <img 
                  src="https://i.ibb.co/GfBQD1G1/Whats-App-Image-2026-07-14-at-17-17-05-11zon.webp" 
                  alt="Mockup FAROL Completo" 
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto rounded-xl border border-slate-300 shadow-md animate-soft-pulse" 
                />
              </div>

              {/* Checklist */}
              <ul className="space-y-1.5 text-xs text-slate-700 bg-farol-cream p-3 rounded-xl border border-slate-200/50">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 stroke-[3]" />
                  <span>Checklist de Desenvolvimento Infantil</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 stroke-[3]" />
                  <span>Fichas de acompanhamento</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 stroke-[3]" />
                  <span>Modelos de pareceres</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 stroke-[3]" />
                  <span>Atividades de psicomotricidade</span>
                </li>
              </ul>

              {/* Offer */}
              <div className="text-center py-2 border-y border-slate-100">
                <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wide">FAROL Completo</span>
                <span className="text-[10px] text-slate-400 block">Hoje por apenas:</span>
                <span className="text-2xl font-black text-farol-navy">R$ 25,90</span>
              </div>

              {/* Buttons */}
              <div className="space-y-2 pt-1">
                <a 
                  href={appendUtms("https://pay.wiapy.com/HPjNOxj6PDr3")}
                  className="w-full block text-center bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-3 rounded-xl text-xs shadow-md transition-all active:scale-[0.98] cursor-pointer animate-cta-pulse"
                >
                  Quero aproveitar essa condição
                </a>
                <button 
                  onClick={handleDeclineExitPopup1}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-500 font-bold py-2 rounded-xl text-[10px] transition-all cursor-pointer"
                >
                  Não, vou perder essa oportunidade
                </button>
              </div>

            </div>

          </div>
        </div>
      )}


      {/* ========================================================
          3) EXIT POPUP 2 (SUBSEQUENT RESCUE)
          ======================================================== */}
      {isExitPopup2Open && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4">
          <div className="bg-amber-50 rounded-2xl md:rounded-3xl max-w-sm w-full shadow-2xl overflow-hidden border-2 border-amber-400 animate-in fade-in-50 zoom-in-95 duration-200 max-h-[92vh] flex flex-col">
            
            {/* Header */}
            <div className="p-4 md:p-5 border-b border-amber-200 text-center bg-amber-500/15 flex-shrink-0">
              <span className="bg-amber-600 text-white text-[10px] uppercase font-black px-3 py-1 rounded-full inline-block mb-1.5 animate-pulse">
                Menor preço possível
              </span>
              <h3 className="font-display font-black text-base md:text-lg text-amber-950 leading-snug">
                Última condição antes de sair
              </h3>
              <p className="text-xs text-amber-900 mt-1 font-bold text-balance">
                Essa é a menor condição disponível para acessar o Protocolo FAROL™ completo.
              </p>
            </div>

            {/* Body */}
            <div className="p-4 md:p-5 overflow-y-auto space-y-4">
              <p className="text-[12px] text-amber-950 text-center font-bold">
                Você recebe acesso permanente a:
              </p>

              {/* Mockup do Kit Completo */}
              <div className="relative w-full my-1 flex items-center justify-center">
                <img 
                  src="https://i.ibb.co/GfBQD1G1/Whats-App-Image-2026-07-14-at-17-17-05-11zon.webp" 
                  alt="Mockup FAROL Completo" 
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto rounded-xl border border-amber-300 shadow-md animate-soft-pulse" 
                />
              </div>

              {/* Checklist */}
              <ul className="grid grid-cols-2 gap-1.5 text-[11px] text-amber-950 bg-white p-3 rounded-xl border border-amber-200">
                <li className="flex items-center gap-1 font-bold">
                  <Check className="w-3 h-3 text-emerald-600 flex-shrink-0 stroke-[3]" />
                  <span>Protocolo FAROL™</span>
                </li>
                <li className="flex items-center gap-1 font-bold">
                  <Check className="w-3 h-3 text-emerald-600 flex-shrink-0 stroke-[3]" />
                  <span>Checklist infantil</span>
                </li>
                <li className="flex items-center gap-1 font-bold">
                  <Check className="w-3 h-3 text-emerald-600 flex-shrink-0 stroke-[3]" />
                  <span>Ficha individual</span>
                </li>
                <li className="flex items-center gap-1 font-bold">
                  <Check className="w-3 h-3 text-emerald-600 flex-shrink-0 stroke-[3]" />
                  <span>Reg. de evolução</span>
                </li>
                <li className="flex items-center gap-1 font-bold">
                  <Check className="w-3 h-3 text-emerald-600 flex-shrink-0 stroke-[3]" />
                  <span>Pareceres descr.</span>
                </li>
                <li className="flex items-center gap-1 font-bold">
                  <Check className="w-3 h-3 text-emerald-600 flex-shrink-0 stroke-[3]" />
                  <span>Atividades psicom.</span>
                </li>
              </ul>

              {/* Price */}
              <div className="text-center py-2.5 bg-amber-100 rounded-xl border border-amber-200">
                <span className="text-[10px] text-amber-900 uppercase font-black block tracking-wide">Único pagamento hoje</span>
                <span className="text-2xl md:text-3xl font-black text-amber-950">R$ 19,90</span>
              </div>

              {/* Action buttons */}
              <div className="space-y-2 pt-1">
                <a 
                  href={appendUtms("https://pay.wiapy.com/L8Ba5XUywWt3")}
                  className="w-full block text-center bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-3.5 rounded-xl text-sm shadow-md transition-all active:scale-[0.98] cursor-pointer animate-cta-pulse"
                >
                  Quero acessar agora
                </a>
                <button 
                  onClick={handleDeclineExitPopup2}
                  className="w-full bg-amber-200/50 hover:bg-amber-200/80 text-amber-950 font-bold py-2 rounded-xl text-xs transition-all cursor-pointer"
                >
                  Continuar sem o material
                </button>
              </div>

            </div>

          </div>
        </div>
      )}


      {/* ========================================================
          MOCK CHECKOUT MODAL (SMOOTH AND HIGHLY CONVERTING)
          ======================================================== */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-2xl md:rounded-3xl max-w-md w-full shadow-2xl overflow-hidden border border-slate-100 animate-in fade-in-50 zoom-in-95 duration-200 max-h-[92vh] flex flex-col">
            
            {/* Header */}
            <div className="bg-farol-navy text-white p-4 md:p-5 flex items-center justify-between flex-shrink-0">
              <div>
                <h3 className="font-display font-bold text-sm md:text-base">Área de Pagamento Segura</h3>
                <p className="text-[10px] md:text-[11px] text-slate-300">Seus dados estão protegidos por criptografia de ponta.</p>
              </div>
              <button 
                onClick={() => setIsCheckoutOpen(false)}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer p-1 rounded-lg hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Success state */}
            {checkoutSuccess ? (
              <div className="p-5 md:p-8 overflow-y-auto text-center space-y-5 md:space-y-6">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto flex-shrink-0">
                  <Check className="w-7 h-7 md:w-8 md:h-8 stroke-[3]" />
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-display font-black text-lg md:text-xl text-farol-navy">Acesso Liberado!</h4>
                  <p className="text-xs md:text-sm text-slate-600">
                    Obrigado, <strong className="text-slate-800 font-bold">{customerName}</strong>! Enviamos os materiais editáveis e os guias para o e-mail:
                  </p>
                  <p className="bg-slate-50 border border-slate-100 text-emerald-700 font-mono text-xs py-2 px-3 rounded-lg font-bold">
                    {customerEmail}
                  </p>
                </div>

                <div className="text-[10px] md:text-xs text-slate-400 bg-farol-cream p-3 rounded-lg">
                  Lembre-se de verificar sua caixa de spam ou aba de promoções se não encontrar na caixa de entrada.
                </div>

                <button 
                  onClick={() => {
                    setIsCheckoutOpen(false);
                    setCheckoutSuccess(false);
                    setCustomerName('');
                    setCustomerEmail('');
                  }}
                  className="w-full bg-farol-navy hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-xl text-xs md:text-sm transition-all cursor-pointer"
                >
                  Concluir e Voltar
                </button>
              </div>
            ) : (
              /* Checkout Form step */
              <form onSubmit={handleCheckoutSubmit} className="p-4 md:p-6 overflow-y-auto space-y-4 md:space-y-5">
                
                {/* Plan Summary */}
                <div className="bg-farol-cream border border-slate-200/60 p-3 md:p-4 rounded-xl md:rounded-2xl flex items-center justify-between text-xs md:text-sm">
                  <div>
                    <span className="text-[9px] md:text-[10px] text-slate-500 uppercase tracking-wider font-extrabold block">Você escolheu:</span>
                    <span className="font-bold text-farol-navy">{activePlan.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] md:text-xs text-slate-400 block line-through">De R$ 297,00</span>
                    <span className="font-black text-sm md:text-base text-emerald-600">R$ {activePlan.price.toFixed(2).replace('.', ',')}</span>
                  </div>
                </div>

                <div className="space-y-3.5 md:space-y-4">
                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] md:text-xs font-bold text-slate-600 uppercase tracking-wide block">Nome Completo</label>
                    <input 
                      type="text"
                      required
                      placeholder="Ex: Ana Souza"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 md:px-4 md:py-3 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    />
                  </div>

                  {/* Email field */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] md:text-xs font-bold text-slate-600 uppercase tracking-wide block">E-mail para Receber o Material</label>
                    <input 
                      type="email"
                      required
                      placeholder="seu.email@exemplo.com"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 md:px-4 md:py-3 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    />
                  </div>

                  {/* Payment Method */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] md:text-xs font-bold text-slate-600 uppercase tracking-wide block">Forma de Pagamento</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('pix')}
                        className={`py-2.5 md:py-3 px-3 md:px-4 rounded-xl border-2 text-xs md:text-sm font-bold flex items-center justify-center gap-1.5 md:gap-2 cursor-pointer transition-all ${
                          paymentMethod === 'pix' 
                            ? 'border-emerald-500 bg-emerald-500/5 text-slate-900' 
                            : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                        }`}
                      >
                        <Zap className="w-3.5 h-3.5 md:w-4 md:h-4 text-emerald-500" />
                        PIX Imediato
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`py-2.5 md:py-3 px-3 md:px-4 rounded-xl border-2 text-xs md:text-sm font-bold flex items-center justify-center gap-1.5 md:gap-2 cursor-pointer transition-all ${
                          paymentMethod === 'card' 
                            ? 'border-emerald-500 bg-emerald-500/5 text-slate-900' 
                            : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                        }`}
                      >
                        <CreditCard className="w-3.5 h-3.5 md:w-4 md:h-4 text-emerald-500" />
                        Cartão
                      </button>
                    </div>
                  </div>
                </div>

                {/* Secure footer info */}
                <div className="pt-3.5 md:pt-4 border-t border-slate-100 space-y-3.5 md:space-y-4 flex-shrink-0">
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-3 md:py-4 rounded-xl text-xs md:text-sm shadow-lg shadow-emerald-500/10 transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? 'Processando...' : `Finalizar Pagamento por R$ ${activePlan.price.toFixed(2).replace('.', ',')}`}
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-[9px] md:text-[10px] text-slate-400 font-semibold text-center uppercase tracking-wider">
                    <Lock className="w-3 h-3 md:w-3.5 md:h-3.5 text-emerald-500" />
                    Ambiente 100% criptografado e certificado
                  </div>
                </div>

              </form>
            )}

          </div>
        </div>
      )}

      {/* ========================================================
          NOTÍCIA G1 MODAL (MODERNO E SEGURO SEM SAIR DO SITE)
          ======================================================== */}
      {isG1ModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-2 sm:p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in-50 zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
            
            {/* G1 Fake Header bar */}
            <div className="bg-[#c4170c] text-white py-3 px-4 flex items-center justify-between flex-shrink-0 shadow-md">
              <div className="flex items-center gap-3">
                {/* G1 Logo Emblem */}
                <div className="bg-white text-[#c4170c] font-black text-xl px-2.5 py-0.5 rounded-md italic tracking-tighter select-none font-sans">
                  g1
                </div>
                <div className="hidden sm:block text-[11px] font-semibold text-red-100 uppercase tracking-wider border-l border-red-500/50 pl-3">
                  Paraná
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <a 
                  href="https://g1.globo.com/pr/parana/especial-publicitario/univel/ensino-de-verdade-univel/noticia/2024/10/18/educacao-inclusiva-a-formacao-continua-de-professores-e-essencial-para-a-inclusao-de-alunos-com-autismo.ghtml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden md:inline-flex items-center gap-1.5 text-xs text-white bg-black/20 hover:bg-black/30 px-3 py-1.5 rounded-full font-bold transition-all"
                >
                  Abrir link oficial
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button 
                  onClick={() => setIsG1ModalOpen(false)}
                  className="bg-white/10 hover:bg-white/20 text-white rounded-full p-1.5 transition-all cursor-pointer active:scale-95"
                  aria-label="Fechar"
                >
                  <X className="w-5 h-5 stroke-[2.5]" />
                </button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto p-5 sm:p-8 space-y-6 text-slate-800 bg-white">
              
              {/* Category */}
              <div className="space-y-1">
                <span className="text-[10px] sm:text-xs font-bold text-[#c4170c] uppercase tracking-wider">
                  ESPECIAL PUBLICITÁRIO — UNIVEL (ENSINO DE VERDADE)
                </span>
                <div className="h-0.5 w-12 bg-[#c4170c]"></div>
              </div>

              {/* Title */}
              <h1 className="font-serif font-bold text-xl sm:text-2xl md:text-3xl text-slate-900 leading-tight">
                Educação inclusiva: a formação contínua de professores é essencial para a inclusão de alunos com autismo
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-slate-700 font-sans leading-relaxed border-l-2 border-slate-300 pl-4 font-medium">
                Especialistas de Cascavel e profissionais do Núcleo Regional de Educação apontam que o acompanhamento individualizado e a aplicação de metodologias estruturadas — como o reconhecido <strong>Protocolo FAROL™</strong> — são os caminhos fundamentais para a verdadeira inclusão escolar de alunos da Educação Infantil.
              </p>

              {/* Meta Info */}
              <div className="flex items-center gap-2 text-xs text-slate-500 border-b border-slate-100 pb-4 font-mono font-medium">
                <span>Por G1 PR / Univel</span>
                <span>•</span>
                <span>Cascavel, PR</span>
                <span>•</span>
                <span>18/10/2024</span>
              </div>

              {/* Article Image */}
              <div className="relative rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shadow-inner">
                <img 
                  src="https://i.ibb.co/9m1nfdp5/images.jpg" 
                  alt="Educação Inclusiva" 
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto max-h-[280px] object-cover"
                />
                <div className="bg-slate-900/80 text-white text-[10px] sm:text-xs px-3 py-1.5 text-center font-sans">
                  Profissionais discutindo ferramentas de acompanhamento de marcos de aprendizagem infantil em Cascavel, PR.
                </div>
              </div>

              {/* Body Text (styled as G1, reading-optimized serif font) */}
              <div className="font-serif text-sm sm:text-base text-slate-700 space-y-4 leading-relaxed tracking-normal">
                <p>
                  A inclusão de estudantes com Transtorno do Espectro Autista (TEA) no ambiente escolar é um dos maiores e mais urgentes desafios enfrentados por educadores no Brasil. No Paraná, faculdades e escolas de Cascavel buscam na formação contínua dos docentes e na organização estruturada de ferramentas a solução para transformar a teoria em prática na sala de aula.
                </p>
                
                <p>
                  Segundo especialistas em Educação Inclusiva e Psicopedagogia vinculados à Univel e apoiadores regionais de Cascavel, a chave para uma inclusão real reside em capacitar o professor para observar, avaliar e documentar o progresso individual de cada criança, principalmente nas etapas iniciais da Educação Infantil.
                </p>

                <p className="border-y border-slate-100 py-4 font-sans text-xs sm:text-sm font-bold text-slate-800 text-center uppercase tracking-wide">
                  "Se não houver registro objetivo de cada conquista diária, a inclusão vira apenas presença física e não evolução pedagógica."
                </p>

                <p className="font-bold text-slate-900 font-sans text-sm sm:text-base">
                  A Importância do Protocolo FAROL™ no Acompanhamento Docente
                </p>

                <p>
                  Instituições de ensino e profissionais da rede do <strong>Núcleo Regional de Educação de Cascavel</strong> e creches parceiras ressaltam o papel de metodologias simplificadas e didáticas que traduzam o plano pedagógico de forma intuitiva. É neste cenário que o <strong>Protocolo FAROL™</strong> ganha força como um dos guias preferidos de docentes.
                </p>

                <p>
                  Ele entrega um portfólio completo com listas de desenvolvimento, fichas de acompanhamento individual do aluno e modelos estruturados de pareceres descritivos. Isso garante que a professora tenha em mãos um passo a passo exato e cientificamente embasado para mapear de forma visual o desenvolvimento motor, social, sensorial e comunicativo de cada aluno com autismo e outras neurodivergências.
                </p>

                <p>
                  Com esse monitoramento diário, as reuniões com os pais e o corpo clínico tornam-se mais eficientes, seguras e transparentes. O educador passa a ter o respaldo técnico de que precisa, reduzindo a sobrecarga mental e fornecendo uma resposta ágil para a evolução de todas as crianças na fase de educação infantil.
                </p>
              </div>

              {/* External Link at bottom for mobile/fallback */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-[11px] text-slate-600 font-sans font-medium">
                  *Esta reportagem é parte do especial Ensino de Verdade da Univel.
                </div>
                <a 
                  href="https://g1.globo.com/pr/parana/especial-publicitario/univel/ensino-de-verdade-univel/noticia/2024/10/18/educacao-inclusiva-a-formacao-continua-de-professores-e-essencial-para-a-inclusao-de-alunos-com-autismo.ghtml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-white bg-[#c4170c] hover:bg-red-700 px-4 py-2 rounded-xl font-bold transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  Ver matéria original no G1
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>

            {/* Bottom bar to close */}
            <div className="bg-slate-50 border-t border-slate-100 p-4 flex justify-end flex-shrink-0">
              <button 
                onClick={() => setIsG1ModalOpen(false)}
                className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-5 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer active:scale-95"
              >
                Fechar Artigo
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================
          POLÍTICA DE PRIVACIDADE MODAL (REQUERIDO PELO FACEBOOK ADS)
          ======================================================== */}
      {isPrivacyOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white text-slate-800 rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden border border-slate-100 animate-in fade-in-50 zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="bg-slate-950 text-white p-5 border-b border-slate-800 flex justify-between items-center flex-shrink-0">
              <h3 className="font-extrabold text-base sm:text-lg tracking-tight text-white">
                Política de Privacidade · Protocolo FAROL™
              </h3>
              <button 
                onClick={() => setIsPrivacyOpen(false)}
                className="text-slate-400 hover:text-white transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto text-xs sm:text-sm leading-relaxed space-y-4 font-sans text-slate-700">
              <p className="font-semibold text-slate-900">
                A sua privacidade é extremamente importante para nós. Esta política de privacidade explica quais dados pessoais coletamos e como os usamos para garantir a melhor experiência com o Protocolo FAROL™.
              </p>
              
              <h4 className="font-bold text-slate-900 text-sm pt-2">1. Coleta de Informações</h4>
              <p>
                Coletamos informações essenciais que você nos fornece voluntariamente ao realizar a compra ou interagir conosco, tais como: nome completo, endereço de e-mail, número de telefone e dados para faturamento. O processamento desses dados financeiros é realizado de forma 100% segura por nosso intermediador de pagamentos certificado (Wiapy), com criptografia de ponta a ponta.
              </p>

              <h4 className="font-bold text-slate-900 text-sm pt-2">2. Uso das Informações</h4>
              <p>
                As informações coletadas são utilizadas exclusivamente para:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Garantir a entrega imediata dos materiais digitais do Protocolo FAROL™ por e-mail;</li>
                <li>Prestar suporte técnico e operacional pós-compra;</li>
                <li>Enviar atualizações pedagógicas, novos arquivos e ofertas exclusivas relacionadas ao nosso ecossistema profissional;</li>
                <li>Atender às obrigações legais e tributárias brasileiras aplicáveis.</li>
              </ul>

              <h4 className="font-bold text-slate-900 text-sm pt-2">3. Cookies e Tecnologias de Rastreamento</h4>
              <p>
                Utilizamos cookies e tecnologias similares (como Pixels do Facebook Ads, Google Analytics e rastreamentos de tráfego UTMify) para analisar o comportamento do usuário em nosso site, otimizar campanhas de anúncios, garantir uma navegação fluida e personalizar a sua experiência. Você pode desabilitar os cookies diretamente nas configurações do seu navegador a qualquer momento.
              </p>

              <h4 className="font-bold text-slate-900 text-sm pt-2">4. Segurança dos Dados</h4>
              <p>
                Implementamos as melhores práticas técnicas e administrativas de segurança da informação para proteger seus dados pessoais contra acessos não autorizados, perdas, alterações ou divulgação indevida. Todos os dados são transmitidos por canais de comunicação seguros e criptografados (protocolo SSL/HTTPS).
              </p>

              <h4 className="font-bold text-slate-900 text-sm pt-2">5. Compartilhamento de Dados</h4>
              <p>
                Não comercializamos, alugamos ou compartilhamos seus dados pessoais com terceiros para fins publicitários. Os dados são acessados unicamente por nossa equipe interna de suporte pedagógico e pelas ferramentas tecnológicas de infraestrutura estritamente necessárias para o funcionamento do site (como servidores de e-mail e provedor de checkout seguro).
              </p>

              <h4 className="font-bold text-slate-900 text-sm pt-2">6. Direitos do Usuário (LGPD)</h4>
              <p>
                Em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/18), você possui o direito de confirmar a existência de tratamento, solicitar o acesso, retificar, atualizar ou revogar o consentimento para a guarda dos seus dados pessoais a qualquer momento. Para exercer esses direitos, basta entrar em contato direto com o nosso suporte em suporte@protocolofarol.com.br.
              </p>

              <h4 className="font-bold text-slate-900 text-sm pt-2">7. Alterações nesta Política</h4>
              <p>
                Reservamo-nos o direito de atualizar ou modificar esta política de privacidade periodicamente. Quaisquer alterações serão publicadas nesta página com a respectiva data de atualização. Recomendamos a leitura regular deste documento.
              </p>
            </div>

            {/* Footer buttons */}
            <div className="bg-slate-50 border-t border-slate-100 p-4 flex justify-end flex-shrink-0">
              <button 
                onClick={() => setIsPrivacyOpen(false)}
                className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 px-6 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer active:scale-95"
              >
                Entendi e Aceito
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          TERMOS DE USO MODAL (REQUERIDO PELO FACEBOOK ADS)
          ======================================================== */}
      {isTermsOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white text-slate-800 rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden border border-slate-100 animate-in fade-in-50 zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="bg-slate-950 text-white p-5 border-b border-slate-800 flex justify-between items-center flex-shrink-0">
              <h3 className="font-extrabold text-base sm:text-lg tracking-tight text-white">
                Termos de Uso · Protocolo FAROL™
              </h3>
              <button 
                onClick={() => setIsTermsOpen(false)}
                className="text-slate-400 hover:text-white transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto text-xs sm:text-sm leading-relaxed space-y-4 font-sans text-slate-700">
              <p className="font-semibold text-slate-900">
                Seja muito bem-vindo ao Protocolo FAROL™. Ao acessar nosso site ou adquirir os materiais digitais fornecidos, você concorda expressamente em cumprir e estar vinculado aos seguintes Termos e Condições de Uso.
              </p>

              <h4 className="font-bold text-slate-900 text-sm pt-2">1. Natureza e Finalidade do Produto</h4>
              <p>
                O Protocolo FAROL™ consiste em um acervo completo de arquivos digitais, modelos de pareceres pedagógicos prontos, registros, relatórios escolares e bancos de atividades práticas de desenvolvimento e psicomotricidade voltados ao suporte profissional de educadores e coordenadores de Educação Infantil (creche e pré-escola). O material destina-se a facilitar a rotina diária de registros e o acompanhamento pedagógico.
              </p>

              <h4 className="font-bold text-slate-900 text-sm pt-2">2. Propriedade Intelectual e Licenciamento de Uso</h4>
              <p>
                Todo o conteúdo, layout, design, marcas registradas, logotipos e textos contidos neste site e nos materiais fornecidos são de propriedade exclusiva do Protocolo FAROL™ e são protegidos pelas leis nacionais e internacionais de direitos autorais e propriedade intelectual.
              </p>
              <p className="font-medium text-slate-900">
                Ao adquirir o material, você recebe uma Licença de Uso Individual e Intransferível. É expressamente PROIBIDO:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Compartilhar, revender, sublicenciar, distribuir ou doar os materiais em grupos de WhatsApp, redes sociais, drives públicos ou corporativos, fóruns ou qualquer outro meio digital;</li>
                <li>Copiar parcial ou integralmente o design ou a estrutura para comercialização própria ou terceirizada;</li>
                <li>Utilizar a marca registrada Protocolo FAROL™ sem autorização por escrito dos proprietários.</li>
              </ul>
              <p>
                Qualquer descumprimento configurará pirataria e violação de direitos autorais (Lei de Direitos Autorais nº 9.610/98), ensejando imediatas sanções civis e criminais aplicáveis.
              </p>

              <h4 className="font-bold text-slate-900 text-sm pt-2">3. Isenção de Responsabilidade e Garantias Pedagógicas</h4>
              <p>
                O Protocolo FAROL™ fornece materiais práticos de apoio profissional. Os relatórios e atividades servem de modelo pedagógico adaptável. É de inteira responsabilidade do educador, da equipe escolar ou do terapeuta responsável adaptar, validar e preencher os relatórios de acordo com a realidade singular de cada turma, bem como de acordo com as diretrizes específicas de sua respectiva escola ou do plano de aula local.
              </p>

              <h4 className="font-bold text-slate-900 text-sm pt-2">4. Política de Reembolso e Garantia de Satisfação</h4>
              <p>
                Oferecemos uma Garantia de Reembolso Incondicional de 7 dias a partir da data de confirmação da compra. Se, por qualquer motivo, você não estiver satisfeito com o material pedagógico, poderá solicitar o reembolso total e imediato diretamente pelo e-mail suporte@protocolofarol.com.br ou por nossa plataforma de checkout parceira (Wiapy). Após o cancelamento, a licença de uso individual é imediatamente cancelada, e o comprador não está mais autorizado a utilizar nenhum dos materiais baixados.
              </p>

              <h4 className="font-bold text-slate-900 text-sm pt-2">5. Limitação de Responsabilidade</h4>
              <p>
                O Protocolo FAROL™ não se responsabiliza por quaisquer decisões acadêmicas, pedagógicas, clínicas ou legais decorrentes do uso inadequado ou equivocado dos relatórios, fichas de registros ou banco de atividades.
              </p>

              <h4 className="font-bold text-slate-900 text-sm pt-2">6. Disposições Finais</h4>
              <p>
                Reservamo-nos o direito de suspender temporariamente o acesso aos servidores de download para manutenções programadas ou atualizações necessárias. Estes termos de uso são regidos pelas leis da República Federativa do Brasil, elegendo-se o foro da comarca da sede da empresa administradora para dirimir quaisquer eventuais controvérsias.
              </p>
            </div>

            {/* Footer buttons */}
            <div className="bg-slate-50 border-t border-slate-100 p-4 flex justify-end flex-shrink-0">
              <button 
                onClick={() => setIsTermsOpen(false)}
                className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 px-6 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer active:scale-95"
              >
                Concordar e Continuar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

const faqItems = [
  {
    q: "O que é o Protocolo FAROL™?",
    a: "O Protocolo FAROL™ é um material digital de apoio pedagógico para professoras da Educação Infantil. Ele inclui guias detalhados, checklists de desenvolvimento, fichas individuais e registros de evolução para ajudar você a documentar e acompanhar o desenvolvimento de seus alunos com rapidez e segurança."
  },
  {
    q: "Como vou receber o material?",
    a: "Imediatamente após a confirmação do pagamento, você receberá um e-mail com as instruções e links para realizar o download direto de todos os materiais em formato digital de alta qualidade."
  },
  {
    q: "Os materiais são editáveis?",
    a: "Sim! Os modelos de fichas individuais, checklists e registros de evolução são disponibilizados em formatos editáveis (como Word) para que você possa personalizar de acordo com o contexto e as necessidades de sua escola e turma."
  },
  {
    q: "Para quais idades o protocolo é indicado?",
    a: "O protocolo foi desenhado especificamente para cobrir toda a Educação Infantil, incluindo as fases de creche e pré-escola, ideal para o acompanhamento de bebês e crianças bem pequenas."
  },
  {
    q: "Tenho alguma garantia de satisfação?",
    a: "Com certeza. Nós oferecemos uma garantia incondicional de 7 dias. Se por algum motivo o Protocolo FAROL™ não ajudar a simplificar a sua rotina escolar, basta nos enviar um e-mail e faremos o reembolso total do valor pago imediatamente."
  }
];

