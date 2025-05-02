import {create} from 'zustand'; 


interface User{
    id: string;
    userName: string;
    email: string;
    password?: string | null;
    profilePic?: string | null
    numberOfDocs: number;
    fileIDs: string[] | null;
    plan: string
    createdAt: Date;
}

interface ParsedResponse {
    executiveSummary: string;
    keyPoints: string[];
    partiesInvolved: string[];
    importantDatesAndDeadlines: string[];
    risksAndLiabilities: string[];
    fullSummaryText: string[];
    accuracyScore: number
  }
  

interface FileState {
    fileType: string | null;
    setFileType: (fileType: string) => void;
    viewMode: 'grid' | 'list';
    setViewMode: (viewMode: 'grid' | 'list') => void;
    fileSummeryLoading: boolean
    setFileSummeryLoading: (fileSummeryLoading: boolean) => void;
    responseText: ParsedResponse | null;
    setResponseText: (responseText: ParsedResponse) => void
}

interface AuthStore {
    user: User | null;
    setUser: (user: User) => void;
    clearUser: () => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
  
}

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
    loading: true,
    setLoading: (loading) => set({ loading }),
}));

export const useFileStore = create<FileState>((set) => ({
    fileType: null,
    setFileType: (fileType) => set({ fileType }),
    viewMode: 'grid',
    setViewMode: (viewMode) => set({ viewMode }),
    fileSummeryLoading: false,
    setFileSummeryLoading: (fileSummeryLoading) => set({ fileSummeryLoading }),
     responseText: null,
     setResponseText: (responseText) => set({ responseText }),
    
}))


