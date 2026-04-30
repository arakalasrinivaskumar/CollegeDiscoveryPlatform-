import { prisma } from "@/lib/db";
import ComparePage from "@/components/CompareClient";
export const dynamic = "force-dynamic";

export default async function Compare() {
  const allColleges = await prisma.college.findMany({
    select: {
      id: true,
      name: true,
      location: true,
      fees: true,
      rating: true,
      placement: true,
      image: true,
    },
  });

  return <ComparePage allColleges={allColleges} />;
}
