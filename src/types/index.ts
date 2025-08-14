// Core type definitions for the Law E-Portal

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: 'citizen' | 'advocate' | 'court_staff' | 'admin';
  isVerified: boolean;
  preferredLanguage: string;
  avatar?: string;
  createdAt: Date;
}

export interface LegalDocument {
  id: string;
  title: string;
  type: 'act' | 'rule' | 'judgment' | 'notification' | 'circular';
  jurisdiction: string;
  publicationDate: Date;
  contentUrl: string;
  summary: string;
  language: string;
  tags: string[];
  bookmarked?: boolean;
}

export interface Case {
  id: string;
  caseNumber: string;
  caseType: string;
  courtName: string;
  filingDate: Date;
  status: 'filed' | 'under_review' | 'hearing_scheduled' | 'decided' | 'dismissed';
  nextHearingDate?: Date;
  parties: {
    plaintiff: string;
    defendant: string;
  };
  summary: string;
  documents: string[];
  timeline: CaseEvent[];
}

export interface CaseEvent {
  id: string;
  date: Date;
  event: string;
  description: string;
  courtOrder?: string;
}

export interface Advocate {
  id: string;
  userId: string;
  name: string;
  barCouncilNumber: string;
  specializations: string[];
  experienceYears: number;
  courtJurisdictions: string[];
  consultationFee: number;
  rating: number;
  totalReviews: number;
  isVerified: boolean;
  avatar?: string;
  bio: string;
  languages: string[];
}

export interface Consultation {
  id: string;
  advocateId: string;
  clientId: string;
  scheduledDate: Date;
  duration: number;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  meetingLink?: string;
  notes?: string;
  fee: number;
}

export interface Filing {
  id: string;
  userId: string;
  templateId: string;
  caseType: string;
  courtType: string;
  jurisdiction: string;
  formData: Record<string, any>;
  documents: FileUpload[];
  status: 'draft' | 'review' | 'submitted' | 'accepted' | 'rejected';
  submittedAt?: Date;
  filingFee: number;
  caseId?: string;
}

export interface FileUpload {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  uploadedAt: Date;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  type: 'text' | 'file' | 'video_call';
  timestamp: Date;
  attachments?: FileUpload[];
  isRead: boolean;
}

export interface Conversation {
  id: string;
  participants: string[];
  type: 'direct' | 'group' | 'support';
  lastMessage?: Message;
  unreadCount: number;
  createdAt: Date;
}

export interface SearchFilters {
  type?: string[];
  jurisdiction?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  language?: string;
}

export interface AIQueryResponse {
  answer: string;
  sources: LegalDocument[];
  confidence: number;
  disclaimer: string;
  followUpQuestions?: string[];
}
