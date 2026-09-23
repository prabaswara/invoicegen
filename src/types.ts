export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
}

export interface InvoiceData {
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  fromName: string;
  fromEmail: string;
  fromPhone: string;
  fromAddress: string;
  toName: string;
  toEmail: string;
  toPhone: string;
  toAddress: string;
  items: InvoiceItem[];
  notes: string;
  taxRate: number;
  currency: string;
}
