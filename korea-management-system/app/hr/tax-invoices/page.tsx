'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from '@/lib/LocaleContext';
import { translations } from '@/lib/translations';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { ArrowLeft, Receipt, Plus, Search, Eye, Trash2, X } from 'lucide-react';

interface TaxInvoice {
  id: number;
  taxInvoiceNumber: string;
  customer: string;
  businessNumber: string;
  issueDate: string;
  supplyAmount: number;
  taxAmount: number;
  totalAmount: number;
  items: { name: string; quantity: number; unit: string; unitPrice: number }[];
  paymentStatus: 'paid' | 'unpaid' | 'partial' | 'overdue';
  type: 'sales' | 'purchase';
}

export default function TaxInvoicesPage() {
  const router = useRouter();
  const { locale } = useLocale();
  const t = translations[locale];
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedInvoice, setSelectedInvoice] = useState<TaxInvoice | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [invoices, setInvoices] = useState<TaxInvoice[]>([
    { id: 1, taxInvoiceNumber: 'TAX-2026-001', customer: 'Brunei Energy Corp', businessNumber: '123-45-67890', issueDate: '2026-02-15', supplyAmount: 70000000, taxAmount: 7000000, totalAmount: 77000000, items: [{ name: 'Solar Inverter SI-5000', quantity: 20, unit: 'pcs', unitPrice: 3500000 }], paymentStatus: 'paid', type: 'sales' },
    { id: 2, taxInvoiceNumber: 'TAX-2026-002', customer: 'Samsung Electronics', businessNumber: '234-56-78901', issueDate: '2026-02-14', supplyAmount: 28900000, taxAmount: 2890000, totalAmount: 31790000, items: [{ name: 'LED Module A100', quantity: 500, unit: 'pcs', unitPrice: 45000 }], paymentStatus: 'paid', type: 'purchase' },
    { id: 3, taxInvoiceNumber: 'TAX-2026-003', customer: 'Thailand Power Solutions', businessNumber: '345-67-89012', issueDate: '2026-02-13', supplyAmount: 85000000, taxAmount: 8500000, totalAmount: 93500000, items: [{ name: 'Energy Saver Module ESM-200', quantity: 100, unit: 'pcs', unitPrice: 850000 }], paymentStatus: 'partial', type: 'sales' },
    { id: 4, taxInvoiceNumber: 'TAX-2026-004', customer: 'LG Chem', businessNumber: '456-78-90123', issueDate: '2026-02-12', supplyAmount: 15000000, taxAmount: 1500000, totalAmount: 16500000, items: [{ name: 'Battery Cell 3.7V', quantity: 1000, unit: 'pcs', unitPrice: 15000 }], paymentStatus: 'unpaid', type: 'purchase' },
    { id: 5, taxInvoiceNumber: 'TAX-2026-005', customer: 'Seoul Metro', businessNumber: '567-89-01234', issueDate: '2026-02-11', supplyAmount: 126000000, taxAmount: 12600000, totalAmount: 138600000, items: [{ name: 'Power Distribution Unit PDU-1000', quantity: 30, unit: 'pcs', unitPrice: 4200000 }], paymentStatus: 'paid', type: 'sales' },
    { id: 6, taxInvoiceNumber: 'TAX-2026-006', customer: 'SK Hynix', businessNumber: '678-90-12345', issueDate: '2026-02-10', supplyAmount: 8400000, taxAmount: 840000, totalAmount: 9240000, items: [{ name: 'Memory Chip 8GB', quantity: 300, unit: 'pcs', unitPrice: 28000 }], paymentStatus: 'overdue', type: 'purchase' },
    { id: 7, taxInvoiceNumber: 'TAX-2026-007', customer: 'Vietnam Green Tech', businessNumber: '789-01-23456', issueDate: '2026-02-09', supplyAmount: 60000000, taxAmount: 6000000, totalAmount: 66000000, items: [{ name: 'LED Controller LC-300', quantity: 500, unit: 'pcs', unitPrice: 120000 }], paymentStatus: 'unpaid', type: 'sales' },
    { id: 8, taxInvoiceNumber: 'TAX-2026-008', customer: 'Hyundai Steel', businessNumber: '890-12-34567', issueDate: '2026-02-08', supplyAmount: 12750000, taxAmount: 1275000, totalAmount: 14025000, items: [{ name: 'Steel Frame LK-200', quantity: 150, unit: 'pcs', unitPrice: 85000 }], paymentStatus: 'paid', type: 'purchase' },
    { id: 9, taxInvoiceNumber: 'TAX-2026-009', customer: 'KT Telecom', businessNumber: '901-23-45678', issueDate: '2026-02-07', supplyAmount: 155000000, taxAmount: 15500000, totalAmount: 170500000, items: [{ name: 'UPS System UPS-3000', quantity: 25, unit: 'pcs', unitPrice: 6200000 }], paymentStatus: 'paid', type: 'sales' },
    { id: 10, taxInvoiceNumber: 'TAX-2026-010', customer: 'Hanwha Solutions', businessNumber: '012-34-56789', issueDate: '2026-02-06', supplyAmount: 36000000, taxAmount: 3600000, totalAmount: 39600000, items: [{ name: 'Solar Panel 350W', quantity: 200, unit: 'pcs', unitPrice: 180000 }], paymentStatus: 'partial', type: 'purchase' },
  ]);

  const [newInvoice, setNewInvoice] = useState({
    customer: '', businessNumber: '', issueDate: '2026-02-15', itemName: '', quantity: 0, unit: 'pcs', unitPrice: 0, type: 'sales' as 'sales' | 'purchase',
  });

  const formatCurrency = (v: number) => '₩' + new Intl.NumberFormat(locale === 'ko' ? 'ko-KR' : 'en-US').format(v);

  const paymentBadge = (s: string) => {
    const map: Record<string, string> = { paid: 'bg-green-100 text-green-700', unpaid: 'bg-red-100 text-red-700', partial: 'bg-orange-100 text-orange-700', overdue: 'bg-red-200 text-red-800' };
    const label: Record<string, string> = { paid: t.paid, unpaid: t.unpaid, partial: t.partial, overdue: t.overdue };
    return <span className={`px-2 py-1 rounded-full text-xs font-medium ${map[s]}`}>{label[s]}</span>;
  };

  const typeBadge = (type: string) => {
    return type === 'sales'
      ? <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">{locale === 'ko' ? '매출' : 'Sales'}</span>
      : <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">{locale === 'ko' ? '매입' : 'Purchase'}</span>;
  };

  const filtered = invoices.filter(inv => {
    const matchSearch = inv.taxInvoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) || inv.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'all' || inv.paymentStatus === statusFilter;
    const matchType = typeFilter === 'all' || inv.type === typeFilter;
    return matchSearch && matchStatus && matchType;
  });

  const handleDelete = (id: number) => {
    if (confirm(locale === 'ko' ? '정말 삭제하시겠습니까?' : 'Are you sure you want to delete?')) {
      setInvoices(invoices.filter(inv => inv.id !== id));
    }
  };

  const handleCreate = () => {
    const newId = Math.max(...invoices.map(inv => inv.id)) + 1;
    const supplyAmount = newInvoice.quantity * newInvoice.unitPrice;
    const taxAmount = Math.round(supplyAmount * 0.1);
    setInvoices([...invoices, {
      id: newId,
      taxInvoiceNumber: `TAX-2026-${String(newId).padStart(3, '0')}`,
      customer: newInvoice.customer,
      businessNumber: newInvoice.businessNumber,
      issueDate: newInvoice.issueDate,
      supplyAmount,
      taxAmount,
      totalAmount: supplyAmount + taxAmount,
      items: [{ name: newInvoice.itemName, quantity: newInvoice.quantity, unit: newInvoice.unit, unitPrice: newInvoice.unitPrice }],
      paymentStatus: 'unpaid',
      type: newInvoice.type,
    }]);
    setIsAddModalOpen(false);
    setNewInvoice({ customer: '', businessNumber: '', issueDate: '2026-02-15', itemName: '', quantity: 0, unit: 'pcs', unitPrice: 0, type: 'sales' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => router.push('/hr/dashboard')} className="text-red-600 hover:text-red-800 flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />{t.back}
              </button>
              <div className="border-l-2 border-gray-300 pl-4 flex items-center gap-3">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                  <Receipt className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">{t.taxInvoices}</h1>
                  <p className="text-sm text-gray-600">{t.taxInvoicesDesc}</p>
                </div>
              </div>
            </div>
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md p-4 mb-6 flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder={locale === 'ko' ? '세금계산서 번호 또는 거래처 검색...' : 'Search tax invoice or company...'} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500" />
          </div>
          <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500">
            <option value="all">{locale === 'ko' ? '전체 유형' : 'All Types'}</option>
            <option value="sales">{locale === 'ko' ? '매출' : 'Sales'}</option>
            <option value="purchase">{locale === 'ko' ? '매입' : 'Purchase'}</option>
          </select>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500">
            <option value="all">{locale === 'ko' ? '모든 상태' : 'All Status'}</option>
            <option value="paid">{t.paid}</option>
            <option value="unpaid">{t.unpaid}</option>
            <option value="partial">{t.partial}</option>
            <option value="overdue">{t.overdue}</option>
          </select>
          <button onClick={() => setIsAddModalOpen(true)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <Plus className="w-4 h-4" />{t.addNew}
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-red-500 to-red-700 px-6 py-4">
            <h2 className="text-white font-bold text-lg">{t.taxInvoices} ({filtered.length})</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">No.</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">{t.taxInvoiceNumber}</th>
                  <th className="text-center px-4 py-3 text-xs font-medium text-gray-500 uppercase">{locale === 'ko' ? '유형' : 'Type'}</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">{locale === 'ko' ? '거래처' : 'Company'}</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">{locale === 'ko' ? '사업자번호' : 'Business No.'}</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">{t.issueDate}</th>
                  <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase">{locale === 'ko' ? '공급가액' : 'Supply Amount'}</th>
                  <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase">{t.tax}</th>
                  <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase">{t.grandTotal}</th>
                  <th className="text-center px-4 py-3 text-xs font-medium text-gray-500 uppercase">{t.paymentStatus}</th>
                  <th className="text-center px-4 py-3 text-xs font-medium text-gray-500 uppercase">{t.actions}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filtered.map((inv, idx) => (
                  <tr key={inv.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 text-sm text-gray-700">{idx + 1}</td>
                    <td className="px-4 py-4 text-sm font-medium text-red-600">{inv.taxInvoiceNumber}</td>
                    <td className="px-4 py-4 text-center">{typeBadge(inv.type)}</td>
                    <td className="px-4 py-4 text-sm text-gray-700">{inv.customer}</td>
                    <td className="px-4 py-4 text-sm text-gray-500 font-mono">{inv.businessNumber}</td>
                    <td className="px-4 py-4 text-sm text-gray-700">{inv.issueDate}</td>
                    <td className="px-4 py-4 text-sm text-gray-700 text-right">{formatCurrency(inv.supplyAmount)}</td>
                    <td className="px-4 py-4 text-sm text-gray-700 text-right">{formatCurrency(inv.taxAmount)}</td>
                    <td className="px-4 py-4 text-sm font-semibold text-gray-900 text-right">{formatCurrency(inv.totalAmount)}</td>
                    <td className="px-4 py-4 text-center">{paymentBadge(inv.paymentStatus)}</td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => setSelectedInvoice(inv)} className="text-red-500 hover:text-red-700"><Eye className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete(inv.id)} className="text-red-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* View Detail Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-red-500 to-red-700 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h3 className="text-white font-bold text-lg">{selectedInvoice.taxInvoiceNumber}</h3>
              <button onClick={() => setSelectedInvoice(null)} className="text-white/80 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-xs text-gray-500">{locale === 'ko' ? '거래처' : 'Company'}</p><p className="font-medium">{selectedInvoice.customer}</p></div>
                <div><p className="text-xs text-gray-500">{locale === 'ko' ? '사업자번호' : 'Business No.'}</p><p className="font-medium font-mono">{selectedInvoice.businessNumber}</p></div>
                <div><p className="text-xs text-gray-500">{locale === 'ko' ? '유형' : 'Type'}</p>{typeBadge(selectedInvoice.type)}</div>
                <div><p className="text-xs text-gray-500">{t.issueDate}</p><p className="font-medium">{selectedInvoice.issueDate}</p></div>
                <div><p className="text-xs text-gray-500">{t.paymentStatus}</p>{paymentBadge(selectedInvoice.paymentStatus)}</div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">{locale === 'ko' ? '항목' : 'Items'}</h4>
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-3 py-2">{locale === 'ko' ? '품목' : 'Item'}</th>
                      <th className="text-right px-3 py-2">{t.quantity}</th>
                      <th className="text-right px-3 py-2">{t.unitPrice}</th>
                      <th className="text-right px-3 py-2">{t.totalAmount}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedInvoice.items.map((item, i) => (
                      <tr key={i} className="border-t">
                        <td className="px-3 py-2">{item.name}</td>
                        <td className="px-3 py-2 text-right">{item.quantity} {item.unit}</td>
                        <td className="px-3 py-2 text-right">{formatCurrency(item.unitPrice)}</td>
                        <td className="px-3 py-2 text-right">{formatCurrency(item.quantity * item.unitPrice)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="border-t pt-3 space-y-1 text-right">
                <p className="text-sm">{locale === 'ko' ? '공급가액' : 'Supply Amount'}: {formatCurrency(selectedInvoice.supplyAmount)}</p>
                <p className="text-sm">{t.tax} (10%): {formatCurrency(selectedInvoice.taxAmount)}</p>
                <p className="text-lg font-bold">{t.grandTotal}: {formatCurrency(selectedInvoice.totalAmount)}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
            <div className="bg-gradient-to-r from-red-500 to-red-700 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h3 className="text-white font-bold text-lg">{t.addNew} {t.taxInvoices}</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-white/80 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">{locale === 'ko' ? '유형' : 'Type'}</label>
                <select value={newInvoice.type} onChange={e => setNewInvoice({ ...newInvoice, type: e.target.value as 'sales' | 'purchase' })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500">
                  <option value="sales">{locale === 'ko' ? '매출' : 'Sales'}</option>
                  <option value="purchase">{locale === 'ko' ? '매입' : 'Purchase'}</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">{locale === 'ko' ? '거래처' : 'Company'}</label><input value={newInvoice.customer} onChange={e => setNewInvoice({ ...newInvoice, customer: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">{locale === 'ko' ? '사업자번호' : 'Business No.'}</label><input value={newInvoice.businessNumber} onChange={e => setNewInvoice({ ...newInvoice, businessNumber: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500" /></div>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">{t.issueDate}</label><input type="date" value={newInvoice.issueDate} onChange={e => setNewInvoice({ ...newInvoice, issueDate: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">{locale === 'ko' ? '품목명' : 'Item Name'}</label><input value={newInvoice.itemName} onChange={e => setNewInvoice({ ...newInvoice, itemName: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500" /></div>
              <div className="grid grid-cols-3 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">{t.quantity}</label><input type="number" value={newInvoice.quantity} onChange={e => setNewInvoice({ ...newInvoice, quantity: Number(e.target.value) })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">{locale === 'ko' ? '단위' : 'Unit'}</label>
                  <select value={newInvoice.unit} onChange={e => setNewInvoice({ ...newInvoice, unit: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500">
                    <option value="pcs">pcs</option><option value="kg">kg</option><option value="sets">sets</option><option value="boxes">boxes</option>
                  </select>
                </div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">{t.unitPrice}</label><input type="number" value={newInvoice.unitPrice} onChange={e => setNewInvoice({ ...newInvoice, unitPrice: Number(e.target.value) })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500" /></div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">{t.cancel}</button>
                <button onClick={handleCreate} className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg">{t.save}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
