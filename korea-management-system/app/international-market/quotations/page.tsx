'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from '@/lib/LocaleContext';
import { translations } from '@/lib/translations';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { ArrowLeft, FileText, Plus, Search, Eye, Edit, Trash2, Download, DollarSign, Calendar, User, Building } from 'lucide-react';

interface Quotation {
  id: string;
  quotationNumber: string;
  customerName: string;
  customerCountry: string;
  contactPerson: string;
  email: string;
  product: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  currency: string;
  validUntil: string;
  status: 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired';
  createdDate: string;
  lastModified: string;
  notes?: string;
}

export default function InternationalQuotationsPage() {
  const router = useRouter();
  const { locale } = useLocale();
  const t = translations[locale];
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showNewQuotationModal, setShowNewQuotationModal] = useState(false);

  // Sample data
  const [quotations, setQuotations] = useState<Quotation[]>([
    {
      id: '1',
      quotationNumber: 'IQ-2026-001',
      customerName: 'Vietnam Energy Solutions',
      customerCountry: 'Vietnam',
      contactPerson: 'Nguyen Van Duc',
      email: 'duc.nguyen@vietnamenergy.com',
      product: 'KSAVE Industrial Package 500kW',
      quantity: 10,
      unitPrice: 45000,
      totalAmount: 450000,
      currency: 'USD',
      validUntil: '2026-03-15',
      status: 'sent',
      createdDate: '2026-02-10',
      lastModified: '2026-02-10',
      notes: 'Include installation and training package'
    },
    {
      id: '2',
      quotationNumber: 'IQ-2026-002',
      customerName: 'Thailand Green Tech Co.',
      customerCountry: 'Thailand',
      contactPerson: 'Somchai Jaidee',
      email: 'somchai@thgreentech.co.th',
      product: 'KSAVE Commercial Series 200kW',
      quantity: 25,
      unitPrice: 18000,
      totalAmount: 450000,
      currency: 'USD',
      validUntil: '2026-02-28',
      status: 'accepted',
      createdDate: '2026-01-25',
      lastModified: '2026-02-08',
      notes: 'Bulk order discount applied'
    },
    {
      id: '3',
      quotationNumber: 'IQ-2026-003',
      customerName: 'Brunei Power Systems',
      customerCountry: 'Brunei',
      contactPerson: 'Ahmad Rahman',
      email: 'ahmad@bruneipower.bn',
      product: 'KSAVE Marine Edition 100kW',
      quantity: 5,
      unitPrice: 35000,
      totalAmount: 175000,
      currency: 'USD',
      validUntil: '2026-03-01',
      status: 'draft',
      createdDate: '2026-02-12',
      lastModified: '2026-02-14',
      notes: 'Customization for marine environment'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'sent': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'accepted': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      case 'expired': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'draft': return locale === 'ko' ? '초안' : 'Draft';
      case 'sent': return locale === 'ko' ? '발송됨' : 'Sent';
      case 'accepted': return locale === 'ko' ? '승인됨' : 'Accepted';
      case 'rejected': return locale === 'ko' ? '거부됨' : 'Rejected';
      case 'expired': return locale === 'ko' ? '만료됨' : 'Expired';
      default: return status;
    }
  };

  const filteredQuotations = quotations.filter(q => {
    const matchesSearch = q.quotationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         q.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         q.product.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || q.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => router.push('/international-market/sales-expense-reports')} 
                className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />{t.back}
              </button>
              <div className="border-l-2 border-gray-300 pl-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-800">
                    {locale === 'ko' ? '해외 견적 관리' : 'International Quotations'}
                  </h1>
                  <p className="text-sm text-gray-600">
                    {locale === 'ko' ? '해외 고객 견적서 작성 및 관리' : 'Manage quotes for international clients'}
                  </p>
                </div>
              </div>
            </div>
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Controls */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-wrap items-center gap-4 justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder={locale === 'ko' ? '견적 번호, 고객명, 제품명 검색...' : 'Search quotation number, customer, product...'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-80"
                />
              </div>
              <select 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">{locale === 'ko' ? '모든 상태' : 'All Status'}</option>
                <option value="draft">{locale === 'ko' ? '초안' : 'Draft'}</option>
                <option value="sent">{locale === 'ko' ? '발송됨' : 'Sent'}</option>
                <option value="accepted">{locale === 'ko' ? '승인됨' : 'Accepted'}</option>
                <option value="rejected">{locale === 'ko' ? '거부됨' : 'Rejected'}</option>
                <option value="expired">{locale === 'ko' ? '만료됨' : 'Expired'}</option>
              </select>
            </div>
            <button
              onClick={() => setShowNewQuotationModal(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" />
              {t.newQuotation}
            </button>
          </div>
        </div>

        {/* Quotations List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {locale === 'ko' ? '견적 번호' : 'Quotation No.'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {locale === 'ko' ? '고객 정보' : 'Customer'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {locale === 'ko' ? '제품' : 'Product'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {locale === 'ko' ? '금액' : 'Amount'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {locale === 'ko' ? '유효기한' : 'Valid Until'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {locale === 'ko' ? '상태' : 'Status'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {locale === 'ko' ? '작업' : 'Actions'}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredQuotations.map((quotation) => (
                  <tr key={quotation.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">{quotation.quotationNumber}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{quotation.customerName}</div>
                        <div className="text-sm text-gray-500">{quotation.customerCountry} • {quotation.contactPerson}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{quotation.product}</div>
                      <div className="text-sm text-gray-500">{locale === 'ko' ? '수량' : 'Qty'}: {quotation.quantity.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {quotation.currency} ${quotation.totalAmount.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500">
                        @ {quotation.currency} ${quotation.unitPrice.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{quotation.validUntil}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(quotation.status)}`}>
                        {getStatusText(quotation.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-3">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-900">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <Download className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">
                  {locale === 'ko' ? '총 견적서' : 'Total Quotes'}
                </p>
                <p className="text-2xl font-semibold text-gray-900">{quotations.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-green-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">
                  {locale === 'ko' ? '승인된 금액' : 'Accepted Value'}
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  ${quotations.filter(q => q.status === 'accepted').reduce((sum, q) => sum + q.totalAmount, 0).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-orange-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">
                  {locale === 'ko' ? '대기 중' : 'Pending'}
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {quotations.filter(q => q.status === 'sent').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <Building className="h-8 w-8 text-purple-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">
                  {locale === 'ko' ? '거래처 수' : 'Customers'}
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {new Set(quotations.map(q => q.customerName)).size}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}