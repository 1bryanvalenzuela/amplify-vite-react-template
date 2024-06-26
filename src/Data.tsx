// Filename - pages/data.tsx
import React from 'react'
import '@aws-amplify/ui-react/styles.css'
import type { Schema } from "../amplify/data/resource";
import { useEffect, useState } from "react";
import { generateClient, SelectionSet } from "aws-amplify/data";

const client = generateClient<Schema>();

const selectionSet = ['id', 'name', 'content', 'likes'] as const; // Asegúrate de que estos campos existen en tu modelo Comentario
type ComentarioWithDetails = SelectionSet<Schema['Comentario']['type'], typeof selectionSet>;

const Data: React.FC = () => {
  const [comentarios, setComentario] = useState<ComentarioWithDetails[]>([]);

  const fetchComentarios = async () => {
    try {
      const { data: comentariosWithDetails } = await client.models.Comentario.list({
        selectionSet,
      });
      setComentario(comentariosWithDetails);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchComentarios();
  }, []);

//    useEffect(() => {
//        client.models.Comentario.observeQuery().subscribe({
//          next: (data: { items: any; }) => setComentario([...data.items]),
//        });
//      }, []);

//      function deleteComentario(id: string) {
//        client.models.Comentario.delete({ id })
//      }

  const deleteComentario = async (id: string) => {
    try {
      await client.models.Comentario.delete({ id });
      // Actualizar el estado localmente
      setComentario(prevComentarios => prevComentarios.filter(comentario => comentario.id !== id));
    } catch (error) {
      console.error("Error deleting comentario: ", error);
    }
  };

  function addlikeComentario(id: string) {
    const comentario = comentarios.find((comentario) => comentario.id === id);
  
    if (comentario) {
      const updatedComentarios = comentarios.map((c) =>
        c.id === id ? { ...c, likes: (c.likes || 0) + 1 } : c
      );

      setComentario(updatedComentarios);

      client.models.Comentario.update({ id, likes: (comentario.likes || 0) + 1 });
    }};

    function dislikeComentario(id: string) {
      const comentario = comentarios.find((comentario) => comentario.id === id);
    
      if (comentario) {
        const updatedComentarios = comentarios.map((c) =>
          c.id === id ? { ...c, likes: (c.likes || 0) - 1 } : c
        );
  
        setComentario(updatedComentarios);
  
        client.models.Comentario.update({ id, likes: (comentario.likes || 0) - 1 });
      }};

    return (
        <div>
            <h1>Eliminar Data</h1>

    <div className="list">
     <ul>
        {comentarios.map((comentario) => (
          <li key={comentario.id} className="comentario-item">

          <div className="comentario-icons">
          <i className='bx bx-like like-icon' onClick={() => addlikeComentario(comentario.id)}></i>
          {comentario.likes}
          <i className='bx bx-dislike dislike-icon' onClick={() => dislikeComentario(comentario.id)}></i>
          </div>
          
          <div className="comentario-text" onClick={() => deleteComentario(comentario.id)}>
          <strong> {comentario.name} </strong> <br /> {comentario.content} 
          </div>
          
          </li>
        ))}

      </ul>
      </div>

      </div>
    );
};
 
export default Data;