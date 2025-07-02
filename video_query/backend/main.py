import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google import genai
from dotenv import load_dotenv


load_dotenv()
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatPrompt(BaseModel):
    prompt: str

class ChatRequest(BaseModel):
    request: str

@app.get("/")
async def root():
    return {"message" : "Running"}

@app.post("/chat")
async def chat(request: ChatPrompt):
    response = client.models.generate_content(
        model='gemini-2.0-flash',
        contents=request.prompt
    )
    return {"response": response.text}
