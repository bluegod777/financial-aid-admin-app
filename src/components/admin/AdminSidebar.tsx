'use client'

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  DollarSign, 
  FileText, 
  Users, 
  GitMerge, 
  Workflow,
  Bot,
  X,
  ArrowLeft
} from 'lucide-react';

interface AdminSidebarProps {
  sidebarOpen?: boolean;
  setSidebarOpen?: (open: boolean) => void;
}

const navigation = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
  { name: 'Funding Sources', icon: DollarSign, href: '/admin/funding-sources' },
  { name: 'Funding Requests', icon: FileText, href: '/admin/funding-requests' },
  { name: 'Students', icon: Users, href: '/admin/students' },
  { name: 'Matching', icon: GitMerge, href: '/admin/matching' },
  { name: 'Workflow', icon: Workflow, href: '/admin/workflow' },
  { name: 'Automation', icon: Bot, href: '/admin/automation' },
];

export function AdminSidebar({ sidebarOpen = true, setSidebarOpen }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <div className={`
      fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg border-r border-gray-200 dark:border-gray-700 flex flex-col transform transition-transform duration-300 ease-in-out
      lg:translate-x-0 lg:static lg:inset-0
      ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
    `}>
      <div className="lg:hidden flex justify-between items-center p-4">
        <Link href="/" className="flex items-center text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Portal
        </Link>
        <button
          onClick={() => setSidebarOpen?.(false)}
          className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
      
      <div className="p-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-forest-500 rounded-lg flex items-center justify-center">
            <LayoutDashboard className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Admin Panel</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">Financial Aid Management</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 px-4 pb-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-forest-50 dark:bg-forest-900 text-forest-700 dark:text-forest-300 border-r-2 border-forest-600'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-forest-600 dark:text-forest-400' : 'text-gray-400 dark:text-gray-500'}`} />
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <Link 
          href="/"
          className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Student Portal</span>
        </Link>
      </div>
    </div>
  );
}
