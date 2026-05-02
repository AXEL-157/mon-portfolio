import { useEffect, useRef, useState } from "react";
import logo from "./assets/img/IMG_1688.png";
import bob from "./assets/img/bob.png";

export default function Kingbot() {
  const [open, setOpen] = useState(false);

  const [hideText, setHideText] = useState(false);

  // Chatbot
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = () => {
    if (input.trim() === "") return;

    setMessages((prev) => [...prev, { from: "user", text: input }]);
    const userMessage = input;
    setInput("");

    fetch("http://127.0.0.1:5000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: userMessage })
    })
      .then((response) => response.json())
      .then((data) => {
        setMessages((prev) => [
          ...prev,
          { from: "bot", text: data.response }
        ]);
      })
      .catch((error) => {
        console.error("Erreur:", error);
        setMessages((prev) => [
          ...prev,
          { from: "bot", text: "Erreur de connexion au serveur" }
        ]);
      });
  };

  return (
    <div>
      <header>
        <div className="logo-wrapper">
          <img src={logo} alt="logo" className="bob2" />
          <span className="logo-title">KINGBOT</span>
        </div>

        <nav className="navbar">
          <ul>
            <li><a href="#fonctionnalite">FONCTIONNALITÉS</a></li>
            <li><a href="#roi">RETOUR SUR INVESTISSEMENT</a></li>
            <li><a href="#stats">STATISTIQUES</a></li>
          </ul>
        </nav>
      </header>

      <div className={`logo-text ${hideText ? "hidden" : ""}`}>
        venez tester notre chatbot →
      </div>
      <button
        type="button"
        className="logo-link"
        onClick={() => {
          setOpen(true);
          setHideText(true);
        }}
        aria-label="Ouvrir le chat"
      >
        <img src={bob} alt="Logo" />
      </button>

      <div className="container">
        <div>
          <h1 className="Présentation">Présentation du chatbot</h1>
          <p className="Présentation_text">
           KINGBOT est un chatbot conçu pour accompagner les clients de manière rapide et efficace.
Il permet de consulter les horaires, afficher le menu, filtrer les allergènes, découvrir les promotions et guider les utilisateurs de Burger King dans leur commande.
Grâce à ses réponses automatisées aux questions fréquentes, il offre également une estimation du temps d’attente.
En optimisant l’expérience client, KINGBOT contribue à réduire la charge de travail du personnel.
</p>
        </div>

        <p className="question">Quelles sont les fonctionnalités qu’il propose pour aider les clients ?</p>

        <div className="BOX" id="fonctionnalite">
          <h3>FONCTIONNALITÉS</h3>

          <h4>Le chatbot permet de donner plusieurs informations au client, comme :</h4>

          <div className="grid-features">
            <div className="feature-card">
              <h4>Horaires</h4>
              <p>Restaurant, drive, livraison, services disponibles.</p>
            </div>

            <div className="feature-card">
              <h4>Menu complet</h4>
              <p>Burgers, menus, desserts, boissons, prix mis à jour.</p>
            </div>

            <div className="feature-card">
              <h4>Allergènes</h4>
              <p>Filtre gluten, lactose, arachides, porc, œufs…</p>
            </div>

            <div className="feature-card">
              <h4>Promotions</h4>
              <p>Nouveautés, menus réduits, offres spéciales.</p>
            </div>

            <div className="feature-card">
              <h4>Aide à la commande</h4>
              <p>Guidage vers la plateforme BK.</p>
            </div>

            <div className="feature-card">
              <h4>Halal</h4>
              <p>Disponibilité selon le restaurant.</p>
            </div>

            <div className="feature-card">
              <h4>Temps d’attente</h4>
              <p>Drive, borne, comptoir.</p>
            </div>

            <div className="feature-card">
              <h4>FAQ intelligente</h4>
              <p>Livraison, prix, calories, services…</p>
            </div>
          </div>
        </div>

        <p className="question">Quel est le retour sur investissement ?</p>

        <div className="BOX" id="roi">
          <h3>RETOUR SUR INVESTISSEMENT</h3>

          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h4>Coût faible</h4>
                <p>Le chatbot fonctionne 24/7 sans personnel supplémentaire.</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h4>+25% de commandes guidées</h4>
                <p>Le bot met en avant les menus populaires et les promotions.</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h4>-20% de charge employés</h4>
                <p>Réduction des appels et des questions répétitives.</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h4>+30% satisfaction client</h4>
                <p>Réponses rapides, informations fiables, expérience fluide.</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h4>Promotions mieux communiquées</h4>
                <p>Les offres sont mises en avant automatiquement.</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h4>Moins d’erreurs humaines</h4>
                <p>Informations toujours exactes et cohérentes.</p>
              </div>
            </div>
          </div>
        </div>

        <p className="question">Quelles statistiques peut-on suivre ?</p>

        <div className="BOX" id="stats">
          <h3>STATISTIQUES</h3>

          <div className="stats-list">

            <div className="stats-item">
              <div>
                <h4>Nombre d’utilisateurs</h4>
                <p>Mesure l’adoption du bot par les clients.</p>
              </div>
            </div>

            <div className="stats-item">
              <div>
                <h4>Nombre de conversations</h4>
                <p>Analyse des pics d’activité.</p>
              </div>
            </div>

            <div className="stats-item">
              <div>
                <h4>Taux de réponses automatiques</h4>
                <p>Objectif : plus de 90% des questions résolues.</p>
              </div>
            </div>

            <div className="stats-item">
              <div>
                <h4>Temps moyen de réponse</h4>
                <p>Généralement inférieur à 10 secondes.</p>
              </div>
            </div>

            <div className="stats-item">
              <div>
                <h4>Commandes guidées</h4>
                <p>Nombre de clients aidés dans leur choix.</p>
              </div>
            </div>

            <div className="stats-item">
              <div>
                <h4>Utilisation des promotions</h4>
                <p>Nombre de clics sur les offres mises en avant.</p>
              </div>
            </div>

            <div className="stats-item">
              <div>
                <h4>Réduction des appels</h4>
                <p>Baisse des questions répétitives.</p>
              </div>
            </div>

            <div className="stats-item">
              <div>
                <h4>Satisfaction client</h4>
                <p>Score basé sur les retours.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {open && (
        <div className="chatbot-box">
          <div className="chatbot-header">
            <span>Chatbot KINGBOT</span>
            <button type="button" className="close-chat" onClick={() => setOpen(false)}>
              X
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`msg ${msg.from === "user" ? "user-msg" : "bot-msg"}`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={chatEndRef}></div>
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Écrire un message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button type="button" onClick={sendMessage}>
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
}