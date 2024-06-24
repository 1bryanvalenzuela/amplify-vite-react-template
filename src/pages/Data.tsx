// Filename - pages/data.tsx
import React from 'react' 
import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import type { Schema } from "../data/resource";
import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

const Data: React.FC = () => {
    const [comentarios, setComentario] = useState<Array<Schema["Comentario"]["type"]>>([]);

    useEffect(() => {
        client.models.Comentario.observeQuery().subscribe({
          next: (data: { items: any; }) => setComentario([...data.items]),
        });
      }, []);

//      function deleteComentario(id: string) {
//        client.models.Comentario.delete({ id })
//      }

      function addlikeComentario(id: string) {
        // Encuentra el comentario por su id
        const comentario = comentarios.find((comentario) => comentario.id === id);
      
        if (comentario) {
          // Incrementa el número de likes localmente
          const updatedComentarios = comentarios.map((c) =>
            c.id === id ? { ...c, likes: (c.likes || 0) + 1 } : c
          );
      
          // Actualiza el estado local
          setComentario(updatedComentarios);
      
          // Actualiza el comentario en la base de datos
          client.models.Comentario.update({ id, likes: (comentario.likes || 0) + 1 });
        }
      }

      function dislikeComentario(id: string) {
        // Encuentra el comentario por su id
        const comentario = comentarios.find((comentario) => comentario.id === id);
      
        if (comentario) {
          // Incrementa el número de likes localmente
          const updatedComentarios = comentarios.map((c) =>
            c.id === id ? { ...c, likes: (c.likes || 0) - 1 } : c
          );
      
          // Actualiza el estado local
          setComentario(updatedComentarios);
      
          // Actualiza el comentario en la base de datos
          client.models.Comentario.update({ id, likes: (comentario.likes || 0) - 1 });
        }
      }

    return (
        <Authenticator>
            {({ signOut }) => (
        <div>
            <h1>Datos</h1>

    <div className="list">
     <ul>
        {comentarios.map((comentario) => (
          <li key={comentario.id} className="comentario-item">

          <div className="comentario-icons">
          <i className='bx bx-like like-icon' onClick={() => addlikeComentario(comentario.id)}></i>
          {comentario.likes}
          <i className='bx bx-dislike dislike-icon' onClick={() => dislikeComentario(comentario.id)}></i>
          </div>
          
          <div className="comentario-text">
          <strong> {comentario.name} </strong> <br /> {comentario.content} 
          </div>
          
          </li>
        ))}

      </ul>
      </div>

            <button onClick={signOut}>Sign out</button>
        </div> )}
        </Authenticator>
    );
};
 
export default Data;