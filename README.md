**Codebase Q&A with Proof – AI Powered Repository Assistant** 

This is an AI-powered web application that allows users to upload a ZIP file of a codebase or connect a public GitHub repository URL. Users can ask questions about the codebase and receive answers with file paths, line numbers, and code snippets as proof.

---
## Tech Stack & Tools Used

1. Frontend
- React (Vite)
- Tailwind CSS

2. Backend
- Node.js
- Express.js

3. Database
- MongoDB

4. AI & Development Tools
- Gemini Pro — used for development assistance
- ChatGPT — used minimally for guidance
- Postman — API testing
- Visily AI — UI/UX design support

  ---
##  How to Run Locally

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

---

##  Implementation Notes

This project was developed within a limited timeframe, and some pragmatic trade-offs were made to ensure a functional end-to-end system.

- Code quality may not fully follow strict clean-code standards in all modules due to time constraints
- Response time can be higher when using free-tier LLM services
- Background processing states (e.g., embedding generation, LLM calls) are not fully reflected in the UI with advanced loading indicators
- Some UI components were generated with AI assistance and then integrated manually

  ---

  ##  Future Improvements

- Refactor codebase to fully align with clean code and modular architecture principles
- Integrate higher-performance paid LLMs to reduce latency
- Implement robust background job handling and progress indicators
- Improve UI responsiveness during long-running operations
- Reduce reliance on generated UI code and enhance custom design
