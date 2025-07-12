'use client'

import React, { useState, useEffect } from 'react';
import { apiClient } from '../../lib/api';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Users, 
  DollarSign, 
  CheckCircle,
  TrendingUp,
  Settings
} from 'lucide-react';

export function Matching() {
  const [matchingStatus, setMatchingStatus] = useState('ready');
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('priority');
  const [batchSize, setBatchSize] = useState(100);
  const [matchingData, setMatchingData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apiClient.getMatchingResults();
        setMatchingData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load matching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Perfect Match': return 'bg-emerald-100 text-emerald-800';
      case 'Partial Match': return 'bg-amber-100 text-amber-800';
      case 'No Match': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case 'High': return 'text-emerald-600';
      case 'Medium': return 'text-amber-600';
      case 'Low': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const handleStartMatching = () => {
    setMatchingStatus('running');
    setTimeout(() => {
      setMatchingStatus('completed');
    }, 3000);
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
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Matching System</h2>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <button className="px-2 sm:px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-xs sm:text-sm">
            <Settings className="w-4 h-4 mr-2 inline" />
            <span className="hidden sm:inline">Settings</span>
          </button>
          <button className="px-2 sm:px-4 py-2 bg-forest-500 text-white rounded-lg hover:bg-forest-600 transition-colors text-xs sm:text-sm">
            <span className="hidden sm:inline">Export Results</span>
            <span className="sm:hidden">Export</span>
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4">Matching Controls</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Algorithm</label>
            <select
              value={selectedAlgorithm}
              onChange={(e) => setSelectedAlgorithm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent text-sm"
            >
              <option value="priority">Priority-Based</option>
              <option value="need">Need-Based</option>
              <option value="merit">Merit-Based</option>
              <option value="balanced">Balanced</option>
            </select>
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Batch Size</label>
            <input
              type="number"
              value={batchSize}
              onChange={(e) => setBatchSize(parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent text-sm"
              min="10"
              max="500"
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${
                matchingStatus === 'running' ? 'bg-blue-500 animate-pulse' : 
                matchingStatus === 'completed' ? 'bg-emerald-500' : 'bg-gray-400'
              }`}></div>
              <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 capitalize">{matchingStatus}</span>
            </div>
          </div>
          <div className="flex items-end space-x-1 sm:space-x-2">
            {matchingStatus === 'ready' && (
              <button
                onClick={handleStartMatching}
                className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-xs sm:text-sm"
              >
                <Play className="w-4 h-4" />
                <span className="hidden sm:inline">Start Matching</span>
                <span className="sm:hidden">Start</span>
              </button>
            )}
            {matchingStatus === 'running' && (
              <button
                onClick={() => setMatchingStatus('paused')}
                className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-xs sm:text-sm"
              >
                <Pause className="w-4 h-4" />
                <span className="hidden sm:inline">Pause</span>
              </button>
            )}
            {matchingStatus === 'completed' && (
              <button
                onClick={() => setMatchingStatus('ready')}
                className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs sm:text-sm"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {matchingData?.stats && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Total Processed</p>
                <p className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">{matchingData.stats.totalProcessed?.toLocaleString()}</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Perfect Matches</p>
                <p className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">{matchingData.stats.perfectMatches?.toLocaleString()}</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Matched Funding</p>
                <p className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">{matchingData.stats.matchedFunding}</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Efficiency</p>
                <p className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">{matchingData.stats.efficiency}%</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {matchingData?.results && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="px-4 sm:px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Matching Results</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-900 dark:text-white text-xs sm:text-sm">Student</th>
                  <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-900 dark:text-white text-xs sm:text-sm">Requested</th>
                  <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-900 dark:text-white text-xs sm:text-sm hidden lg:table-cell">Matched Sources</th>
                  <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-900 dark:text-white text-xs sm:text-sm">Total Matched</th>
                  <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-900 dark:text-white text-xs sm:text-sm hidden md:table-cell">Match Score</th>
                  <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-900 dark:text-white text-xs sm:text-sm hidden xl:table-cell">Confidence</th>
                  <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-900 dark:text-white text-xs sm:text-sm">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {matchingData.results.map((result: any) => (
                  <tr key={result.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="py-4 px-2 sm:px-4">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white text-sm">{result.student}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{result.studentId}</div>
                      </div>
                    </td>
                    <td className="py-4 px-2 sm:px-4">
                      <div className="font-medium text-gray-900 dark:text-white text-sm">{result.requestAmount}</div>
                    </td>
                    <td className="py-4 px-2 sm:px-4 hidden lg:table-cell">
                      <div className="space-y-1">
                        {result.matchedSources.map((source: any, index: number) => (
                          <div key={index} className="text-sm">
                            <span className="text-gray-700 dark:text-gray-300">{source.name}</span>
                            <span className="text-emerald-600 dark:text-emerald-400 font-medium ml-2">{source.amount}</span>
                          </div>
                        ))}
                        {result.matchedSources.length === 0 && (
                          <span className="text-gray-500 dark:text-gray-400 text-sm">No sources matched</span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-2 sm:px-4">
                      <div className="font-medium text-gray-900 dark:text-white text-sm">{result.totalMatched}</div>
                    </td>
                    <td className="py-4 px-2 sm:px-4 hidden md:table-cell">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full bg-blue-500"
                            style={{ width: `${result.matchScore}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{result.matchScore}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-2 sm:px-4 hidden xl:table-cell">
                      <span className={`text-sm font-medium ${getConfidenceColor(result.confidence)}`}>
                        {result.confidence}
                      </span>
                    </td>
                    <td className="py-4 px-2 sm:px-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(result.status)}`}>
                        {result.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-4">
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}
    </div>
  );
}
