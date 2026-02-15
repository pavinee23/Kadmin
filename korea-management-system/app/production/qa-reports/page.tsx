"use client";

import { FileText, Download, Filter, Search } from 'lucide-react';
import { useState } from 'react';

export default function QAReportsPage() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');

  const reports = [
    { id: 'QA-2026-001', date: '2026-02-10', station: 'Line A', inspector: 'Kim', status: 'Pass', notes: 'OK' },
    { id: 'QA-2026-002', date: '2026-02-11', station: 'Line B', inspector: 'Lee', status: 'Fail', notes: 'Voltage spike' },
    { id: 'QA-2026-003', date: '2026-02-12', station: 'Line C', inspector: 'Park', status: 'Pass', notes: 'OK' },
  ];

  const filtered = reports.filter((r) => {
    if (status !== 'all' && r.status.toLowerCase() !== status) return false;
    if (query && ![r.id, r.station, r.inspector, r.notes].join(' ').toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  function exportCSV() {
    const header = ['ID','Date','Station','Inspector','Status','Notes'];
    const rows = filtered.map(r => [r.id,r.date,r.station,r.inspector,r.status,r.notes]);
    const csv = [header, ...rows].map(r => r.map(v => `"${String(v).replace(/"/g,'""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'qa-reports.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">QA Reports</h1>
          <p className="text-gray-600">Overview of recent quality assurance checks and exportable reports.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={exportCSV} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by ID, station, inspector or notes"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="mt-3 md:mt-0 flex items-center gap-3">
            <select className="px-3 py-2 border border-gray-300 rounded-lg" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="all">All Status</option>
              <option value="pass">Pass</option>
              <option value="fail">Fail</option>
            </select>
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" /> Filter
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Station</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Inspector</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Notes</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filtered.map((r) => (
              <tr key={r.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-gray-900">{r.id}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{r.date}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{r.station}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{r.inspector}</td>
                <td className={`px-4 py-3 text-sm font-semibold ${r.status === 'Pass' ? 'text-green-700' : 'text-red-700'}`}>{r.status}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{r.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
