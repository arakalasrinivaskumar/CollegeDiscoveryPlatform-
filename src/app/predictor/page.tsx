"use client";

import { useState } from "react";
import { BrainCircuit, Search, GraduationCap, ArrowRight, Trophy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function PredictorPage() {
  const [rank, setRank] = useState<string>("");
  const [exam, setExam] = useState<string>("JEE_MAIN");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const res = await fetch(`/api/predict?rank=${rank}&exam=${exam}`);
    const data = await res.json();
    
    setResults(data);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full font-bold text-sm">
          <BrainCircuit className="w-4 h-4" /> AI Powered Prediction
        </div>
        <h1 className="text-5xl font-black tracking-tight">Admission Predictor</h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Enter your entrance exam rank to see which colleges you have a high probability of getting into.
        </p>
      </div>

      <div className="bg-card p-8 rounded-3xl border shadow-xl mb-12">
        <form onSubmit={handlePredict} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold block ml-1 uppercase tracking-wider text-muted-foreground">Entrance Exam</label>
              <select 
                className="w-full bg-muted border-none rounded-2xl p-4 font-semibold outline-none focus:ring-2 ring-primary/20"
                value={exam}
                onChange={(e) => setExam(e.target.value)}
              >
                <option value="JEE_MAIN">JEE Main</option>
                <option value="JEE_ADVANCED">JEE Advanced</option>
                <option value="NEET">NEET</option>
                <option value="BITSAT">BITSAT</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold block ml-1 uppercase tracking-wider text-muted-foreground">Your Rank</label>
              <input
                type="number"
                placeholder="e.g. 1500"
                className="w-full bg-muted border-none rounded-2xl p-4 font-semibold outline-none focus:ring-2 ring-primary/20"
                value={rank}
                onChange={(e) => setRank(e.target.value)}
                required
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-primary text-white rounded-2xl font-black text-lg hover:scale-[1.01] transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/25"
          >
            {loading ? "Analyzing Data..." : (
              <>
                <Search className="w-5 h-5" /> Predict My Chances
              </>
            )}
          </button>
        </form>
      </div>

      <div className="space-y-6">
        <AnimatePresence>
          {results.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-black flex items-center gap-2">
                <Trophy className="w-6 h-6 text-yellow-500" /> Top Recommendations
              </h2>
              {results.map((college, i) => (
                <motion.div
                  key={college.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card p-6 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-6 hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-muted overflow-hidden flex-shrink-0">
                      <img src={college.image || ""} className="w-full h-full object-cover" alt="" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{college.name}</h3>
                      <p className="text-muted-foreground text-sm flex items-center gap-1">
                        <GraduationCap className="w-4 h-4" /> Probable Course: {college.probableCourse}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8 w-full md:w-auto border-t md:border-0 pt-4 md:pt-0">
                    <div className="text-center md:text-right">
                      <p className="text-xs font-bold text-muted-foreground uppercase">Admission Chance</p>
                      <p className="text-xl font-black text-green-500">{college.chance}%</p>
                    </div>
                    <Link 
                      href={`/colleges/${college.id}`}
                      className="p-3 bg-primary/10 text-primary rounded-xl hover:bg-primary hover:text-white transition-all ml-auto md:ml-0"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
