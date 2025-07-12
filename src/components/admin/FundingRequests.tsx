'use client'

import React, { useState, useEffect } from 'react';
import { apiClient } from '../../lib/api';
import { 
  Search, 
  Filter, 
  FileText, 
  DollarSign, 
  Edit,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  MessageSquare
} from 'lucide-react';

export function FundingRequests() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apiClient.getFundingRequests();
        setRequests(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load funding requests');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.major.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || request.status === selectedStatus;
    const matchesPriority = selectedPriority === 'all' || request.priority === selectedPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Submitted': return 'bg-blue-100 text-blue-800';
      case 'Under Review': return 'bg-amber-100 text-amber-800';
      case 'Approved': return 'bg-emerald-100 text-emerald-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      case 'Funded': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Submitted': return <FileText className="w-4 h-4 text-blue-600" />;
      case 'Under Review': return <Clock className="w-4 h-4 text-amber-600" />;
      case 'Approved': return <CheckCircle className="w-4 h-4 text-emerald-600" />;
      case 'Rejected': return <XCircle className="w-4 h-4 text-red-600" />;
      case 'Funded': return <DollarSign className="w-4 h-4 text-purple-600" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-forest-600"></div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 bg-gray-50 dark:bg-gray-900 min-h-full">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Funding Requests</h2>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <button className="px-2 sm:px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-xs sm:text-sm">
            <span className="hidden sm:inline">Export List</span>
            <span className="sm:hidden">Export</span>
          </button>
          <button className="px-2 sm:px-4 py-2 bg-forest-500 text-white rounded-lg hover:bg-forest-600 transition-colors text-xs sm:text-sm">
            <span className="hidden sm:inline">Bulk Actions</span>
            <span className="sm:hidden">Bulk</span>
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search students, ID, or major..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent text-sm"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg text-sm"
              >
                <option value="all">All Status</option>
                <option value="Submitted">Submitted</option>
                <option value="Under Review">Under Review</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
                <option value="Funded">Funded</option>
              </select>
            </div>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg text-sm"
            >
              <option value="all">All Priority</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {filteredRequests.map((request) => (
          <div key={request.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  {getStatusIcon(request.status)}
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">{request.student}</h3>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{request.studentId} • {request.major}</p>
                  <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">{request.amount}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-4">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(request.priority)}`}>
                  {request.priority}
                </span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(request.status)}`}>
                  {request.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-600 dark:text-gray-400">Type:</span>
                <span className="ml-1 font-medium text-gray-900 dark:text-white">{request.type}</span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">GPA:</span>
                <span className="ml-1 font-medium text-gray-900 dark:text-white">{request.gpa}</span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Year:</span>
                <span className="ml-1 font-medium text-gray-900 dark:text-white">{request.year}</span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Submitted:</span>
                <span className="ml-1 font-medium text-gray-900 dark:text-white">{request.submitted}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Demographics: {request.demographics}
              </div>
              <div className="flex items-center space-x-2">
                <button className="flex items-center space-x-1 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors text-xs">
                  <Edit className="w-3 h-3" />
                  <span className="hidden sm:inline">Edit</span>
                </button>
                <button className="flex items-center space-x-1 px-3 py-1 bg-forest-100 dark:bg-forest-900 text-forest-700 dark:text-forest-300 rounded-lg hover:bg-forest-200 dark:hover:bg-forest-800 transition-colors text-xs">
                  <MessageSquare className="w-3 h-3" />
                  <span className="hidden sm:inline">Message</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-4">
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}
    </div>
  );
}
