import { Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function OnboardingProgressBar({ currentStep, steps }) {
  return (
    <div className="w-full px-4 sm:px-0">
      <ol role="list" className="relative grid grid-cols-4 text-sm font-medium text-gray-500">
        {/* Linha de conexão */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-700">
          <div 
            className="h-full bg-[#F9A51A] transition-all duration-500 ease-in-out"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          />
        </div>
        
        {steps.map((step, stepIdx) => (
          <li key={step.name} className="relative flex justify-center z-10">
            <AnimatePresence>
              {stepIdx < currentStep ? (
                // Completed Step
                <motion.a
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center text-center"
                >
                  <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#F9A51A]">
                    <Check className="h-6 w-6 text-white" aria-hidden="true" />
                  </span>
                  <span className="mt-2 text-xs sm:text-sm font-semibold text-white">{step.name}</span>
                </motion.a>
              ) : stepIdx === currentStep ? (
                // Current Step
                <motion.a
                  initial={{ scale: 0.8, opacity: 0.5 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center text-center"
                  aria-current="step"
                >
                  <span className="relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#F9A51A] bg-secondary">
                    <span className="h-3 w-3 rounded-full bg-[#F9A51A]" />
                  </span>
                  <span className="mt-2 text-xs sm:text-sm font-semibold text-[#F9A51A]">{step.name}</span>
                </motion.a>
              ) : (
                // Upcoming Step
                <a className="group flex flex-col items-center text-center">
                  <span className="relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-700 bg-secondary group-hover:border-gray-500">
                    <span className="h-3 w-3 rounded-full bg-transparent" />
                  </span>
                  <span className="mt-2 text-xs sm:text-sm font-medium text-gray-400 group-hover:text-gray-200">{step.name}</span>
                </a>
              )}
            </AnimatePresence>
          </li>
        ))}
      </ol>
    </div>
  );
}
