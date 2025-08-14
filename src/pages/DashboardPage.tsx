import React from 'react';
import { FileText, Users, MessageSquare, TrendingUp, Calendar, Bell } from 'lucide-react';
import { useAuthStore } from '../store';

export const DashboardPage: React.FC = () => {
  const { user } = useAuthStore();

  const stats = [
    { name: 'Active Cases', value: '3', icon: FileText, change: '+2', changeType: 'increase' },
    { name: 'Consultations', value: '8', icon: Users, change: '+1', changeType: 'increase' },
    { name: 'Documents', value: '24', icon: MessageSquare, change: '+5', changeType: 'increase' },
    { name: 'This Month', value: '₹12,500', icon: TrendingUp, change: '+12%', changeType: 'increase' },
  ];

  const recentActivity = [
    { id: 1, type: 'case', message: 'Case CRL.A. 123/2024 hearing scheduled', time: '2 hours ago' },
    { id: 2, type: 'document', message: 'New document uploaded to Property Case', time: '5 hours ago' },
    { id: 3, type: 'consultation', message: 'Consultation with Advocate Priya Sharma completed', time: '1 day ago' },
    { id: 4, type: 'filing', message: 'E-filing submitted successfully', time: '2 days ago' },
  ];

  const upcomingEvents = [
    { id: 1, title: 'Court Hearing', case: 'CRL.A. 123/2024', time: 'Tomorrow, 10:00 AM' },
    { id: 2, title: 'Consultation', advocate: 'Advocate Rajesh Kumar', time: 'Friday, 3:00 PM' },
    { id: 3, title: 'Document Deadline', case: 'Civil Suit 456/2024', time: 'Next Monday' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-gray-600">
          Here's what's happening with your legal matters today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <stat.icon className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                <div className="flex items-baseline">
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                  <p className={`ml-2 text-sm font-medium ${
                    stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Upcoming Events</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{event.title}</p>
                    <p className="text-xs text-gray-500">
                      {event.case || event.advocate} • {event.time}
                    </p>
                  </div>
                  <Bell className="h-4 w-4 text-gray-400" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
