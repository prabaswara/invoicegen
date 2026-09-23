import React from 'react';
import { InvoiceData } from '../types';

interface Props {
  data: InvoiceData;
}

const InvoicePreview: React.FC<Props> = ({ data }) => {
  const formatCurrency = (amount: number) => {
    if (data.currency === 'Rp') {
      return `${data.currency} ${amount.toLocaleString('id-ID')}`;
    }
    return `${data.currency}${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const subtotal = data.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  const taxAmount = subtotal * (data.taxRate / 100);
  const total = subtotal + taxAmount;

  return (
    <div id="invoice-preview" className="bg-white rounded-3xl overflow-hidden max-w-[800px] mx-auto" style={{
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
    }}>
      {/* Colorful Header Banner */}
      <div className="p-6 sm:p-8 relative overflow-hidden" style={{
        background: 'linear-gradient(135deg, #fbbf24 0%, #ec4899 50%, #8b5cf6 100%)'
      }}>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full translate-x-1/3 translate-y-1/3"></div>
          <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-white rounded-full"></div>
        </div>
        <div className="relative flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">INVOICE</h1>
            <p className="text-white/80 text-sm font-bold mt-1">#{data.invoiceNumber || 'INV-001'}</p>
          </div>
          <div className="text-left sm:text-right">
            <h2 className="text-lg sm:text-xl font-extrabold text-white">{data.fromName || 'Nama Perusahaan'}</h2>
            <div className="text-white/80 text-xs sm:text-sm mt-1 space-y-0.5">
              <p>{data.fromAddress}</p>
              <p>{data.fromEmail}</p>
              <p>{data.fromPhone}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-8">
        {/* Bill To & Dates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-100/50">
            <h3 className="text-[10px] sm:text-xs font-black text-purple-500 uppercase tracking-widest mb-2 flex items-center gap-1">
              <span>👤</span> Ditagihkan Kepada
            </h3>
            <p className="text-gray-800 font-extrabold text-sm sm:text-base">{data.toName || 'Nama Klien'}</p>
            <div className="text-gray-500 text-xs sm:text-sm mt-1 space-y-0.5">
              <p>{data.toAddress}</p>
              <p>{data.toEmail}</p>
              <p>{data.toPhone}</p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-4 border border-amber-100/50">
            <div className="space-y-3">
              <div>
                <span className="text-[10px] sm:text-xs font-black text-amber-500 uppercase tracking-widest flex items-center gap-1">
                  <span>📅</span> Tanggal Invoice
                </span>
                <p className="text-gray-800 font-bold text-sm sm:text-base mt-0.5">{formatDate(data.invoiceDate)}</p>
              </div>
              <div className="border-t border-amber-100 pt-3">
                <span className="text-[10px] sm:text-xs font-black text-amber-500 uppercase tracking-widest flex items-center gap-1">
                  <span>⏰</span> Jatuh Tempo
                </span>
                <p className="text-gray-800 font-bold text-sm sm:text-base mt-0.5">{formatDate(data.dueDate)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="mb-8 overflow-x-auto -mx-2 sm:mx-0">
          <table className="w-full min-w-[400px]">
            <thead>
              <tr className="text-white" style={{
                background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)'
              }}>
                <th className="text-left py-3 px-3 sm:px-4 rounded-tl-2xl text-xs sm:text-sm font-bold">Deskripsi</th>
                <th className="text-center py-3 px-3 sm:px-4 text-xs sm:text-sm font-bold">Qty</th>
                <th className="text-right py-3 px-3 sm:px-4 text-xs sm:text-sm font-bold">Harga</th>
                <th className="text-right py-3 px-3 sm:px-4 rounded-tr-2xl text-xs sm:text-sm font-bold">Total</th>
              </tr>
            </thead>
            <tbody>
              {data.items.length > 0 ? (
                data.items.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`border-b border-gray-100 ${
                      index % 2 === 0 ? 'bg-gradient-to-r from-pink-50/50 to-purple-50/50' : 'bg-white'
                    }`}
                  >
                    <td className="py-3 px-3 sm:px-4 text-gray-700 text-xs sm:text-sm font-medium">{item.description || '-'}</td>
                    <td className="py-3 px-3 sm:px-4 text-center">
                      <span className="inline-block bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full text-xs font-bold">
                        {item.quantity}
                      </span>
                    </td>
                    <td className="py-3 px-3 sm:px-4 text-right text-gray-600 text-xs sm:text-sm font-medium">{formatCurrency(item.price)}</td>
                    <td className="py-3 px-3 sm:px-4 text-right text-gray-800 font-bold text-xs sm:text-sm">
                      {formatCurrency(item.quantity * item.price)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-gray-300 text-sm">
                    <span className="text-3xl block mb-2">📦</span>
                    Belum ada item. Tambahkan item di form.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="flex justify-end mb-8">
          <div className="w-full sm:w-72 rounded-2xl p-4 sm:p-5 border-2" style={{
            background: 'linear-gradient(135deg, #f9fafb 0%, #faf5ff 100%)',
            borderColor: '#e9d5ff'
          }}>
            <div className="flex justify-between py-2 text-sm">
              <span className="text-gray-500 font-medium">Subtotal</span>
              <span className="text-gray-800 font-bold">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between py-2 text-sm border-b border-purple-100">
              <span className="text-gray-500 font-medium">Pajak ({data.taxRate}%)</span>
              <span className="text-gray-800 font-bold">{formatCurrency(taxAmount)}</span>
            </div>
            <div className="flex justify-between py-3 mt-2 rounded-xl px-4 -mx-1" style={{
              background: 'linear-gradient(135deg, #fbbf24 0%, #ec4899 100%)'
            }}>
              <span className="text-base sm:text-lg font-black text-white">Total</span>
              <span className="text-base sm:text-lg font-black text-white">{formatCurrency(total)}</span>
            </div>
          </div>
        </div>

        {/* Notes */}
        {data.notes && (
          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-4 border border-cyan-100/50 mb-6">
            <h3 className="text-[10px] sm:text-xs font-black text-cyan-500 uppercase tracking-widest mb-2 flex items-center gap-1">
              <span>📝</span> Catatan
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{data.notes}</p>
          </div>
        )}

        {/* Footer */}
        <div className="text-center pt-4 border-t border-gray-100">
          <p className="text-gray-400 text-xs font-medium">
            Terima kasih atas bisnis Anda! 💕
          </p>
        </div>
      </div>
    </div>
  );
};

export default InvoicePreview;
