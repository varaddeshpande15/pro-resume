// // app/api/parseResume/route.js
// import { NextResponse } from 'next/server';

// // Regex patterns for different sections
// const sections = {
//   contact: /Contact\s*(.*?)(?=Skills|Experience|Education|$)/s,
//   skills: /Skills\s*(.*?)(?=Certifications|Experience|Education|$)/s,
//   certifications: /Certifications\s*(.*?)(?=Experience|Education|$)/s,
//   experience: /Experience\s*(.*?)(?=Education|$)/s,
//   education: /Education\s*(.*?)(?=$)/s,
// };

// const extractResumeData = (text) => {
//   const extractedData = {};

//   // Extract data for each section using regex
//   for (const [key, regex] of Object.entries(sections)) {
//     const match = text.match(regex);
//     extractedData[key] = match ? match[1].trim() : "N/A";
//   }

//   return extractedData;
// };

// // const generateLatexResume = (data) => {
// //   return `
// // \\documentclass[a4paper,10pt]{article}
// // \\usepackage[utf8]{inputenc}
// // \\usepackage[top=1in, bottom=1in, left=1in, right=1in]{geometry}
// // \\title{Resume}
// // \\begin{document}

// // \\maketitle

// // \\section*{Contact}
// // ${data.contact}

// // \\section*{Skills}
// // ${data.skills}

// // \\section*{Certifications}
// // ${data.certifications}

// // \\section*{Experience}
// // ${data.experience}

// // \\section*{Education}
// // ${data.education}

// // \\end{document}
// //   `;
// // };

// const generateLatexResume = (data) => {
//   const formatList = (text) => {
//     return text.split('\n').map(item => `\\item ${item}`).join('\n');
//   };

//   return `
//   \\documentclass[a4paper,10pt]{article}
//   \\usepackage[utf8]{inputenc}
//   \\usepackage[top=1in, bottom=1in, left=1in, right=1in]{geometry}
//   \\title{Resume}
//   \\begin{document}

//   \\maketitle

//   \\section*{Contact}
//   ${data.contact}

//   \\section*{Skills}
//   \\begin{itemize}
//   ${formatList(data.skills)}
//   \\end{itemize}

//   \\section*{Certifications}
//   \\begin{itemize}
//   ${formatList(data.certifications)}
//   \\end{itemize}

//   \\section*{Experience}
//   \\begin{itemize}
//   ${formatList(data.experience)}
//   \\end{itemize}

//   \\section*{Education}
//   \\begin{itemize}
//   ${formatList(data.education)}
//   \\end{itemize}

//   \\end{document}
//   `;
// };


// export async function POST(req) {
//   try {
//     const { text } = await req.json();

//     // Extract data from the resume text
//     const extractedData = extractResumeData(text);

//     // Generate LaTeX code based on the extracted data
//     const latexResume = generateLatexResume(extractedData);

//     return NextResponse.json({ latexCode: latexResume, extractedText: text });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: 'Error parsing resume' }, { status: 500 });
//   }
// }


// app/api/parseResume/route.js
import { NextResponse } from 'next/server';

// Regex patterns for different sections
const sections = {
  contact: /Contact\s*(.*?)(?=\s*(Skills|Experience|Certifications|Education|$))/s,
  skills: /Skills\s*(.*?)(?=\s*(Certifications|Experience|Education|$))/s,
  certifications: /Certifications\s*(.*?)(?=\s*(Experience|Education|$))/s,
  experience: /Experience\s*(.*?)(?=\s*(Education|$))/s,
  education: /Education\s*(.*?)(?=\s*$)/s,
};

const normalizeText = (text) => {
  // Remove extra spaces and newlines
  return text
    .replace(/\n+/g, ' ') // Replace newlines with a single space
    .replace(/\s{2,}/g, ' ') // Replace multiple spaces with a single space
    .trim();
};

const extractResumeData = (text) => {
  const normalizedText = normalizeText(text); // Normalize the text

  const extractedData = {};

  // Extract data for each section using regex
  for (const [key, regex] of Object.entries(sections)) {
    const match = normalizedText.match(regex);
    extractedData[key] = match ? match[1].trim() : "No Data Available"; // Handle missing data
  }

  console.log('Extracted Data:', extractedData);

  return extractedData;
};

const generateLatexResume = (data) => {
  return `
  \\documentclass[a4paper,10pt]{article}
  \\usepackage[utf8]{inputenc}
  \\usepackage[top=1in, bottom=1in, left=1in, right=1in]{geometry}
  \\title{Resume}
  \\begin{document}

  \\maketitle

  \\section*{Contact}
  ${data.contact}

  \\section*{Skills}
  ${data.skills}

  \\section*{Certifications}
  ${data.certifications}

  \\section*{Experience}
  ${data.experience}

  \\section*{Education}
  ${data.education}

  \\end{document}
  `;
};

export async function POST(req) {
  try {
    const { text } = await req.json();

    // Extract data from the resume text
    const extractedData = extractResumeData(text);
    


    // Generate LaTeX code based on the extracted data
    const latexResume = generateLatexResume(extractedData);

    return NextResponse.json({ latexCode: latexResume, extractedText: text });
    
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error parsing resume' }, { status: 500 });
  }
}
