'use client'

import React, { useState, useEffect } from 'react';
import { apiClient } from '../../lib/api';
import { 
  Search, 
  Filter, 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle, 
  DollarSign,
  User,
  Calendar,
  MessageSquare,
  Eye,
  Users
} from 'lucide-react';

export function Workflow() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStage, setSelectedStage] = useState('all');
  const [selectedAssignee, setSelectedAssignee] = useState('all');
  const [workflowItems, setWorkflowItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const workflowStages = [
    { id: 'submitted', name: 'Submitted', icon: FileText, color: 'blue' },
    { id: 'review', name: 'Under Review', icon: Clock, color: 'amber' },
    { id: 'approved', name: 'Approved', icon: CheckCircle, color: 'emerald' },
    { id: 'rejected', name: 'Rejected', icon: XCircle, color: 'red' },
    { id: 'funded', name: 'Funded', icon: DollarSign, color: 'purple' }
  ];

  const staffMembers = [
    'Dr. Smith',
    'Ms. Johnson', 
    'Dr. Williams',
    'Coach Martinez',
    'Prof. Anderson',
    'Ms. Davis',
    'Dr. Thompson',
    'Mr. Wilson',
    'Unassigned'
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apiClient.getWorkflowItems();
        setWorkflowItems(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load workflow data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredItems = workflowItems.filter(item => {
    const matchesSearch = item.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.application.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = selectedStage === 'all' || item.currentStage === selectedStage;
    const matchesAssignee = selectedAssignee === 'all' || item.assignedTo === selectedAssignee;
    return matchesSearch && matchesStage && matchesAssignee;
  });

  const getStageInfo = (stageId: string) => {
    return workflowStages.find(stage => stage.id === stageId) || workflowStages[0];
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

  const workflowStats = {
    submitted: 892,
    review: 456,
    approved: 789,
    rejected: 123,
    funded: 587
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
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Workflow Management</h2>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <button className="px-2 sm:px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-xs sm:text-sm">
            <span className="hidden sm:inline">Export Workflow</span>
            <span className="sm:hidden">Export</span>
          </button>
          <button className="px-2 sm:px-4 py-2 bg-forest-500 text-white rounded-lg hover:bg-forest-600 transition-colors text-xs sm:text-sm">
            <span className="hidden sm:inline">Bulk Actions</span>
            <span className="sm:hidden">Bulk</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {workflowStages.map((stage) => {
          const Icon = stage.icon;
          const count = workflowStats[stage.id as keyof typeof workflowStats];
          return (
            <div key={stage.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 bg-${stage.color}-100 dark:bg-${stage.color}-900 rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 text-${stage.color}-600 dark:text-${stage.color}-400`} />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{stage.name}</p>
                  <p className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">{count}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between space-y-4 xl:space-y-0">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search applications..."
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
                value={selectedStage}
                onChange={(e) => setSelectedStage(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg text-sm"
              >
                <option value="all">All Stages</option>
                <option value="submitted">Submitted</option>
                <option value="review">Under Review</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="funded">Funded</option>
              </select>
            </div>
            <select
              value={selectedAssignee}
              onChange={(e) => setSelectedAssignee(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg text-sm"
            >
              <option value="all">All Assignees</option>
              {staffMembers.map((staff) => (
                <option key={staff} value={staff}>{staff}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {filteredItems.map((item) => {
          const stageInfo = getStageInfo(item.currentStage);
          const Icon = stageInfo.icon;
          
          return (
            <div key={item.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 bg-${stageInfo.color}-100 dark:bg-${stageInfo.color}-900 rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 text-${stageInfo.color}-600 dark:text-${stageInfo.color}-400`} />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">{item.student}</h3>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{item.studentId} • {item.application}</p>
                    <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">{item.amount}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(item.priority)}`}>
                    {item.priority}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full bg-${stageInfo.color}-100 text-${stageInfo.color}-800 dark:bg-${stageInfo.color}-900 dark:text-${stageInfo.color}-300`}>
                    {stageInfo.name}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm mb-4">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-400">Assigned to:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{item.assignedTo}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-400">Last activity:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{item.lastActivity}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-400">Next stage:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{item.nextStage || 'Final'}</span>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Timeline Progress</h4>
                <div className="flex items-center space-x-2 overflow-x-auto">
                  {item.timeline.map((stage, index) => (
                    <div key={index} className="flex items-center space-x-2 flex-shrink-0">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                        stage.completed 
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300' 
                          : stage.inProgress 
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' 
                            : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                      }`}>
                        {stage.completed ? '✓' : stage.inProgress ? '•' : index + 1}
                      </div>
                      <div className="text-xs">
                        <div className={`font-medium ${
                          stage.completed || stage.inProgress 
                            ? 'text-gray-900 dark:text-white' 
                            : 'text-gray-500 dark:text-gray-400'
                        }`}>
                          {stage.stage}
                        </div>
                        {stage.date && (
                          <div className="text-gray-400 dark:text-gray-500">{stage.date}</div>
                        )}
                      </div>
                      {index < item.timeline.length - 1 && (
                        <div className={`w-8 h-0.5 ${
                          stage.completed ? 'bg-emerald-300' : 'bg-gray-200 dark:bg-gray-600'
                        }`}></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {item.notes && (
                <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1">Notes</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.notes}</p>
                </div>
              )}

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  Application ID: {item.id}
                </div>
                <div className="flex items-center space-x-2">
                  <button className="flex items-center space-x-1 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors text-xs">
                    <Eye className="w-3 h-3" />
                    <span className="hidden sm:inline">View Details</span>
                  </button>
                  <button className="flex items-center space-x-1 px-3 py-1 bg-forest-100 dark:bg-forest-900 text-forest-700 dark:text-forest-300 rounded-lg hover:bg-forest-200 dark:hover:bg-forest-800 transition-colors text-xs">
                    <MessageSquare className="w-3 h-3" />
                    <span className="hidden sm:inline">Add Note</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-4">
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}
    </div>
  );
}
