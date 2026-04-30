"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, IndianRupee, ArrowRight, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

interface CollegeCardProps {
  college: {
    id: string;
    name: string;
    location: string;
    fees: number;
    rating: number;
    image: string | null;
    examCategory?: string;
    nirf?: number | null;
    avgPackage?: number | null;
  };
}

export const CollegeCard = ({ college }: CollegeCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      className="bg-card rounded-[2rem] overflow-hidden shadow-xl border border-transparent hover:border-primary/30 transition-all group flex flex-col h-full"
    >
      <div className="relative h-56 w-full overflow-hidden">
        <div className="absolute inset-0 bg-muted animate-pulse" />
        <img
          src={college.image || "/api/placeholder/400/320"}
          alt={college.name}
          className="relative object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
          <div className="bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-bold">{college.rating}</span>
          </div>
          <div className="bg-primary/90 text-white text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-tighter shadow-sm">
            {college.examCategory?.replace('_', ' ')}
          </div>
        </div>
      </div>

      <div className="p-8 flex flex-col flex-1">
        <h3 className="text-2xl font-black mb-3 group-hover:text-primary transition-colors leading-tight">
          {college.name}
        </h3>
        
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="flex items-center gap-2 text-muted-foreground text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-4 h-4 text-primary" />
            <span>{college.location}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground text-xs font-bold uppercase tracking-wider justify-end">
            <Star className="w-4 h-4 text-primary fill-primary/20" />
            <span>NIRF #{college.nirf || "N/A"}</span>
          </div>
          <div className="flex items-center gap-3 text-foreground font-black text-lg">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <IndianRupee className="w-4 h-4" />
            </div>
            <span>{college.fees.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex items-center gap-2 text-green-600 font-black text-lg justify-end">
            <TrendingUp className="w-5 h-5" />
            <span>{college.avgPackage} LPA</span>
          </div>
        </div>

        <Link
          href={`/colleges/${college.id}`}
          className="mt-auto flex items-center justify-center gap-2 w-full py-4 bg-primary text-white rounded-2xl font-black text-base hover:bg-primary-dark hover:scale-[1.02] transition-all shadow-lg shadow-primary/20"
        >
          View Details
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </motion.div>
  );
};
