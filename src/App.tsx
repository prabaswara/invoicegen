import { useState } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import InvoiceForm from './components/InvoiceForm';
import InvoicePreview from './components/InvoicePreview';
import type { InvoiceData } from './types';

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
    <div className="min-h-screen confetti-bg bg-gradient-to-br from-amber-50 via-pink-50 to-purple-50">
      {/* Floating Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-200/30 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-pink-200/30 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 left-1/4 w-24 h-24 bg-purple-200/30 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-cyan-200/30 rounded-full blur-xl animate-float" style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* Header */}
      <header className="relative z-50 bg-white/70 backdrop-blur-xl border-b border-white/50 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-400 via-pink-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-pink-200/50 animate-gradient">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-sparkle"></div>
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-extrabold bg-gradient-to-r from-amber-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                  Invoice Generator ✨
                </h1>
                <p className="text-[10px] sm:text-xs text-gray-400 font-medium">Buat invoice cantik dalam sekejap!</p>
              </div>
            </div>
            <button
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className="btn-press flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-amber-400 via-pink-500 to-purple-600 text-white rounded-2xl font-bold text-sm shadow-lg shadow-pink-300/40 hover:shadow-xl hover:shadow-pink-300/60 transition-all hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 animate-gradient"
            >
              {isDownloading ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="hidden sm:inline">Mengunduh...</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span className="hidden sm:inline">Download PDF</span>
                  <span className="sm:hidden">PDF</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Tab Switcher */}
      <div className="lg:hidden sticky top-[65px] z-40 bg-white/70 backdrop-blur-xl border-b border-white/50 px-4 py-2">
        <div className="flex gap-2 bg-gray-100/80 p-1.5 rounded-2xl">
          <button
            onClick={() => setActiveTab('form')}
            className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all btn-press ${
              activeTab === 'form'
                ? 'bg-white text-purple-600 shadow-md shadow-purple-100'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            ✏️ Edit
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all btn-press ${
              activeTab === 'preview'
                ? 'bg-white text-purple-600 shadow-md shadow-purple-100'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            👁️ Preview
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
          {/* Form Panel */}
          <div
            className={`w-full lg:w-[45%] lg:max-h-[calc(100vh-160px)] lg:overflow-y-auto lg:pr-2 scrollbar-thin ${
              activeTab !== 'form' ? 'hidden lg:block' : ''
            }`}
          >
            <InvoiceForm data={data} onChange={(newData) => setData(newData)} />
          </div>

          {/* Preview Panel */}
          <div
            className={`w-full lg:w-[55%] ${
              activeTab !== 'preview' ? 'hidden lg:block' : ''
            }`}
          >
            <div className="lg:sticky lg:top-[140px]">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <div className="flex items-center gap-1.5 bg-green-100 px-3 py-1.5 rounded-full">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-xs text-green-700 font-bold">Live Preview</span>
                </div>
                <span className="text-xs text-gray-400 font-medium hidden sm:inline">— Perubahan langsung terlihat</span>
              </div>
              <div className="bg-gradient-to-br from-purple-100/50 via-pink-100/50 to-amber-100/50 rounded-3xl p-3 sm:p-5 md:p-8 shadow-inner border border-white/60">
                <InvoicePreview data={data} />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-6 sm:py-8">
        <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-white/50">
          <span className="text-sm">Dibuat dengan</span>
          <span className="text-pink-500 animate-bounce-slow">❤️</span>
          <span className="text-sm text-gray-500 font-medium">Invoice Generator © 2026</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
