"use client";

import Link from "next/link";
import { Search, GraduationCap, Scale, BrainCircuit, MessageSquare, User } from "lucide-react";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <GraduationCap className="w-8 h-8 text-primary" />
          <span className="text-2xl font-bold gradient-text">EduQuest</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/colleges" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-2">
            <Search className="w-4 h-4" /> Discover
          </Link>
          <Link href="/compare" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-2">
            <Scale className="w-4 h-4" /> Compare
          </Link>
          <Link href="/predictor" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-2">
            <BrainCircuit className="w-4 h-4" /> Predictor
          </Link>
          <Link href="/discussions" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-2">
            <MessageSquare className="w-4 h-4" /> Q&A
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-muted rounded-full transition-colors">
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  );
};
