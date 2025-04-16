from fastapi import FastAPI, HTTPException, UploadFile, File,Form
from fastapi.middleware.cors import CORSMiddleware
from app.model import classify_text
from app.schemas import ClassificationResult, TextInput

app = FastAPI(title="TAHO AI Document Classifier")

# CORS allow access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/classify", response_model=ClassificationResult)
async def classify(text: str = Form(None), file: UploadFile = File(None)):
    if not text and not file:
        raise HTTPException(status_code=400, detail="Either 'text' or 'file' must be provided.")

    if not text:
        text = await file.read()
        text = text.decode("utf-8")

    if text and len(text) > 100000:
        raise HTTPException(status_code=413, detail="Text too long.")
    
    if not text.strip():
        raise HTTPException(status_code=400, detail="Text input is required.")

    result = classify_text(text)
    return result