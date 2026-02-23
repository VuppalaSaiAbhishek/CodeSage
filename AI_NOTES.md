# AI Notes

##  Use of AI in Development

AI tools were used to accelerate development, especially for:

- UI scaffolding and layout suggestions  
- Generating example code snippets  
- Prompt design for LLM interactions  
- Debugging assistance  
- Documentation drafting  

All AI-generated code was reviewed, modified, and tested manually before integration.

##  Manual Verification

The following aspects were implemented and verified manually:

- Application architecture and data flow  
- Backend logic and API endpoints  
- Database schema and integration  
- Embedding pipeline and retrieval logic  
- Error handling and validation  
- End-to-end functionality testing  

##  LLM Used in the Application

- Provider: OpenRouter  
- Model(s): Free-tier LLMs available via OpenRouter  

### Why this choice?

- Provides access to multiple LLMs through a single API  
- Suitable for rapid prototyping  
- No upfront cost during development  
- Easy integration  

A paid LLM API would improve performance, reliability, and latency.

## 🛠️ Development Assistance Tools

- Google Gemini — development guidance and UI assistance  
- ChatGPT — limited troubleshooting and documentation help  
