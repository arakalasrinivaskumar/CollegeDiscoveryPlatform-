import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rank = parseInt(searchParams.get("rank") || "0");
  const exam = searchParams.get("exam") || "JEE_MAIN";

  if (!rank) return NextResponse.json([]);

  const colleges = await prisma.college.findMany({
    where: {
      examCategory: exam,
      cutoff: {
        gte: rank - 500,
      },
    },
    take: 8,
  });

  const processed = colleges.map(c => {
    // Basic logic for admission chance
    let chance = 0;
    if (rank <= c.cutoff) {
      chance = Math.min(95, Math.round((c.cutoff / rank) * 70));
    } else {
      chance = Math.max(10, Math.round((c.cutoff / rank) * 90));
    }

    const probableCourse = c.examCategory === "NEET" ? "MBBS / Medicine" : "Computer Science & Engineering";

    return {
      ...c,
      chance: Math.min(chance, 99),
      probableCourse,
    };
  });

  return NextResponse.json(processed.sort((a, b) => b.chance - a.chance));
}
