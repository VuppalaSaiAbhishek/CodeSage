**Codebase Q&A with Proof – AI Powered Repository Assistant** 

This is an AI-powered web application that allows users to upload a ZIP file of a codebase or connect a public GitHub repository URL. Users can ask questions about the codebase and receive answers with file paths, line numbers, and code snippets as proof.

---
## ▶️ How to Run Locally

 1. Clone the repository

- git clone https://github.com/your-username/your-repo.git
- cd your-repo

 2. Install dependencies

- npm install

 3. Configure environment variables

Create a `.env` file and add your API keys:

- OPENAI_API_KEY=your_key_here
- DATABASE_URL=your_database_url

 4. Start the backend server

- npm start

 5. Start the frontend

-npm run dev

6. Open in browser


---

## What Is Done

- Upload and process ZIP codebases
- Connect and analyze public GitHub repositories
- Natural-language Q&A over the codebase
- Answers with file paths, line numbers, and code snippets
- Clickable file references in the UI
- Separate panel for retrieved code snippets
- Stores last 10 Q&A interactions
- Status page showing backend, database, and LLM health
- Basic validation for empty or invalid inputs
- Clean and responsive user interface

---

  ## What Is Not Done

- Authentication / user accounts
- Support for private GitHub repositories
- Handling very large repositories (optimized indexing)
- Background job processing for heavy tasks
- Multi-user collaboration features
- Advanced code analysis beyond retrieval-based answers
