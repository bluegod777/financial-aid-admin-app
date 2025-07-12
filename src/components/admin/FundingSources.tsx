'use client'

import React, { useState, useEffect } from 'react';
import { apiClient } from '../../lib/api';
import { 
  Plus, 
  Search, 
  Filter, 
  DollarSign, 
  Users, 
  Calendar,
  Edit,
  Trash2,
  BarChart3
} from 'lucide-react';

export function FundingSources() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [fundingSources, setFundingSources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sources = await apiClient.getAdminFundingSources();
        setFundingSources(sources);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load funding sources');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredSources = fundingSources.filter(source => {
    const matchesSearch = source.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         source.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || source.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-emerald-100 text-emerald-800';
      case 'Inactive': return 'bg-red-100 text-red-800';
      case 'Pending': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Federal': return 'bg-blue-100 text-blue-800';
      case 'State': return 'bg-purple-100 text-purple-800';
      case 'Foundation': return 'bg-forest-100 text-forest-800';
      case 'Private': return 'bg-amber-100 text-amber-800';
      case 'Institutional': return 'bg-leaf-100 text-leaf-800';
      default: return 'bg-gray-100 text-gray-800';
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
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Funding Sources</h2>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <button className="px-2 sm:px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-xs sm:text-sm">
            <span className="hidden sm:inline">Export List</span>
            <span className="sm:hidden">Export</span>
          </button>
          <button className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 bg-forest-500 text-white rounded-lg hover:bg-forest-600 transition-colors text-xs sm:text-sm">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Source</span>
            <span className="sm:hidden">Add</span>
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
                placeholder="Search funding sources..."
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
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg text-sm"
              >
                <option value="all">All Types</option>
                <option value="Federal">Federal</option>
                <option value="State">State</option>
                <option value="Foundation">Foundation</option>
                <option value="Private">Private</option>
                <option value="Institutional">Institutional</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredSources.map((source) => (
          <div key={source.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{source.name}</h3>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(source.type)}`}>
                      {source.type}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(source.status)}`}>
                      {source.status}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                {source.description}
              </p>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Total Amount</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{source.amount}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Available</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{source.available}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Deadline</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{source.deadline}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-forest-50 dark:bg-forest-900 text-forest-700 dark:text-forest-300 rounded-lg hover:bg-forest-100 dark:hover:bg-forest-800 transition-colors text-sm">
                  <BarChart3 className="w-4 h-4" />
                  <span>View Details</span>
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
