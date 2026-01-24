# Resume Matcher (MERN)

A web application that helps recruiters and job seekers match resumes to job descriptions using keyword analysis.

## Features

- **Upload Resumes**: Upload up to 3 resumes (PDF/DOCX) at once.
- **Job Description Analysis**: Paste the job description to compare against.
- **Match Scoring**: Algorithm calculates a percentage match based on keywords.
- **Results Visualization**: Clean, visual display of match scores and status (Good/Average/Poor).

## Tech Stack

- **Frontend**: React, Vite, CSS (Glassmorphism)
- **Backend**: Node.js, Express, MongoDB
- **Tools**: PDF-Parse, Mammoth, Multer

## Setup

1.  **Backend**:
    ```bash
    cd server
    npm install
    # Ensure MongoDB is running locally on port 27017
    node server.js
    ```

2.  **Frontend**:
    ```bash
    cd client
    npm install
    npm run dev
    ```

## Usage

1.  Enter a Job Description.
2.  Upload 1-3 resumes.
3.  Click "Analyze Resumes".
4.  View the match percentage and status.
