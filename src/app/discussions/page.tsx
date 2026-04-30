import { prisma } from "@/lib/db";
import { MessageSquare, User, Clock, ChevronRight, PlusCircle } from "lucide-react";
import Link from "next/link";
export const dynamic = "force-dynamic";

export default async function DiscussionPage() {
  const questions = await prisma.question.findMany({
    include: {
      user: true,
      _count: { select: { answers: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-black mb-2">Student Community</h1>
          <p className="text-muted-foreground text-lg">Discuss, ask, and help others in their college journey.</p>
        </div>
        <button className="bg-primary text-white px-8 py-4 rounded-2xl font-black flex items-center gap-2 hover:scale-[1.02] transition-transform shadow-lg shadow-primary/20">
          <PlusCircle className="w-5 h-5" /> Ask a Question
        </button>
      </div>

      <div className="space-y-6">
        {questions.length > 0 ? (
          questions.map((q) => (
            <div 
              key={q.id} 
              className="bg-card p-8 rounded-3xl border hover:border-primary/20 transition-all group cursor-pointer"
            >
              <div className="flex items-start justify-between gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                    <User className="w-4 h-4" />
                    <span>{q.user.name || "Anonymous User"}</span>
                    <span>•</span>
                    <Clock className="w-4 h-4" />
                    <span>{new Date(q.createdAt).toLocaleDateString('en-IN')}</span>
                  </div>
                  <h2 className="text-2xl font-bold group-hover:text-primary transition-colors leading-tight">
                    {q.text}
                  </h2>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-full text-sm font-bold">
                      <MessageSquare className="w-4 h-4 text-primary" />
                      {q._count.answers} Answers
                    </div>
                    <span className="text-sm font-bold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                      View Discussion <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 bg-muted/30 rounded-3xl border-2 border-dashed">
            <p className="text-muted-foreground">Be the first to ask a question!</p>
          </div>
        )}
      </div>
    </div>
  );
}
