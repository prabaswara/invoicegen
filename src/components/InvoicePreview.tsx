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
    <div id="invoice-preview" className="bg-white p-8 md:p-12 max-w-[800px] mx-auto shadow-lg">
      {/* Header */}
      <div className="flex justify-between items-start mb-10 pb-8 border-b-2 border-blue-600">
        <div>
          <h1 className="text-3xl font-bold text-blue-600 mb-1">INVOICE</h1>
          <p className="text-gray-500 text-sm">#{data.invoiceNumber || 'INV-001'}</p>
        </div>
        <div className="text-right">
          <h2 className="text-xl font-bold text-gray-800">{data.fromName || 'Nama Perusahaan'}</h2>
          <p className="text-gray-500 text-sm mt-1">{data.fromAddress}</p>
          <p className="text-gray-500 text-sm">{data.fromEmail}</p>
          <p className="text-gray-500 text-sm">{data.fromPhone}</p>
        </div>
      </div>

      {/* Bill To & Dates */}
      <div className="grid grid-cols-2 gap-8 mb-10">
        <div>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Ditagihkan Kepada</h3>
          <p className="text-gray-800 font-semibold">{data.toName || 'Nama Klien'}</p>
          <p className="text-gray-500 text-sm mt-1">{data.toAddress}</p>
          <p className="text-gray-500 text-sm">{data.toEmail}</p>
          <p className="text-gray-500 text-sm">{data.toPhone}</p>
        </div>
        <div className="text-right">
          <div className="mb-3">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Tanggal Invoice</span>
            <p className="text-gray-800 font-medium">{formatDate(data.invoiceDate)}</p>
          </div>
          <div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Jatuh Tempo</span>
            <p className="text-gray-800 font-medium">{formatDate(data.dueDate)}</p>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="mb-8">
        <table className="w-full">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="text-left py-3 px-4 rounded-tl-lg text-sm font-semibold">Deskripsi</th>
              <th className="text-center py-3 px-4 text-sm font-semibold">Qty</th>
              <th className="text-right py-3 px-4 text-sm font-semibold">Harga</th>
              <th className="text-right py-3 px-4 rounded-tr-lg text-sm font-semibold">Total</th>
            </tr>
          </thead>
          <tbody>
            {data.items.length > 0 ? (
              data.items.map((item, index) => (
                <tr
                  key={item.id}
                  className={`border-b border-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                >
                  <td className="py-3 px-4 text-gray-700 text-sm">{item.description || '-'}</td>
                  <td className="py-3 px-4 text-center text-gray-700 text-sm">{item.quantity}</td>
                  <td className="py-3 px-4 text-right text-gray-700 text-sm">{formatCurrency(item.price)}</td>
                  <td className="py-3 px-4 text-right text-gray-800 font-medium text-sm">
                    {formatCurrency(item.quantity * item.price)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-6 text-center text-gray-400 text-sm">
                  Belum ada item. Tambahkan item di form.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="flex justify-end mb-10">
        <div className="w-64">
          <div className="flex justify-between py-2 text-sm">
            <span className="text-gray-500">Subtotal</span>
            <span className="text-gray-800 font-medium">{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between py-2 text-sm border-b border-gray-200">
            <span className="text-gray-500">Pajak ({data.taxRate}%)</span>
            <span className="text-gray-800 font-medium">{formatCurrency(taxAmount)}</span>
          </div>
          <div className="flex justify-between py-3 mt-1">
            <span className="text-lg font-bold text-gray-800">Total</span>
            <span className="text-lg font-bold text-blue-600">{formatCurrency(total)}</span>
          </div>
        </div>
      </div>

      {/* Notes */}
      {data.notes && (
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Catatan</h3>
          <p className="text-gray-600 text-sm">{data.notes}</p>
        </div>
      )}

      {/* Footer */}
      <div className="mt-10 pt-6 border-t border-gray-100 text-center">
        <p className="text-gray-400 text-xs">Terima kasih atas bisnis Anda!</p>
      </div>
    </div>
  );
};

export default InvoicePreview;
