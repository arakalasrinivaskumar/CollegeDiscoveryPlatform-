import { ArrowRight, Search, Scale, BrainCircuit, Users, CheckCircle } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { CollegeCard } from "@/components/CollegeCard";
export const dynamic = "force-dynamic";

export default async function Home() {
  const featuredColleges = await prisma.college.findMany({
    take: 6,
    orderBy: { rating: 'desc' }
  });

  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 md:pt-24 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 z-10">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full font-bold text-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Trusted by 50,000+ Students
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[0.9]">
              Find Your <br />
              <span className="gradient-text">Dream</span> <br />
              College.
            </h1>
            <p className="text-xl text-muted-foreground max-w-lg leading-relaxed font-medium">
              The ultimate platform to discover, compare, and get predicted admissions for the top universities in India.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/colleges" 
                className="px-8 py-4 bg-primary text-white rounded-2xl font-black text-lg hover:scale-[1.02] transition-transform shadow-xl shadow-primary/30 flex items-center justify-center gap-2"
              >
                Start Exploring <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                href="/predictor" 
                className="px-8 py-4 bg-white text-foreground border rounded-2xl font-black text-lg hover:bg-muted transition-colors flex items-center justify-center gap-2"
              >
                Try Predictor
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-4 bg-primary/20 blur-[100px] rounded-full"></div>
            <div className="relative bg-card rounded-[40px] overflow-hidden shadow-2xl border aspect-[4/3] transform lg:rotate-3 hover:rotate-0 transition-transform duration-700">
               <img 
                 src="/hero_banner_1777479388966.png" 
                 alt="Hero Banner" 
                 className="w-full h-full object-cover"
               />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Search, title: "Smart Discovery", desc: "Filter through 40k+ colleges based on fees, location and courses." },
            { icon: Scale, title: "Deep Comparison", desc: "Side-by-side comparison of placement stats, facilities and real reviews." },
            { icon: BrainCircuit, title: "AI Predictor", desc: "Know your admission chances based on 10 years of historical cutoff data." },
          ].map((f, i) => (
            <div key={i} className="bg-card p-10 rounded-[32px] border hover:shadow-2xl hover:border-primary/20 transition-all group">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all">
                <f.icon className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-black mb-3">{f.title}</h3>
              <p className="text-muted-foreground font-medium">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Colleges */}
      <section className="bg-muted/30 py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-4xl font-black mb-4">Top Rated Institutions</h2>
              <p className="text-muted-foreground font-medium">Consistently ranking high on student satisfaction and placements.</p>
            </div>
            <Link href="/colleges" className="text-primary font-bold flex items-center gap-2 hover:gap-3 transition-all">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredColleges.map(c => (
              <CollegeCard key={c.id} college={c} />
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="max-w-7xl mx-auto px-4 w-full">
        <div className="bg-foreground text-background p-12 md:p-20 rounded-[48px] flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-center">
            <p className="text-5xl md:text-7xl font-black mb-2">40K+</p>
            <p className="text-background/60 font-bold uppercase tracking-widest text-sm">Colleges Listed</p>
          </div>
          <div className="text-center">
            <p className="text-5xl md:text-7xl font-black mb-2">150K+</p>
            <p className="text-background/60 font-bold uppercase tracking-widest text-sm">Active Students</p>
          </div>
          <div className="text-center">
            <p className="text-5xl md:text-7xl font-black mb-2">98%</p>
            <p className="text-background/60 font-bold uppercase tracking-widest text-sm">Success Rate</p>
          </div>
        </div>
      </section>
    </div>
  );
}
