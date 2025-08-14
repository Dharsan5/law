import React, { useState, useEffect } from 'react';
import { Search, Filter, FileText, Calendar, MapPin, BookOpen } from 'lucide-react';
import { useSearchStore } from '../store';
import { Button } from '../components/ui/Button';

export const SearchPage: React.FC = () => {
  const { query, results, isLoading, filters, setQuery, search, updateFilters } = useSearchStore();
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Load initial results
    if (query) {
      search(query);
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      search(query);
    }
  };

  const documentTypes = [
    { id: 'act', label: 'Acts & Laws' },
    { id: 'rule', label: 'Rules & Regulations' },
    { id: 'judgment', label: 'Court Judgments' },
    { id: 'notification', label: 'Government Notifications' },
    { id: 'circular', label: 'Circulars' },
  ];

  const jurisdictions = [
    { id: 'central', label: 'Central Government' },
    { id: 'delhi', label: 'Delhi' },
    { id: 'mumbai', label: 'Mumbai' },
    { id: 'bengaluru', label: 'Bengaluru' },
    { id: 'kolkata', label: 'Kolkata' },
    { id: 'chennai', label: 'Chennai' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Search Legal Documents
        </h1>
        <p className="text-gray-600">
          Comprehensive database of Indian laws, acts, regulations, and court judgments
        </p>
      </div>

      {/* Search Form */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <form onSubmit={handleSearch}>
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for laws, acts, cases, or legal topics..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Searching...' : 'Search'}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </form>

        {/* Filters */}
        {showFilters && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Document Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Document Type
                </label>
                <div className="space-y-2">
                  {documentTypes.map((type) => (
                    <label key={type.id} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.type.includes(type.id)}
                        onChange={(e) => {
                          const newTypes = e.target.checked
                            ? [...filters.type, type.id]
                            : filters.type.filter(t => t !== type.id);
                          updateFilters({ type: newTypes });
                        }}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{type.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Jurisdiction */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jurisdiction
                </label>
                <div className="space-y-2">
                  {jurisdictions.map((jurisdiction) => (
                    <label key={jurisdiction.id} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.jurisdiction.includes(jurisdiction.id)}
                        onChange={(e) => {
                          const newJurisdictions = e.target.checked
                            ? [...filters.jurisdiction, jurisdiction.id]
                            : filters.jurisdiction.filter(j => j !== jurisdiction.id);
                          updateFilters({ jurisdiction: newJurisdictions });
                        }}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{jurisdiction.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Language */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Language
                </label>
                <select
                  value={filters.language}
                  onChange={(e) => updateFilters({ language: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="en">English</option>
                  <option value="hi">Hindi</option>
                  <option value="ta">Tamil</option>
                  <option value="te">Telugu</option>
                  <option value="bn">Bengali</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Search Results */}
      <div>
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Searching legal documents...</p>
          </div>
        ) : results.length > 0 ? (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Search Results ({results.length})
              </h2>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">Sort by:</span>
                <select className="border border-gray-300 rounded-md px-3 py-1 text-sm">
                  <option>Relevance</option>
                  <option>Date (Newest)</option>
                  <option>Date (Oldest)</option>
                  <option>Title (A-Z)</option>
                </select>
              </div>
            </div>

            <div className="space-y-6">
              {results.map((document) => (
                <div key={document.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          document.type === 'act' ? 'bg-blue-100 text-blue-800' :
                          document.type === 'rule' ? 'bg-green-100 text-green-800' :
                          document.type === 'judgment' ? 'bg-purple-100 text-purple-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {document.type.toUpperCase()}
                        </span>
                        <span className="text-sm text-gray-500">
                          {document.language.toUpperCase()}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        <a href={document.contentUrl} className="hover:text-blue-600">
                          {document.title}
                        </a>
                      </h3>
                      
                      <p className="text-gray-600 mb-4">
                        {document.summary}
                      </p>
                      
                      <div className="flex items-center space-x-6 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{document.jurisdiction}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(document.publicationDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FileText className="h-4 w-4" />
                          <span>PDF Document</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mt-3">
                        {document.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-gray-100 text-gray-700"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-2 ml-6">
                      <Button size="sm">
                        <BookOpen className="h-4 w-4 mr-2" />
                        View
                      </Button>
                      <Button size="sm" variant="secondary">
                        Bookmark
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-center">
              <nav className="flex items-center space-x-2">
                <Button variant="secondary" size="sm" disabled>
                  Previous
                </Button>
                <Button size="sm">1</Button>
                <Button variant="secondary" size="sm">2</Button>
                <Button variant="secondary" size="sm">3</Button>
                <Button variant="secondary" size="sm">
                  Next
                </Button>
              </nav>
            </div>
          </div>
        ) : query ? (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600 mb-4">
              We couldn't find any documents matching your search. Try different keywords or adjust your filters.
            </p>
            <Button onClick={() => setQuery('')}>
              Clear Search
            </Button>
          </div>
        ) : (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Start Your Search</h3>
            <p className="text-gray-600">
              Enter keywords, case names, or legal topics to search our comprehensive database.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
