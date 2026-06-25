export interface Inquiry {
  id: string;
  name: string;
  companyName: string;
  email: string;
  phone: string;
  monthlyInvoices: string;
  message: string;
  timestamp: string;
}

export interface DemoDocument {
  id: string;
  name: string;
  type: 'invoice' | 'receipt' | 'bank_statement';
  size: string;
  supplier: string;
  rawAmount: string;
  extractedDate: string;
  ledgerAccount: string;
  items: { description: string; amount: number; qty: number }[];
}
