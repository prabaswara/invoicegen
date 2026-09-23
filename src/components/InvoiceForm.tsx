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
    <div className="space-y-4 sm:space-y-5 animate-slide-up">
      {/* Invoice Info */}
      <div className="card-hover bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg shadow-amber-100/50 border border-amber-100/50 p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-extrabold text-gray-800 mb-4 flex items-center gap-2">
          <span className="w-9 h-9 bg-gradient-to-br from-amber-300 to-orange-400 rounded-xl flex items-center justify-center text-lg shadow-md shadow-amber-200/50">📄</span>
          <span>Info Invoice</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">Nomor Invoice</label>
            <input
              type="text"
              value={data.invoiceNumber}
              onChange={(e) => updateField('invoiceNumber', e.target.value)}
              className="input-cheerful w-full px-4 py-2.5 rounded-xl text-sm font-medium"
              placeholder="INV-001"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">Mata Uang</label>
            <select
              value={data.currency}
              onChange={(e) => updateField('currency', e.target.value)}
              className="input-cheerful w-full px-4 py-2.5 rounded-xl text-sm font-medium bg-white"
            >
              <option value="Rp">🇮🇩 IDR (Rp)</option>
              <option value="$">🇺🇸 USD ($)</option>
              <option value="€">🇪🇺 EUR (€)</option>
              <option value="¥">🇯🇵 JPY (¥)</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">📅 Tanggal Invoice</label>
            <input
              type="date"
              value={data.invoiceDate}
              onChange={(e) => updateField('invoiceDate', e.target.value)}
              className="input-cheerful w-full px-4 py-2.5 rounded-xl text-sm font-medium"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">⏰ Jatuh Tempo</label>
            <input
              type="date"
              value={data.dueDate}
              onChange={(e) => updateField('dueDate', e.target.value)}
              className="input-cheerful w-full px-4 py-2.5 rounded-xl text-sm font-medium"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">💰 Pajak (%)</label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                value={data.taxRate}
                onChange={(e) => updateField('taxRate', parseFloat(e.target.value) || 0)}
                className="flex-1 h-2 bg-gradient-to-r from-green-200 to-green-400 rounded-full appearance-none cursor-pointer accent-green-500"
                min="0"
                max="30"
              />
              <span className="text-sm font-bold text-green-600 bg-green-100 px-3 py-1 rounded-lg min-w-[50px] text-center">
                {data.taxRate}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* From */}
      <div className="card-hover bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg shadow-green-100/50 border border-green-100/50 p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-extrabold text-gray-800 mb-4 flex items-center gap-2">
          <span className="w-9 h-9 bg-gradient-to-br from-green-300 to-emerald-500 rounded-xl flex items-center justify-center text-lg shadow-md shadow-green-200/50">🏢</span>
          <span>Dari (Pengirim)</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">Nama Perusahaan</label>
            <input
              type="text"
              value={data.fromName}
              onChange={(e) => updateField('fromName', e.target.value)}
              className="input-cheerful w-full px-4 py-2.5 rounded-xl text-sm font-medium"
              placeholder="Nama Perusahaan Anda"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">📧 Email</label>
            <input
              type="email"
              value={data.fromEmail}
              onChange={(e) => updateField('fromEmail', e.target.value)}
              className="input-cheerful w-full px-4 py-2.5 rounded-xl text-sm font-medium"
              placeholder="email@perusahaan.com"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">📱 Telepon</label>
            <input
              type="text"
              value={data.fromPhone}
              onChange={(e) => updateField('fromPhone', e.target.value)}
              className="input-cheerful w-full px-4 py-2.5 rounded-xl text-sm font-medium"
              placeholder="+62 812 3456 7890"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">📍 Alamat</label>
            <input
              type="text"
              value={data.fromAddress}
              onChange={(e) => updateField('fromAddress', e.target.value)}
              className="input-cheerful w-full px-4 py-2.5 rounded-xl text-sm font-medium"
              placeholder="Jl. Contoh No. 123, Jakarta"
            />
          </div>
        </div>
      </div>

      {/* To */}
      <div className="card-hover bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg shadow-purple-100/50 border border-purple-100/50 p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-extrabold text-gray-800 mb-4 flex items-center gap-2">
          <span className="w-9 h-9 bg-gradient-to-br from-purple-300 to-violet-500 rounded-xl flex items-center justify-center text-lg shadow-md shadow-purple-200/50">👤</span>
          <span>Kepada (Penerima)</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">Nama Klien</label>
            <input
              type="text"
              value={data.toName}
              onChange={(e) => updateField('toName', e.target.value)}
              className="input-cheerful w-full px-4 py-2.5 rounded-xl text-sm font-medium"
              placeholder="Nama Klien"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">📧 Email</label>
            <input
              type="email"
              value={data.toEmail}
              onChange={(e) => updateField('toEmail', e.target.value)}
              className="input-cheerful w-full px-4 py-2.5 rounded-xl text-sm font-medium"
              placeholder="email@klien.com"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">📱 Telepon</label>
            <input
              type="text"
              value={data.toPhone}
              onChange={(e) => updateField('toPhone', e.target.value)}
              className="input-cheerful w-full px-4 py-2.5 rounded-xl text-sm font-medium"
              placeholder="+62 812 3456 7890"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">📍 Alamat</label>
            <input
              type="text"
              value={data.toAddress}
              onChange={(e) => updateField('toAddress', e.target.value)}
              className="input-cheerful w-full px-4 py-2.5 rounded-xl text-sm font-medium"
              placeholder="Alamat Klien"
            />
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="card-hover bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg shadow-pink-100/50 border border-pink-100/50 p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-extrabold text-gray-800 mb-4 flex items-center gap-2">
          <span className="w-9 h-9 bg-gradient-to-br from-pink-300 to-rose-500 rounded-xl flex items-center justify-center text-lg shadow-md shadow-pink-200/50">📦</span>
          <span>Item Invoice</span>
          <span className="ml-auto text-xs font-bold text-pink-500 bg-pink-50 px-2.5 py-1 rounded-full">
            {data.items.length} item
          </span>
        </h3>
        <div className="space-y-3">
          {data.items.map((item, index) => (
            <div
              key={item.id}
              className="animate-pop-in bg-gradient-to-r from-pink-50/80 to-purple-50/80 p-3 sm:p-4 rounded-2xl border border-pink-100/50 relative group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
                <span className="text-xs font-bold text-pink-400 bg-white/80 px-2 py-0.5 rounded-full">
                  #{index + 1}
                </span>
              </div>
              <div className="grid grid-cols-12 gap-2 sm:gap-3 items-end pt-4 sm:pt-0">
                <div className="col-span-12 sm:col-span-5">
                  <label className="block text-[10px] sm:text-xs font-bold text-gray-400 mb-1 uppercase tracking-wide">Deskripsi</label>
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                    className="input-cheerful w-full px-3 py-2 rounded-xl text-sm font-medium"
                    placeholder={`Item ${index + 1}`}
                  />
                </div>
                <div className="col-span-4 sm:col-span-2">
                  <label className="block text-[10px] sm:text-xs font-bold text-gray-400 mb-1 uppercase tracking-wide">Qty</label>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                    className="input-cheerful w-full px-3 py-2 rounded-xl text-sm font-medium"
                    min="1"
                  />
                </div>
                <div className="col-span-5 sm:col-span-3">
                  <label className="block text-[10px] sm:text-xs font-bold text-gray-400 mb-1 uppercase tracking-wide">Harga</label>
                  <input
                    type="number"
                    value={item.price}
                    onChange={(e) => updateItem(item.id, 'price', parseFloat(e.target.value) || 0)}
                    className="input-cheerful w-full px-3 py-2 rounded-xl text-sm font-medium"
                    min="0"
                  />
                </div>
                <div className="col-span-3 sm:col-span-2 flex items-end">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="btn-press w-full px-3 py-2 bg-red-50 text-red-400 rounded-xl hover:bg-red-100 hover:text-red-500 transition-all text-xs sm:text-sm font-bold border border-red-100"
                  >
                    🗑️
                  </button>
                </div>
              </div>
              {/* Subtotal display */}
              <div className="mt-2 text-right">
                <span className="text-xs font-bold text-purple-500 bg-purple-50 px-2 py-0.5 rounded-full">
                  = {(item.quantity * item.price).toLocaleString('id-ID')} {data.currency === 'Rp' ? 'Rp' : data.currency}
                </span>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={addItem}
          className="btn-press mt-4 w-full py-3 border-2 border-dashed border-pink-200 rounded-2xl text-pink-400 hover:border-pink-400 hover:text-pink-500 hover:bg-pink-50/50 transition-all flex items-center justify-center gap-2 text-sm font-bold"
        >
          <span className="text-xl animate-bounce-slow">✨</span> Tambah Item Baru
        </button>
      </div>

      {/* Notes */}
      <div className="card-hover bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg shadow-cyan-100/50 border border-cyan-100/50 p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-extrabold text-gray-800 mb-4 flex items-center gap-2">
          <span className="w-9 h-9 bg-gradient-to-br from-cyan-300 to-blue-500 rounded-xl flex items-center justify-center text-lg shadow-md shadow-cyan-200/50">📝</span>
          <span>Catatan</span>
        </h3>
        <textarea
          value={data.notes}
          onChange={(e) => updateField('notes', e.target.value)}
          className="input-cheerful w-full px-4 py-3 rounded-xl text-sm font-medium resize-none"
          rows={3}
          placeholder="Terima kasih atas bisnis Anda! 💕"
        />
      </div>
    </div>
  );
};

export default InvoiceForm;
