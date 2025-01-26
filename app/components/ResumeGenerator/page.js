"use client";
import React, { useState } from 'react';

export default function Generator() {
  // Step-based state for form data
  const [step, setStep] = useState(1); // Track the current step (1 - Personal, 2 - Education, etc.)
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [github, setGithub] = useState('');
  const [education, setEducation] = useState('');
  const [degree, setDegree] = useState('');
  const [score, setScore] = useState('');
  const [year, setYear] = useState('');
  const [projectLink, setProjectLink] = useState('');
  const [skills, setSkills] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [tools, setTools] = useState('');
  const [resumePdfUrl, setResumePdfUrl] = useState('');

  // Simple LaTeX code template
  const generateLatexCode = () => {
    const date = new Date().toLocaleDateString();
  
    return `
    \\documentclass[a4paper,10pt]{article}
    \\usepackage[utf8]{inputenc}
    \\usepackage[margin=1in]{geometry}
    \\usepackage{hyperref}
    \\usepackage{array}
    \\usepackage{xcolor}
    \\renewcommand{\\baselinestretch}{1.2}
  
    \\title{\\textbf{\\Large Resume}}
    \\author{${name}}
    \\date{}
  
    \\begin{document}
  
    % Header
    \\begin{center}
      {\\Huge \\textbf{${name}}} \\\\ [1ex]
      {\\small \\textbf{Phone:}} ${phone} \\quad {\\small \\textbf{Email:}} \\href{mailto:${email}}{${email}} \\\\ 
      {\\small \\textbf{LinkedIn:}} \\href{${linkedin}}{${linkedin}} \\quad {\\small \\textbf{GitHub:}} \\href{${github}}{${github}}
    \\end{center}
  
    \\vspace{1em}
  
    % Section: Education
    \\section*{Education}
    \\begin{tabular}{|p{0.7\\textwidth}|p{0.25\\textwidth}|}
      \\hline
      \\textbf{${degree}, ${education}} & \\textbf{${year}} \\\\
      \\hline
      \\multicolumn{2}{|p{1\\textwidth}|}{SGPA: ${score}} \\\\
      \\hline
    \\end{tabular}
  
    \\vspace{1em}
  
    % Section: Experience
    \\section*{Professional Experience}
    \\textbf{Company Name} \\hfill [Start Date - End Date] \\\\
    \\textit{Position / Role} \\\\
    - Description of responsibilities and achievements. \\\\
    - Highlight impact, metrics, or outcomes, if possible.
  
    \\vspace{1em}
  
    % Section: Projects
    \\section*{Projects}
    \\textbf{EyeBuddy} \\\\
    Smart Devices for the Visually Impaired \\\\
    Technologies: Arduino, UV Sensors \\\\
    \\textbf{Project Link:} \\href{${projectLink}}{${projectLink}}
  
    \\vspace{1em}
  
    % Section: Skills
    \\section*{Skills}
    \\textbf{Technical Skills:} ${skills} \\\\
    \\textbf{Technologies:} ${technologies} \\\\
    \\textbf{Tools:} ${tools}
  
    \\vspace{1em}
  
    % Section: Achievements
    \\section*{Achievements and Certifications}
    - Example Achievement or Certification 1 \\\\
    - Example Achievement or Certification 2 \\\\
  
    \\vspace{1em}
  
    % Footer
    \\begin{center}
      \\textit{Last updated on ${date}}
    \\end{center}
  
    \\end{document}
    `;
  };
 
  

  const handleCompile = async (e) => {
    e.preventDefault();
    const latexCode = generateLatexCode();
    const response = await fetch('/api/render-latex', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ latexCode }),
    });
    const pdfBlob = await response.blob();
    const url = URL.createObjectURL(pdfBlob);
    setResumePdfUrl(url);
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      {/* Left Section (Form Inputs) */}
      <div style={{ width: '45%', padding: '20px' }}>
        <h2>Resume Builder</h2>
        <form>
          {step === 1 && (
            <>
              <div>
                <label>Full Name:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  required
                />
              </div>
              <div>
                <label>Phone:</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone"
                  required
                />
              </div>
              <div>
                <label>Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                />
              </div>
              <div>
                <label>LinkedIn:</label>
                <input
                  type="text"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  placeholder="LinkedIn"
                />
              </div>
              <div>
                <label>GitHub:</label>
                <input
                  type="text"
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                  placeholder="GitHub"
                />
              </div>
              <button type="button" onClick={nextStep}>Next</button>
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <label>Education:</label>
                <input
                  type="text"
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  placeholder="Education"
                />
              </div>
              <div>
                <label>Degree:</label>
                <input
                  type="text"
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  placeholder="Degree"
                />
              </div>
              <div>
                <label>SGPA:</label>
                <input
                  type="text"
                  value={score}
                  onChange={(e) => setScore(e.target.value)}
                  placeholder="SGPA"
                />
              </div>
              <div>
                <label>Year of Completion:</label>
                <input
                  type="text"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  placeholder="Year"
                />
              </div>
              <button type="button" onClick={nextStep}>Next</button>
            </>
          )}

          {step === 3 && (
            <>
              <div>
                <label>Project Link:</label>
                <input
                  type="text"
                  value={projectLink}
                  onChange={(e) => setProjectLink(e.target.value)}
                  placeholder="Project Link"
                />
              </div>
              <div>
                <label>Skills:</label>
                <input
                  type="text"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  placeholder="Skills"
                />
              </div>
              <div>
                <label>Technologies:</label>
                <input
                  type="text"
                  value={technologies}
                  onChange={(e) => setTechnologies(e.target.value)}
                  placeholder="Technologies"
                />
              </div>
              <div>
                <label>Tools:</label>
                <input
                  type="text"
                  value={tools}
                  onChange={(e) => setTools(e.target.value)}
                  placeholder="Tools"
                />
              </div>
              <button type="button" onClick={handleCompile}>Compile</button>
            </>
          )}
        </form>
      </div>

      {/* Right Section (Compiled Resume) */}
      <div style={{ width: '45%', padding: '20px' }}>
        <h2>Compiled Resume</h2>
        {resumePdfUrl ? (
          <embed
            src={resumePdfUrl}
            type="application/pdf"
            width="100%"
            height="600px"
          />
        ) : (
          <p>Fill in the details and  "Compile Resume" to generate your resume.</p>
        )}
      </div>
    </div>
  );
}


// "use client";
// import React, { useState } from "react";

// export default function Generator() {
//   const [step, setStep] = useState(1);
//   const [name, setName] = useState("");
//   const [experience, setExperience] = useState([]);
//   const [projects, setProjects] = useState([]);
//   const [achievements, setAchievements] = useState([]);
//   const [certifications, setCertifications] = useState([]);
//   const [location, setLocation] = useState(""); // New location field
//   const [phone, setPhone] = useState("");
//   const [email, setEmail] = useState("");
//   const [linkedin, setLinkedin] = useState("");
//   const [github, setGithub] = useState("");
//   const [education, setEducation] = useState("");
//   const [degree, setDegree] = useState("");
//   const [score, setScore] = useState("");
//   const [year, setYear] = useState("");
//   const [projectLink, setProjectLink] = useState("");
//   const [skills, setSkills] = useState("");
//   const [technologies, setTechnologies] = useState("");
//   const [tools, setTools] = useState("");
//   const [resumePdfUrl, setResumePdfUrl] = useState("");

//   const generateLatexCode = () => {
//     const date = new Date().toLocaleDateString();
//   return `
//     \\documentclass[a4paper,10pt]{article}
//     \\usepackage[utf8]{inputenc}
//     \\usepackage[margin=1in]{geometry}
//     \\usepackage{hyperref}
//     \\usepackage{array}
//     \\usepackage{xcolor}
//     \\renewcommand{\\baselinestretch}{1.2}
//     \\pagestyle{empty}
  
//     \\begin{document}
  
//     % Header
//     \\begin{center}
//       {\\Huge \\textbf{${name}}} \\\\ [0.5ex]
//       {\\large ${location}} \\\\ [1ex]
//       {\\small \\textbf{Phone:}} ${phone} \\quad \\textbf{Email:} \\href{mailto:${email}}{${email}} \\quad \\textbf{LinkedIn:} \\href{${linkedin}}{${linkedin}} \\quad \\textbf{GitHub:} \\href{${github}}{${github}}
//     \\end{center}
  
//     \\vspace{1em}
  
//     % Section: Education
//     \\section*{Education}
//     \\hrule \\vspace{0.5em}
//     \\textbf{${degree}} \\hfill \\textbf{${year}} \\\\
//     ${education} \\\\
//     SGPA: ${score}
  
//     \\vspace{1em}
  
//     % Section: Professional Experience
//     \\section*{Professional Experience}
//     \\hrule \\vspace{0.5em}
//     \\textbf{Company Name} \\hfill [Start Date - End Date] \\\\
//     \\textit{Position / Role} \\\\
//     - Description of responsibilities and achievements. \\\\
//     - Highlight impact, metrics, or outcomes, if possible.
  
//     \\vspace{1em}
  
//     % Section: Projects
//     \\section*{Projects}
//     \\hrule \\vspace{0.5em}
//     \\textbf{EyeBuddy} \\\\
//     Smart Devices for the Visually Impaired \\\\
//     Technologies: Arduino, UV Sensors \\\\
//     \\textbf{Project Link:} \\href{${projectLink}}{${projectLink}}
  
//     \\vspace{1em}
  
//     % Section: Skills
//     \\section*{Skills}
//     \\hrule \\vspace{0.5em}
//     \\textbf{Technical Skills:} ${skills} \\\\
//     \\textbf{Technologies:} ${technologies} \\\\
//     \\textbf{Tools:} ${tools}
  
//     \\vspace{1em}
  
//     % Section: Achievements
//     \\section*{Achievements and Certifications}
//     \\hrule \\vspace{0.5em}
//     - Example Achievement or Certification 1 \\\\
//     - Example Achievement or Certification 2 \\\\
  
//     \\vspace{1em}
  
//     \\begin{center}
//       \\textit{Last updated on ${date}}
//     \\end{center}
  
//     \\end{document}
//   `;
// };

// // const generateLatexCode = ({
// //   name,
// //   location,
// //   phone,
// //   email,
// //   linkedin,
// //   github,
// //   educationList,
// //   experienceList,
// //   projectList,
// //   skills,
// //   technologies,
// //   tools,
// //   achievementsList,
// // }) => {
// //   const date = new Date().toLocaleDateString();

// //   const formatSection = (list, formatter) =>
// //     list.map(formatter).join("\\\\\n\\vspace{0.5em}\\\\\n");

// //   return `
// //     \\documentclass[a4paper,10pt]{article}
// //     \\usepackage[utf8]{inputenc}
// //     \\usepackage[margin=1in]{geometry}
// //     \\usepackage{hyperref}
// //     \\usepackage{array}
// //     \\usepackage{xcolor}
// //     \\renewcommand{\\baselinestretch}{1.2}
// //     \\pagestyle{empty}
  
// //     \\begin{document}
  
// //     % Header
// //     \\begin{center}
// //       {\\Huge \\textbf{${name}}} \\\\ [0.5ex]
// //       {\\large ${location}} \\\\ [1ex]
// //       {\\small \\textbf{Phone:}} ${phone} \\quad \\textbf{Email:} \\href{mailto:${email}}{${email}} \\\\
// //       \\textbf{LinkedIn:} \\href{${linkedin}}{LinkedIn} \\quad \\textbf{GitHub:} \\href{${github}}{GitHub}
// //     \\end{center}
  
// //     \\vspace{1em}
  
// //     % Section: Education
// //     \\section*{Education}
// //     \\hrule \\vspace{0.5em}
// //     ${formatSection(
// //       educationList,
// //       (edu) =>
// //         `\\textbf{${edu.degree}}, ${edu.institution} \\hfill ${edu.year} \\\\ SGPA: ${edu.score}`
// //     )}
  
// //     \\vspace{1em}
  
// //     % Section: Professional Experience
// //     \\section*{Professional Experience}
// //     \\hrule \\vspace{0.5em}
// //     ${formatSection(
// //       experienceList,
// //       (exp) =>
// //         `\\textbf{${exp.company}} \\hfill ${exp.startDate} - ${exp.endDate} \\\\ \\textit{${exp.role}} \\\\ ${exp.description}`
// //     )}
  
// //     \\vspace{1em}
  
// //     % Section: Projects
// //     \\section*{Projects}
// //     \\hrule \\vspace{0.5em}
// //     ${formatSection(
// //       projectList,
// //       (proj) =>
// //         `\\textbf{${proj.name}} \\\\ ${proj.description} \\\\ Technologies: ${proj.technologies} \\\\ \\textbf{Project Link:} \\href{${proj.link}}{${proj.link}}`
// //     )}
  
// //     \\vspace{1em}
  
// //     % Section: Skills
// //     \\section*{Skills}
// //     \\hrule \\vspace{0.5em}
// //     \\textbf{Technical Skills:} ${skills} \\\\
// //     \\textbf{Technologies:} ${technologies} \\\\
// //     \\textbf{Tools:} ${tools}
  
// //     \\vspace{1em}
  
// //     % Section: Achievements and Certifications
// //     \\section*{Achievements and Certifications}
// //     \\hrule \\vspace{0.5em}
// //     ${formatSection(achievementsList, (ach) => `- ${ach}`)}
  
// //     \\vspace{1em}
  
// //     \\begin{center}
// //       \\textit{Last updated on ${date}}
// //     \\end{center}
  
// //     \\end{document}
// //   `;
// // };



// const handleCompile = async (e) => {
//   e.preventDefault();
//   const latexCode = generateLatexCode();
//   const response = await fetch("/api/render-latex", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ latexCode }),
//   });
//   const pdfBlob = await response.blob();
//   const url = URL.createObjectURL(pdfBlob);
//   setResumePdfUrl(url);
// };

// const nextStep = () => {
//   setStep(step + 1);
// };

// return (
//   <div style={{ display: "flex", justifyContent: "space-between" }}>
//     <div style={{ width: "45%", padding: "20px" }}>
//       <h2>Resume Builder</h2>
//       <form>
//         {step === 1 && (
//           <>
//             <div>
//               <label>Full Name:</label>
//               <input
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 placeholder="Full Name"
//                 required
//               />
//             </div>
//             <div>
//               <label>Location:</label> {/* New Location Input */}
//               <input
//                 type="text"
//                 value={location}
//                 onChange={(e) => setLocation(e.target.value)}
//                 placeholder="City, State"
//               />
//             </div>
//             <div>
//               <label>Phone:</label>
//               <input
//                 type="text"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//                 placeholder="Phone Number"
//               />
//             </div>
//             <div>
//               <label>Email:</label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Email Address"
//               />
//             </div>
//             <div>
//         <label>LinkedIn URL:</label>
//         <input
//           type="url"
//           className="border p-2 block w-full"
//           placeholder="Enter LinkedIn URL"
//           value={linkedin}
//           onChange={(e) => setLinkedIn(e.target.value)}
//         />
//         <label>GitHub URL:</label>
//         <input
//           type="url"
//           className="border p-2 block w-full"
//           placeholder="Enter GitHub URL"
//           value={github}
//           onChange={(e) => setGitHub(e.target.value)}
//         />
//       </div>

//       {/* Dynamic Sections */}
//       {[
//         { label: "Education", entries: education, setFunction: setEducation },
//         { label: "Experience", entries: experience, setFunction: setExperience },
//         { label: "Projects", entries: projects, setFunction: setProjects },
//         { label: "Skills", entries: skills, setFunction: setSkills },
//         { label: "Achievements", entries: achievements, setFunction: setAchievements },
//         { label: "Certifications", entries: certifications, setFunction: setCertifications },
//       ].map(({ label, entries, setFunction }) => (
//         <div key={label} className="mt-4">
//           <h2 className="font-bold">{label}</h2>
//           {entries.map((entry, index) => (
//             <div key={index} className="mb-2">
//               {entry}
//             </div>
//           ))}
//           <input
//             type="text"
//             className="border p-2 block w-full"
//             placeholder={`Add ${label}`}
//             onKeyDown={(e) => {
//               if (e.key === "Enter") {
//                 addEntry(setFunction, entries, e.target.value);
//                 e.target.value = "";
//               }
//             }}
//           />
//         </div>
//       ))}
//           </>
//         )}
//         <button type="button" onClick={nextStep}>
//           Next
//         </button>
//       </form>
//     </div>

//     <div style={{ width: "45%", padding: "20px" }}>
//       <h2>Compiled Resume</h2>
//       {resumePdfUrl && (
//         <iframe src={resumePdfUrl} width="100%" height="600px"></iframe>
//       )}
//       <button onClick={handleCompile}>Compile</button>
//     </div>
//   </div>
// );
// }