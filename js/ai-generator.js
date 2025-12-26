// AI Content Generator Logic for Paula Mesuret Back Office
// Connects to Google Gemini API

// CONFIGURATION
// CAUTION: In a real production app, this key should be proxied via a backend.
// For this MVP/Demo, we use it directly.
const API_KEY = "YOUR_GEMINI_API_KEY_HERE";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

async function generatePost() {
    const topic = document.getElementById('topic-input').value;
    const tone = document.getElementById('tone-select').value;
    const platform = "LinkedIn"; // Currently hardcoded to LinkedIn tab for MVP

    if (!topic) {
        alert("Veuillez entrer un sujet pour le post.");
        return;
    }

    const previewElement = document.getElementById('generated-content');
    previewElement.innerHTML = '<span class="animate-pulse">Réflexion en cours...</span>';

    // Construct the Prompt
    const prompt = `
        Tu es l'assistant de communication de Paula Mesuret.
        Philosophie : "Incarner sa parole", "Révéler sa vibration", "Authenticité radicale".
        INTERDIT : Ne jamais utiliser d'arguments négatifs (ex: ne pas critiquer la tech ou l'IA). Toujours formuler positivement.
        Rédige un post pour ${platform} sur le sujet : "${topic}".
        Ton : ${tone} (Toujours valorisant et inspirant).
        Structure :
        1. Une accroche positive sur la transformation personnelle.
        2. Un développement sur le ressenti et l'organique.
        3. Une conclusion engageante vers la pratique.
        Format : Texte brut, aéré.
    `;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }]
            })
        });

        if (!response.ok) {
            throw new Error(`Erreur API: ${response.status}`);
        }

        const data = await response.json();
        const generatedText = data.candidates[0].content.parts[0].text;

        // Simulate typing effect
        typeWriterEffect(generatedText, previewElement);

    } catch (error) {
        console.error("Erreur de génération:", error);
        previewElement.innerHTML = `<span class="text-red-500">Erreur lors de la génération. Vérifiez la clé API.</span>`;
    }
}

function typeWriterEffect(text, element) {
    element.textContent = "";
    let i = 0;
    const speed = 10; // ms

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}
