# TAHO AI – Document Classifier (Backend)

## Features

- Classifies documents into labels (Contract, Invoice, Resume, Report)
- Accepts `.txt` files
- Uses Hugging Face `facebook/bart-large-mnli`

## Setup

```bash
python -m venv env
source .\env\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```
