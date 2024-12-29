# ProResume

ProResume is a cutting-edge resume generator designed to optimize resumes for job applications. It uses advanced NLP techniques and ATS scoring to help users craft tailored, job-specific resumes and increase their chances of shortlisting.

## Features

- **User-Friendly Input**: Enter resume details manually or provide a LinkedIn profile link.
- **LaTeX-Based Resume**: Generate beautifully formatted resumes using a professional LaTeX template.
- **Job-Specific Customization**: Tailor your resume based on a provided job description, prioritizing relevant skills and projects.
- **ATS Score**: Get an Applicant Tracking System (ATS) score and actionable feedback to optimize your resume.

## Tech Stack

### Frontend
- [Next.js](https://nextjs.org/) (React Framework)
- [Tailwind CSS](https://tailwindcss.com/) (Styling)

### Backend
- [Node.js](https://nodejs.org/) with Next.js API Routes
- [FastAPI](https://fastapi.tiangolo.com/) (Python) for NLP and resume processing

### Additional Tools
- [spaCy](https://spacy.io/) and [Hugging Face Transformers](https://huggingface.co/transformers/) for NLP
- [LaTeX](https://www.latex-project.org/) for resume formatting
- [MongoDB](https://www.mongodb.com/) or [Firebase](https://firebase.google.com/) for optional data storage

## How It Works

1. **Input Details**: Provide your resume details, LinkedIn profile link, or job description.
2. **Generate Resume**: Create a PDF using our professional LaTeX template.
3. **ATS Optimization**: Analyze your resume against a job description and receive actionable feedback.
4. **Download & Apply**: Download your tailored resume and boost your job application chances.

## Installation

### Prerequisites
- Node.js (v16 or higher)
- Python (v3.9 or higher)
- MongoDB or Firebase (optional for database storage)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/pro-resume.git
   cd pro-resume
   ```
2. Install dependencies:
   - For frontend:
     ```bash
     cd frontend
     npm install
     ```
   - For backend:
     ```bash
     cd backend
     pip install -r requirements.txt
     ```
3. Start the development servers:
   - Frontend:
     ```bash
     npm run dev
     ```
   - Backend:
     ```bash
     uvicorn main:app --reload
     ```

## Usage

1. Open the frontend at `http://localhost:3000`.
2. Enter your details, LinkedIn link, or job description.
3. Generate and download your optimized resume.

## Contributing

Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [spaCy](https://spacy.io/) for NLP tasks
- [Tailwind CSS](https://tailwindcss.com/) for elegant styling
- [LaTeX](https://www.latex-project.org/) for resume formatting