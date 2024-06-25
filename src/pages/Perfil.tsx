// Filename - pages/perfil.tsx
import React from 'react'
import '@aws-amplify/ui-react/styles.css'
import type { Schema } from "../data/resource";
import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

const Perfil: React.FC = () => {
    const [juegos, setJuego] = useState<Array<Schema["Juego"]["type"]>>([]);
    const [comentarios, setComentario] = useState<Array<Schema["Comentario"]["type"]>>([]);

    useEffect(() => {
        client.models.Comentario.observeQuery().subscribe({
          next: (data: { items: any; }) => setComentario([...data.items]),
        });
        client.models.Juego.observeQuery().subscribe({
          next: (data: { items: any; }) => setJuego([...data.items]),
        });
        }, []);


    function getJuegoByName(name: string | number) {
      return juegos.find((juego) => juego.name === name);
    }

    const name = "League of Legends"; // Este es el id del comentario que deseas obtener
    const juego = getJuegoByName(name);

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
  <div className='juego-todo'>
    <div className="juego-div">
    {juego ? (<h1>{juego.name}</h1>) : (<h1>Not found</h1>)}

    <ul className="juego-foto"> <br />
    <img className="foto" src="https://cdn2.unrealengine.com/a-beginner-s-guide-to-league-of-legends-teemo-1215x717-dc27844d5953.jpg" alt="League of Legends" 
    height={200} width={300}/>

    </ul>
    <ul className="juego-list">
        {juego ? (
          <p className='juego-text'>{juego.content} </p>
        ) : (
          <p className='juego-text'>Juego no encontrado </p>
        )}

    </ul>
    </div>

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

  </div>
    );
};
 
export default Perfil;