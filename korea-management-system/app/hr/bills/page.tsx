'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from '@/lib/LocaleContext';
import { translations } from '@/lib/translations';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { ArrowLeft, CreditCard, Plus, Search, Eye, Trash2, X } from 'lucide-react';

interface Bill {
  id: number;
  billNumber: string;
  vendor: string;
  category: string;
  issueDate: string;
  dueDate: string;
  description: string;
  amount: number;
  paymentStatus: 'paid' | 'unpaid' | 'partial' | 'overdue';
}

export default function BillsListPage() {
  const router = useRouter();
  const { locale } = useLocale();
  const t = translations[locale];
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const categories = [
    { value: 'utilities', label: t.utilities },
    { value: 'salary', label: t.salary },
    { value: 'materials', label: t.materials },
    { value: 'transportation', label: t.transportation },
    { value: 'maintenance', label: t.maintenance },
    { value: 'office', label: t.office },
    { value: 'marketing', label: t.marketing },
    { value: 'other', label: t.other },
  ];

  const [bills, setBills] = useState<Bill[]>([
    { id: 1, billNumber: 'BILL-2026-001', vendor: 'Korea Electric Power Corp', category: 'utilities', issueDate: '2026-02-15', dueDate: '2026-03-05', description: locale === 'ko' ? '2월 전기요금' : 'February electricity bill', amount: 4500000, paymentStatus: 'unpaid' },
    { id: 2, billNumber: 'BILL-2026-002', vendor: 'Seoul Gas Corp', category: 'utilities', issueDate: '2026-02-15', dueDate: '2026-03-05', description: locale === 'ko' ? '2월 가스요금' : 'February gas bill', amount: 1800000, paymentStatus: 'unpaid' },
    { id: 3, billNumber: 'BILL-2026-003', vendor: 'KT Telecom', category: 'utilities', issueDate: '2026-02-14', dueDate: '2026-03-04', description: locale === 'ko' ? '인터넷 및 전화 요금' : 'Internet and phone bill', amount: 850000, paymentStatus: 'paid' },
    { id: 4, billNumber: 'BILL-2026-004', vendor: locale === 'ko' ? '직원 급여' : 'Employee Payroll', category: 'salary', issueDate: '2026-02-10', dueDate: '2026-02-25', description: locale === 'ko' ? '2월 급여 지급' : 'February salary payment', amount: 45000000, paymentStatus: 'paid' },
    { id: 5, billNumber: 'BILL-2026-005', vendor: 'Samsung Electronics', category: 'materials', issueDate: '2026-02-12', dueDate: '2026-03-12', description: locale === 'ko' ? 'LED 모듈 자재비' : 'LED module material cost', amount: 28900000, paymentStatus: 'partial' },
    { id: 6, billNumber: 'BILL-2026-006', vendor: 'Hyundai Logistics', category: 'transportation', issueDate: '2026-02-11', dueDate: '2026-03-11', description: locale === 'ko' ? '화물 운송비' : 'Freight transportation cost', amount: 5200000, paymentStatus: 'unpaid' },
    { id: 7, billNumber: 'BILL-2026-007', vendor: locale === 'ko' ? '건물 관리사' : 'Building Manager', category: 'maintenance', issueDate: '2026-02-10', dueDate: '2026-02-28', description: locale === 'ko' ? '공장 시설 유지보수' : 'Factory facility maintenance', amount: 3200000, paymentStatus: 'overdue' },
    { id: 8, billNumber: 'BILL-2026-008', vendor: 'Alpha Office Supply', category: 'office', issueDate: '2026-02-09', dueDate: '2026-02-28', description: locale === 'ko' ? '사무용품 구매' : 'Office supplies purchase', amount: 750000, paymentStatus: 'paid' },
    { id: 9, billNumber: 'BILL-2026-009', vendor: 'Naver Marketing', category: 'marketing', issueDate: '2026-02-08', dueDate: '2026-03-08', description: locale === 'ko' ? '온라인 광고비' : 'Online advertising cost', amount: 8500000, paymentStatus: 'unpaid' },
    { id: 10, billNumber: 'BILL-2026-010', vendor: locale === 'ko' ? '세무법인 한솔' : 'Hansol Tax Corp', category: 'other', issueDate: '2026-02-07', dueDate: '2026-02-28', description: locale === 'ko' ? '세무 자문비' : 'Tax advisory fee', amount: 2000000, paymentStatus: 'paid' },
    { id: 11, billNumber: 'BILL-2026-011', vendor: 'LG Chem', category: 'materials', issueDate: '2026-02-06', dueDate: '2026-03-06', description: locale === 'ko' ? '배터리 셀 납품대금' : 'Battery cell delivery payment', amount: 15000000, paymentStatus: 'partial' },
    { id: 12, billNumber: 'BILL-2026-012', vendor: locale === 'ko' ? '국민건강보험' : 'National Health Insurance', category: 'salary', issueDate: '2026-02-05', dueDate: '2026-02-28', description: locale === 'ko' ? '직원 건강보험료' : 'Employee health insurance premium', amount: 6800000, paymentStatus: 'paid' },
  ]);

  const [newBill, setNewBill] = useState({
    vendor: '', category: 'utilities', issueDate: '2026-02-15', dueDate: '', description: '', amount: 0,
  });

  const formatCurrency = (v: number) => '₩' + new Intl.NumberFormat(locale === 'ko' ? 'ko-KR' : 'en-US').format(v);

  const paymentBadge = (s: string) => {
    const map: Record<string, string> = { paid: 'bg-green-100 text-green-700', unpaid: 'bg-red-100 text-red-700', partial: 'bg-orange-100 text-orange-700', overdue: 'bg-red-200 text-red-800' };
    const label: Record<string, string> = { paid: t.paid, unpaid: t.unpaid, partial: t.partial, overdue: t.overdue };
    return <span className={`px-2 py-1 rounded-full text-xs font-medium ${map[s]}`}>{label[s]}</span>;
  };

  const categoryLabel = (cat: string) => {
    const found = categories.find(c => c.value === cat);
    return found ? found.label : cat;
  };

  const filtered = bills.filter(b => {
    const matchSearch = b.billNumber.toLowerCase().includes(searchTerm.toLowerCase()) || b.vendor.toLowerCase().includes(searchTerm.toLowerCase()) || b.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'all' || b.paymentStatus === statusFilter;
    const matchCategory = categoryFilter === 'all' || b.category === categoryFilter;
    return matchSearch && matchStatus && matchCategory;
  });

  const totalUnpaid = bills.filter(b => b.paymentStatus === 'unpaid' || b.paymentStatus === 'overdue').reduce((sum, b) => sum + b.amount, 0);
  const totalPaid = bills.filter(b => b.paymentStatus === 'paid').reduce((sum, b) => sum + b.amount, 0);

  const handleDelete = (id: number) => {
    if (confirm(locale === 'ko' ? '정말 삭제하시겠습니까?' : 'Are you sure you want to delete?')) {
      setBills(bills.filter(b => b.id !== id));
    }
  };

  const handleCreate = () => {
    const newId = Math.max(...bills.map(b => b.id)) + 1;
    setBills([...bills, {
      id: newId,
      billNumber: `BILL-2026-${String(newId).padStart(3, '0')}`,
      vendor: newBill.vendor,
      category: newBill.category,
      issueDate: newBill.issueDate,
      dueDate: newBill.dueDate,
      description: newBill.description,
      amount: newBill.amount,
      paymentStatus: 'unpaid',
    }]);
    setIsAddModalOpen(false);
    setNewBill({ vendor: '', category: 'utilities', issueDate: '2026-02-15', dueDate: '', description: '', amount: 0 });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => router.push('/hr/dashboard')} className="text-purple-600 hover:text-purple-800 flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />{t.back}
              </button>
              <div className="border-l-2 border-gray-300 pl-4 flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">{t.billsList}</h1>
                  <p className="text-sm text-gray-600">{t.billsListDesc}</p>
                </div>
              </div>
            </div>
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-sm text-gray-600">{locale === 'ko' ? '총 청구 건수' : 'Total Bills'}</p>
            <p className="text-3xl font-bold text-purple-600">{bills.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-sm text-gray-600">{locale === 'ko' ? '미결제 합계' : 'Total Unpaid'}</p>
            <p className="text-2xl font-bold text-red-600">{formatCurrency(totalUnpaid)}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-sm text-gray-600">{locale === 'ko' ? '결제 완료 합계' : 'Total Paid'}</p>
            <p className="text-2xl font-bold text-green-600">{formatCurrency(totalPaid)}</p>
          </div>
        </div>

        {/* Toolbar */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6 flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder={locale === 'ko' ? '빌 번호, 업체 또는 설명 검색...' : 'Search bill number, vendor or description...'} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" />
          </div>
          <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500">
            <option value="all">{locale === 'ko' ? '모든 카테고리' : 'All Categories'}</option>
            {categories.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500">
            <option value="all">{locale === 'ko' ? '모든 상태' : 'All Status'}</option>
            <option value="paid">{t.paid}</option>
            <option value="unpaid">{t.unpaid}</option>
            <option value="partial">{t.partial}</option>
            <option value="overdue">{t.overdue}</option>
          </select>
          <button onClick={() => setIsAddModalOpen(true)} className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <Plus className="w-4 h-4" />{t.addNew}
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 px-6 py-4">
            <h2 className="text-white font-bold text-lg">{t.billsList} ({filtered.length})</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">No.</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">{t.billNumber}</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">{locale === 'ko' ? '업체' : 'Vendor'}</th>
                  <th className="text-center px-4 py-3 text-xs font-medium text-gray-500 uppercase">{t.category}</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">{t.description}</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">{t.duePaymentDate}</th>
                  <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase">{t.amount}</th>
                  <th className="text-center px-4 py-3 text-xs font-medium text-gray-500 uppercase">{t.paymentStatus}</th>
                  <th className="text-center px-4 py-3 text-xs font-medium text-gray-500 uppercase">{t.actions}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filtered.map((bill, idx) => (
                  <tr key={bill.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 text-sm text-gray-700">{idx + 1}</td>
                    <td className="px-4 py-4 text-sm font-medium text-purple-600">{bill.billNumber}</td>
                    <td className="px-4 py-4 text-sm text-gray-700">{bill.vendor}</td>
                    <td className="px-4 py-4 text-center"><span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">{categoryLabel(bill.category)}</span></td>
                    <td className="px-4 py-4 text-sm text-gray-600 max-w-xs truncate">{bill.description}</td>
                    <td className="px-4 py-4 text-sm text-gray-700">{bill.dueDate}</td>
                    <td className="px-4 py-4 text-sm font-semibold text-gray-900 text-right">{formatCurrency(bill.amount)}</td>
                    <td className="px-4 py-4 text-center">{paymentBadge(bill.paymentStatus)}</td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => setSelectedBill(bill)} className="text-purple-500 hover:text-purple-700"><Eye className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete(bill.id)} className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></button>
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
      {selectedBill && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
            <div className="bg-gradient-to-r from-purple-600 to-purple-800 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h3 className="text-white font-bold text-lg">{selectedBill.billNumber}</h3>
              <button onClick={() => setSelectedBill(null)} className="text-white/80 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-xs text-gray-500">{locale === 'ko' ? '업체' : 'Vendor'}</p><p className="font-medium">{selectedBill.vendor}</p></div>
                <div><p className="text-xs text-gray-500">{t.category}</p><p className="font-medium">{categoryLabel(selectedBill.category)}</p></div>
                <div><p className="text-xs text-gray-500">{t.issueDate}</p><p className="font-medium">{selectedBill.issueDate}</p></div>
                <div><p className="text-xs text-gray-500">{t.duePaymentDate}</p><p className="font-medium">{selectedBill.dueDate}</p></div>
                <div><p className="text-xs text-gray-500">{t.paymentStatus}</p>{paymentBadge(selectedBill.paymentStatus)}</div>
                <div><p className="text-xs text-gray-500">{t.amount}</p><p className="font-bold text-lg">{formatCurrency(selectedBill.amount)}</p></div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">{t.description}</p>
                <p className="text-sm">{selectedBill.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
            <div className="bg-gradient-to-r from-purple-600 to-purple-800 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h3 className="text-white font-bold text-lg">{t.addNew} {t.billsList}</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-white/80 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">{locale === 'ko' ? '업체' : 'Vendor'}</label><input value={newBill.vendor} onChange={e => setNewBill({ ...newBill, vendor: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">{t.category}</label>
                <select value={newBill.category} onChange={e => setNewBill({ ...newBill, category: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500">
                  {categories.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">{t.issueDate}</label><input type="date" value={newBill.issueDate} onChange={e => setNewBill({ ...newBill, issueDate: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">{t.duePaymentDate}</label><input type="date" value={newBill.dueDate} onChange={e => setNewBill({ ...newBill, dueDate: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500" /></div>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">{t.description}</label><textarea value={newBill.description} onChange={e => setNewBill({ ...newBill, description: e.target.value })} rows={2} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">{t.amount}</label><input type="number" value={newBill.amount} onChange={e => setNewBill({ ...newBill, amount: Number(e.target.value) })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500" /></div>
              <div className="flex justify-end gap-3 pt-4">
                <button onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">{t.cancel}</button>
                <button onClick={handleCreate} className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg">{t.save}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
