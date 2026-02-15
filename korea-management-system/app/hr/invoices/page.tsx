'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from '@/lib/LocaleContext';
import { translations } from '@/lib/translations';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { ArrowLeft, FileText, Plus, Search, Eye, Trash2, X, Printer } from 'lucide-react';

interface Invoice {
  id: number;
  invoiceNumber: string;
  customer: string;
  issueDate: string;
  dueDate: string;
  items: { name: string; quantity: number; unit: string; unitPrice: number }[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  totalAmount: number;
  paymentStatus: 'paid' | 'unpaid' | 'partial' | 'overdue';
  notes: string;
}

export default function InvoicesPage() {
  const router = useRouter();
  const { locale } = useLocale();
  const t = translations[locale];
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [invoices, setInvoices] = useState<Invoice[]>([
    { id: 1, invoiceNumber: 'INV-2026-001', customer: 'Brunei Energy Corp', issueDate: '2026-02-15', dueDate: '2026-03-15', items: [{ name: 'Solar Inverter SI-5000', quantity: 20, unit: 'pcs', unitPrice: 3500000 }], subtotal: 70000000, taxRate: 10, taxAmount: 7000000, totalAmount: 77000000, paymentStatus: 'paid', notes: 'Payment received via wire transfer' },
    { id: 2, invoiceNumber: 'INV-2026-002', customer: 'Thailand Power Solutions', issueDate: '2026-02-14', dueDate: '2026-03-14', items: [{ name: 'Energy Saver Module ESM-200', quantity: 100, unit: 'pcs', unitPrice: 850000 }], subtotal: 85000000, taxRate: 10, taxAmount: 8500000, totalAmount: 93500000, paymentStatus: 'partial', notes: '50% deposit received' },
    { id: 3, invoiceNumber: 'INV-2026-003', customer: 'Vietnam Green Tech', issueDate: '2026-02-13', dueDate: '2026-03-13', items: [{ name: 'LED Controller LC-300', quantity: 500, unit: 'pcs', unitPrice: 120000 }], subtotal: 60000000, taxRate: 10, taxAmount: 6000000, totalAmount: 66000000, paymentStatus: 'unpaid', notes: '' },
    { id: 4, invoiceNumber: 'INV-2026-004', customer: 'Seoul Metro', issueDate: '2026-02-12', dueDate: '2026-03-12', items: [{ name: 'Power Distribution Unit PDU-1000', quantity: 30, unit: 'pcs', unitPrice: 4200000 }], subtotal: 126000000, taxRate: 10, taxAmount: 12600000, totalAmount: 138600000, paymentStatus: 'paid', notes: '' },
    { id: 5, invoiceNumber: 'INV-2026-005', customer: 'Busan Port Authority', issueDate: '2026-02-11', dueDate: '2026-02-25', items: [{ name: 'Industrial Battery IB-500', quantity: 50, unit: 'pcs', unitPrice: 2800000 }], subtotal: 140000000, taxRate: 10, taxAmount: 14000000, totalAmount: 154000000, paymentStatus: 'overdue', notes: 'Payment reminder sent' },
    { id: 6, invoiceNumber: 'INV-2026-006', customer: 'Incheon Airport Corp', issueDate: '2026-02-10', dueDate: '2026-03-10', items: [{ name: 'Smart Grid Controller SGC-100', quantity: 15, unit: 'pcs', unitPrice: 8500000 }], subtotal: 127500000, taxRate: 10, taxAmount: 12750000, totalAmount: 140250000, paymentStatus: 'unpaid', notes: '' },
    { id: 7, invoiceNumber: 'INV-2026-007', customer: 'Jeju Energy Co', issueDate: '2026-02-09', dueDate: '2026-03-09', items: [{ name: 'Wind Turbine Controller WTC-50', quantity: 5, unit: 'pcs', unitPrice: 15000000 }], subtotal: 75000000, taxRate: 10, taxAmount: 7500000, totalAmount: 82500000, paymentStatus: 'paid', notes: '' },
    { id: 8, invoiceNumber: 'INV-2026-008', customer: 'KT Telecom', issueDate: '2026-02-08', dueDate: '2026-03-08', items: [{ name: 'UPS System UPS-3000', quantity: 25, unit: 'pcs', unitPrice: 6200000 }], subtotal: 155000000, taxRate: 10, taxAmount: 15500000, totalAmount: 170500000, paymentStatus: 'paid', notes: '' },
    { id: 9, invoiceNumber: 'INV-2026-009', customer: 'Daegu Industrial Zone', issueDate: '2026-02-07', dueDate: '2026-03-07', items: [{ name: 'Voltage Regulator VR-200', quantity: 80, unit: 'pcs', unitPrice: 950000 }], subtotal: 76000000, taxRate: 10, taxAmount: 7600000, totalAmount: 83600000, paymentStatus: 'unpaid', notes: '' },
    { id: 10, invoiceNumber: 'INV-2026-010', customer: 'Gwangju Solar Farm', issueDate: '2026-02-06', dueDate: '2026-03-06', items: [{ name: 'Solar Panel SP-400W', quantity: 300, unit: 'pcs', unitPrice: 350000 }], subtotal: 105000000, taxRate: 10, taxAmount: 10500000, totalAmount: 115500000, paymentStatus: 'partial', notes: '30% advance paid' },
  ]);

  const [newInvoice, setNewInvoice] = useState({
    customer: '', issueDate: '2026-02-15', dueDate: '', itemName: '', quantity: 0, unit: 'pcs', unitPrice: 0, notes: '',
  });

  const formatCurrency = (v: number) => '₩' + new Intl.NumberFormat(locale === 'ko' ? 'ko-KR' : 'en-US').format(v);

  const paymentBadge = (s: string) => {
    const map: Record<string, string> = { paid: 'bg-green-100 text-green-700', unpaid: 'bg-red-100 text-red-700', partial: 'bg-orange-100 text-orange-700', overdue: 'bg-red-200 text-red-800' };
    const label: Record<string, string> = { paid: t.paid, unpaid: t.unpaid, partial: t.partial, overdue: t.overdue };
    return <span className={`px-2 py-1 rounded-full text-xs font-medium ${map[s]}`}>{label[s]}</span>;
  };

  const filtered = invoices.filter(inv => {
    const matchSearch = inv.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) || inv.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'all' || inv.paymentStatus === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleDelete = (id: number) => {
    if (confirm(locale === 'ko' ? '정말 삭제하시겠습니까?' : 'Are you sure you want to delete?')) {
      setInvoices(invoices.filter(inv => inv.id !== id));
    }
  };

  const handleCreate = () => {
    const newId = Math.max(...invoices.map(inv => inv.id)) + 1;
    const subtotal = newInvoice.quantity * newInvoice.unitPrice;
    const taxAmount = Math.round(subtotal * 0.1);
    setInvoices([...invoices, {
      id: newId,
      invoiceNumber: `INV-2026-${String(newId).padStart(3, '0')}`,
      customer: newInvoice.customer,
      issueDate: newInvoice.issueDate,
      dueDate: newInvoice.dueDate,
      items: [{ name: newInvoice.itemName, quantity: newInvoice.quantity, unit: newInvoice.unit, unitPrice: newInvoice.unitPrice }],
      subtotal,
      taxRate: 10,
      taxAmount,
      totalAmount: subtotal + taxAmount,
      paymentStatus: 'unpaid',
      notes: newInvoice.notes,
    }]);
    setIsAddModalOpen(false);
    setNewInvoice({ customer: '', issueDate: '2026-02-15', dueDate: '', itemName: '', quantity: 0, unit: 'pcs', unitPrice: 0, notes: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => router.push('/hr/dashboard')} className="text-orange-600 hover:text-orange-800 flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />{t.back}
              </button>
              <div className="border-l-2 border-gray-300 pl-4 flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">{t.invoices}</h1>
                  <p className="text-sm text-gray-600">{t.invoicesDesc}</p>
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
            <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder={locale === 'ko' ? '청구서 번호 또는 고객 검색...' : 'Search invoice number or customer...'} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500" />
          </div>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500">
            <option value="all">{locale === 'ko' ? '모든 상태' : 'All Status'}</option>
            <option value="paid">{t.paid}</option>
            <option value="unpaid">{t.unpaid}</option>
            <option value="partial">{t.partial}</option>
            <option value="overdue">{t.overdue}</option>
          </select>
          <button onClick={() => setIsAddModalOpen(true)} className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <Plus className="w-4 h-4" />{t.addNew}
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 to-orange-700 px-6 py-4">
            <h2 className="text-white font-bold text-lg">{t.invoices} ({filtered.length})</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">No.</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">{t.invoiceNumber}</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">{t.customer}</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">{t.issueDate}</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">{t.duePaymentDate}</th>
                  <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase">{t.subtotal}</th>
                  <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase">{t.tax} (10%)</th>
                  <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase">{t.grandTotal}</th>
                  <th className="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase">{t.paymentStatus}</th>
                  <th className="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase">{t.actions}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filtered.map((inv, idx) => (
                  <tr key={inv.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-700">{idx + 1}</td>
                    <td className="px-6 py-4 text-sm font-medium text-orange-600">{inv.invoiceNumber}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{inv.customer}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{inv.issueDate}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{inv.dueDate}</td>
                    <td className="px-6 py-4 text-sm text-gray-700 text-right">{formatCurrency(inv.subtotal)}</td>
                    <td className="px-6 py-4 text-sm text-gray-700 text-right">{formatCurrency(inv.taxAmount)}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900 text-right">{formatCurrency(inv.totalAmount)}</td>
                    <td className="px-6 py-4 text-center">{paymentBadge(inv.paymentStatus)}</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => setSelectedInvoice(inv)} className="text-orange-500 hover:text-orange-700"><Eye className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete(inv.id)} className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></button>
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
            <div className="bg-gradient-to-r from-orange-500 to-orange-700 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h3 className="text-white font-bold text-lg">{selectedInvoice.invoiceNumber}</h3>
              <button onClick={() => setSelectedInvoice(null)} className="text-white/80 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-xs text-gray-500">{t.customer}</p><p className="font-medium">{selectedInvoice.customer}</p></div>
                <div><p className="text-xs text-gray-500">{t.issueDate}</p><p className="font-medium">{selectedInvoice.issueDate}</p></div>
                <div><p className="text-xs text-gray-500">{t.duePaymentDate}</p><p className="font-medium">{selectedInvoice.dueDate}</p></div>
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
                <p className="text-sm">{t.subtotal}: {formatCurrency(selectedInvoice.subtotal)}</p>
                <p className="text-sm">{t.tax} (10%): {formatCurrency(selectedInvoice.taxAmount)}</p>
                <p className="text-lg font-bold">{t.grandTotal}: {formatCurrency(selectedInvoice.totalAmount)}</p>
              </div>
              {selectedInvoice.notes && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">{locale === 'ko' ? '비고' : 'Notes'}</p>
                  <p className="text-sm">{selectedInvoice.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
            <div className="bg-gradient-to-r from-orange-500 to-orange-700 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h3 className="text-white font-bold text-lg">{t.addNew} {t.invoices}</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-white/80 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">{t.customer}</label><input value={newInvoice.customer} onChange={e => setNewInvoice({ ...newInvoice, customer: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">{t.issueDate}</label><input type="date" value={newInvoice.issueDate} onChange={e => setNewInvoice({ ...newInvoice, issueDate: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">{t.duePaymentDate}</label><input type="date" value={newInvoice.dueDate} onChange={e => setNewInvoice({ ...newInvoice, dueDate: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500" /></div>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">{locale === 'ko' ? '품목명' : 'Item Name'}</label><input value={newInvoice.itemName} onChange={e => setNewInvoice({ ...newInvoice, itemName: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500" /></div>
              <div className="grid grid-cols-3 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">{t.quantity}</label><input type="number" value={newInvoice.quantity} onChange={e => setNewInvoice({ ...newInvoice, quantity: Number(e.target.value) })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">{locale === 'ko' ? '단위' : 'Unit'}</label>
                  <select value={newInvoice.unit} onChange={e => setNewInvoice({ ...newInvoice, unit: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500">
                    <option value="pcs">pcs</option><option value="kg">kg</option><option value="sets">sets</option><option value="boxes">boxes</option>
                  </select>
                </div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">{t.unitPrice}</label><input type="number" value={newInvoice.unitPrice} onChange={e => setNewInvoice({ ...newInvoice, unitPrice: Number(e.target.value) })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500" /></div>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">{locale === 'ko' ? '비고' : 'Notes'}</label><textarea value={newInvoice.notes} onChange={e => setNewInvoice({ ...newInvoice, notes: e.target.value })} rows={2} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500" /></div>
              <div className="flex justify-end gap-3 pt-4">
                <button onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">{t.cancel}</button>
                <button onClick={handleCreate} className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg">{t.save}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
