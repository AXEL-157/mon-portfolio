from flask import Flask, request, jsonify
from flask_cors import CORS
from pathlib import Path
import json
import requests

app = Flask(__name__)
CORS(app)


MODEL = "llama3.2:3b"
OLLAMA_HOST = "http://ollama:11434"
NUM_CTX = 2048
NUM_PREDICT = 60
KEEP_ALIVE = "30m"
SCRAP_DIR = Path(__file__).resolve().parent / "scrap"
SCRAP_FILES = [
    SCRAP_DIR / "menus.json",
    SCRAP_DIR / "burger.json",
    SCRAP_DIR / "desserts.json",
    SCRAP_DIR / "boissons.json",
    SCRAP_DIR / "wraps.json",
]


def load_cache():
    cache = {}

    for file in SCRAP_FILES:
        if file.exists():
            try:
                with open(file, "r", encoding="utf-8") as f:
                    cache[file.stem] = json.load(f)
            except Exception as e:
                print(f"Erreur chargement {file}: {e}")

    return cache


CACHE = load_cache()


SYSTEM_PROMPT = """
Tu es le chatbot Burger King. 
Tu réponds uniquement sur : menus, horaires, promotions, allergènes, halal, services.
Tu ne donnes jamais d'informations inventées.
Tu restes simple, clair et rapide.
Si la réponse n’est pas dans tes données, tu dis : "Je n’ai pas cette information."
Réponds toujours comme un assistant de fast-food professionnel.
Tu utilises uniquement les informations fournies dans le contexte.
Tu ne devines jamais.
"""

def select_scrap_files(user_message):
    msg = user_message.lower()

    routes = []

    if any(word in msg for word in ["burger", "viande", "menu", "big", "whopper"]):
        routes.append("burger.json")

    if any(word in msg for word in ["dessert", "glace", "sundae", "cookie"]):
        routes.append("desserts.json")

    if any(word in msg for word in ["boisson", "coca", "pepsi", "eau", "drink"]):
        routes.append("boissons.json")

    if any(word in msg for word in ["wrap", "tortilla"]):
        routes.append("wraps.json")

    # fallback si rien détecté
    if not routes:
        routes = ["menus.json"]

    return [SCRAP_DIR / r for r in routes]

def build_scrap_context(user_message, max_items=5):
    keywords = [w for w in user_message.lower().split() if len(w) > 3]

    files_to_use = select_scrap_files(user_message)

    sections = []

    for file_key in files_to_use:
        key = file_key.stem

        if key not in CACHE:
            continue

        payload = CACHE[key]

        lines = []

        for item in payload:
            text = str(item).lower()

            if any(k in text for k in keywords):
                name = item.get("nom", "item")
                lines.append(f"- {name}")

            if len(lines) >= max_items:
                break

        if lines:
            sections.append(key + ":\n" + "\n".join(lines))

    return "\n\n".join(sections)

@app.route("/chat", methods=["POST"])
def chat():
    user_message = request.json["message"]

    scrap_context = build_scrap_context(user_message)

    data_prompt = ""
    if scrap_context:
        data_prompt = "\n\nBase produits (scraping JSON):\n" + scrap_context

    prompt = SYSTEM_PROMPT + data_prompt + "\n\nUtilisateur: " + user_message + "\nAssistant:"

    response = requests.post(
        f"{OLLAMA_HOST}/api/generate",
        json={
            "model": MODEL,
            "prompt": prompt,
            "stream": False,
            "keep_alive": "5m",
            "options": {
                "temperature": 0.7,
                "num_ctx": NUM_CTX,
                "num_predict": NUM_PREDICT,
                "num_thread": 12
            }
        },
        timeout=120
    )

    if response.status_code != 200:
        return jsonify({
            "error": "ollama_error",
            "status": response.status_code,
            "details": response.text
        }), 502

    data = response.json()
    if "response" not in data:
        return jsonify({
            "error": "invalid_ollama_response",
            "details": data
        }), 502

    return jsonify({
        "response": data["response"]
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)