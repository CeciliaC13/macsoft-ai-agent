import React, { useState, useEffect } from 'react';
import { 
  Bot, 
  ArrowRight, 
  Check, 
  Phone, 
  Mail, 
  MapPin, 
  Send, 
  CheckCircle,
  Workflow,
  Activity,
  Cpu,
  Layers,
  Database,
  Shield,
  ArrowUpRight,
  TrendingUp,
  ArrowUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { problemSolutionShifts, integrationSteps, operationalBenefits } from './data';
import companyLogo from './company_logo.jpg';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  // Contact Form State
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [localInquiries, setLocalInquiries] = useState<any[]>([]);


  useEffect(() => {
    const stored = localStorage.getItem('macsoft_inquiries');
    if (stored) {
      try {
        setLocalInquiries(JSON.parse(stored));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Scroll spy, scroll state & Scroll to Top button visibility
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 1. Scroll-to-top button visibility
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }

      // 2. Dynamic header background state
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // 3. Scroll spy navigation highlighter
      const scrollPos = window.scrollY;
      if (scrollPos < 100) {
        setActiveTab('home');
        return;
      }

      const sections = ['problem-solution', 'how-it-works', 'benefits', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop - 120; // 80px header height + padding offset
          const bottom = top + el.offsetHeight;
          if (scrollPos >= top && scrollPos < bottom) {
            setActiveTab(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run immediately on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) errors.name = 'Please provide your name.';
    if (!formData.companyName.trim()) errors.companyName = 'Company name is required.';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Please enter a valid business email address.';
    if (!formData.phone.trim()) errors.phone = 'Phone number is required for verification.';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newInquiry = {
        id: `inq-${Date.now()}`,
        ...formData,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      const updated = [newInquiry, ...localInquiries];
      setLocalInquiries(updated);
      localStorage.setItem('macsoft_inquiries', JSON.stringify(updated));

      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        companyName: '',
        email: '',
        phone: '',
        message: ''
      });
    }, 1200);
  };

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-mesh-gradient text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950 relative overflow-hidden">
      
      {/* BACKGROUND GLOW ORBS & DECORATIONS */}
      <div className="absolute top-[8%] left-[-15%] w-[600px] h-[600px] rounded-full bg-indigo-600/5 blur-[140px] pointer-events-none animate-float-slow" />
      <div className="absolute top-[25%] right-[-10%] w-[550px] h-[550px] rounded-full bg-teal-500/5 blur-[130px] pointer-events-none animate-pulse-glow" />
      <div className="absolute top-[50%] left-[20%] w-[700px] h-[700px] rounded-full bg-amber-500/4 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-15%] w-[600px] h-[600px] rounded-full bg-violet-600/5 blur-[140px] pointer-events-none animate-float-slow" />

      {/* HEADER NAVIGATION */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-[#030712]/85 backdrop-blur-lg border-b border-slate-800/40 shadow-lg shadow-black/10' : 'bg-transparent border-b border-transparent'}`} id="header">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => scrollToSection('home')}>
            <div className="relative">
              <img 
                src={companyLogo} 
                alt="MacSoft Logo" 
                className="w-10 h-10 rounded-full object-cover bg-slate-950 border border-amber-500/25 shadow-lg shadow-amber-500/10 hover:border-amber-500/55 hover:shadow-amber-500/20 transition-all duration-300"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fallback = document.getElementById('header-logo-fallback');
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              <div id="header-logo-fallback" className="hidden w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 items-center justify-center font-bold text-slate-950 text-xl tracking-tight shadow-md shadow-amber-500/10">M</div>
            </div>
            <div>
              <span className="font-display font-bold text-xl text-white tracking-tight">MacSoft</span>
              <span className="text-[10px] block text-amber-500 font-mono tracking-widest uppercase -mt-1.5 font-semibold">AI Assistant</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('home')} className={`text-sm font-medium transition-colors cursor-pointer ${activeTab === 'home' ? 'text-amber-500 font-semibold' : 'text-slate-400 hover:text-white'}`}>Home</button>
            <button onClick={() => scrollToSection('problem-solution')} className={`text-sm font-medium transition-colors cursor-pointer ${activeTab === 'problem-solution' ? 'text-amber-500 font-semibold' : 'text-slate-400 hover:text-white'}`}>Problem vs. Solution</button>
            <button onClick={() => scrollToSection('how-it-works')} className={`text-sm font-medium transition-colors cursor-pointer ${activeTab === 'how-it-works' ? 'text-amber-500 font-semibold' : 'text-slate-400 hover:text-white'}`}>How It Works</button>
            <button onClick={() => scrollToSection('benefits')} className={`text-sm font-medium transition-colors cursor-pointer ${activeTab === 'benefits' ? 'text-amber-500 font-semibold' : 'text-slate-400 hover:text-white'}`}>Benefits</button>
            <button onClick={() => scrollToSection('contact')} className={`text-sm font-medium transition-colors cursor-pointer ${activeTab === 'contact' ? 'text-amber-500 font-semibold' : 'text-slate-400 hover:text-white'}`}>Contact</button>
          </nav>

          <div>
            <button onClick={() => scrollToSection('contact')} className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-5 py-2.5 rounded-lg text-xs transition-all duration-250 cursor-pointer shadow-lg shadow-amber-500/10 hover:shadow-amber-500/25">
              Inquire for Implementation
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section id="home" className="relative pt-20 pb-20 md:pt-28 md:pb-24 overflow-hidden bg-grid">
        <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
          
          <div className="inline-flex items-center space-x-2.5 bg-slate-950/80 border border-slate-800/80 rounded-full px-4.5 py-1.5 mb-8 shadow-inner shadow-white/5">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse glow-amber" />
            <span className="text-xs text-slate-300 font-mono tracking-wider uppercase font-semibold">AutoCount Integration Bridge — Ready for local v1.9 / v2.0</span>
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.12] max-w-5xl mx-auto">
            Hands-Free, Automated <br />
            <span className="text-shimmer relative inline-block font-bold">Write, Read, Delete Database</span><br />
            Management for AutoCount Accounting
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mt-6 leading-relaxed">
            Eliminate manual bookkeeping transcription, reduce human error, and achieve fluid ledger sync. Maximize your team's productivity, ensure secure database flow, and secure zero wasted hours.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-10 max-w-md mx-auto">
            <button onClick={() => scrollToSection('contact')} className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-8 py-4 rounded-lg text-base shadow-xl shadow-amber-500/10 hover:shadow-amber-500/30 flex items-center justify-center space-x-2 cursor-pointer transition-all duration-300">
              <span>Inquire for Implementation</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button onClick={() => scrollToSection('problem-solution')} className="w-full sm:w-auto bg-slate-950/80 hover:bg-slate-900 text-white border border-slate-800 hover:border-slate-700 font-semibold px-6 py-4 rounded-lg text-base cursor-pointer transition-all duration-300 shadow-md">
              Learn How It Works
            </button>
          </div>



        </div>
      </section>

      {/* SME PROBLEM VS HOW WE FIX IT SECTION */}
      <section id="problem-solution" className="py-24 border-t border-b border-slate-900/80 relative">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-3">
            <span className="text-xs font-mono text-amber-500 tracking-wider uppercase bg-amber-500/10 px-3 py-1 rounded border border-amber-500/20">Operational Analysis</span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white tracking-tight">The SME Problem vs. How We Fix It</h2>
            <p className="text-slate-400 text-sm">
              Standard accounting pipelines are clogged with manual typing. The MacSoft AI Assistant transforms your transactional workflows into autonomous database operations.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 max-w-5xl mx-auto">
            {problemSolutionShifts.map((shift, idx) => (
              <div 
                key={shift.id} 
                className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-4 rounded-xl overflow-hidden panel-glass border border-slate-800/50 hover-glow-card transition-all duration-300 group shadow-xl"
              >
                {/* Painful Reality Column */}
                <div className="p-8 bg-red-950/5 border-b md:border-b-0 md:border-r border-slate-850 flex flex-col justify-center">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 font-mono text-xs font-bold">
                      0{idx + 1}
                    </span>
                    <h3 className="text-sm font-mono text-red-400 uppercase tracking-wider font-bold">The Painful SME Problem</h3>
                  </div>
                  <h4 className="font-display font-bold text-xl text-white mb-3">{shift.problemTitle}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">{shift.problemDesc}</p>
                </div>

                {/* Automation Fix Column */}
                <div className="p-8 bg-slate-950/40 flex flex-col justify-center relative">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-xl pointer-events-none" />
                  
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 font-mono text-xs font-bold">
                      FIX
                    </span>
                    <h3 className="text-sm font-mono text-amber-500 uppercase tracking-wider font-bold">How We Fix It</h3>
                  </div>
                  <h4 className="font-display font-bold text-xl text-amber-500 mb-3">{shift.solutionTitle}</h4>
                  <p className="text-slate-300 text-sm leading-relaxed">{shift.solutionDesc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="how-it-works" className="py-24 relative bg-grid">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-3">
            <span className="text-xs font-mono text-teal-400 tracking-wider uppercase bg-teal-500/10 px-3 py-1 rounded border border-teal-500/20">Frictionless Integration</span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white tracking-tight">How the AI Integrates With Your AutoCount</h2>
            <p className="text-slate-400 text-sm">
              Three simple, secure steps to establish autonomous database workflows and eliminate manual bookkeeping bottlenecks.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch relative">
            {/* Background Connecting Line for Desktop */}
            <div className="absolute top-1/2 left-[10%] right-[10%] h-[1.5px] bg-gradient-to-r from-amber-500/10 via-indigo-500/20 to-teal-500/10 -translate-y-1/2 hidden lg:block z-0 pointer-events-none" />
            
            {integrationSteps.map((step, idx) => (
              <div 
                key={step.step}
                className="panel-glass border border-slate-800/80 rounded-xl p-8 hover-glow-card-teal transition-all duration-300 relative z-10 flex flex-col justify-between group"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/5 rounded-full blur-xl pointer-events-none group-hover:bg-teal-500/10 transition-all duration-300" />
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] font-mono text-teal-400 bg-teal-500/10 border border-teal-500/20 px-2.5 py-1 rounded font-bold uppercase tracking-wider">
                      {step.badge}
                    </span>
                    <span className="font-display font-extrabold text-4xl text-slate-800/80 group-hover:text-teal-400/20 transition-colors">
                      {step.step}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-xl text-white mb-4 group-hover:text-teal-400 transition-colors">{step.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
                </div>
                
                <div className="pt-6 mt-6 border-t border-slate-900/60 flex items-center space-x-2 text-xs font-mono text-emerald-400 font-semibold">
                  <CheckCircle className="w-4 h-4" />
                  <span>Secure Setup Verified</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OPERATIONAL BENEFITS SECTION */}
      <section id="benefits" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-3">
            <span className="text-xs font-mono text-amber-500 tracking-wider uppercase bg-amber-500/10 px-3 py-1 rounded border border-amber-500/20">Business Outcomes</span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white tracking-tight">The Benefits of Hands-Free Database Management</h2>
            <p className="text-slate-400 text-sm">
              Achieve continuous data alignment, eradicate manual error loops, and boost your enterprise productivity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {operationalBenefits.map((benefit, idx) => (
              <div 
                key={benefit.id} 
                className="panel-glass border border-slate-800/80 p-8 rounded-xl flex flex-col justify-between hover-glow-card-indigo transition-all duration-300 relative group"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-500/5 rounded-full blur-xl pointer-events-none group-hover:bg-indigo-500/10 transition-all duration-300" />
                <div>
                  <div className="w-12 h-12 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6">
                    {idx === 0 && <Activity className="w-5 h-5 animate-pulse" />}
                    {idx === 1 && <Workflow className="w-5 h-5" />}
                    {idx === 2 && <TrendingUp className="w-5 h-5" />}
                  </div>
                  <h3 className="font-display font-bold text-xl text-white mb-3">{benefit.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{benefit.description}</p>
                </div>
                <div className="pt-6 mt-6 border-t border-slate-900/60 flex items-center space-x-2 text-xs font-mono text-amber-500 font-semibold group-hover:text-amber-400">
                  <span>Seamless Integration</span>
                  <CheckCircle className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT & INQUIRY SECTION */}
      <section id="contact" className="py-24 border-t border-slate-900/80 relative bg-grid">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Company Info Sidebar */}
            <div className="lg:col-span-5 space-y-8 text-left">
              <div className="space-y-4">
                <span className="text-xs font-mono text-amber-500 tracking-wider uppercase bg-amber-500/10 px-3 py-1 rounded border border-amber-500/20">Get Started</span>
                <h2 className="font-display font-bold text-3xl md:text-4xl text-white tracking-tight">Deploy AutoCount Automation Today</h2>
                <p className="text-slate-400 leading-relaxed text-sm">
                  Let’s eliminate manual transcription entry and unlock major productivity gains for your business. Our specialized AutoCount integration technicians will configure the mapping rules to fit your business Chart of Accounts.
                </p>
              </div>

              {/* Direct WhatsApp Callout */}
              <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/5 border border-emerald-500/20 p-6 rounded-xl space-y-4 shadow-lg shadow-emerald-500/5 hover:border-emerald-500/35 transition-colors">
                <div className="flex items-center space-x-2 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>Instant WhatsApp Contact</span>
                </div>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Need an immediate consultation or have questions about database security? Speak directly with our sales team on WhatsApp.
                </p>
                <a 
                  href="https://wa.me/60107729999?text=Hi%20MacSoft,%20I%20am%20interested%20in%20implementing%20the%20MacSoft%20AI%20Assistant%20for%2520our%20AutoCount%2520database." 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center justify-center space-x-2 w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-3.5 px-5 rounded-lg text-sm transition-all duration-300 shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20"
                >
                  <Bot className="w-4 h-4 shrink-0" />
                  <span>Chat on WhatsApp (+60 10-772 9999)</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>

              <div className="panel-glass border border-slate-800/80 p-6 rounded-xl space-y-6 shadow-md">
                <h4 className="text-xs font-mono text-slate-500 uppercase tracking-wider border-b border-slate-900 pb-3 font-semibold">MacSoft Corporate Headquarters</h4>
                <div className="space-y-5">
                  <div className="flex items-start space-x-3.5 text-sm">
                    <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-white block mb-1">HQ Physical Office</span>
                      <p className="text-slate-400 leading-relaxed text-xs font-medium">
                        No. 67A, Jalan Pulai 21,<br />
                        Taman Pulai Utama, 81300 Skudai,<br />
                        Johor, Malaysia
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3.5 text-sm">
                    <Phone className="w-5 h-5 text-amber-500 shrink-0" />
                    <div>
                      <span className="text-slate-500 block text-[10px] font-mono uppercase font-bold font-semibold">Office Phone</span>
                      <a href="tel:+6075623111" className="text-slate-200 hover:text-white font-medium font-mono text-xs">+607-562 3111</a>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3.5 text-sm">
                    <Mail className="w-5 h-5 text-amber-500 shrink-0" />
                    <div>
                      <span className="text-slate-500 block text-[10px] font-mono uppercase font-bold font-semibold">Sales & Operations Email</span>
                      <a href="mailto:sales@macsoft.my" className="text-slate-200 hover:text-white font-medium font-mono text-xs">sales@macsoft.my</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Leads Inquiry Form */}
            <div className="lg:col-span-7 panel-glass border border-slate-800/80 rounded-2xl p-8 md:p-10 relative overflow-hidden shadow-2xl" id="contact-form">
              <AnimatePresence mode="wait">
                {submitSuccess ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    className="py-12 text-center space-y-6"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 mx-auto shadow-lg shadow-emerald-500/5">
                      <Check className="w-8 h-8" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-display font-bold text-2xl text-white">Inquiry Received</h3>
                      <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
                        Thank you for reaching out to MacSoft. Our systems integration specialists will review your requirements and contact you within 24 business hours.
                      </p>
                    </div>
                    <button 
                      onClick={() => setSubmitSuccess(false)} 
                      className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-6 py-2.5 rounded-lg text-sm transition-colors cursor-pointer"
                    >
                      Submit Another Inquiry
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmitForm} className="space-y-6 text-left">
                    <div className="border-b border-slate-900 pb-4 mb-2">
                      <h3 className="font-display font-bold text-lg text-white">Submit Implementation Request</h3>
                      <p className="text-slate-500 text-xs mt-1">Please provide details about your AutoCount environment to help our technicians prepare.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label className="text-xs text-slate-400 font-medium block">Contact Name *</label>
                        <input 
                          type="text" 
                          id="name" 
                          name="name" 
                          value={formData.name} 
                          onChange={handleInputChange} 
                          placeholder="Your Name" 
                          className="w-full bg-slate-950/70 border border-slate-800 focus:border-amber-500/80 focus:ring-2 focus:ring-amber-500/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none transition-all" 
                        />
                        {formErrors.name && <span className="text-[11px] text-red-400 block mt-1">{formErrors.name}</span>}
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs text-slate-400 font-medium block">SME Company Name *</label>
                        <input 
                          type="text" 
                          id="companyName" 
                          name="companyName" 
                          value={formData.companyName} 
                          onChange={handleInputChange} 
                          placeholder="E.g., Syarikat Sdn Bhd" 
                          className="w-full bg-slate-950/70 border border-slate-800 focus:border-amber-500/80 focus:ring-2 focus:ring-amber-500/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none transition-all" 
                        />
                        {formErrors.companyName && <span className="text-[11px] text-red-400 block mt-1">{formErrors.companyName}</span>}
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs text-slate-400 font-medium block">Business Email *</label>
                        <input 
                          type="email" 
                          id="email" 
                          name="email" 
                          value={formData.email} 
                          onChange={handleInputChange} 
                          placeholder="name@company.my" 
                          className="w-full bg-slate-950/70 border border-slate-800 focus:border-amber-500/80 focus:ring-2 focus:ring-amber-500/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none transition-all" 
                        />
                        {formErrors.email && <span className="text-[11px] text-red-400 block mt-1">{formErrors.email}</span>}
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs text-slate-400 font-medium block">Phone Number *</label>
                        <input 
                          type="text" 
                          id="phone" 
                          name="phone" 
                          value={formData.phone} 
                          onChange={handleInputChange} 
                          placeholder="E.g., +6012-3456789" 
                          className="w-full bg-slate-950/70 border border-slate-800 focus:border-amber-500/80 focus:ring-2 focus:ring-amber-500/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none transition-all" 
                        />
                        {formErrors.phone && <span className="text-[11px] text-red-400 block mt-1">{formErrors.phone}</span>}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-400 font-medium block">Message / Integration Setup Requirements (Optional)</label>
                      <textarea 
                        id="message" 
                        name="message" 
                        rows={4}
                        value={formData.message} 
                        onChange={handleInputChange} 
                        placeholder="Tell us about your current AutoCount version or bookkeeping bottlenecks..." 
                        className="w-full bg-slate-950/70 border border-slate-800 focus:border-amber-500/80 focus:ring-2 focus:ring-amber-500/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none transition-all resize-none" 
                      />
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting} 
                      className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-slate-800 text-slate-950 font-bold py-4 rounded-lg text-sm flex items-center justify-center space-x-2 cursor-pointer shadow-lg shadow-amber-500/5 hover:shadow-amber-500/25 transition-all duration-300"
                    >
                      {isSubmitting ? <span>Processing Request...</span> : <><Send className="w-4 h-4" /><span>Submit Implementation Inquiry</span></>}
                    </button>
                  </form>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950/95 border-t border-slate-900 py-12 text-slate-500 text-xs relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <span className="font-display font-bold text-slate-300 text-sm">MacSoft System Integration</span>
          </div>
          <div className="text-center md:text-right space-y-1 font-medium text-slate-400">
            <p>© {new Date().getFullYear()} MacSoft. All Rights Reserved.</p>
            <p className="text-[10px] text-slate-600">Skudai, Johor, Malaysia — Maximizing AutoCount database connectivity loops.</p>
          </div>
        </div>
      </footer>

      {/* SCROLL TO TOP BUTTON */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 z-50 p-3.5 rounded-full panel-glass border border-slate-800/80 text-amber-500 hover:text-white hover:border-amber-500/55 hover:bg-amber-500/10 cursor-pointer shadow-2xl transition-all duration-200 group"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}