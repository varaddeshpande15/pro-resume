// User input to resume compiler 

"use client";
import React, { useState } from 'react';

const ResumeForm = () => {
  // State variables to store form data
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

  // Function to generate LaTeX code and send to API for rendering
  const generateLatexCode = () => {
    const date = new Date().toLocaleDateString(); // Define the current date for the LaTeX template

    return `
    \\documentclass[a4paper,11pt]{article}
    \\usepackage{latexsym}
    \\usepackage[empty]{fullpage}
    \\usepackage{hyperref}
    \\usepackage{enumitem}

    \\title{Resume}
    \\author{${name}}
    \\date{${date}}

    \\begin{document}
    \\maketitle

    \\noindent
    \\textbf{Contact Information:} \\\\
    Phone: ${phone} \\\\
    Email: \\href{mailto:${email}}{${email}} \\\\
    LinkedIn: \\href{${linkedin}}{${linkedin}} \\\\
    GitHub: \\href{${github}}{${github}} \\\\
    Location: Pune, Maharashtra, India

    \\section*{Education}
    \\textbf{${education}} \\\\
    Degree: ${degree} \\\\
    SGPA: ${score} \\\\
    Year of Completion: ${year}

    \\section*{Work Experience}
    \\textbf{GDSC PVGCOET} \\\\
    Role: Technical Team Member \\\\
    Duration: Aug 2023 -- Present \\\\
    Location: Pune, India \\\\
    Responsibilities: \\begin{itemize}
      \\item Managed various activities for the Winter of Code event.
      \\item Developed promotional videos for events using DaVinci Resolve.
    \\end{itemize}

    \\section*{Projects}
    \\textbf{EyeBuddy} \\\\
    Description: Smart Devices for the Visually Impaired \\\\
    Technologies: Arduino, UV Sensors \\\\
    Link: ${projectLink} \\\\
    Description: Developed a walking stick with Arduino and UV sensors for obstacle detection. Currently building smart glasses for object detection and direction tracking.

    \\section*{Skills}
    Languages: ${skills} \\\\
    Technologies: ${technologies} \\\\
    Tools: ${tools}

    \\section*{Achievements}
    \\begin{itemize}
      \\item Winner, Smart India Hackathon 2023 (Regional) - JalMitra
      \\item Best Technical Project Award at PVGCOET Tech Fest 2023
    \\end{itemize}

    \\end{document}
    `;
  };

  const handleCompile = async (e) => {
    e.preventDefault();
    const latexCode = generateLatexCode();

    // Send the LaTeX code to the backend for PDF rendering
    const response = await fetch('/api/render-latex', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ latexCode }),
    });

    const pdfBlob = await response.blob();
    const url = URL.createObjectURL(pdfBlob);
    setResumePdfUrl(url);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      {/* Left Section (Form Inputs) */}
      <div style={{ width: '45%', padding: '20px' }}>
        <h2>Resume Builder</h2>
        <form>
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
              placeholder="Year of Completion"
            />
          </div>
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
          <button type="submit" onClick={handleCompile}>
            Compile Resume
          </button>
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
          <p>Fill in the details and click "Compile Resume" to generate your resume.</p>
        )}
      </div>
    </div>
  );
};

export default ResumeForm;
