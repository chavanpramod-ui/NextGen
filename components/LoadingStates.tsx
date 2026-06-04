'use client';

import { motion } from 'framer-motion';
import { Loader } from 'lucide-react';

export function LoadingSkeletons() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {[...Array(8)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0.35 }}
          animate={{ opacity: [0.35, 0.7, 0.35] }}
          transition={{ duration: 1.6, repeat: Infinity, delay: index * 0.06 }}
          className="h-48 rounded-lg border border-slate-800 bg-slate-900"
        />
      ))}
    </div>
  );
}

export function ErrorState({ message }: { message: string }) {
  return (
    <div className="rounded-lg border border-red-400/30 bg-red-400/10 p-4 text-red-100">
      <p className="font-semibold">Unable to load data</p>
      <p className="mt-1 text-sm text-red-200/80">{message}</p>
    </div>
  );
}

export function ConnectingState() {
  return (
    <div className="flex items-center justify-center gap-3 p-6 text-slate-300">
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}>
        <Loader className="text-cyan-300" />
      </motion.div>
      <p>Connecting to database...</p>
    </div>
  );
}
