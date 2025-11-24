import { useEffect, useState } from "react";
import { model } from "../config/firebase.js";

function Curiosidade() {
  const [texto, setTexto] = useState("Carregando...");

  useEffect(() => {
    async function gerar() {
      
        const prompt = "Me diga uma curiosidade curta e divertida sobre filmes. não passe de 30 palavras, não inicie com 'Curiosidade:' apenas me diga a curiosidade.";
        const result = await model.generateContent(prompt);

      setTexto(result.response.text());
    }

    gerar();
  }, []);

  return (
    <div>
      <strong>🎬 Curiosidade de filmes do dia:</strong>
      <p>{texto}</p>
    </div>
  );
}

export default Curiosidade;
