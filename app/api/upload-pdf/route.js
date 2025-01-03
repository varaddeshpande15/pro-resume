import pdfParse from 'pdf-parse';

export async function POST(req) {
  try {
    // Parse form data
    const formData = await req.formData();
    const file = formData.get('file');
    
    if (!file) {
      return new Response('No file uploaded', { status: 400 });
    }

    // Parse the PDF
    const buffer = await file.arrayBuffer();
    const data = await pdfParse(buffer);

    // Return the extracted text as a response
    return new Response(JSON.stringify({ text: data.text }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error parsing PDF:', error);
    return new Response('Failed to parse PDF', { status: 500 });
  }
}
