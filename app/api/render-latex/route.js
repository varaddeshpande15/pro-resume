import latex from 'node-latex';
import { PassThrough } from 'stream';

export async function POST(req) {
  const { latexCode } = await req.json();

  if (!latexCode) {
    return new Response(JSON.stringify({ error: 'LaTeX code is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    // Create a readable stream from the LaTeX code
    const input = new PassThrough();
    input.end(latexCode);

    // Create the PDF using node-latex
    const pdfStream = latex(input);

    // Capture the output in a buffer
    const chunks = [];
    await new Promise((resolve, reject) => {
      pdfStream.on('data', (chunk) => chunks.push(chunk));
      pdfStream.on('end', resolve);
      pdfStream.on('error', reject);
    });

    const pdfBuffer = Buffer.concat(chunks);

    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
      },
    });
  } catch (error) {
    console.error('Error rendering LaTeX:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to compile LaTeX' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
