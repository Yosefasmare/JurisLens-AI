import AuthForm from '@/components/AuthForm';
import React from 'react';

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-[#0A0F1C] relative overflow-hidden">
      {/* Main Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0F1C] via-[#0E121B] to-[#0A0F1C]" />
      
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
      
      {/* Radial Gradients */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(62,232,194,0.1),transparent_70%)] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(62,232,194,0.05),transparent_70%)] translate-x-1/2 translate-y-1/2" />
      </div>

      {/* Subtle Legal Symbols */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 text-4xl">⚖️</div>
        <div className="absolute top-40 right-20 text-4xl">📚</div>
        <div className="absolute bottom-20 left-1/4 text-4xl">§</div>
        <div className="absolute bottom-40 right-1/4 text-4xl">⚖️</div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        {/* Glassmorphic Login Panel */}
        <div className="w-full max-w-[420px] bg-white/6 backdrop-blur-xl rounded-2xl p-10 border border-white/10 shadow-[0_0_30px_rgba(62,232,194,0.1)]">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-4xl mb-2">⚖️</div>
            <h1 className="text-3xl font-bold text-white mb-2 font-['Poppins']">
              JurisLens AI
            </h1>
            <p className="text-[#d1d5db]">
              Smart legal summaries, instantly.
            </p>
          </div>

          {/* Login Form */}
          <AuthForm />
        </div>
      </div>
    </div>
  );
}