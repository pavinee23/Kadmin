'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from '@/lib/LocaleContext';
import { translations } from '@/lib/translations';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { ArrowLeft, ClipboardCheck, Plus, Eye, Trash2, X, Search as SearchIcon, Printer, FileDown } from 'lucide-react';

interface SalesApproval {
  id: number;
  approvalNumber: string;
  region: string;
  productName: string;
  quantity: number;
  amount: number;
  requestedBy: string;
  approvedBy: string;
  approvalDate: string;
  status: 'approved' | 'pending' | 'rejected';
  remarks: string;
}

export default function DomesticSalesApprovalsPage() {
  const router = useRouter();
  const { locale } = useLocale();
  const t = translations[locale];
  const [searchTerm, setSearchTerm] = useState('');
  const [regionFilter, setRegionFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState<SalesApproval | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const regions = locale === 'ko'
    ? [{ key: 'seoul', name: '서울/경기' }, { key: 'busan', name: '부산/경남' }, { key: 'daegu', name: '대구/경북' }, { key: 'daejeon', name: '대전/충청' }, { key: 'gwangju', name: '광주/전라' }, { key: 'incheon', name: '인천/강원' }, { key: 'jeju', name: '제주' }]
    : [{ key: 'seoul', name: 'Seoul/Gyeonggi' }, { key: 'busan', name: 'Busan/Gyeongnam' }, { key: 'daegu', name: 'Daegu/Gyeongbuk' }, { key: 'daejeon', name: 'Daejeon/Chungcheong' }, { key: 'gwangju', name: 'Gwangju/Jeolla' }, { key: 'incheon', name: 'Incheon/Gangwon' }, { key: 'jeju', name: 'Jeju' }];

  const [items, setItems] = useState<SalesApproval[]>([
    { id: 1, approvalNumber: 'DSA-2026-001', region: 'seoul', productName: 'K-Energy Solar Panel 500W', quantity: 300, amount: 540000000, requestedBy: 'Kim Minjun', approvedBy: 'Park Jihye', approvalDate: '2026-02-15', status: 'approved', remarks: '강남구 대형 빌딩 옥상 설치 프로젝트' },
    { id: 2, approvalNumber: 'DSA-2026-002', region: 'busan', productName: 'Smart Inverter SI-3000', quantity: 150, amount: 277500000, requestedBy: 'Choi Donghyun', approvedBy: '-', approvalDate: '2026-02-14', status: 'pending', remarks: '해운대 신축 아파트 단지 설치' },
    { id: 3, approvalNumber: 'DSA-2026-003', region: 'daejeon', productName: 'Battery Storage BS-500', quantity: 50, amount: 175000000, requestedBy: 'Son Heungmin', approvedBy: 'Lee Kangin', approvalDate: '2026-02-13', status: 'approved', remarks: '대덕연구단지 에너지 저장 시스템' },
    { id: 4, approvalNumber: 'DSA-2026-004', region: 'gwangju', productName: 'LED Lighting Module LM-100', quantity: 800, amount: 72000000, requestedBy: 'Hwang Heemin', approvedBy: '-', approvalDate: '2026-02-12', status: 'pending', remarks: '전남 공공기관 LED 교체 사업' },
    { id: 5, approvalNumber: 'DSA-2026-005', region: 'seoul', productName: 'EV Charger EC-300', quantity: 120, amount: 288000000, requestedBy: 'Jung Wooyoung', approvedBy: 'Kim Yeji', approvalDate: '2026-02-11', status: 'approved', remarks: '수도권 고속도로 휴게소 충전기 설치' },
    { id: 6, approvalNumber: 'DSA-2026-006', region: 'daegu', productName: 'Power Monitoring System PMS', quantity: 25, amount: 62500000, requestedBy: 'Bae Suzy', approvedBy: '-', approvalDate: '2026-02-10', status: 'rejected', remarks: '예산 초과 - 2분기 재신청 필요' },
    { id: 7, approvalNumber: 'DSA-2026-007', region: 'incheon', productName: 'Solar Controller SC-200', quantity: 200, amount: 90000000, requestedBy: 'Lee Seunghyun', approvedBy: 'Choi Yuna', approvalDate: '2026-02-09', status: 'approved', remarks: '인천공항 주변 태양광 발전소' },
    { id: 8, approvalNumber: 'DSA-2026-008', region: 'jeju', productName: 'K-Energy Solar Panel 500W', quantity: 500, amount: 900000000, requestedBy: 'Ko Changseok', approvedBy: 'Park Seonjin', approvalDate: '2026-02-08', status: 'approved', remarks: '제주도 신재생에너지 프로젝트' },
    { id: 9, approvalNumber: 'DSA-2026-009', region: 'busan', productName: 'Transformer T-5000', quantity: 8, amount: 720000000, requestedBy: 'Park Jihoon', approvedBy: '-', approvalDate: '2026-02-07', status: 'pending', remarks: '기장군 산업단지 변압기 교체' },
    { id: 10, approvalNumber: 'DSA-2026-010', region: 'seoul', productName: 'Energy Audit Kit EAK-1', quantity: 30, amount: 27000000, requestedBy: 'Yoo Jaesung', approvedBy: 'Kim Minjun', approvalDate: '2026-02-06', status: 'approved', remarks: '서울시 에너지 감사 장비 공급' },
  ]);

  const [newItem, setNewItem] = useState({ region: 'seoul', productName: '', quantity: 0, amount: 0, requestedBy: '', remarks: '' });

  const formatCurrency = (v: number) => '₩' + new Intl.NumberFormat(locale === 'ko' ? 'ko-KR' : 'en-US').format(v);

  const statusBadge = (s: string) => {
    const map: Record<string, string> = { approved: 'bg-green-100 text-green-700', pending: 'bg-yellow-100 text-yellow-700', rejected: 'bg-red-100 text-red-700' };
    const label: Record<string, string> = { approved: t.approved, pending: t.pending, rejected: t.rejected };
    return <span className={`px-2 py-1 rounded-full text-xs font-medium ${map[s]}`}>{label[s]}</span>;
  };

  const filtered = items.filter(o => {
    const matchSearch = o.approvalNumber.toLowerCase().includes(searchTerm.toLowerCase()) || o.productName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchRegion = regionFilter === 'all' || o.region === regionFilter;
    const matchStatus = statusFilter === 'all' || o.status === statusFilter;
    return matchSearch && matchRegion && matchStatus;
  });

  const handleDelete = (id: number) => {
    if (confirm(locale === 'ko' ? '정말 삭제하시겠습니까?' : 'Are you sure you want to delete?')) {
      setItems(items.filter(o => o.id !== id));
    }
  };

  const handleCreate = () => {
    const newId = Math.max(...items.map(o => o.id)) + 1;
    setItems([...items, {
      id: newId,
      approvalNumber: `DSA-2026-${String(newId).padStart(3, '0')}`,
      region: newItem.region,
      productName: newItem.productName,
      quantity: newItem.quantity,
      amount: newItem.amount,
      requestedBy: newItem.requestedBy,
      approvedBy: '-',
      approvalDate: '2026-02-15',
      status: 'pending',
      remarks: newItem.remarks,
    }]);
    setIsAddModalOpen(false);
    setNewItem({ region: 'seoul', productName: '', quantity: 0, amount: 0, requestedBy: '', remarks: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => router.push('/domestic-market/dashboard')} className="text-blue-600 hover:text-blue-800 flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />{t.back}
              </button>
              <div className="border-l-2 border-gray-300 pl-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <ClipboardCheck className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-800">{t.salesApprovals}</h1>
                  <p className="text-xs text-gray-500">🇰🇷 {t.domesticMarket}</p>
                </div>
              </div>
            </div>
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative flex-1 min-w-[200px]">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder={t.search} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
            <select value={regionFilter} onChange={e => setRegionFilter(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option value="all">{t.allRegions}</option>
              {regions.map(r => <option key={r.key} value={r.key}>{r.name}</option>)}
            </select>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option value="all">{t.filter}</option>
              <option value="approved">{t.approved}</option>
              <option value="pending">{t.pending}</option>
              <option value="rejected">{t.rejected}</option>
            </select>
            <button onClick={() => setIsAddModalOpen(true)} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="w-4 h-4" />{t.addNew}
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-blue-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">{t.approvalNumber}</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">{t.region}</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">{t.productName}</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">{t.quantity}</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">{t.amount}</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">{t.requestedBy}</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">{t.approvalDate}</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">{t.approved}</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">{t.edit}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filtered.map(item => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-blue-600">{item.approvalNumber}</td>
                    <td className="px-4 py-3 text-sm">{regions.find(r => r.key === item.region)?.name}</td>
                    <td className="px-4 py-3 text-sm">{item.productName}</td>
                    <td className="px-4 py-3 text-sm text-right">{item.quantity.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm text-right font-medium">{formatCurrency(item.amount)}</td>
                    <td className="px-4 py-3 text-sm">{item.requestedBy}</td>
                    <td className="px-4 py-3 text-sm">{item.approvalDate}</td>
                    <td className="px-4 py-3 text-center">{statusBadge(item.status)}</td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => setSelectedItem(item)} className="text-blue-500 hover:text-blue-700"><Eye className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={9} className="px-4 py-8 text-center text-gray-500">{t.noData}</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-lg font-bold">{t.viewDetails}</h2>
              <button onClick={() => setSelectedItem(null)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-xs text-gray-500">{t.approvalNumber}</p><p className="font-medium">{selectedItem.approvalNumber}</p></div>
                <div><p className="text-xs text-gray-500">{t.region}</p><p className="font-medium">{regions.find(r => r.key === selectedItem.region)?.name}</p></div>
                <div><p className="text-xs text-gray-500">{t.productName}</p><p className="font-medium">{selectedItem.productName}</p></div>
                <div><p className="text-xs text-gray-500">{t.quantity}</p><p className="font-medium">{selectedItem.quantity.toLocaleString()}</p></div>
                <div><p className="text-xs text-gray-500">{t.amount}</p><p className="font-medium">{formatCurrency(selectedItem.amount)}</p></div>
                <div><p className="text-xs text-gray-500">{t.approvalDate}</p><p className="font-medium">{selectedItem.approvalDate}</p></div>
                <div><p className="text-xs text-gray-500">{t.requestedBy}</p><p className="font-medium">{selectedItem.requestedBy}</p></div>
                <div><p className="text-xs text-gray-500">{t.approvedBy}</p><p className="font-medium">{selectedItem.approvedBy}</p></div>
              </div>
              <div><p className="text-xs text-gray-500">{t.remarks}</p><p className="font-medium">{selectedItem.remarks}</p></div>
              <div className="flex justify-center">{statusBadge(selectedItem.status)}</div>
              <div className="flex gap-2 pt-2">
                <button className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200"><Printer className="w-4 h-4" />{t.printDocument}</button>
                <button className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"><FileDown className="w-4 h-4" />{t.exportPDF}</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-lg font-bold">{t.addNew} - {t.salesApprovals}</h2>
              <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.region}</label>
                <select value={newItem.region} onChange={e => setNewItem({ ...newItem, region: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2">
                  {regions.map(r => <option key={r.key} value={r.key}>{r.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.productName}</label>
                <input type="text" value={newItem.productName} onChange={e => setNewItem({ ...newItem, productName: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.quantity}</label>
                  <input type="number" value={newItem.quantity} onChange={e => setNewItem({ ...newItem, quantity: Number(e.target.value) })} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.amount}</label>
                  <input type="number" value={newItem.amount} onChange={e => setNewItem({ ...newItem, amount: Number(e.target.value) })} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.requestedBy}</label>
                <input type="text" value={newItem.requestedBy} onChange={e => setNewItem({ ...newItem, requestedBy: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.remarks}</label>
                <textarea value={newItem.remarks} onChange={e => setNewItem({ ...newItem, remarks: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2" rows={3} />
              </div>
              <div className="flex gap-2 pt-2">
                <button onClick={() => setIsAddModalOpen(false)} className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300">{t.cancel}</button>
                <button onClick={handleCreate} className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">{t.save}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
