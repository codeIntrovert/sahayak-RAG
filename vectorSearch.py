"""
This file showcases the basic vector search functionality using sentence transformers.
"""

from sentence_transformers import SentenceTransformer, util

model = SentenceTransformer('all-MiniLM-L6-v2')
docs = [
    "My name is Hasan",
    "Caterpillars live in trees.",
    "Nasa makes rockets",
    "Cats are called the ultimate predators of the rodent world.",
]

doc_embeddings = model.encode(docs, convert_to_tensor=True)
query = input("Enter your query: ")
query_embedding = model.encode(query, convert_to_tensor=True)
cosine_scores = util.cos_sim(query_embedding, doc_embeddings)

print("Similarity scores:\n", cosine_scores)
print("\n\nQuery:", query)
for idx in cosine_scores.argsort(descending=True)[0]:
    score = cosine_scores[0][idx].item() 
    print(f"- #{idx} ({score*100:.2f}%): {docs[idx]}")

