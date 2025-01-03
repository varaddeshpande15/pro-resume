"use client" ;
import { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';

// Set the workerSrc to the CDN location for the 2.16.105 version
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js`;

export default function Home() {
  const [pdfFile, setPdfFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');

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

      setExtractedText(text);
    } catch (error) {
      console.error(error);
      setExtractedText('Error extracting text');
    }
  };

  return (
    <div>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Extract Text</button>
      <pre>{extractedText}</pre>
    </div>
  );
}

