import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, LegalDocument, Case, Advocate } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      
      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          // Mock login - replace with actual API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const mockUser: User = {
            id: '1',
            email,
            name: 'John Doe',
            role: 'citizen',
            isVerified: true,
            preferredLanguage: 'en',
            createdAt: new Date(),
          };
          
          set({ user: mockUser, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },
      
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      
      updateProfile: (data: Partial<User>) => {
        const { user } = get();
        if (user) {
          set({ user: { ...user, ...data } });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);

interface SearchState {
  query: string;
  results: LegalDocument[];
  isLoading: boolean;
  filters: {
    type: string[];
    jurisdiction: string[];
    language: string;
  };
  setQuery: (query: string) => void;
  setResults: (results: LegalDocument[]) => void;
  setLoading: (loading: boolean) => void;
  updateFilters: (filters: Partial<SearchState['filters']>) => void;
  search: (query: string) => Promise<void>;
}

export const useSearchStore = create<SearchState>((set, get) => ({
  query: '',
  results: [],
  isLoading: false,
  filters: {
    type: [],
    jurisdiction: [],
    language: 'en',
  },
  
  setQuery: (query: string) => set({ query }),
  setResults: (results: LegalDocument[]) => set({ results }),
  setLoading: (loading: boolean) => set({ isLoading: loading }),
  
  updateFilters: (newFilters) => {
    const { filters } = get();
    set({ filters: { ...filters, ...newFilters } });
  },
  
  search: async (query: string) => {
    set({ isLoading: true, query });
    try {
      // Mock search - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockResults: LegalDocument[] = [
        {
          id: '1',
          title: 'Indian Contract Act, 1872',
          type: 'act',
          jurisdiction: 'India',
          publicationDate: new Date('1872-04-25'),
          contentUrl: '/documents/contract-act-1872.pdf',
          summary: 'An Act to define and amend certain parts of the law relating to contracts.',
          language: 'en',
          tags: ['contract', 'commercial law', 'civil law'],
        },
        {
          id: '2',
          title: 'Consumer Protection Act, 2019',
          type: 'act',
          jurisdiction: 'India',
          publicationDate: new Date('2019-08-09'),
          contentUrl: '/documents/consumer-protection-act-2019.pdf',
          summary: 'An Act to provide for protection of the interests of consumers.',
          language: 'en',
          tags: ['consumer protection', 'rights', 'e-commerce'],
        },
      ];
      
      set({ results: mockResults, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
}));

interface CaseState {
  cases: Case[];
  selectedCase: Case | null;
  isLoading: boolean;
  fetchCases: () => Promise<void>;
  selectCase: (caseId: string) => void;
  trackCase: (caseNumber: string) => Promise<Case | null>;
}

export const useCaseStore = create<CaseState>((set, get) => ({
  cases: [],
  selectedCase: null,
  isLoading: false,
  
  fetchCases: async () => {
    set({ isLoading: true });
    try {
      // Mock fetch - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockCases: Case[] = [
        {
          id: '1',
          caseNumber: 'CRL.A. 123/2024',
          caseType: 'Criminal Appeal',
          courtName: 'Delhi High Court',
          filingDate: new Date('2024-01-15'),
          status: 'hearing_scheduled',
          nextHearingDate: new Date('2024-02-20'),
          parties: {
            plaintiff: 'State of Delhi',
            defendant: 'John Doe',
          },
          summary: 'Criminal appeal against the order of conviction.',
          documents: [],
          timeline: [
            {
              id: '1',
              date: new Date('2024-01-15'),
              event: 'Case Filed',
              description: 'Criminal appeal filed in Delhi High Court',
            },
            {
              id: '2',
              date: new Date('2024-01-20'),
              event: 'Notice Issued',
              description: 'Notice issued to respondent',
            },
          ],
        },
      ];
      
      set({ cases: mockCases, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  
  selectCase: (caseId: string) => {
    const { cases } = get();
    const selectedCase = cases.find(c => c.id === caseId) || null;
    set({ selectedCase });
  },
  
  trackCase: async (caseNumber: string) => {
    set({ isLoading: true });
    try {
      // Mock track case - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const foundCase = get().cases.find(c => c.caseNumber === caseNumber) || null;
      set({ selectedCase: foundCase, isLoading: false });
      return foundCase;
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
}));

interface AdvocateState {
  advocates: Advocate[];
  selectedAdvocate: Advocate | null;
  isLoading: boolean;
  searchFilters: {
    location: string;
    specialization: string;
    experience: string;
    fee: [number, number];
  };
  searchAdvocates: (filters?: Partial<AdvocateState['searchFilters']>) => Promise<void>;
  selectAdvocate: (advocateId: string) => void;
  updateFilters: (filters: Partial<AdvocateState['searchFilters']>) => void;
}

export const useAdvocateStore = create<AdvocateState>((set, get) => ({
  advocates: [],
  selectedAdvocate: null,
  isLoading: false,
  searchFilters: {
    location: '',
    specialization: '',
    experience: '',
    fee: [0, 10000],
  },
  
  searchAdvocates: async (filters) => {
    set({ isLoading: true });
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockAdvocates: Advocate[] = [
        {
          id: '1',
          userId: 'adv1',
          name: 'Advocate Priya Sharma',
          barCouncilNumber: 'D/123/2010',
          specializations: ['Criminal Law', 'Family Law'],
          experienceYears: 15,
          courtJurisdictions: ['Delhi High Court', 'Supreme Court'],
          consultationFee: 2500,
          rating: 4.8,
          totalReviews: 156,
          isVerified: true,
          bio: 'Experienced criminal and family law advocate with over 15 years of practice.',
          languages: ['English', 'Hindi'],
        },
        {
          id: '2',
          userId: 'adv2',
          name: 'Advocate Rajesh Kumar',
          barCouncilNumber: 'M/456/2008',
          specializations: ['Corporate Law', 'Commercial Disputes'],
          experienceYears: 18,
          courtJurisdictions: ['Bombay High Court', 'Supreme Court'],
          consultationFee: 3500,
          rating: 4.9,
          totalReviews: 203,
          isVerified: true,
          bio: 'Corporate law specialist with extensive experience in mergers and acquisitions.',
          languages: ['English', 'Hindi', 'Marathi'],
        },
      ];
      
      set({ advocates: mockAdvocates, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  
  selectAdvocate: (advocateId: string) => {
    const { advocates } = get();
    const advocate = advocates.find(a => a.id === advocateId) || null;
    set({ selectedAdvocate: advocate });
  },
  
  updateFilters: (newFilters) => {
    const { searchFilters } = get();
    set({ searchFilters: { ...searchFilters, ...newFilters } });
  },
}));
