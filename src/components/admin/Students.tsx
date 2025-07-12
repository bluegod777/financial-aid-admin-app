'use client'

import React, { useState, useEffect } from 'react';
import { apiClient } from '../../lib/api';
import { 
  Search, 
  Filter, 
  User, 
  GraduationCap, 
  DollarSign,
  FileText,
  Eye,
  MessageSquare
} from 'lucide-react';

export function Students() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMajor, setSelectedMajor] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apiClient.getStudents();
        setStudents(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load students');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMajor = selectedMajor === 'all' || student.major === selectedMajor;
    const matchesYear = selectedYear === 'all' || student.year === selectedYear;
    return matchesSearch && matchesMajor && matchesYear;
  });

  const getDemographicTags = (demographics: any): string[] => {
    const tags: string[] = [];
    if (demographics.firstGen) tags.push('First-Gen');
    if (demographics.veteran) tags.push('Veteran');
    if (demographics.athlete) tags.push('Athlete');
    return tags;
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
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Students</h2>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <button className="px-2 sm:px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-xs sm:text-sm">
            <span className="hidden sm:inline">Export Data</span>
            <span className="sm:hidden">Export</span>
          </button>
          <button className="px-2 sm:px-4 py-2 bg-forest-500 text-white rounded-lg hover:bg-forest-600 transition-colors text-xs sm:text-sm">
            <span className="hidden sm:inline">Bulk Actions</span>
            <span className="sm:hidden">Bulk</span>
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between space-y-4 xl:space-y-0">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search students..."
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
                value={selectedMajor}
                onChange={(e) => setSelectedMajor(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg text-sm"
              >
                <option value="all">All Majors</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Engineering">Engineering</option>
                <option value="Business">Business</option>
                <option value="Nursing">Nursing</option>
                <option value="Education">Education</option>
              </select>
            </div>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg text-sm"
            >
              <option value="all">All Years</option>
              <option value="Freshman">Freshman</option>
              <option value="Sophomore">Sophomore</option>
              <option value="Junior">Junior</option>
              <option value="Senior">Senior</option>
              <option value="Graduate">Graduate</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {filteredStudents.map((student) => (
          <div key={student.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <User className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">{student.name}</h3>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{student.studentId} • {student.email}</p>
                  <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">{student.major} • {student.year}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                  GPA: {student.gpa}
                </span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  student.status === 'Active' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                }`}>
                  {student.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm mb-4">
              <div>
                <span className="text-gray-600 dark:text-gray-400">Credits:</span>
                <span className="ml-1 font-medium text-gray-900 dark:text-white">{student.credits}</span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">EFC:</span>
                <span className="ml-1 font-medium text-gray-900 dark:text-white">{student.financial.efc}</span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Income:</span>
                <span className="ml-1 font-medium text-gray-900 dark:text-white">{student.financial.income}</span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Applications:</span>
                <span className="ml-1 font-medium text-gray-900 dark:text-white">{student.applications}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-4">
              <div>
                <span className="text-gray-600 dark:text-gray-400">Total Requested:</span>
                <span className="ml-1 font-medium text-gray-900 dark:text-white">{student.totalRequested}</span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Total Received:</span>
                <span className="ml-1 font-medium text-gray-900 dark:text-white">{student.totalReceived}</span>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {getDemographicTags(student.demographics).map((tag, index) => (
                  <span key={index} className="px-2 py-1 text-xs font-medium rounded-full bg-forest-100 text-forest-800 dark:bg-forest-900 dark:text-forest-300">
                    {tag}
                  </span>
                ))}
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-leaf-100 text-leaf-800 dark:bg-leaf-900 dark:text-leaf-300">
                  {student.demographics.gender}
                </span>
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-mint-100 text-mint-800 dark:bg-mint-900 dark:text-mint-300">
                  {student.demographics.ethnicity}
                </span>
                {student.financial.inState && (
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                    In-State
                  </span>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Student ID: {student.studentId}
              </div>
              <div className="flex items-center space-x-2">
                <button className="flex items-center space-x-1 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors text-xs">
                  <Eye className="w-3 h-3" />
                  <span className="hidden sm:inline">View</span>
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
