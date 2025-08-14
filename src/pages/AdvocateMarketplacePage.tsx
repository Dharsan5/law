import React, { useState } from 'react';
import { Search, Calendar, MapPin, Phone, Star, Video, Users } from 'lucide-react';
import { useAdvocateStore } from '../store';
import { Button } from '../components/ui/Button';

export const AdvocateMarketplacePage: React.FC = () => {
  const { advocates, isLoading, searchAdvocates } = useAdvocateStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    specialization: '',
    experience: '',
    rating: '',
  });

  React.useEffect(() => {
    searchAdvocates();
  }, []);

  const specializations = [
    'Criminal Law',
    'Civil Law',
    'Family Law',
    'Corporate Law',
    'Property Law',
    'Labor Law',
    'Consumer Protection',
    'Tax Law',
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Find Legal Experts
        </h1>
        <p className="text-gray-600">
          Connect with verified advocates across India for your legal needs
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, specialization, or location..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <select
            value={filters.location}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Locations</option>
            <option value="delhi">Delhi</option>
            <option value="mumbai">Mumbai</option>
            <option value="bangalore">Bangalore</option>
            <option value="kolkata">Kolkata</option>
            <option value="chennai">Chennai</option>
          </select>
          
          <select
            value={filters.specialization}
            onChange={(e) => setFilters({ ...filters, specialization: e.target.value })}
            className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Specializations</option>
            {specializations.map((spec) => (
              <option key={spec} value={spec}>{spec}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Advocates Grid */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Loading advocates...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advocates.map((advocate) => (
            <div key={advocate.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                {/* Advocate Header */}
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-xl font-semibold text-blue-600">
                      {advocate.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {advocate.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">
                      Bar Council No: {advocate.barCouncilNumber}
                    </p>
                    <div className="flex items-center space-x-1">
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(advocate.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        {advocate.rating} ({advocate.totalReviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Specializations */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Specializations</h4>
                  <div className="flex flex-wrap gap-2">
                    {advocate.specializations.map((spec, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Experience and Location */}
                <div className="mb-4 space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{advocate.experienceYears} years experience</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{advocate.courtJurisdictions.join(', ')}</span>
                  </div>
                </div>

                {/* Languages */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Languages</h4>
                  <p className="text-sm text-gray-600">{advocate.languages.join(', ')}</p>
                </div>

                {/* Bio */}
                <div className="mb-4">
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {advocate.bio}
                  </p>
                </div>

                {/* Fee and Actions */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Consultation Fee</p>
                      <p className="text-lg font-semibold text-gray-900">
                        ₹{advocate.consultationFee.toLocaleString()}
                      </p>
                    </div>
                    {advocate.isVerified && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Verified
                      </span>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Button size="sm" className="w-full">
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </Button>
                    <Button size="sm" variant="secondary" className="w-full">
                      <Video className="h-4 w-4 mr-2" />
                      Video
                    </Button>
                  </div>
                  
                  <Button className="w-full mt-3">
                    Book Consultation
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {advocates.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No advocates found</h3>
          <p className="text-gray-600">
            Try adjusting your search criteria or browse all advocates.
          </p>
        </div>
      )}
    </div>
  );
};
