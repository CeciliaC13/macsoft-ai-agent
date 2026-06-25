import { DemoDocument } from './types';

export const demoDocuments: DemoDocument[] = [
  {
    id: 'doc-1',
    name: 'INV-2026-6819_Vanguard_Office.pdf',
    type: 'invoice',
    size: '142 KB',
    supplier: 'Vanguard Stationery Sdn Bhd',
    rawAmount: 'RM 1,284.50',
    extractedDate: '23 Jun 2026',
    ledgerAccount: '7210 - Printing & Office Stationery',
    items: [
      { description: 'Premium A4 Copier Paper (Double A)', qty: 10, amount: 240.00 },
      { description: 'Ergonomic Desk Organizers', qty: 5, amount: 450.00 },
      { description: 'Replacement Toner Cartridge HP 85A', qty: 2, amount: 594.50 },
    ]
  },
  {
    id: 'doc-2',
    name: 'PETRONAS_FUEL_94827.png',
    type: 'receipt',
    size: '88 KB',
    supplier: 'Petronas Station Taman Pulai Utama',
    rawAmount: 'RM 120.00',
    extractedDate: '21 Jun 2026',
    ledgerAccount: '7150 - Motor Vehicle Expenses (Petrol)',
    items: [
      { description: 'RON 97 Premium Fuel Purchase', qty: 1, amount: 120.00 }
    ]
  },
  {
    id: 'doc-3',
    name: 'MAYBANK_STATEMENT_REMITTANCE.pdf',
    type: 'bank_statement',
    size: '310 KB',
    supplier: 'Maybank Berhad (Ref: MS-99384)',
    rawAmount: 'RM 15,400.00',
    extractedDate: '20 Jun 2026',
    ledgerAccount: '3000 - Cash at Bank (Maybank)',
    items: [
      { description: 'Customer Invoice Payment (Syarikat Jaya)', qty: 1, amount: 15400.00 }
    ]
  }
];

export const painPoints = [
  {
    id: 'pain-1',
    title: 'Manual Double-Entry & Typos',
    problem: 'Staff spend 2-3 minutes typing out every single receipt. Discrepancies and mistyped tax codes lead to months of reconciliations and accounting delays.',
    solution: 'Our AI Agent extracts header and line-level data with 99.8% precision, mapping tax codes instantly.'
  },
  {
    id: 'pain-2',
    title: 'Operational Flow Bottlenecks',
    problem: 'Invoices pile up over the weekend, freezing vendor payments and stopping procurement. Operations grind to a halt because books aren\'t updated.',
    solution: 'Documents are processed 24/7 in background queues. Transactions are pre-parsed and ready for instant human verification.'
  },
  {
    id: 'pain-3',
    title: 'Sasted Strategic Talent',
    problem: 'High-salary accountants waste their days searching for missing paper slips, matching payments, and doing manual ledger entry instead of driving profitability.',
    solution: 'Free your team from tedious rote work. Let your accountants analyze margins while our AI Agent handles the mechanical entries.'
  }
];

export const features = [
  {
    id: 'feat-1',
    title: 'AutoCount Optimization',
    tagline: 'Built specifically for your AutoCount Ledger system.',
    description: 'No complicated system overhauls. Our AI Agent natively integrates with the AutoCount database and API schema. It reads raw PDF/image records and converts them directly into perfectly structured journal entries, purchase invoices, and payment vouchers matching your existing Chart of Accounts.',
    points: [
      'Automatic Chart of Accounts mapping',
      'Intelligent Tax Code assignment (SST / Exempt)',
      'Secure ledger schema integration'
    ]
  },
  {
    id: 'feat-2',
    title: 'Operational Flow Control',
    tagline: 'Keep development, sales, and accounts in sync.',
    description: 'Eliminate manual document handoffs. Suppliers and team members simply forward bills, purchase orders, and receipts to a designated secure email or folder. The AI Agent immediately ingests the files, processes the line items, and queues them for simple approval.',
    points: [
      'Instant document queue monitoring',
      'Real-time exception and anomaly alerts',
      'Secure centralized processing dashboard'
    ]
  },
  {
    id: 'feat-3',
    title: 'Unprecedented Productivity Gains',
    tagline: 'Say goodbye to late monthly closures.',
    description: 'Recover up to 32 productive hours per week. By automating the mechanical tasks of transcription, categorization, and ledger posting, SMEs reduce transaction cycle times from days to seconds. Achieve continuous, real-time reporting without adding head-count.',
    points: [
      '80%+ reduction in processing time',
      'Faster month-end financial closing cycles',
      'Reduces storage and physical paper overhead'
    ]
  }
];

export const steps = [
  {
    step: '01',
    title: 'Capture & Ingest',
    description: 'Forward vendor invoices, snap receipt photos on WhatsApp, or drag-and-drop batches into our secure queue.'
  },
  {
    step: '02',
    title: 'AI Parse & Map',
    description: 'The Macsoft Agent reads line-items, extracts values, and matches suppliers against your AutoCount partner list.'
  },
  {
    step: '03',
    title: 'One-Click Post',
    description: 'Review the automatically prepared ledger journal entry and push it securely into AutoCount in a single click.'
  }
];
