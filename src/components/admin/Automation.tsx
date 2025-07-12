'use client'

import React, { useState, useEffect } from 'react';
import { apiClient } from '../../lib/api';
import { 
  Plus, 
  Search, 
  Filter, 
  Bot, 
  Clock, 
  CheckCircle,
  XCircle,
  Play,
  Pause,
  Settings,
  Bell,
  MessageSquare,
  TrendingUp,
  Zap,
  Eye,
  Edit,
  Trash2,
  BarChart3
} from 'lucide-react';

export function Automation() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [automationAgents, setAutomationAgents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apiClient.getAutomationAgents();
        setAutomationAgents(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load automation data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredAgents = automationAgents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || agent.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || agent.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-100 text-emerald-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'paused': return 'bg-amber-100 text-amber-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'reminder': return 'bg-blue-100 text-blue-800';
      case 'alert': return 'bg-orange-100 text-orange-800';
      case 'notification': return 'bg-purple-100 text-purple-800';
      case 'processing': return 'bg-forest-100 text-forest-800';
      case 'report': return 'bg-leaf-100 text-leaf-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'reminder': return <Clock className="w-5 h-5" />;
      case 'alert': return <Bell className="w-5 h-5" />;
      case 'notification': return <MessageSquare className="w-5 h-5" />;
      case 'processing': return <Zap className="w-5 h-5" />;
      case 'report': return <BarChart3 className="w-5 h-5" />;
      default: return <Bot className="w-5 h-5" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Play className="w-4 h-4 text-emerald-600" />;
      case 'inactive': return <XCircle className="w-4 h-4 text-red-600" />;
      case 'paused': return <Pause className="w-4 h-4 text-amber-600" />;
      case 'error': return <XCircle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const automationStats = {
    total: automationAgents.length,
    active: automationAgents.filter(a => a.status === 'active').length,
    paused: automationAgents.filter(a => a.status === 'paused').length,
    errors: automationAgents.filter(a => a.status === 'error').length
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
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Automation</h2>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <button className="px-2 sm:px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-xs sm:text-sm">
            <Settings className="w-4 h-4 mr-2 inline" />
            <span className="hidden sm:inline">Settings</span>
          </button>
          <button className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 bg-forest-500 text-white rounded-lg hover:bg-forest-600 transition-colors text-xs sm:text-sm">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">New Agent</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <Bot className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Total Agents</p>
              <p className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">{automationStats.total}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Active</p>
              <p className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">{automationStats.active}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900 rounded-lg flex items-center justify-center">
              <Pause className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Paused</p>
              <p className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">{automationStats.paused}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
              <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Errors</p>
              <p className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">{automationStats.errors}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between space-y-4 xl:space-y-0">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search automation agents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent text-sm"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 lg:space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg text-sm"
              >
                <option value="all">All Types</option>
                <option value="reminder">Reminder</option>
                <option value="alert">Alert</option>
                <option value="notification">Notification</option>
                <option value="processing">Processing</option>
                <option value="report">Report</option>
              </select>
            </div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg text-sm"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="paused">Paused</option>
              <option value="error">Error</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {filteredAgents.map((agent) => (
          <div key={agent.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 bg-${getTypeColor(agent.type).split(' ')[0].split('-')[1]}-100 dark:bg-${getTypeColor(agent.type).split(' ')[0].split('-')[1]}-900 rounded-lg flex items-center justify-center`}>
                  {getTypeIcon(agent.type)}
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">{agent.name}</h3>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{agent.description}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(agent.type)}`}>
                      {agent.type}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(agent.status)}`}>
                      {agent.status}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                {getStatusIcon(agent.status)}
                <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm mb-4">
              <div>
                <span className="text-gray-600 dark:text-gray-400">Trigger:</span>
                <span className="ml-1 font-medium text-gray-900 dark:text-white capitalize">{agent.trigger}</span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Frequency:</span>
                <span className="ml-1 font-medium text-gray-900 dark:text-white capitalize">{agent.frequency}</span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Last Run:</span>
                <span className="ml-1 font-medium text-gray-900 dark:text-white">{agent.lastRun}</span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Success Rate:</span>
                <span className="ml-1 font-medium text-gray-900 dark:text-white">{agent.successRate}%</span>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Actions</h4>
              <div className="flex flex-wrap gap-2">
                {agent.actions.map((action, index) => (
                  <span key={index} className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                    {action.replace(/_/g, ' ')}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Created by {agent.createdBy} on {agent.createdDate}
              </div>
              <div className="flex items-center space-x-2">
                <button className="flex items-center space-x-1 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors text-xs">
                  <Eye className="w-3 h-3" />
                  <span className="hidden sm:inline">View Logs</span>
                </button>
                <button className="flex items-center space-x-1 px-3 py-1 bg-forest-100 dark:bg-forest-900 text-forest-700 dark:text-forest-300 rounded-lg hover:bg-forest-200 dark:hover:bg-forest-800 transition-colors text-xs">
                  <TrendingUp className="w-3 h-3" />
                  <span className="hidden sm:inline">Analytics</span>
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
