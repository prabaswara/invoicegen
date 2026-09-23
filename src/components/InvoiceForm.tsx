import React from 'react';
import { InvoiceData, InvoiceItem } from '../types';

interface Props {
  data: InvoiceData;
  onChange: (data: InvoiceData) => void;
}

const InvoiceForm: React.FC<Props> = ({ data, onChange }) => {
  const updateField = (field: keyof InvoiceData, value: string | number | InvoiceItem[]) => {
    onChange({ ...data, [field]: value });
  };

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      description: '',
      quantity: 1,
      price: 0,
    };
    updateField('items', [...data.items, newItem]);
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    const updatedItems = data.items.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    updateField('items', updatedItems);
  };

  const removeItem = (id: string) => {
    updateField(
      'items',
      data.items.filter((item) => item.id !== id)
    );
  };

  return (
    <div className="space-y-6">
      {/* Invoice Info */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm">📄</span>
          Informasi Invoice
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Nomor Invoice</label>
            <input
              type="text"
              value={data.invoiceNumber}
              onChange={(e) => updateField('invoiceNumber', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
              placeholder="INV-001"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Mata Uang</label>
            <select
              value={data.currency}
              onChange={(e) => updateField('currency', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
            >
              <option value="Rp">IDR (Rp)</option>
              <option value="$">USD ($)</option>
              <option value="€">EUR (€)</option>
              <option value="¥">JPY (¥)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Tanggal Invoice</label>
            <input
              type="date"
              value={data.invoiceDate}
              onChange={(e) => updateField('invoiceDate', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Jatuh Tempo</label>
            <input
              type="date"
              value={data.dueDate}
              onChange={(e) => updateField('dueDate', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Pajak (%)</label>
            <input
              type="number"
              value={data.taxRate}
              onChange={(e) => updateField('taxRate', parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
              min="0"
              max="100"
            />
          </div>
        </div>
      </div>

      {/* From */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <span className="w-8 h-8 bg-green-100 text-green-600 rounded-lg flex items-center justify-center text-sm">🏢</span>
          Dari (Pengirim)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Nama Perusahaan</label>
            <input
              type="text"
              value={data.fromName}
              onChange={(e) => updateField('fromName', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
              placeholder="Nama Perusahaan Anda"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
            <input
              type="email"
              value={data.fromEmail}
              onChange={(e) => updateField('fromEmail', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
              placeholder="email@perusahaan.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Telepon</label>
            <input
              type="text"
              value={data.fromPhone}
              onChange={(e) => updateField('fromPhone', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
              placeholder="+62 812 3456 7890"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Alamat</label>
            <input
              type="text"
              value={data.fromAddress}
              onChange={(e) => updateField('fromAddress', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
              placeholder="Jl. Contoh No. 123, Jakarta"
            />
          </div>
        </div>
      </div>

      {/* To */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <span className="w-8 h-8 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center text-sm">👤</span>
          Kepada (Penerima)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Nama Klien</label>
            <input
              type="text"
              value={data.toName}
              onChange={(e) => updateField('toName', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
              placeholder="Nama Klien"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
            <input
              type="email"
              value={data.toEmail}
              onChange={(e) => updateField('toEmail', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
              placeholder="email@klien.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Telepon</label>
            <input
              type="text"
              value={data.toPhone}
              onChange={(e) => updateField('toPhone', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
              placeholder="+62 812 3456 7890"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Alamat</label>
            <input
              type="text"
              value={data.toAddress}
              onChange={(e) => updateField('toAddress', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
              placeholder="Alamat Klien"
            />
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <span className="w-8 h-8 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center text-sm">📦</span>
          Item Invoice
        </h3>
        <div className="space-y-3">
          {data.items.map((item, index) => (
            <div key={item.id} className="grid grid-cols-12 gap-2 items-end bg-gray-50 p-3 rounded-lg">
              <div className="col-span-12 md:col-span-5">
                <label className="block text-xs font-medium text-gray-500 mb-1">Deskripsi</label>
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-sm"
                  placeholder={`Item ${index + 1}`}
                />
              </div>
              <div className="col-span-4 md:col-span-2">
                <label className="block text-xs font-medium text-gray-500 mb-1">Qty</label>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-sm"
                  min="1"
                />
              </div>
              <div className="col-span-5 md:col-span-3">
                <label className="block text-xs font-medium text-gray-500 mb-1">Harga</label>
                <input
                  type="number"
                  value={item.price}
                  onChange={(e) => updateItem(item.id, 'price', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-sm"
                  min="0"
                />
              </div>
              <div className="col-span-3 md:col-span-2 flex items-end">
                <button
                  onClick={() => removeItem(item.id)}
                  className="w-full px-3 py-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={addItem}
          className="mt-4 w-full py-2.5 border-2 border-dashed border-gray-200 rounded-lg text-gray-500 hover:border-blue-400 hover:text-blue-500 transition-all flex items-center justify-center gap-2 text-sm font-medium"
        >
          <span className="text-lg">+</span> Tambah Item
        </button>
      </div>

      {/* Notes */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <span className="w-8 h-8 bg-yellow-100 text-yellow-600 rounded-lg flex items-center justify-center text-sm">📝</span>
          Catatan
        </h3>
        <textarea
          value={data.notes}
          onChange={(e) => updateField('notes', e.target.value)}
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none resize-none"
          rows={3}
          placeholder="Terima kasih atas bisnis Anda!"
        />
      </div>
    </div>
  );
};

export default InvoiceForm;
