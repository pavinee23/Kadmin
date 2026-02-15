'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from '@/lib/LocaleContext';
import { translations } from '@/lib/translations';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { ArrowLeft, ShoppingBag, Plus, Search, Eye, Trash2, X } from 'lucide-react';

interface SalesOrder {
  id: number;
  soNumber: string;
  customer: string;
  date: string;
  dueDate: string;
  items: { name: string; quantity: number; unit: string; unitPrice: number }[];
  totalAmount: number;
  status: 'approved' | 'pending' | 'rejected' | 'cancelled';
  paymentStatus: 'paid' | 'unpaid' | 'partial' | 'overdue';
}

export default function SalesOrdersPage() {
  const router = useRouter();
  const { locale } = useLocale();
  const t = translations[locale];
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<SalesOrder | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [orders, setOrders] = useState<SalesOrder[]>([
    { id: 1, soNumber: 'SO-2026-001', customer: 'Brunei Energy Corp', date: '2026-02-15', dueDate: '2026-03-15', items: [{ name: 'Solar Inverter SI-5000', quantity: 20, unit: 'pcs', unitPrice: 3500000 }], totalAmount: 70000000, status: 'approved', paymentStatus: 'paid' },
    { id: 2, soNumber: 'SO-2026-002', customer: 'Thailand Power Solutions', date: '2026-02-14', dueDate: '2026-03-14', items: [{ name: 'Energy Saver Module ESM-200', quantity: 100, unit: 'pcs', unitPrice: 850000 }], totalAmount: 85000000, status: 'approved', paymentStatus: 'partial' },
    { id: 3, soNumber: 'SO-2026-003', customer: 'Vietnam Green Tech', date: '2026-02-13', dueDate: '2026-03-13', items: [{ name: 'LED Controller LC-300', quantity: 500, unit: 'pcs', unitPrice: 120000 }], totalAmount: 60000000, status: 'pending', paymentStatus: 'unpaid' },
    { id: 4, soNumber: 'SO-2026-004', customer: 'Seoul Metro', date: '2026-02-12', dueDate: '2026-03-12', items: [{ name: 'Power Distribution Unit PDU-1000', quantity: 30, unit: 'pcs', unitPrice: 4200000 }], totalAmount: 126000000, status: 'approved', paymentStatus: 'paid' },
    { id: 5, soNumber: 'SO-2026-005', customer: 'Busan Port Authority', date: '2026-02-11', dueDate: '2026-03-11', items: [{ name: 'Industrial Battery IB-500', quantity: 50, unit: 'pcs', unitPrice: 2800000 }], totalAmount: 140000000, status: 'approved', paymentStatus: 'unpaid' },
    { id: 6, soNumber: 'SO-2026-006', customer: 'Incheon Airport Corp', date: '2026-02-10', dueDate: '2026-03-10', items: [{ name: 'Smart Grid Controller SGC-100', quantity: 15, unit: 'pcs', unitPrice: 8500000 }], totalAmount: 127500000, status: 'approved', paymentStatus: 'overdue' },
    { id: 7, soNumber: 'SO-2026-007', customer: 'Jeju Energy Co', date: '2026-02-09', dueDate: '2026-03-09', items: [{ name: 'Wind Turbine Controller WTC-50', quantity: 5, unit: 'pcs', unitPrice: 15000000 }], totalAmount: 75000000, status: 'pending', paymentStatus: 'unpaid' },
    { id: 8, soNumber: 'SO-2026-008', customer: 'KT Telecom', date: '2026-02-08', dueDate: '2026-03-08', items: [{ name: 'UPS System UPS-3000', quantity: 25, unit: 'pcs', unitPrice: 6200000 }], totalAmount: 155000000, status: 'approved', paymentStatus: 'paid' },
    { id: 9, soNumber: 'SO-2026-009', customer: 'Daegu Industrial Zone', date: '2026-02-07', dueDate: '2026-03-07', items: [{ name: 'Voltage Regulator VR-200', quantity: 80, unit: 'pcs', unitPrice: 950000 }], totalAmount: 76000000, status: 'cancelled', paymentStatus: 'unpaid' },
    { id: 10, soNumber: 'SO-2026-010', customer: 'Gwangju Solar Farm', date: '2026-02-06', dueDate: '2026-03-06', items: [{ name: 'Solar Panel SP-400W', quantity: 300, unit: 'pcs', unitPrice: 350000 }], totalAmount: 105000000, status: 'approved', paymentStatus: 'partial' },
  ]);

  const [newOrder, setNewOrder] = useState({
    customer: '', date: '2026-02-15', dueDate: '', itemName: '', quantity: 0, unit: 'pcs', unitPrice: 0,
  });

  const formatCurrency = (v: number) => '₩' + new Intl.NumberFormat(locale === 'ko' ? 'ko-KR' : 'en-US').format(v);

  const statusBadge = (s: string) => {
    const map: Record<string, string> = { approved: 'bg-green-100 text-green-700', pending: 'bg-yellow-100 text-yellow-700', rejected: 'bg-red-100 text-red-700', cancelled: 'bg-gray-100 text-gray-700' };
    const label: Record<string, string> = { approved: t.approved, pending: t.pending, rejected: t.rejected, cancelled: t.cancelled };
    return <span className={`px-2 py-1 rounded-full text-xs font-medium ${map[s]}`}>{label[s]}</span>;
  };

  const paymentBadge = (s: string) => {
    const map: Record<string, string> = { paid: 'bg-green-100 text-green-700', unpaid: 'bg-red-100 text-red-700', partial: 'bg-orange-100 text-orange-700', overdue: 'bg-red-200 text-red-800' };
    const label: Record<string, string> = { paid: t.paid, unpaid: t.unpaid, partial: t.partial, overdue: t.overdue };
    return <span className={`px-2 py-1 rounded-full text-xs font-medium ${map[s]}`}>{label[s]}</span>;
  };

  const filtered = orders.filter(o => {
    const matchSearch = o.soNumber.toLowerCase().includes(searchTerm.toLowerCase()) || o.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'all' || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleDelete = (id: number) => {
    if (confirm(locale === 'ko' ? '정말 삭제하시겠습니까?' : 'Are you sure you want to delete?')) {
      setOrders(orders.filter(o => o.id !== id));
    }
  };

  const handleCreate = () => {
    const newId = Math.max(...orders.map(o => o.id)) + 1;
    const total = newOrder.quantity * newOrder.unitPrice;
    setOrders([...orders, {
      id: newId,
      soNumber: `SO-2026-${String(newId).padStart(3, '0')}`,
      customer: newOrder.customer,
      date: newOrder.date,
      dueDate: newOrder.dueDate,
      items: [{ name: newOrder.itemName, quantity: newOrder.quantity, unit: newOrder.unit, unitPrice: newOrder.unitPrice }],
      totalAmount: total,
      status: 'pending',
      paymentStatus: 'unpaid',
    }]);
    setIsAddModalOpen(false);
    setNewOrder({ customer: '', date: '2026-02-15', dueDate: '', itemName: '', quantity: 0, unit: 'pcs', unitPrice: 0 });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => router.push('/hr/dashboard')} className="text-green-600 hover:text-green-800 flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />{t.back}
              </button>
              <div className="border-l-2 border-gray-300 pl-4 flex items-center gap-3">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">{t.salesOrders}</h1>
                  <p className="text-sm text-gray-600">{t.salesOrdersDesc}</p>
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
            <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder={locale === 'ko' ? 'SO번호 또는 고객 검색...' : 'Search SO number or customer...'} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" />
          </div>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500">
            <option value="all">{locale === 'ko' ? '모든 상태' : 'All Status'}</option>
            <option value="approved">{t.approved}</option>
            <option value="pending">{t.pending}</option>
            <option value="rejected">{t.rejected}</option>
            <option value="cancelled">{t.cancelled}</option>
          </select>
          <button onClick={() => setIsAddModalOpen(true)} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <Plus className="w-4 h-4" />{t.addNew}
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-green-800 px-6 py-4">
            <h2 className="text-white font-bold text-lg">{t.salesOrders} ({filtered.length})</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">No.</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">{t.soNumber}</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">{t.customer}</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">{t.date}</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">{t.duePaymentDate}</th>
                  <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase">{t.totalAmount}</th>
                  <th className="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase">{t.status}</th>
                  <th className="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase">{t.paymentStatus}</th>
                  <th className="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase">{t.actions}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filtered.map((order, idx) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-700">{idx + 1}</td>
                    <td className="px-6 py-4 text-sm font-medium text-green-600">{order.soNumber}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{order.customer}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{order.date}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{order.dueDate}</td>
                    <td className="px-6 py-4 text-sm text-gray-700 text-right">{formatCurrency(order.totalAmount)}</td>
                    <td className="px-6 py-4 text-center">{statusBadge(order.status)}</td>
                    <td className="px-6 py-4 text-center">{paymentBadge(order.paymentStatus)}</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => setSelectedOrder(order)} className="text-green-500 hover:text-green-700"><Eye className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete(order.id)} className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></button>
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
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-green-600 to-green-800 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h3 className="text-white font-bold text-lg">{selectedOrder.soNumber}</h3>
              <button onClick={() => setSelectedOrder(null)} className="text-white/80 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-xs text-gray-500">{t.customer}</p><p className="font-medium">{selectedOrder.customer}</p></div>
                <div><p className="text-xs text-gray-500">{t.date}</p><p className="font-medium">{selectedOrder.date}</p></div>
                <div><p className="text-xs text-gray-500">{t.duePaymentDate}</p><p className="font-medium">{selectedOrder.dueDate}</p></div>
                <div><p className="text-xs text-gray-500">{t.status}</p>{statusBadge(selectedOrder.status)}</div>
                <div><p className="text-xs text-gray-500">{t.paymentStatus}</p>{paymentBadge(selectedOrder.paymentStatus)}</div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">{locale === 'ko' ? '주문 항목' : 'Order Items'}</h4>
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
                    {selectedOrder.items.map((item, i) => (
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
              <div className="border-t pt-3 text-right">
                <p className="text-lg font-bold">{t.grandTotal}: {formatCurrency(selectedOrder.totalAmount)}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
            <div className="bg-gradient-to-r from-green-600 to-green-800 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h3 className="text-white font-bold text-lg">{t.addNew} {t.salesOrders}</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-white/80 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">{t.customer}</label><input value={newOrder.customer} onChange={e => setNewOrder({ ...newOrder, customer: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">{t.date}</label><input type="date" value={newOrder.date} onChange={e => setNewOrder({ ...newOrder, date: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">{t.duePaymentDate}</label><input type="date" value={newOrder.dueDate} onChange={e => setNewOrder({ ...newOrder, dueDate: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500" /></div>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">{locale === 'ko' ? '품목명' : 'Item Name'}</label><input value={newOrder.itemName} onChange={e => setNewOrder({ ...newOrder, itemName: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500" /></div>
              <div className="grid grid-cols-3 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">{t.quantity}</label><input type="number" value={newOrder.quantity} onChange={e => setNewOrder({ ...newOrder, quantity: Number(e.target.value) })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">{locale === 'ko' ? '단위' : 'Unit'}</label>
                  <select value={newOrder.unit} onChange={e => setNewOrder({ ...newOrder, unit: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500">
                    <option value="pcs">pcs</option><option value="kg">kg</option><option value="sets">sets</option><option value="boxes">boxes</option><option value="rolls">rolls</option>
                  </select>
                </div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">{t.unitPrice}</label><input type="number" value={newOrder.unitPrice} onChange={e => setNewOrder({ ...newOrder, unitPrice: Number(e.target.value) })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500" /></div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">{t.cancel}</button>
                <button onClick={handleCreate} className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg">{t.save}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
