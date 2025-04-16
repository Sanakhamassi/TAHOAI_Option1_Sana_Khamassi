from transformers import pipeline

from app.schemas import ClassificationResult

# Zero-shot classification pipeline
classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")

documents_types = ["Invoice", "Contract", "Resume", "Report"]

def classify_text(text: str) -> ClassificationResult:
    result = classifier(text, documents_types)
    label = result["labels"][0]
    confidence = round(result["scores"][0], 2)
    
    return ClassificationResult(label=label, confidence=confidence)
