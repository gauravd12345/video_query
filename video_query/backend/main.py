import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google import genai
from google.genai import types
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
    file_uri: str

class ChatRequest(BaseModel):
    request: str

@app.get("/")
async def root():
    return {"message" : "Running"}

@app.post("/chat")
async def chat(chat: ChatPrompt):
    contents=types.Content(
        parts=[
            types.Part(
                file_data=types.FileData(file_uri=chat.file_uri)
            ),
            types.Part(text=chat.prompt)
        ]
    )
        
    response = client.models.generate_content(
        model='models/gemini-2.5-flash',
        contents=contents
    )
    return {"response": response.text}


# response = client.models.generate_content(
#     model='models/gemini-2.0-flash',
#     contents=types.Content(
#         parts=[
#             types.Part(
#                 file_data=types.FileData(file_uri='https://www.youtube.com/watch?v=9hE5-98ZeCg')
#             ),
#             types.Part(text='Please summarize the video in 3 sentences.')
#         ]
#     )
# )