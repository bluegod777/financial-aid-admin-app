'use client'

import React, { useState, useEffect } from 'react';
import { apiClient } from '../../lib/api';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Target
} from 'lucide-react';

export function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apiClient.getAdminDashboard();
        setDashboardData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-forest-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-red-600 dark:text-red-400">{error}</div>
      </div>
    );
  }

  const stats = [
    { 
      label: 'Total Applications', 
      value: dashboardData?.stats?.totalApplications?.toLocaleString() || '0', 
      icon: FileText, 
      color: 'blue', 
      change: '+12%' 
    },
    { 
      label: 'Available Funding', 
      value: `$${(dashboardData?.stats?.availableFunding / 1000000)?.toFixed(1) || '0'}M`, 
      icon: DollarSign, 
      color: 'emerald', 
      change: '+5%' 
    },
    { 
      label: 'Students Served', 
      value: dashboardData?.stats?.studentsServed?.toLocaleString() || '0', 
      icon: Users, 
      color: 'purple', 
      change: '+8%' 
    },
    { 
      label: 'Funding Sources', 
      value: dashboardData?.stats?.fundingSources?.toString() || '0', 
      icon: Target, 
      color: 'amber', 
      change: '+3%' 
    },
  ];

  const workflowStats = [
    { stage: 'Submitted', count: dashboardData?.workflowStats?.submitted || 0, color: 'blue' },
    { stage: 'Under Review', count: dashboardData?.workflowStats?.review || 0, color: 'amber' },
    { stage: 'Approved', count: dashboardData?.workflowStats?.approved || 0, color: 'emerald' },
    { stage: 'Rejected', count: dashboardData?.workflowStats?.rejected || 0, color: 'red' },
    { stage: 'Funded', count: dashboardData?.workflowStats?.funded || 0, color: 'purple' },
  ];

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 bg-gray-50 dark:bg-gray-900 min-h-full">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h2>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <select className="px-2 sm:px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg text-xs sm:text-sm">
            <option>Spring 2024</option>
            <option>Fall 2023</option>
            <option>Spring 2023</option>
          </select>
          <button className="px-2 sm:px-4 py-2 bg-forest-500 text-white rounded-lg hover:bg-forest-600 transition-colors text-xs sm:text-sm">
            <span className="hidden sm:inline">Export Report</span>
            <span className="sm:hidden">Export</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
                </div>
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center ${
                  stat.color === 'blue' ? 'bg-forest-100 dark:bg-forest-900' :
                  stat.color === 'emerald' ? 'bg-leaf-100 dark:bg-leaf-900' :
                  stat.color === 'purple' ? 'bg-mint-100 dark:bg-mint-900' :
                  `bg-${stat.color}-100 dark:bg-${stat.color}-900`
                }`}>
                  <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${
                    stat.color === 'blue' ? 'text-forest-600 dark:text-forest-400' :
                    stat.color === 'emerald' ? 'text-leaf-600 dark:text-leaf-400' :
                    stat.color === 'purple' ? 'text-mint-600 dark:text-mint-400' :
                    `text-${stat.color}-600 dark:text-${stat.color}-400`
                  }`} />
                </div>
              </div>
              <div className="mt-3 sm:mt-4 flex items-center">
                <TrendingUp className="w-4 h-4 text-leaf-500 mr-1" />
                <span className="text-xs sm:text-sm text-leaf-600 dark:text-leaf-400 font-medium">{stat.change}</span>
                <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 ml-1 hidden sm:inline">from last cycle</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4">Application Workflow</h3>
          <div className="space-y-4">
            {workflowStats.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    item.color === 'blue' ? 'bg-forest-500' :
                    item.color === 'emerald' ? 'bg-leaf-500' :
                    item.color === 'purple' ? 'bg-mint-500' :
                    `bg-${item.color}-500`
                  }`}></div>
                  <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">{item.stage}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white">{item.count}</span>
                  <div className="w-16 sm:w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        item.color === 'blue' ? 'bg-forest-500' :
                        item.color === 'emerald' ? 'bg-leaf-500' :
                        item.color === 'purple' ? 'bg-mint-500' :
                        `bg-${item.color}-500`
                      }`}
                      style={{ width: `${(item.count / (dashboardData?.stats?.totalApplications || 1)) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {dashboardData?.recentActivity?.map((activity: any, index: number) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  {activity.status === 'approved' && <CheckCircle className="w-4 h-4 text-leaf-500" />}
                  {activity.status === 'submitted' && <Clock className="w-4 h-4 text-forest-500" />}
                  {activity.status === 'reviewed' && <AlertCircle className="w-4 h-4 text-amber-500" />}
                  {activity.status === 'funded' && <DollarSign className="w-4 h-4 text-mint-500" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">{activity.action}</p>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{activity.student}</p>
                </div>
                <div className="flex-shrink-0 text-xs text-gray-400 dark:text-gray-500">
                  {activity.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
