import AuthWrapper from "@/components/AuthWrapper";
import { Sidebar } from "@/components/dashboard/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthWrapper>
      <div className="min-h-screen bg-[#0e1117] text-white">
        <Sidebar />
        
        {/* Main Content */}
        <main className="md:pl-64 transition-all duration-300">
          {children}
        </main>
      </div>
    </AuthWrapper>
  );
}
