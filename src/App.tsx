import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import InvoiceForm from './components/InvoiceForm';
import InvoicePreview from './components/InvoicePreview';
import { InvoiceData } from './types';

const initialData: InvoiceData = {
  invoiceNumber: 'INV-001',
  invoiceDate: new Date().toISOString().split('T')[0],
  dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  fromName: 'PT Maju Bersama',
  fromEmail: 'info@majubersama.com',
  fromPhone: '+62 21 555 1234',
  fromAddress: 'Jl. Sudirman No. 123, Jakarta Selatan',
  toName: 'PT Klien Sejahtera',
  toEmail: 'billing@klien.com',
  toPhone: '+62 21 888 5678',
  toAddress: 'Jl. Gatot Subroto No. 45, Jakarta',
  items: [
    { id: '1', description: 'Jasa Desain Website', quantity: 1, price: 5000000 },
    { id: '2', description: 'Hosting & Domain (1 Tahun)', quantity: 1, price: 1500000 },
    { id: '3', description: 'Maintenance Bulanan', quantity: 3, price: 500000 },
  ],
  notes: 'Pembayaran dapat ditransfer ke rekening BCA 1234567890 a.n. PT Maju Bersama. Terima kasih!',
  taxRate: 11,
  currency: 'Rp',
};

function App() {
  const [data, setData] = useState<InvoiceData>(initialData);
  const [activeTab, setActiveTab] = useState<'form' | 'preview'>('form');
  const [isDownloading, setIsDownloading] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    const element = document.getElementById('invoice-preview');
    if (!element) return;

    setIsDownloading(true);
    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`invoice-${data.invoiceNumber || 'draft'}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Gagal mengunduh PDF. Silakan coba lagi.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Invoice Generator</h1>
              <p className="text-xs text-gray-400">Buat & unduh invoice dengan mudah</p>
            </div>
          </div>
          <button
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            {isDownloading ? (
              <>
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Mengunduh...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download PDF
              </>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Tab Switcher */}
      <div className="lg:hidden sticky top-[73px] z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="flex">
          <button
            onClick={() => setActiveTab('form')}
            className={`flex-1 py-3 text-sm font-medium transition-all ${
              activeTab === 'form'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            ✏️ Edit Invoice
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex-1 py-3 text-sm font-medium transition-all ${
              activeTab === 'preview'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            👁️ Preview
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Form Panel */}
          <div
            ref={previewRef}
            className={`w-full lg:w-[45%] lg:max-h-[calc(100vh-140px)] lg:overflow-y-auto lg:pr-2 scrollbar-thin ${
              activeTab !== 'form' ? 'hidden lg:block' : ''
            }`}
          >
            <InvoiceForm data={data} onChange={setData} />
          </div>

          {/* Preview Panel */}
          <div
            className={`w-full lg:w-[55%] ${
              activeTab !== 'preview' ? 'hidden lg:block' : ''
            }`}
          >
            <div className="lg:sticky lg:top-[140px]">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-sm text-gray-500 font-medium">Preview Real-time</span>
              </div>
              <div className="bg-gray-100 rounded-2xl p-4 md:p-6 shadow-inner">
                <InvoicePreview data={data} />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-400 text-xs">
        <p>Invoice Generator &copy; 2026 — Buat invoice profesional dalam hitungan menit</p>
      </footer>
    </div>
  );
}

export default App;
