export interface ProblemSolutionShift {
  id: string;
  problemTitle: string;
  problemDesc: string;
  solutionTitle: string;
  solutionDesc: string;
}

export interface IntegrationStep {
  step: string;
  title: string;
  description: string;
  badge: string;
}

export interface OperationalBenefit {
  id: string;
  title: string;
  description: string;
}

export const problemSolutionShifts: ProblemSolutionShift[] = [
  {
    id: 'shift-1',
    problemTitle: 'Manual Data Entry Bottlenecks',
    problemDesc: 'Teams waste hours manually typing in invoice lines, registering debtor profiles, or adjusting inventory counts. Data entry queues overflow, causing operational friction.',
    solutionTitle: 'Autonomous CREATE & UPDATE',
    solutionDesc: 'The Assistant automatically writes and updates data records directly to AutoCount the moment a transaction happens, keeping business operations moving fluently.'
  },
  {
    id: 'shift-2',
    problemTitle: 'Delayed Decisions & Out-of-Sync Records',
    problemDesc: 'Management relies on laggy, late-posted reports, without knowing the exact current status of stock levels, debtor liabilities, or creditor accounts.',
    solutionTitle: 'Real-Time READ',
    solutionDesc: 'The agent continuously reads and syncs database records instantly, giving teams immediate access to accurate, live financial data in their AutoCount environment.'
  },
  {
    id: 'shift-3',
    problemTitle: 'Cluttered Databases & Legacy Errors',
    problemDesc: 'Human data entry mistakes, duplicate customer/supplier profiles, and cancelled entries clog up AutoCount, creating messy ledger balances.',
    solutionTitle: 'Secure & Managed DELETE',
    solutionDesc: 'The system can instantly clear out bad entries or remove retracted credit notes/invoices programmatically, keeping accounting books error-free.'
  }
];

export const integrationSteps: IntegrationStep[] = [
  {
    step: '01',
    title: 'Secure Database Connection',
    description: 'Link the MacSoft database agent directly to your AutoCount ledger environment (local server or cloud hosting) in under 2 hours. No complex custom APIs or system overhauls needed.',
    badge: 'Step 1: Setup'
  },
  {
    step: '02',
    title: 'Ledger & Tax Rules Mapping',
    description: 'Configure automated rules matching your business Chart of Accounts, supplier lists, debtor profiles, and SST tax codes to ensure 100% compliant bookkeeping.',
    badge: 'Step 2: Align'
  },
  {
    step: '03',
    title: 'Deploy & Automate',
    description: 'The autonomous agent begins processing transactions behind the scenes. It handles write, read, and delete operations safely in the background while maintaining a full audit log.',
    badge: 'Step 3: Run'
  }
];

export const operationalBenefits: OperationalBenefit[] = [
  {
    id: 'benefit-1',
    title: 'Zero Time Waste',
    description: 'Eliminate hours of manual data entry. The assistant executes AutoCount transactions instantly, allowing your team to reallocate hundreds of monthly hours to business growth.'
  },
  {
    id: 'benefit-2',
    title: 'Stop Development Blockages',
    description: 'No custom code or complex integrations required. The assistant connects natively with the AutoCount database, deploying in days rather than months.'
  },
  {
    id: 'benefit-3',
    title: 'Focus on High-Value Tasks',
    description: 'Free your accounting team from mechanical data entry. Shift their focus to financial analysis, strategic planning, and cost optimization for your SME.'
  }
];
