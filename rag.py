from sentence_transformers import SentenceTransformer, util

model = SentenceTransformer('all-MiniLM-L6-v2')
docs = [
    "I hosted a Python workshop at GDG with 200 participants.",
    "My name is Hasan",
    "Caterpillars live in trees.",
    "Nasa makes rockets"
]

doc_embeddings = model.encode(docs, convert_to_tensor=True)
query = "Companies similar to SpaceX"
query_embedding = model.encode(query, convert_to_tensor=True)
cosine_scores = util.cos_sim(query_embedding, doc_embeddings)

print("Similarity scores:\n", cosine_scores)
print("\n\nQuery:", query)
for idx in cosine_scores.argsort(descending=True)[0]:
    score = cosine_scores[0][idx].item() 
    print(f"- #{idx} ({score*100:.2f}%): {docs[idx]}")

