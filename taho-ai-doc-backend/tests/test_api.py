from fastapi.testclient import TestClient
from app.main import app
import io

client = TestClient(app)

def test_classify_with_text():
    response = client.post("/classify", json={"text": "This is a contract for full-time position as Full-stack developer."})
    assert response.status_code == 200
    data = response.json()
    assert "label" in data
    assert "confidence" in data
    assert isinstance(data["label"], str)
    assert isinstance(data["confidence"], float)

def test_classify_with_txt_file():
    file_content = "Here is an invoice."
    file = io.BytesIO(file_content.encode("utf-8"))
    response = client.post("/classify", files={"file": ("sample.txt", file, "text/plain")})
    assert response.status_code == 200
    data = response.json()
    assert "label" in data
    assert "confidence" in data

def test_missing_input():
    response = client.post("/classify", data={})
    assert response.status_code == 400
    assert response.json()["detail"] == "Either 'text' or 'file' must be provided."

def test_empty_text():
    response = client.post("/classify", json={"text": ""})
    assert response.status_code == 400
    assert response.json()["detail"] == "Text input is required."
