FROM python:3.13-slim
WORKDIR /app
COPY . ./sahayak-RAG
WORKDIR /app/sahayak-RAG
RUN pip install --no-cache-dir -r requirements.txt

CMD ["python","app.py"]

