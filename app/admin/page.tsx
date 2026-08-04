'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, Activity, Search, Filter, Trash2, Edit } from 'lucide-react';
import { initialCourses } from '@/lib/mockData';

const mockUsers = [
  { id: '1', name: 'Alex Morgan', email: 'alex@student.edu', role: 'Student', status: 'Active', joined: '2023-09-01' },
  { id: '2', name: 'Sam Taylor', email: 'sam.t@student.edu', role: 'Student', status: 'Inactive', joined: '2023-08-15' },
  { id: '3', name: 'Prof. Davis', email: 'davis@faculty.edu', role: 'Instructor', status: 'Active', joined: '2021-01-10' },
  { id: '4', name: 'Admin Root', email: 'admin@system.io', role: 'Admin', status: 'Active', joined: '2020-11-20' },
];

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<'users' | 'courses'>('users');
  const [searchQuery, setSearchQuery] = useState('');

  const stats = [
    { label: 'Total Users', value: '1,284', icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Active Courses', value: '42', icon: BookOpen, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
    { label: 'System Health', value: '99.9%', icon: Activity, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Admin Dashboard</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage system data and monitor performance.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-lg text-sm font-medium flex items-center gap-2 border border-emerald-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            System Online
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm flex items-center gap-5"
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                <Icon size={24} />
              </div>
              <div>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{stat.value}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Main Content Area */}
      <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl shadow-sm overflow-hidden flex flex-col min-h-[500px]">
        {/* Tabs & Actions */}
        <div className="border-b border-slate-200 dark:border-white/10 p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('users')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'users'
                  ? 'bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white'
                  : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              User Management
            </button>
            <button
              onClick={() => setActiveTab('courses')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'courses'
                  ? 'bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white'
                  : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              Course Database
            </button>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search records..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-500 transition-colors w-full sm:w-64"
              />
            </div>
            <button className="p-2 border border-slate-200 dark:border-white/10 rounded-lg text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="flex-1 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-black/20 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {activeTab === 'users' ? (
                  <>
                    <th className="p-4 sm:px-6 font-semibold">Name</th>
                    <th className="p-4 sm:px-6 font-semibold hidden sm:table-cell">Role</th>
                    <th className="p-4 sm:px-6 font-semibold hidden md:table-cell">Status</th>
                    <th className="p-4 sm:px-6 font-semibold hidden lg:table-cell">Joined</th>
                    <th className="p-4 sm:px-6 font-semibold text-right">Actions</th>
                  </>
                ) : (
                  <>
                    <th className="p-4 sm:px-6 font-semibold">Course Title</th>
                    <th className="p-4 sm:px-6 font-semibold hidden sm:table-cell">Avg. Progress</th>
                    <th className="p-4 sm:px-6 font-semibold hidden md:table-cell">Status</th>
                    <th className="p-4 sm:px-6 font-semibold text-right">Actions</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {activeTab === 'users' && mockUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/80 dark:hover:bg-white/[0.02] transition-colors group">
                  <td className="p-4 sm:px-6">
                    <div className="font-medium text-slate-900 dark:text-white">{user.name}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{user.email}</div>
                  </td>
                  <td className="p-4 sm:px-6 hidden sm:table-cell">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300">
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4 sm:px-6 hidden md:table-cell">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${
                      user.status === 'Active' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                      {user.status}
                    </span>
                  </td>
                  <td className="p-4 sm:px-6 hidden lg:table-cell text-sm text-slate-500 dark:text-slate-400">
                    {user.joined}
                  </td>
                  <td className="p-4 sm:px-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-md transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-md transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {activeTab === 'courses' && initialCourses.map((course) => (
                <tr key={course.id} className="hover:bg-slate-50/80 dark:hover:bg-white/[0.02] transition-colors group">
                  <td className="p-4 sm:px-6">
                    <div className="font-medium text-slate-900 dark:text-white flex items-center gap-3">
                      <span className="text-xl">{course.icon_name}</span>
                      {course.title}
                    </div>
                  </td>
                  <td className="p-4 sm:px-6 hidden sm:table-cell">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-24 bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${course.progress}%` }} />
                      </div>
                      <span className="text-xs text-slate-500 dark:text-slate-400">{course.progress}%</span>
                    </div>
                  </td>
                  <td className="p-4 sm:px-6 hidden md:table-cell">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      Published
                    </span>
                  </td>
                  <td className="p-4 sm:px-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-md transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-md transition-colors">
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
    </div>
  );
}