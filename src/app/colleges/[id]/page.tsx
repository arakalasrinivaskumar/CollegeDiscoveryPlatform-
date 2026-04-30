import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { 
  MapPin, 
  IndianRupee, 
  Star, 
  CheckCircle2, 
  Building2, 
  Users, 
  GraduationCap,
  TrendingUp,
  MessageCircle,
  BookOpen
} from "lucide-react";

export default async function CollegeDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const college = await prisma.college.findUnique({
    where: { id: params.id },
    include: {
      courses: true,
      reviews: true,
    },
  });

  if (!college) notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="relative h-[400px] w-full rounded-3xl overflow-hidden mb-12 shadow-2xl">
        <img
          src={college.image || "/api/placeholder/1200/400"}
          alt={college.name}
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8 md:p-12">
          <div className="text-white space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-primary px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase">Top Ranked</span>
              <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-sm font-bold">{college.rating} Rating</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-black">{college.name}</h1>
            <div className="flex items-center gap-2 text-white/80">
              <MapPin className="w-5 h-5" />
              <span className="text-lg">{college.location}, {college.state}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-12">
          {/* Overview */}
          <section id="overview" className="bg-card p-8 rounded-3xl shadow-sm border">
            <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
              <Building2 className="w-6 h-6 text-primary" />
              Overview
            </h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              {college.overview}
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-10">
              <div className="space-y-1">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Fees</p>
                <p className="text-xl font-bold">₹{college.fees.toLocaleString('en-IN')}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">NIRF Rank</p>
                <p className="text-xl font-bold">#{college.nirf || "N/A"}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Avg Package</p>
                <p className="text-xl font-bold">₹{college.avgPackage} LPA</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Established</p>
                <p className="text-xl font-bold">{college.established}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Placements</p>
                <p className="text-xl font-bold">{college.placement}%</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Reviews</p>
                <p className="text-xl font-bold">{college.reviews.length}</p>
              </div>
            </div>
          </section>

          {/* Courses */}
          <section id="courses" className="bg-card p-8 rounded-3xl shadow-sm border">
            <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-primary" />
              Courses Offered
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {college.courses.map((course) => (
                <div key={course.id} className="flex items-center gap-3 p-4 bg-muted rounded-2xl border border-transparent hover:border-primary/20 transition-all">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className="font-semibold">{course.name}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Course Structure */}
          <section id="structure" className="bg-card p-8 rounded-3xl shadow-sm border">
            <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-primary" />
              Course Structure
            </h2>
            
            <div className="space-y-6">
              {(college.examCategory === "NEET" ? [
                { year: "Year 1", subjects: "Human Anatomy, Physiology, Biochemistry" },
                { year: "Year 2", subjects: "Pathology, Microbiology, Pharmacology, Forensic Medicine" },
                { year: "Year 3 (Part I)", subjects: "ENT, Ophthalmology, Community Medicine" },
                { year: "Year 3 (Part II)", subjects: "Medicine, Surgery, OBG, Pediatrics" },
                { year: "Final Year", subjects: "Compulsory Rotatory Residential Internship (CRRI)" },
              ] : [
                { year: "Year 1", subjects: "Engineering Mathematics, Applied Physics, Basic Electronics, Intro to Programming" },
                { year: "Year 2", subjects: "Data Structures, Digital Logic, OS, DBMS, Theory of Computation" },
                { year: "Year 3", subjects: "Computer Networks, AI & Machine Learning, Software Engineering, Compiler Design" },
                { year: "Year 4", subjects: "Cloud Computing, Cyber Security, Major Project, Professional Ethics" },
              ]).map((year, idx) => (
                <div key={idx} className="flex gap-6 items-start group">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold border-2 border-primary/20 group-hover:bg-primary group-hover:text-white transition-colors">
                      {idx + 1}
                    </div>
                    {idx !== 3 && idx !== 4 && <div className="w-0.5 h-12 bg-muted-foreground/20 mt-2"></div>}
                  </div>
                  <div className="flex-1 pb-8">
                    <h4 className="text-lg font-bold mb-1">{year.year}</h4>
                    <p className="text-muted-foreground font-medium">{year.subjects}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Placements */}
          <section id="placements" className="bg-card p-8 rounded-3xl shadow-sm border">
            <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-primary" />
              Placement Stats
            </h2>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="64" cy="64" r="58"
                    stroke="currentColor" strokeWidth="12" fill="transparent"
                    className="text-muted"
                  />
                  <circle
                    cx="64" cy="64" r="58"
                    stroke="currentColor" strokeWidth="12" fill="transparent"
                    strokeDasharray={364.4}
                    strokeDashoffset={364.4 * (1 - college.placement / 100)}
                    className="text-primary"
                  />
                </svg>
                <span className="absolute text-2xl font-black">{college.placement}%</span>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">High Success Rate</h3>
                <p className="text-muted-foreground">This college has a consistent record of placing students in Fortune 500 companies with an average package of ₹18 LPA.</p>
              </div>
            </div>
          </section>

          {/* Reviews */}
          <section id="reviews" className="bg-card p-8 rounded-3xl shadow-sm border">
            <h2 className="text-2xl font-black mb-8 flex items-center gap-2">
              <MessageCircle className="w-6 h-6 text-primary" />
              Student Reviews
            </h2>
            <div className="space-y-6">
              {college.reviews.map((review) => (
                <div key={review.id} className="p-6 bg-muted rounded-2xl border border-transparent hover:border-primary/10 transition-all">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <p className="text-lg leading-relaxed italic">"{review.text}"</p>
                  <div className="mt-4 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">A</div>
                    <span className="text-sm font-bold">Anonymous Student</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-primary text-white p-8 rounded-3xl shadow-xl shadow-primary/20 sticky top-24">
            <h3 className="text-2xl font-black mb-4">Interested?</h3>
            <p className="text-white/80 mb-8 font-medium">Get in touch with the admissions office or apply directly through our platform.</p>
            <button className="w-full py-4 bg-white text-primary rounded-2xl font-black text-lg hover:scale-[1.02] transition-transform shadow-lg">
              Apply Now
            </button>
            <button className="w-full py-4 mt-4 bg-primary-dark/20 border border-white/20 text-white rounded-2xl font-bold hover:bg-white/10 transition-colors">
              Save to Favorites
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
