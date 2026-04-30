"use client";

import { useState } from "react";
import { Search, X, Scale, IndianRupee, MapPin, Star, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface College {
  id: string;
  name: string;
  location: string;
  fees: number;
  rating: number;
  placement: number;
  image: string | null;
}

export default function ComparePage({ allColleges }: { allColleges: College[] }) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const selectedColleges = selectedIds.map(
    (id) => allColleges.find((c) => c.id === id)!
  );

  const toggleCollege = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((i) => i !== id));
    } else if (selectedIds.length < 3) {
      setSelectedIds([...selectedIds, id]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-black mb-4">Compare Colleges</h1>
        <p className="text-muted-foreground text-lg">Select up to 3 colleges to compare their key metrics side-by-side.</p>
      </div>

      {/* Selection Area */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {[0, 1, 2].map((index) => (
          <div key={index} className="relative h-48 rounded-3xl border-2 border-dashed border-muted-foreground/20 bg-card/50 flex flex-col items-center justify-center p-4">
            {selectedColleges[index] ? (
              <div className="w-full h-full relative group">
                <img 
                  src={selectedColleges[index].image || ""} 
                  className="w-full h-full object-cover rounded-2xl brightness-50"
                  alt=""
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                  <h3 className="text-white font-bold text-lg mb-2">{selectedColleges[index].name}</h3>
                  <button 
                    onClick={() => toggleCollege(selectedColleges[index].id)}
                    className="p-2 bg-red-500 text-white rounded-full hover:scale-110 transition-transform"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-4 w-full">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto text-muted-foreground">
                  <Scale className="w-6 h-6" />
                </div>
                <div className="w-full max-w-xs mx-auto">
                  <select
                    className="w-full bg-card border rounded-xl p-4 text-sm font-bold focus:ring-2 ring-primary/20 outline-none cursor-pointer hover:bg-muted/50 transition-colors appearance-none"
                    value=""
                    onChange={(e) => toggleCollege(e.target.value)}
                    disabled={index !== selectedIds.length}
                  >
                    <option value="" disabled>Select a college...</option>
                    {[...allColleges]
                      .filter(c => !selectedIds.includes(c.id))
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name} ({c.location})
                        </option>
                      ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                    ▼
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Comparison Table */}
      {selectedColleges.length > 1 ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-3xl border shadow-xl overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted/50">
                  <th className="p-8 font-black text-xl border-r">Feature</th>
                  {selectedColleges.map(c => (
                    <th key={c.id} className="p-8 font-black text-xl text-center border-r last:border-0">{c.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-lg">
                <tr className="border-b">
                  <td className="p-8 font-bold flex items-center gap-3 border-r">
                    <IndianRupee className="w-5 h-5 text-green-500" /> Fees (Annual)
                  </td>
                  {selectedColleges.map(c => (
                    <td key={c.id} className="p-8 text-center border-r last:border-0 font-semibold">₹{c.fees.toLocaleString()}</td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="p-8 font-bold flex items-center gap-3 border-r">
                    <TrendingUp className="w-5 h-5 text-blue-500" /> Placement %
                  </td>
                  {selectedColleges.map(c => (
                    <td key={c.id} className="p-8 text-center border-r last:border-0 font-semibold">{c.placement}%</td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="p-8 font-bold flex items-center gap-3 border-r">
                    <Star className="w-5 h-5 text-yellow-500" /> Rating
                  </td>
                  {selectedColleges.map(c => (
                    <td key={c.id} className="p-8 text-center border-r last:border-0 font-semibold">
                      <div className="flex items-center justify-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                        {c.rating}
                      </div>
                    </td>
                  ))}
                </tr>
                <tr className="border-b last:border-0">
                  <td className="p-8 font-bold flex items-center gap-3 border-r">
                    <MapPin className="w-5 h-5 text-red-500" /> Location
                  </td>
                  {selectedColleges.map(c => (
                    <td key={c.id} className="p-8 text-center border-r last:border-0 font-semibold">{c.location}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>
      ) : (
        <div className="text-center py-20 bg-muted/30 rounded-3xl border-2 border-dashed">
          <p className="text-muted-foreground font-medium">Select at least 2 colleges to see the comparison table.</p>
        </div>
      )}
    </div>
  );
}
