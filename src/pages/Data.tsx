// Filename - pages/data.tsx
import React from 'react' 
import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import type { Schema } from "../data/resource";
import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

const Data: React.FC = () => {
    const [juegos, setJuego] = useState<Array<Schema["Juego"]["type"]>>([]);

    useEffect(() => {
        client.models.Juego.observeQuery().subscribe({
          next: (data: { items: any; }) => setJuego([...data.items]),
        });
      }, []);

      function deleteJuego(id: string) {
        client.models.Juego.delete({ id })
      }

    return (
        <Authenticator>
            {({ signOut }) => (
        <div>
            <h1>Datos</h1>

    <div className="list">
     <ul>
        {juegos.map((juego) => (
          <li 
          onClick={() => deleteJuego(juego.id)}
          key={juego.id}> <strong> {juego.name} </strong><br /> {juego.content}</li>
        ))}
      </ul>
      </div>

            <button onClick={signOut}>Sign out</button>
        </div> )}
        </Authenticator>
    );
};
 
export default Data;