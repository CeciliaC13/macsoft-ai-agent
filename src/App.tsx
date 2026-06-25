import React, { useState, useEffect } from 'react';
import { 
  Bot, 
  ArrowRight, 
  Check, 
  AlertTriangle, 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare, 
  ExternalLink, 
  Send, 
  CheckCircle,
  FileText,
  Workflow,
  TrendingUp,
  Activity,
  Cpu,
  Layers,
  Database
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { painPoints, features, steps, demoDocuments } from './data';
import companyLogo from './company_logo.png';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  // Interactive Bookkeeping Simulator State
  const [selectedDocId, setSelectedDocId] = useState(demoDocuments[0].id);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPosted, setIsPosted] = useState<Record<string, boolean>>({});

  const activeDoc = demoDocuments.find(d => d.id === selectedDocId) || demoDocuments[0];

  const triggerSimulation = (docId: string) => {
    if (isPosted[docId]) return;
    setSelectedDocId(docId);
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
    }, 800);
  };

  const handlePostToAutoCount = (docId: string) => {
    setIsPosted(prev => ({ ...prev, [docId]: true }));
  };

  // Contact Form State
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    email: '',
    phone: '',
    monthlyInvoices: '100 - 500 invoices',
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
        monthlyInvoices: '100 - 500 invoices',
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
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950">
      
      {/* HEADER NAVIGATION */}
      <header className="sticky top-0 z-50 bg-[#0b0f19]/90 backdrop-blur-md border-b border-slate-800/60" id="header">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => scrollToSection('home')}>
            <div className="relative">
              <img 
                src={companyLogo} 
                alt="Macsoft Logo" 
                className="w-10 h-10 rounded object-contain bg-slate-900 border border-slate-800"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fallback = document.getElementById('header-logo-fallback');
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              <div id="header-logo-fallback" className="hidden w-10 h-10 rounded bg-gradient-to-br from-amber-500 to-orange-600 items-center justify-center font-bold text-slate-950 text-xl tracking-tight shadow-md shadow-amber-500/10">M</div>
            </div>
            <div>
              <span className="font-display font-bold text-xl text-white tracking-tight">Macsoft</span>
              <span className="text-[10px] block text-amber-500 font-mono tracking-widest uppercase -mt-1.5 font-semibold">AUTOMATION</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('home')} className={`text-sm font-medium transition-colors cursor-pointer ${activeTab === 'home' ? 'text-amber-500' : 'text-slate-400 hover:text-white'}`}>Home</button>
            <button onClick={() => scrollToSection('demo')} className={`text-sm font-medium transition-colors cursor-pointer ${activeTab === 'demo' ? 'text-amber-500' : 'text-slate-400 hover:text-white'}`}>Live Demo</button>
            <button onClick={() => scrollToSection('features')} className={`text-sm font-medium transition-colors cursor-pointer ${activeTab === 'features' ? 'text-amber-500' : 'text-slate-400 hover:text-white'}`}>System Blocks</button>
            <button onClick={() => scrollToSection('benefits')} className={`text-sm font-medium transition-colors cursor-pointer ${activeTab === 'benefits' ? 'text-amber-500' : 'text-slate-400 hover:text-white'}`}>Benefits</button>
            <button onClick={() => scrollToSection('contact')} className={`text-sm font-medium transition-colors cursor-pointer ${activeTab === 'contact' ? 'text-amber-500' : 'text-slate-400 hover:text-white'}`}>Contact</button>
          </nav>

          <div>
            <button onClick={() => scrollToSection('contact')} className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-5 py-2.5 rounded text-xs transition-all duration-250 cursor-pointer shadow-lg shadow-amber-500/10">
              Request Implementation
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section id="home" className="relative pt-16 pb-24 md:pt-28 md:pb-36 overflow-hidden bg-[#0b0f19]">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-amber-500/5 rounded-full blur-[130px] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center space-x-2 bg-slate-900/80 border border-slate-800 rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-xs text-slate-300 font-mono tracking-wider uppercase font-semibold">Native AutoCount System Integrator</span>
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.1] max-w-4xl mx-auto">
            Eliminate Manual Accounting Bookkeeping for <span className="text-amber-500 relative inline-block">AutoCount</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mt-6 leading-relaxed">
            Rule-driven system processing without programmatic blockages. Free your financial teams from raw paper bottlenecking. Extract layout logs instantly, align accounts automatically, and securely map journals to your desktop database.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-10 max-w-md mx-auto">
            <button onClick={() => scrollToSection('demo')} className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-8 py-4 rounded text-base shadow-xl flex items-center justify-center space-x-2 cursor-pointer">
              <span>Test Interactive Demo</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button onClick={() => scrollToSection('contact')} className="w-full sm:w-auto bg-slate-900 hover:bg-slate-850 text-white border border-slate-800 font-semibold px-6 py-4 rounded text-base cursor-pointer">
              Contact Team
            </button>
          </div>
        </div>
      </section>

      {/* NEW INTERACTIVE CLIENT-SIDE DEMO SECTION */}
      <section id="demo" className="py-20 bg-slate-950 border-t border-b border-slate-900 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-3">
            <span className="text-xs font-mono text-amber-500 tracking-wider uppercase bg-amber-500/10 px-3 py-1 rounded border border-amber-500/20">Interactive Application Demo</span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white tracking-tight">Experience AutoCount Automation Live</h2>
            <p className="text-slate-400 text-sm">Click through incoming documents below to test the automated parsing engine, data categorization mapping, and ledger schema assignment logs.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Box: Incoming File Queue */}
            <div className="lg:col-span-4 bg-[#0b0f19] border border-slate-850 p-6 rounded-xl flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-4 font-bold border-b border-slate-850 pb-2 flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-amber-500" /> Incoming Data Queue
                </h3>
                <div className="space-y-3">
                  {demoDocuments.map((doc) => {
                    const isSelected = doc.id === selectedDocId;
                    const posted = isPosted[doc.id];
                    return (
                      <div 
                        key={doc.id}
                        onClick={() => triggerSimulation(doc.id)}
                        className={`p-4 rounded-lg border text-left transition-all cursor-pointer select-none ${
                          isSelected 
                            ? 'bg-amber-500/10 border-amber-500/60 shadow-lg shadow-amber-500/5' 
                            : 'bg-slate-900/60 border-slate-850 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center space-x-2.5 min-w-0">
                            <FileText className={`w-4 h-4 shrink-0 ${isSelected ? 'text-amber-500' : 'text-slate-400'}`} />
                            <span className="text-xs text-slate-200 font-mono truncate block font-medium">{doc.name}</span>
                          </div>
                          <span className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded shrink-0 font-bold ${
                            posted ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-slate-800 text-slate-400'
                          }`}>
                            {posted ? 'POSTED' : 'READY'}
                          </span>
                        </div>
                        <div className="flex justify-between items-center mt-3 text-[11px] font-mono text-slate-400">
                          <span>{doc.supplier.split(' ')[0]}...</span>
                          <span className="text-slate-200 font-bold">{doc.rawAmount}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <p className="text-[11px] text-slate-500 font-mono mt-6 italic">Simulation utilizes strict functional client arrays. No cloud connections requested.</p>
            </div>

            {/* Right Box: Data Alignment Engine Logs */}
            <div className="lg:col-span-8 bg-[#0b0f19] border border-slate-850 rounded-xl overflow-hidden flex flex-col justify-between">
              {/* Box Top Panel */}
              <div className="p-5 border-b border-slate-850 bg-slate-900/40 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded bg-amber-500/10 flex items-center justify-center text-amber-500 border border-amber-500/20">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">Extraction & Mapping Canvas</h4>
                    <span className="text-[10px] font-mono text-slate-500 block">Active Ledger Account Rules Engine</span>
                  </div>
                </div>
                <div className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1.5 rounded border border-slate-850 flex items-center gap-2 self-start sm:self-center">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span>State Alignment: Clean</span>
                </div>
              </div>

              {/* Box Content Panel */}
              <div className="p-6 flex-grow relative min-h-[250px]">
                <AnimatePresence mode="wait">
                  {isProcessing ? (
                    <motion.div 
                      key="processing"
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex flex-col items-center justify-center space-y-3 bg-[#0b0f19]/80 backdrop-blur-xs z-10"
                    >
                      <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                      <span className="text-xs font-mono text-amber-500 tracking-wider">PARSING ROW ENTRIES...</span>
                    </motion.div>
                  ) : null}

                  <motion.div 
                    key={activeDoc.id}
                    initial={{ opacity: 0, y: 5 }} 
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    {/* Header values metadata */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-900/50 p-4 rounded-lg border border-slate-850 font-mono text-xs">
                      <div>
                        <span className="text-[10px] text-slate-500 block uppercase font-bold">Vendor Name</span>
                        <span className="text-slate-200 block truncate font-medium mt-0.5">{activeDoc.supplier}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block uppercase font-bold">Extracted Date</span>
                        <span className="text-slate-200 block mt-0.5">{activeDoc.extractedDate}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block uppercase font-bold">Total Amount</span>
                        <span className="text-amber-500 font-bold block mt-0.5">{activeDoc.rawAmount}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block uppercase font-bold">File Capacity</span>
                        <span className="text-slate-400 block mt-0.5">{activeDoc.size}</span>
                      </div>
                    </div>

                    {/* Mapped Ledger Chart indicator */}
                    <div className="p-4 bg-slate-900 border border-amber-500/20 rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 font-mono text-xs">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded bg-amber-500/10 flex items-center justify-center text-amber-500 border border-amber-500/20 shrink-0">
                          <Layers className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-[10px] text-amber-500 uppercase block font-bold">Mapped AutoCount Ledger Target</span>
                          <span className="text-white font-bold block mt-0.5">{activeDoc.ledgerAccount}</span>
                        </div>
                      </div>
                      <div className="text-[10px] bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-1 rounded uppercase tracking-wide font-bold self-start sm:self-center">
                        Confidence 100%
                      </div>
                    </div>

                    {/* Extracted line items itemized view */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block font-bold">Itemized Line Components</span>
                      <div className="border border-slate-850 rounded-lg overflow-hidden font-mono text-xs">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="bg-slate-900/80 border-b border-slate-850 text-slate-400 text-[10px]">
                              <th className="p-3 font-bold">Line Description</th>
                              <th className="p-3 text-center font-bold w-16">Qty</th>
                              <th className="p-3 text-right font-bold w-24">Subtotal</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-900 bg-slate-900/20">
                            {activeDoc.items.map((item, idx) => (
                              <tr key={idx} className="hover:bg-slate-900/40 text-slate-300">
                                <td className="p-3 font-medium truncate max-w-xs">{item.description}</td>
                                <td className="p-3 text-center text-slate-400">{item.qty}</td>
                                <td className="p-3 text-right text-slate-200 font-semibold">RM {item.amount.toFixed(2)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Box Bottom Panel Action */}
              <div className="p-5 border-t border-slate-850 bg-slate-900/20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 font-mono text-xs">
                <span className="text-slate-400 flex items-center gap-2">
                  <Database className="w-4 h-4 text-slate-500" /> Destination: <strong className="text-white font-medium">AutoCount DB Schema</strong>
                </span>
                <button
                  disabled={isPosted[activeDoc.id] || isProcessing}
                  onClick={() => handlePostToAutoCount(activeDoc.id)}
                  className={`px-5 py-3 rounded text-xs font-bold transition-all flex items-center justify-center space-x-2 cursor-pointer ${
                    isPosted[activeDoc.id]
                      ? 'bg-green-500/10 text-green-400 border border-green-500/30'
                      : 'bg-amber-500 text-slate-950 hover:bg-amber-600 shadow-md shadow-amber-500/5'
                  }`}
                >
                  {isPosted[activeDoc.id] ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span>Ledger Entry Completed</span>
                    </>
                  ) : (
                    <>
                      <span>Push Voucher Entry to AutoCount</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* SYSTEM CAPABILITIES MODULES */}
      <section id="features" className="py-20 md:py-28 bg-[#0b0f19] relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center mb-20 space-y-4">
            <span className="text-xs font-mono text-amber-500 tracking-wider uppercase bg-amber-500/10 px-3 py-1 rounded border border-amber-500/20">System Capabilities</span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white tracking-tight">Structured Layout Built for Precision</h2>
            <p className="text-slate-400">Macsoft\'s automated pipeline functions continuously, integrating structures seamlessly into your existing ledger loops.</p>
          </div>

          <div className="space-y-24">
            {features.map((feature, idx) => (
              <div key={feature.id} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                <div className={`lg:col-span-5 ${idx % 2 === 1 ? 'lg:order-last' : ''}`}>
                  <div className="relative bg-slate-900 border border-slate-850 rounded-xl p-8 shadow-xl">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-xl pointer-events-none" />
                    
                    {idx === 0 && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                          <span className="text-xs font-mono text-slate-500">COA MAPPING LOGS</span>
                          <span className="text-xs text-amber-500 bg-amber-500/10 px-2.5 py-0.5 rounded font-mono font-semibold">MATCHED</span>
                        </div>
                        <div className="space-y-3 font-mono text-xs">
                          <div className="p-3 bg-slate-950 rounded border border-slate-850">
                            <div className="text-slate-500 text-[10px]">EXTRACTED STRIP DESCRIPTION</div>
                            <div className="text-slate-200 mt-1 font-semibold">Premium A4 Copier Paper Bundle</div>
                          </div>
                          <div className="flex justify-center text-amber-500"><Workflow className="w-5 h-5" /></div>
                          <div className="p-3 bg-slate-950 rounded border border-amber-500/20">
                            <div className="text-amber-500 text-[10px]">AUTOCOUNT TARGET LEDGER</div>
                            <div className="text-white font-bold mt-1">7210 - Printing & Office Stationery</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {idx === 1 && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                          <span className="text-xs font-mono text-slate-500">MONITORED QUEUE PROCESS</span>
                          <span className="text-xs text-green-400 bg-green-500/10 px-2.5 py-0.5 rounded font-mono font-semibold">ACTIVE</span>
                        </div>
                        <div className="space-y-2.5 font-mono text-xs text-slate-400">
                          <div className="flex items-center justify-between p-3.5 bg-slate-950 rounded border border-slate-850/60">
                            <div className="flex items-center space-x-2">
                              <FileText className="w-4 h-4 text-amber-500" />
                              <span>Supplier_Invoice_71A.pdf</span>
                            </div>
                            <span className="text-amber-500 font-bold uppercase text-[10px]">QUEUED</span>
                          </div>
                          <div className="flex items-center justify-between p-3.5 bg-slate-950 rounded border border-slate-850/60">
                            <div className="flex items-center space-x-2">
                              <FileText className="w-4 h-4 text-amber-500" />
                              <span>Petrol_Receipt_Petronas.png</span>
                            </div>
                            <span className="text-amber-500 font-bold uppercase text-[10px]">PARSED</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {idx === 2 && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                          <span className="text-xs font-mono text-slate-500">PROJECTED EFFICIENCY TIME</span>
                          <span className="text-xs text-amber-500 bg-amber-500/10 px-2.5 py-0.5 rounded font-mono font-semibold">METRIC</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-slate-950 p-4 rounded border border-slate-850 text-center">
                            <span className="text-[10px] text-slate-500 block uppercase">Manual Hours</span>
                            <span className="text-lg font-bold font-mono text-red-500 line-through">42h / wk</span>
                          </div>
                          <div className="bg-slate-950 p-4 rounded border border-amber-500/20 text-center">
                            <span className="text-[10px] text-amber-500 block uppercase">Automated</span>
                            <span className="text-lg font-bold font-mono text-green-400">6h / wk</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-5">
                  <span className="text-amber-500 font-mono text-xs uppercase tracking-widest font-semibold">{feature.tagline}</span>
                  <h3 className="font-display font-bold text-2xl md:text-3xl text-white tracking-tight">{feature.title}</h3>
                  <p className="text-slate-400 leading-relaxed text-base">{feature.description}</p>
                  
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {feature.points.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start space-x-2.5">
                        <div className="w-5 h-5 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5 text-amber-500" />
                        </div>
                        <span className="text-sm text-slate-300 font-medium">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS SECTION */}
      <section id="benefits" className="py-20 md:py-28 bg-slate-900 border-y border-slate-850 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
            <span className="text-xs font-mono text-amber-500 tracking-wider uppercase bg-amber-500/10 px-3 py-1 rounded border border-amber-500/20">The Daily Reality</span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white tracking-tight">Is Your SME Held Back by Manual Bookkeeping Friction?</h2>
            <p className="text-slate-400">SMEs using standard accounting frameworks run into massive manual overhead just to keep their records up-to-date. See the operational bottlenecks we permanently eliminate:</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {painPoints.map((point) => (
              <div key={point.id} className="bg-[#0b0f19] border border-slate-850 rounded-xl p-8 flex flex-col h-full relative group hover:border-amber-500/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 mb-6 shrink-0">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-lg text-white mb-3">{point.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">{point.problem}</p>
                
                <div className="pt-5 border-t border-slate-900 mt-auto">
                  <div className="flex items-start space-x-3 bg-amber-500/5 border border-amber-500/10 rounded-lg p-3.5">
                    <Check className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-300 leading-relaxed">
                      <strong className="text-amber-500">The Solution:</strong> {point.solution}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT & IMPLEMENTATION REQUEST SECTION */}
      <section id="contact" className="py-20 md:py-28 bg-[#0b0f19] relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <span className="text-xs font-mono text-amber-500 tracking-wider uppercase bg-amber-500/10 px-3 py-1 rounded border border-amber-500/20">Get Started</span>
                <h2 className="font-display font-bold text-3xl md:text-4xl text-white tracking-tight">Connect Your AutoCount Today</h2>
                <p className="text-slate-400 leading-relaxed text-sm"> Let’s eliminate transcription bottlenecks and unlock productivity gains for your business. Our specialized AutoCount integration technicians will configure the mapping rules to fit your business Chart of Accounts.</p>
              </div>

              <div className="bg-slate-900/40 border border-slate-850 p-6 rounded-xl space-y-6">
                <h4 className="text-xs font-mono text-slate-500 uppercase tracking-wider border-b border-slate-850 pb-3 font-semibold">Macsoft Contact Details</h4>
                <div className="space-y-5">
                  <div className="flex items-start space-x-3.5 text-sm">
                    <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-white block mb-1">Office Address</span>
                      <p className="text-slate-400 leading-relaxed text-xs font-medium">No. 67A, Jalan Pulai 21,<br />Taman Pulai Utama, 81300 Skudai,<br />Johor, Malaysia</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3.5 text-sm">
                    <Phone className="w-5 h-5 text-amber-500 shrink-0" />
                    <div>
                      <span className="text-slate-500 block text-[10px] font-mono uppercase font-bold">Phone Support</span>
                      <a href="tel:+6075623111" className="text-slate-200 hover:text-white font-medium font-mono text-xs">+607-562 3111</a>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3.5 text-sm">
                    <Mail className="w-5 h-5 text-amber-500 shrink-0" />
                    <div>
                      <span className="text-slate-500 block text-[10px] font-mono uppercase font-bold">Direct Email</span>
                      <a href="mailto:sales@macsoft.my" className="text-slate-200 hover:text-white font-medium font-mono text-xs">sales@macsoft.my</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 bg-slate-900 border border-slate-850 rounded-xl p-8 md:p-10 relative overflow-hidden" id="contact-form">
              <AnimatePresence mode="wait">
                {submitSuccess ? (
                  <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="py-12 text-center space-y-6">
                    <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-500 mx-auto">
                      <Check className="w-8 h-8" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-display font-bold text-2xl text-white">Inquiry Sent Successfully</h3>
                      <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">Thank you for reaching out to Macsoft. Our specialized system integration team will contact you shortly to schedule an integration assessment.</p>
                    </div>
                    <button onClick={() => setSubmitSuccess(false)} className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-6 py-2.5 rounded text-sm transition-colors cursor-pointer">Submit Another Inquiry</button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmitForm} className="space-y-6">
                    <div className="border-b border-slate-850 pb-4 mb-2">
                      <h3 className="font-display font-bold text-lg text-white">Submit Implementation Request</h3>
                      <p className="text-slate-500 text-xs mt-1">Please provide details about your AutoCount environment to help us prepare.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label className="text-xs text-slate-400 font-medium block">Full Name *</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} placeholder="Your Name" className="w-full bg-[#0b0f19] border border-slate-800 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500" />
                        {formErrors.name && <span className="text-[11px] text-red-400 block mt-1">{formErrors.name}</span>}
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs text-slate-400 font-medium block">Company Name *</label>
                        <input type="text" id="companyName" name="companyName" value={formData.companyName} onChange={handleInputChange} placeholder="E.g., Syarikat Sdn Bhd" className="w-full bg-[#0b0f19] border border-slate-800 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500" />
                        {formErrors.companyName && <span className="text-[11px] text-red-400 block mt-1">{formErrors.companyName}</span>}
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs text-slate-400 font-medium block">Business Email *</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="name@company.my" className="w-full bg-[#0b0f19] border border-slate-800 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500" />
                        {formErrors.email && <span className="text-[11px] text-red-400 block mt-1">{formErrors.email}</span>}
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs text-slate-400 font-medium block">Phone Number *</label>
                        <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="E.g., +6012-3456789" className="w-full bg-[#0b0f19] border border-slate-800 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500" />
                        {formErrors.phone && <span className="text-[11px] text-red-400 block mt-1">{formErrors.phone}</span>}
                      </div>
                    </div>

                    <button type="submit" disabled={isSubmitting} className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-slate-800 text-slate-950 font-bold py-4 rounded text-sm flex items-center justify-center space-x-2 cursor-pointer shadow-lg shadow-amber-500/5">
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
      <footer className="bg-slate-950 border-t border-slate-900 py-12 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <span className="font-display font-bold text-slate-300 text-sm">Macsoft System Integration</span>
          </div>
          <div className="text-center md:text-right space-y-1 font-medium text-slate-400">
            <p>© {new Date().getFullYear()} Macsoft. All Rights Reserved.</p>
            <p className="text-[10px] text-slate-600">Skudai, Johor, Malaysia — Maximizing localized desktop accounting connectivity loops.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}