from pydantic import BaseModel

class TextInput(BaseModel):
    text: str

class ClassificationResult(BaseModel):
    label: str
    confidence: float
