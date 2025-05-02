'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store';
import { FiAlertCircle, FiX } from 'react-icons/fi';

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for trying out our AI document summarization",
    features: [
      "5 documents per month",
      "Basic summarization",
      "Email support",
      "Standard processing speed"
    ],
    cta: "Get Started",
    href: "/auth",
    delay: 0.2,
    popular: false
  },
  {
    name: "Pro",
    price: "$29",
    description: "For professionals and small teams",
    features: [
      "Unlimited documents",
      "Priority AI processing",
      "API access",
      "Priority support",
      "Advanced analytics"
    ],
    cta: "Start Free Trial",
    href: "/auth",
    delay: 0.3,
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For legal teams and large organizations",
    features: [
      "Everything in Pro",
      "Legal team support",
      "Audit logs",
      "Custom integrations",
      "Dedicated account manager",
      "SLA guarantees"
    ],
    cta: "Contact Sales",
    href: "/contact",
    delay: 0.4,
    popular: false
  }
];

const UpgradeModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-[#1F1F2E] rounded-2xl p-8 max-w-md w-full border border-white/10"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center">
                <FiAlertCircle className="w-5 h-5 text-yellow-500" />
              </div>
              <h3 className="text-xl font-semibold text-white">Coming Soon</h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <FiX className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          <div className="space-y-4">
            <p className="text-gray-300">
              We&apos;re currently working on implementing the payment system. The upgrade feature will be available soon!
            </p>
            <p className="text-gray-400 text-sm">
              Stay tuned for updates. We&apos;ll notify you when the payment system is ready.
            </p>
          </div>

          <div className="mt-8">
            <button
              onClick={onClose}
              className="w-full py-3 bg-[#5EF1FF] text-[#1F1F2E] font-medium rounded-lg hover:bg-[#4ad1e0] transition-colors"
            >
              Got it
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Pricing = () => {
  const { user } = useAuthStore();
  const currentPlan = user?.plan || 'free';
  const [showModal, setShowModal] = useState(false);

  const handleUpgradeClick = (e: React.MouseEvent, isCurrentPlan: boolean) => {
    if (!isCurrentPlan) {
      e.preventDefault();
      setShowModal(true);
    }
  };

  return (
    <section className="w-full py-20 bg-gradient-to-br from-[#0A0F1C] via-[#0E121B] to-[#0A0F1C]">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-white to-[#5EF1FF]"
        >
          Simple, Transparent Pricing
        </motion.h2>

        {user && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-[#5EF1FF]/10 text-[#5EF1FF] border border-[#5EF1FF]/20">
              Current Plan: {currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1)}
            </span>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            const isCurrentPlan = plan.name.toLowerCase() === currentPlan;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: plan.delay }}
                viewport={{ once: true }}
                className={`relative bg-white/5 backdrop-blur-lg rounded-2xl p-8 border ${
                  plan.popular 
                    ? 'border-[#5EF1FF] scale-105' 
                    : isCurrentPlan
                      ? 'border-[#5EF1FF]'
                      : 'border-white/10 hover:border-[#5EF1FF]/30'
                } transition-all duration-300`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#5EF1FF] text-[#1F1F2E] px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                )}
                
                {isCurrentPlan && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Current Plan
                  </div>
                )}
                
                <h3 className="text-2xl font-bold mb-2 text-white">{plan.name}</h3>
                <div className="text-4xl font-bold mb-4 text-white">{plan.price}</div>
                <p className="text-gray-300 mb-6">{plan.description}</p>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-300">
                      <span className="mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                {isCurrentPlan ? (
                  <button
                    disabled
                    className="w-full py-3 px-6 rounded-md font-medium bg-green-500/50 text-white cursor-not-allowed opacity-75"
                  >
                    Current Plan
                  </button>
                ) : (
                  <Link 
                    href={plan.href}
                    onClick={(e) => handleUpgradeClick(e, isCurrentPlan)}
                    className={`block text-center py-3 px-6 rounded-md font-medium transition-colors ${
                      plan.popular
                        ? 'bg-[#5EF1FF] text-[#1F1F2E] hover:bg-[#4ad1e0]'
                        : 'bg-transparent border border-[#5EF1FF] text-[#5EF1FF] hover:bg-[#5EF1FF]/10'
                    }`}
                  >
                    {plan.cta}
                  </Link>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      <UpgradeModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </section>
  );
};

export default Pricing; 