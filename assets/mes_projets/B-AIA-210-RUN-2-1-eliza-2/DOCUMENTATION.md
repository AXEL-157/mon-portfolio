# Documentation KINGBOT

## Présentation

KINGBOT est un chatbot pour Burger King. Il répond aux questions sur les menus, les prix, les horaires, les promos, les allergènes, le halal et les services.

## Structure du projet

- `frontend/` : interface en React.
- `backend/` : API Flask qui prépare les réponses.
- `docker-compose.yml` : lance le frontend, le backend et Ollama.
- `backend/scrap/` : scrapers et fichiers JSON pour les données.

## Prérequis

- Docker et Docker Compose
- Python 3.10 pour lancer le backend à la main
- Node.js 22 pour lancer le frontend à la main
- Ollama si tu ne passes pas par Docker

## Lancement avec Docker

1. Lance les services :

```bash
docker compose up --build
```

2. Ouvre le frontend dans le navigateur sur le port `5173`.
3. Le backend est sur le port `5000`.

## Modèles Ollama

Le backend utilise le modèle `llama3.2:3b`.

Télécharge le modèle avant de l’utiliser :

```bash
docker compose exec -T ollama ollama pull qwen3.5:4b
```
Si ton PC est assez puissant, tu peux télécharger aussi ce modèle :

```bash
docker compose exec -T ollama ollama pull qwen:7b
```

## Lancement manuel

### Backend

```bash
cd backend
pip install -r requirements.txt
python serveur.py
```

### Frontend

```bash
cd frontend
npm install
npm run dev -- --host
```

## Utilisation

1. Ouvre l’interface du chatbot.
2. Pose une question sur les menus, les prix, les promos, les allergènes ou le halal.
3. Le bot répond avec les données disponibles.
4. Si l’info manque, il le dit.

## API

### `POST /chat`

Requête JSON attendue :

```json
{
  "message": "Quelle est la promo du moment ?"
}
```

Réponse JSON :

```json
{
  "response": "..."
}
```

## Remarques

- Le backend lit les fichiers JSON du dossier `backend/scrap/`.
- Le frontend appelle l’API Flask sur `http://127.0.0.1:5000/chat`.
- Les réponses doivent rester courtes et factuelles.
