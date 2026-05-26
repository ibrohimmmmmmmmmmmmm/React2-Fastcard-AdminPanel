import { motion } from 'framer-motion';
import { ArrowLeft, Home } from 'lucide-react'; // Using Lucide for clean icons

export default function ErrorPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-9xl font-extrabold text-indigo-600 tracking-widest"
        >
          404
        </motion.h1>
        <motion.div
          animate={{ 
            y: [0, -15, 0],
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="bg-indigo-100 w-24 h-24 rounded-full mx-auto my-8 flex items-center justify-center"
        >
          <div className="w-12 h-12 bg-indigo-500 rounded-lg rotate-12 flex items-center justify-center text-white font-bold text-2xl">
            ?
          </div>
        </motion.div>

        {/* Content */}
        <h2 className="text-3xl font-bold text-slate-800 mb-4">
          Lost in Space?
        </h2>
        <p className="text-slate-600 mb-8 leading-relaxed">
          The page you're looking for has vanished into the digital void. 
          Don't worry, even the best explorers get lost sometimes.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-colors shadow-sm"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
          
          <a 
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
          >
            <Home size={18} />
            Take Me Home
          </a>
        </div>

        {/* Subtle Background Detail */}
        <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden opacity-20 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-300 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-200 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
}