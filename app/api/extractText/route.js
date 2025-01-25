import { PDFDocument } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist/webpack';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      return new Response('No file provided', { status: 400 });
    }

    const buffer = await file.arrayBuffer();

    // Use pdfjs-dist to extract text
    const loadingTask = pdfjsLib.getDocument(buffer);
    const pdf = await loadingTask.promise;
    const numPages = pdf.numPages;
    let extractedText = '';

    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const content = await page.getTextContent();
      const pageText = content.items.map(item => item.str).join(' ');
      extractedText += pageText + '\n'; // Add text from each page
    }

    return new Response(JSON.stringify({ text: extractedText }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response('Error extracting text from PDF', { status: 500 });
  }
}
