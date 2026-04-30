const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.course.deleteMany();
  await prisma.review.deleteMany();
  await prisma.savedCollege.deleteMany();
  await prisma.answer.deleteMany();
  await prisma.question.deleteMany();
  await prisma.college.deleteMany();
  await prisma.user.deleteMany();

  console.log("Seeding 32 colleges...");

  const data = [
    // JEE_ADVANCED (8)
    { 
      name: "IIT Bombay", location: "Mumbai", state: "Maharashtra", fees: 220000, rating: 4.9, placement: 98, cutoff: 50, examCategory: "JEE_ADVANCED", nirf: 3, avgPackage: 22.5, established: 1958,
      overview: "IIT Bombay is a global leader in engineering education and research. Located at Powai, it is renowned for its world-class faculty, cutting-edge labs, and a vibrant entrepreneurial culture that has birthed numerous unicorns."
    },
    { 
      name: "IIT Delhi", location: "New Delhi", state: "Delhi", fees: 215000, rating: 4.8, placement: 97, cutoff: 100, examCategory: "JEE_ADVANCED", nirf: 2, avgPackage: 21.0, established: 1961,
      overview: "Situated in the heart of India's capital, IIT Delhi excels in interdisciplinary research and industry collaborations. Its proximity to top tech hubs makes it a preferred destination for recruiters and innovators alike."
    },
    { 
      name: "IIT Madras", location: "Chennai", state: "Tamil Nadu", fees: 210000, rating: 4.9, placement: 96, cutoff: 150, examCategory: "JEE_ADVANCED", nirf: 1, avgPackage: 20.5, established: 1959,
      overview: "Consistently ranked #1 by NIRF, IIT Madras is celebrated for its deep-tech research and the prestigious IITM Research Park. The campus is a lush green sanctuary known for its academic rigor and technical festivals."
    },
    { 
      name: "IIT Kanpur", location: "Kanpur", state: "Uttar Pradesh", fees: 215000, rating: 4.7, placement: 95, cutoff: 200, examCategory: "JEE_ADVANCED", nirf: 4, avgPackage: 19.5, established: 1959,
      overview: "IIT Kanpur is pioneer in aerospace and computer science education in India. Its massive campus and world-class flight lab provide an unparalleled environment for students interested in core engineering and fundamental research."
    },
    { 
      name: "IIT Kharagpur", location: "Kharagpur", state: "West Bengal", fees: 210000, rating: 4.7, placement: 94, cutoff: 250, examCategory: "JEE_ADVANCED", nirf: 6, avgPackage: 18.5, established: 1951,
      overview: "The first IIT to be established, IIT Kharagpur boasts one of the largest campuses and the widest range of courses. It is famous for its diverse student community and the legendary Illumination festival."
    },
    { 
      name: "IIT Roorkee", location: "Roorkee", state: "Uttarakhand", fees: 220000, rating: 4.6, placement: 93, cutoff: 300, examCategory: "JEE_ADVANCED", nirf: 5, avgPackage: 18.0, established: 1847,
      overview: "With a heritage spanning over 175 years, IIT Roorkee is one of the oldest technical institutions in Asia. It blends historic architecture with modern research facilities, particularly in civil and earthquake engineering."
    },
    { 
      name: "IIT Guwahati", location: "Guwahati", state: "Assam", fees: 215000, rating: 4.5, placement: 92, cutoff: 400, examCategory: "JEE_ADVANCED", nirf: 7, avgPackage: 17.5, established: 1994,
      overview: "Located on the banks of the Brahmaputra, IIT Guwahati offers the most scenic campus in the IIT system. It has rapidly climbed the rankings through excellence in biotechnology and nanotechnology research."
    },
    { 
      name: "IIT Hyderabad", location: "Hyderabad", state: "Telangana", fees: 225000, rating: 4.5, placement: 91, cutoff: 500, examCategory: "JEE_ADVANCED", nirf: 8, avgPackage: 17.0, established: 2008,
      overview: "A leader among the second-generation IITs, IIT Hyderabad is known for its strong ties with Japanese industry and its focus on AI, 5G, and sustainable engineering solutions."
    },

    // JEE_MAIN (8)
    { 
      name: "NIT Trichy", location: "Trichy", state: "Tamil Nadu", fees: 160000, rating: 4.5, placement: 92, cutoff: 1200, examCategory: "JEE_MAIN", nirf: 9, avgPackage: 14.5, established: 1964,
      overview: "NIT Trichy is widely regarded as the best NIT in India. It offers a robust academic environment and has a stellar placement record, particularly in the manufacturing and IT sectors."
    },
    { 
      name: "NIT Surathkal", location: "Surathkal", state: "Karnataka", fees: 165000, rating: 4.4, placement: 91, cutoff: 1500, examCategory: "JEE_MAIN", nirf: 10, avgPackage: 13.5, established: 1960,
      overview: "Famous for its private beach, NIT Surathkal provides a unique blend of coastal life and academic excellence. It is a hub for research in marine and civil engineering."
    },
    { 
      name: "NIT Warangal", location: "Warangal", state: "Telangana", fees: 160000, rating: 4.4, placement: 90, cutoff: 1800, examCategory: "JEE_MAIN", nirf: 21, avgPackage: 13.0, established: 1959,
      overview: "The first NIT to be established in India, NIT Warangal has a legacy of producing top-tier engineers. It is particularly renowned for its strong alumni network in the US and Europe."
    },
    { 
      name: "IIIT Hyderabad", location: "Hyderabad", state: "Telangana", fees: 360000, rating: 4.7, placement: 98, cutoff: 1000, examCategory: "JEE_MAIN", nirf: 55, avgPackage: 30.0, established: 1998,
      overview: "IIIT Hyderabad is India's top choice for computer science enthusiasts. Its research-led curriculum and intense coding culture result in some of the highest placement packages in the country."
    },
    { 
      name: "DTU", location: "New Delhi", state: "Delhi", fees: 219000, rating: 4.3, placement: 89, cutoff: 3000, examCategory: "JEE_MAIN", nirf: 61, avgPackage: 12.0, established: 1941,
      overview: "Formerly Delhi College of Engineering, DTU is a powerhouse of technical education in the capital. It is famous for its focus on industrial research and its wide-ranging engineering disciplines."
    },
    { 
      name: "NSUT", location: "New Delhi", state: "Delhi", fees: 210000, rating: 4.2, placement: 88, cutoff: 3500, examCategory: "JEE_MAIN", nirf: 95, avgPackage: 11.5, established: 1983,
      overview: "NSUT is known for its rigorous electronics and communications programs. Its modern campus in Dwarka fosters a strong culture of innovation and research."
    },
    { 
      name: "NIT Rourkela", location: "Rourkela", state: "Odisha", fees: 155000, rating: 4.2, placement: 87, cutoff: 4000, examCategory: "JEE_MAIN", nirf: 15, avgPackage: 11.0, established: 1961,
      overview: "NIT Rourkela is known for its sprawling campus and excellence in metallurgical and materials engineering. It fosters a strong culture of technical clubs and student-led innovation."
    },
    { 
      name: "IIIT Bangalore", location: "Bangalore", state: "Karnataka", fees: 400000, rating: 4.6, placement: 96, cutoff: 2500, examCategory: "JEE_MAIN", nirf: 74, avgPackage: 25.0, established: 1999,
      overview: "Located in the Silicon Valley of India, IIIT Bangalore offers unparalleled industry exposure. Its specialized programs in Data Science and Embedded Systems are highly coveted by top tech firms."
    },

    // NEET (8)
    { 
      name: "AIIMS Delhi", location: "New Delhi", state: "Delhi", fees: 2000, rating: 4.9, placement: 100, cutoff: 1, examCategory: "NEET", nirf: 1, avgPackage: 25.0, established: 1956,
      overview: "AIIMS Delhi is the pinnacle of medical education in India. It combines world-class clinical training with pioneering research, offering students exposure to the most complex medical cases."
    },
    { 
      name: "CMC Vellore", location: "Vellore", state: "Tamil Nadu", fees: 50000, rating: 4.8, placement: 99, cutoff: 10, examCategory: "NEET", nirf: 3, avgPackage: 20.0, established: 1900,
      overview: "Christian Medical College Vellore is renowned for its community-based health programs and ethical medical practice. It is one of the most respected healthcare institutions in the world."
    },
    { 
      name: "JIPMER", location: "Puducherry", state: "Puducherry", fees: 15000, rating: 4.7, placement: 98, cutoff: 20, examCategory: "NEET", nirf: 5, avgPackage: 18.0, established: 1823,
      overview: "JIPMER is an Institution of National Importance known for its distinct French heritage and state-of-the-art medical facilities. It offers a relaxed yet intellectually stimulating environment."
    },
    { 
      name: "MAMC Delhi", location: "New Delhi", state: "Delhi", fees: 5000, rating: 4.7, placement: 97, cutoff: 30, examCategory: "NEET", nirf: 10, avgPackage: 15.0, established: 1958,
      overview: "Maulana Azad Medical College, attached to four major hospitals, provides students with an immense patient load, ensuring they become highly skilled clinicians from day one."
    },
    { 
      name: "AFMC Pune", location: "Pune", state: "Maharashtra", fees: 0, rating: 4.8, placement: 100, cutoff: 50, examCategory: "NEET", nirf: 15, avgPackage: 12.0, established: 1948,
      overview: "The Armed Forces Medical College is a unique institution that trains medical graduates for the Indian Armed Forces. It combines rigorous medical study with military discipline."
    },
    { 
      name: "KGMU Lucknow", location: "Lucknow", state: "Uttar Pradesh", fees: 55000, rating: 4.6, placement: 96, cutoff: 100, examCategory: "NEET", nirf: 12, avgPackage: 14.0, established: 1905,
      overview: "King George's Medical University is famous for its majestic gothic architecture and its legacy of excellence in clinical diagnosis and surgical training."
    },
    { 
      name: "IMS BHU", location: "Varanasi", state: "Uttar Pradesh", fees: 15000, rating: 4.5, placement: 95, cutoff: 150, examCategory: "NEET", nirf: 8, avgPackage: 13.0, established: 1960,
      overview: "Located within the historic Banaras Hindu University campus, IMS BHU offers a unique environment where modern medicine meets traditional values and holistic care."
    },
    { 
      name: "Grant Medical College", location: "Mumbai", state: "Maharashtra", fees: 100000, rating: 4.4, placement: 94, cutoff: 200, examCategory: "NEET", nirf: 25, avgPackage: 11.0, established: 1845,
      overview: "Established in 1845, Grant Medical College is one of the oldest medical institutions in Asia. It is known for its legendary Sir J.J. Group of Hospitals and its immense clinical diversity."
    },

    // BITSAT (8)
    { 
      name: "BITS Pilani", location: "Pilani", state: "Rajasthan", fees: 550000, rating: 4.7, placement: 96, cutoff: 350, examCategory: "BITSAT", nirf: 25, avgPackage: 18.5, established: 1964,
      overview: "BITS Pilani is India's top-ranked private engineering institute. Its 'Zero Attendance' policy and 'Practice School' industry internship program are hallmarks of its progressive education model."
    },
    { 
      name: "BITS Goa", location: "Zuarinagar", state: "Goa", fees: 550000, rating: 4.6, placement: 95, cutoff: 320, examCategory: "BITSAT", nirf: 25, avgPackage: 17.0, established: 2004,
      overview: "The Goa campus of BITS offers a vibrant atmosphere and excellence in computer science and electronics. Its location makes it a hub for student-led cultural and technical activities."
    },
    { 
      name: "BITS Hyderabad", location: "Hyderabad", state: "Telangana", fees: 550000, rating: 4.6, placement: 94, cutoff: 310, examCategory: "BITSAT", nirf: 25, avgPackage: 16.5, established: 2008,
      overview: "The Hyderabad campus is known for its modern infrastructure and strong research focus in pharmacy and core engineering, benefiting from the city's booming tech ecosystem."
    },
    { 
      name: "VIT Vellore", location: "Vellore", state: "Tamil Nadu", fees: 198000, rating: 4.3, placement: 88, cutoff: 5000, examCategory: "BITSAT", nirf: 11, avgPackage: 9.0, established: 1984,
      overview: "VIT Vellore is one of the largest private universities in India, known for its international collaborations and high-tech campus facilities."
    },
    { 
      name: "Manipal Institute", location: "Manipal", state: "Karnataka", fees: 335000, rating: 4.2, placement: 85, cutoff: 8000, examCategory: "BITSAT", nirf: 61, avgPackage: 8.5, established: 1957,
      overview: "MIT Manipal offers a world-class campus experience and a strong alumni network. It is known for its diverse student body and focus on holistic engineering education."
    },
    { 
      name: "Thapar University", location: "Patiala", state: "Punjab", fees: 400000, rating: 4.1, placement: 84, cutoff: 10000, examCategory: "BITSAT", nirf: 40, avgPackage: 8.0, established: 1956,
      overview: "Thapar University is a premier institution in North India, recognized for its strong industry linkages and focus on research in sustainable technologies."
    },
    { 
      name: "RV College", location: "Bangalore", state: "Karnataka", fees: 250000, rating: 4.3, placement: 90, cutoff: 1500, examCategory: "BITSAT", nirf: 96, avgPackage: 10.5, established: 1963,
      overview: "RVCE is the top engineering college in Bangalore under COMEDK. Its proximity to tech majors ensures consistently high placement numbers and industry projects."
    },
    { 
      name: "PES University", location: "Bangalore", state: "Karnataka", fees: 350000, rating: 4.0, placement: 82, cutoff: 5000, examCategory: "BITSAT", nirf: 101, avgPackage: 7.5, established: 1972,
      overview: "PES University is known for its focus on placements and industry-ready curriculum. It is a popular choice for students aiming for the IT sector in Bangalore."
    },
  ];

  for (const c of data) {
    const courses = c.examCategory === "NEET" 
      ? [{ name: "MBBS" }, { name: "BDS" }, { name: "Veterinary" }]
      : [{ name: "Computer Science" }, { name: "Electronics & Communication" }, { name: "Mechanical Engineering" }];

    // Use deterministic unique images based on college name to ensure variety
    const imageIds = {
      "JEE_ADVANCED": [
        "1562774053-701939374585", "1541339907-19c679a13523", "1492176273113-2d51f47b23b0", "1523050335397-584b174be1b1", 
        "1592280771190-3e2e4d57f974", "1524178232363-1fb2b075b655", "1503676260728-1c00da094a0b", "1517486808443-313b218f0a6b"
      ],
      "JEE_MAIN": [
        "1498243639411-9686034032d6", "1559135197-8a45ea74d367", "1564981797816-1043664bf78d", "1497633762265-9d179a990aa6", 
        "1576495199011-eb9473b1847c", "1588072432872-971fa9d0f33c", "1560513787-be434218df0e", "1527891751199-7225231a68dd"
      ],
      "NEET": [
        "1519494026892-80bbd2d6fd0d", "1538108149393-f159e4433230", "1504813184591-01574ff81c8d", "1516549655169-df83a0774514", 
        "1505751172876-fa1923c5c528", "1532938911079-1b06ac7ceec7", "1527613426441-4da17471466a", "1576091160550-2173dba999ef"
      ],
      "BITSAT": [
        "1531482615713-2afd69097998", "1523240715181-2c0b5b2eb6cd", "1525921429555-e4555aaec813", "1509062522246-3755977927d7", 
        "1517694712202-14dd9538aa97", "1550745127-d0d625f2939b", "1519389950473-47ba0277781c", "1581091226825-a6a2a5aee158"
      ]
    };
    
    // Pick image based on index within category
    const categoryColleges = data.filter(d => d.examCategory === c.examCategory);
    const indexWithinCategory = categoryColleges.findIndex(d => d.name === c.name);
    const photoId = imageIds[c.examCategory][indexWithinCategory % 8];
    const imageUrl = `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=800&q=80`;

    await prisma.college.create({
      data: {
        name: c.name,
        location: c.location,
        state: c.state,
        fees: c.fees,
        rating: c.rating,
        overview: c.overview,
        placement: c.placement,
        cutoff: c.cutoff,
        examCategory: c.examCategory,
        nirf: c.nirf,
        avgPackage: c.avgPackage,
        established: c.established,
        image: imageUrl,
        courses: {
          create: courses,
        },
        reviews: {
          create: [
            { text: "Excellent academic culture and placements.", rating: 5 },
            { text: "Great campus life and faculty.", rating: 4 },
          ],
        },
      },
    });
  }

  const user = await prisma.user.create({
    data: { email: "admin@eduquest.com", name: "System Admin" },
  });

  await prisma.question.create({
    data: {
      text: "What is the expected JEE Advanced cutoff for IIT Bombay CS?",
      userId: user.id,
      answers: { create: [{ text: "Usually around Under 60 for General category.", userId: user.id }] },
    },
  });

  console.log("Seeding completed successfully with 32 colleges!");
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect(); });
