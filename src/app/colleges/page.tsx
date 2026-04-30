import { prisma } from "@/lib/db";
import { CollegeCard } from "@/components/CollegeCard";
import { Search, Filter } from "lucide-react";

export default async function CollegesPage(props: {
  searchParams: Promise<{ q?: string; location?: string; minFees?: string; maxFees?: string; examCategory?: string }>;
}) {
  const searchParams = await props.searchParams;
  const q = searchParams.q || "";
  const location = searchParams.location || "";
  const examCategory = searchParams.examCategory || "";
  const minFees = searchParams.minFees ? parseInt(searchParams.minFees) : 0;
  const maxFees = searchParams.maxFees ? parseInt(searchParams.maxFees) : 1000000;

  const colleges = await prisma.college.findMany({
    where: {
      AND: [
        { name: { contains: q } },
        { location: { contains: location } },
        { examCategory: examCategory ? { equals: examCategory } : undefined },
        { fees: { gte: minFees, lte: maxFees } },
      ],
    },
    include: {
      _count: {
        select: { reviews: true },
      },
    },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-extrabold mb-2">Explore Colleges</h1>
          <p className="text-muted-foreground">Find the perfect institution for your academic journey.</p>
        </div>

        <form className="flex items-center gap-2 bg-card p-2 rounded-2xl shadow-sm border w-full md:w-96">
          <Search className="w-5 h-5 text-muted-foreground ml-2" />
          <input
            type="text"
            name="q"
            defaultValue={q}
            placeholder="Search by name..."
            className="bg-transparent border-none focus:ring-0 w-full p-2 outline-none"
          />
          <button className="bg-primary text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-primary/90 transition-colors">
            Search
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <aside className="lg:col-span-1 space-y-8">
          <div className="bg-card p-6 rounded-2xl shadow-sm border">
            <div className="flex items-center gap-2 mb-6">
              <Filter className="w-5 h-5 text-primary" />
              <h2 className="font-bold text-lg">Filters</h2>
            </div>

            <form className="space-y-6">
              <div>
                <label className="text-sm font-semibold block mb-2">Exam Category</label>
                <select 
                  name="examCategory" 
                  defaultValue={searchParams.examCategory || ""}
                  className="w-full bg-muted border-none rounded-xl p-3 text-sm focus:ring-2 ring-primary/20 outline-none"
                >
                  <option value="">All Exams</option>
                  <option value="JEE_MAIN">JEE Main</option>
                  <option value="JEE_ADVANCED">JEE Advanced</option>
                  <option value="NEET">NEET</option>
                  <option value="BITSAT">BITSAT</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-semibold block mb-2">Location</label>
                <select 
                  name="location" 
                  defaultValue={location}
                  className="w-full bg-muted border-none rounded-xl p-3 text-sm focus:ring-2 ring-primary/20 outline-none"
                >
                  <option value="">All Locations</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Pilani">Pilani</option>
                  <option value="Vellore">Vellore</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-semibold block mb-2">Budget (Max Fees)</label>
                <input 
                  type="range" 
                  name="maxFees"
                  min="50000" 
                  max="1000000" 
                  step="50000"
                  defaultValue={maxFees}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>₹50k</span>
                  <span>₹10L+</span>
                </div>
              </div>

              <button className="w-full py-3 bg-foreground text-background rounded-xl text-sm font-bold hover:opacity-90 transition-opacity">
                Apply Filters
              </button>
            </form>
          </div>
        </aside>

        {/* Results Grid */}
        <div className="lg:col-span-3">
          {colleges.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {colleges.map((college) => (
                <CollegeCard key={college.id} college={college} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-card rounded-2xl border border-dashed">
              <p className="text-muted-foreground">No colleges found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
