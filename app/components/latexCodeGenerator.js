// Latex code generator without compiling

"use client";
import { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';

// Set the workerSrc to the CDN location for the 2.16.105 version
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js`;

export default function CodeGen() {
  const [pdfFile, setPdfFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [latexCode, setLatexCode] = useState('');
  const [projectInfo, setProjectInfo] = useState('');

  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append('file', pdfFile);

    // Load PDF.js in the browser
    const pdfData = await pdfFile.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument(pdfData);

    try {
      const pdf = await loadingTask.promise;
      const numPages = pdf.numPages;
      let text = '';

      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        text += content.items.map((item) => item.str).join(' ') + '\n';
      }

      // Send extracted text to backend
      const response = await fetch('/api/parseResume', {
        method: 'POST',
        body: JSON.stringify({ text }),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();
      setLatexCode(data.latexCode);
      setExtractedText(data.extractedText);
    } catch (error) {
      console.error(error);
      setExtractedText('Error extracting text');
    }
  };

  const handleProjectChange = (e) => {
    setProjectInfo(e.target.value);
  };

  const handleCompile = () => {
    // Add project info to LaTeX and re-render
    const compiledLatex = `${latexCode}\n\\section*{Projects}\n${projectInfo}`;
    setLatexCode(compiledLatex);
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1, padding: "20px" }}>
        <input type="file" accept=".pdf" onChange={handleFileChange} />
        <button onClick={handleFileUpload}>Extract Text</button>
        <textarea
          value={extractedText}
          readOnly
          rows="10"
          cols="50"
          style={{ marginTop: '20px' }}
        />
        <h3>Add Projects or Achievements:</h3>
        <textarea
          value={projectInfo}
          onChange={handleProjectChange}
          rows="5"
          cols="50"
        />
        <button onClick={handleCompile} style={{ marginTop: '10px' }}>Compile Resume</button>
      </div>

      <div style={{ flex: 1, padding: "20px" }}>
        <h3>Compiled Resume (LaTeX Code Preview)</h3>
        <textarea
          value={latexCode}
          readOnly
          rows="20"
          cols="80"
          style={{ fontFamily: 'monospace' }}
        />
      </div>
    </div>
  );
}
// Latest Code - working till compile also 
// "use client";
// import { useState } from 'react';
// import * as pdfjsLib from 'pdfjs-dist';

// // Set the workerSrc to the CDN location for the 2.16.105 version
// pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js`;

// const escapeLatex = (str) => {
//   return str
//     .replace(/\\/g, '\\\\') // Escape backslashes
//     .replace(/\$/g, '\\$')   // Escape dollar signs
//     .replace(/%/g, '\\%')     // Escape percent signs
//     .replace(/_/g, '\\_')     // Escape underscores
//     .replace(/#/g, '\\#')     // Escape hash signs
//     .replace(/{/g, '\\{')     // Escape opening braces
//     .replace(/}/g, '\\}')     // Escape closing braces
//     .replace(/&/g, '\\&')     // Escape ampersands
//     .replace(/~/g, '\\~')     // Escape tilde
//     .replace(/</g, '\\textless')  // Escape <
//     .replace(/>/g, '\\textgreater');  // Escape >
// };

// export default function Home() {
//   const [pdfFile, setPdfFile] = useState(null);
//   const [extractedText, setExtractedText] = useState('');
//   const [latexCode, setLatexCode] = useState('');
//   const [projectInfo, setProjectInfo] = useState('');
//   const [pdfUrl, setPdfUrl] = useState(''); // URL to display the rendered PDF

//   const handleFileChange = (e) => {
//     setPdfFile(e.target.files[0]);
//   };

//   const handleFileUpload = async () => {
//     const formData = new FormData();
//     formData.append('file', pdfFile);

//     // Load PDF.js in the browser
//     const pdfData = await pdfFile.arrayBuffer();
//     const loadingTask = pdfjsLib.getDocument(pdfData);

//     try {
//       const pdf = await loadingTask.promise;
//       const numPages = pdf.numPages;
//       let text = '';

//       for (let i = 1; i <= numPages; i++) {
//         const page = await pdf.getPage(i);
//         const content = await page.getTextContent();
//         text += content.items.map((item) => item.str).join(' ') + '\n';
//       }

//       // Send extracted text to backend
//       const response = await fetch('/api/parseResume', {
//         method: 'POST',
//         body: JSON.stringify({ text }),
//         headers: { 'Content-Type': 'application/json' },
//       });

//       const data = await response.json();
//       setLatexCode(data.latexCode);
//       setExtractedText(data.extractedText);
//     } catch (error) {
//       console.error(error);
//       setExtractedText('Error extracting text');
//     }
//   };

//   const handleProjectChange = (e) => {
//     setProjectInfo(e.target.value);
//   };

//   // const handleCompile = async () => {
//   //   // Escape the project info text to prevent LaTeX syntax issues
//   //   const escapedProjectInfo = escapeLatex(projectInfo);

//   //   // Add project info to LaTeX and re-render
//   //   const compiledLatex = `${latexCode}\n\\section*{Projects}\n${escapedProjectInfo}`;

//   //   // Send the LaTeX code to the render-latex API to generate the PDF
//   //   const response = await fetch('/api/render-latex', {
//   //     method: 'POST',
//   //     body: JSON.stringify({ latexCode: compiledLatex }),
//   //     headers: { 'Content-Type': 'application/json' },
//   //   });

//   //   if (response.ok) {
//   //     // Create a URL to display the PDF
//   //     const pdfBlob = await response.blob();
//   //     const pdfObjectUrl = URL.createObjectURL(pdfBlob);
//   //     setPdfUrl(pdfObjectUrl);
//   //   } else {
//   //     const errorData = await response.json();
//   //     console.error('Error compiling LaTeX:', errorData.error);
//   //   }
//   // };

//   const handleCompile = async () => {
//     // Escape the project info text to prevent LaTeX syntax issues
//     const escapedProjectInfo = escapeLatex(projectInfo);
  
//     // Simplified LaTeX code structure
//     const compiledLatex = `
//       \\documentclass{article}
//       \\usepackage{geometry}
//       \\geometry{a4paper, margin=1in}
//       \\begin{document}
  
//       \\title{Resume}
//       \\author{Your Name}
//       \\maketitle
  
//       \\section*{Extracted Text}
//       ${escapeLatex(extractedText)}
  
//       \\section*{Projects}
//       ${escapedProjectInfo}
  
//       \\end{document}
//     `;
  
//     // Send the LaTeX code to the render-latex API to generate the PDF
//     const response = await fetch('/api/render-latex', {
//       method: 'POST',
//       body: JSON.stringify({ latexCode: compiledLatex }),
//       headers: { 'Content-Type': 'application/json' },
//     });
  
//     if (response.ok) {
//       // Create a URL to display the PDF
//       const pdfBlob = await response.blob();
//       const pdfObjectUrl = URL.createObjectURL(pdfBlob);
//       setPdfUrl(pdfObjectUrl);
//     } else {
//       const errorData = await response.json();
//       console.error('Error compiling LaTeX:', errorData.error);
//     }
//   };
  
//   return (
//     <div style={{ display: "flex" }}>
//       <div style={{ flex: 1, padding: "20px" }}>
//         <input type="file" accept=".pdf" onChange={handleFileChange} />
//         <button onClick={handleFileUpload}>Extract Text</button>
//         <textarea
//           value={extractedText}
//           readOnly
//           rows="10"
//           cols="50"
//           style={{ marginTop: '20px' }}
//         />
//         <h3>Add Projects or Achievements:</h3>
//         <textarea
//           value={projectInfo}
//           onChange={handleProjectChange}
//           rows="5"
//           cols="50"
//         />
//         <button onClick={handleCompile} style={{ marginTop: '10px' }}>Compile Resume</button>
//       </div>

//       <div style={{ flex: 1, padding: "20px" }}>
//         <h3>Compiled Resume (PDF Preview)</h3>
//         {pdfUrl ? (
//           <iframe
//             src={pdfUrl}
//             width="100%"
//             height="600px"
//             title="Compiled Resume"
//           />
//         ) : (
//           <p>Click "Compile Resume" to generate and view the PDF.</p>
//         )}
//       </div>
//     </div>
//   );
// }
