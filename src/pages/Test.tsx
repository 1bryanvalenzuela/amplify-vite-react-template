// Filename - pages/data.tsx
import React from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import type { Schema } from '../data/resource';
import { useEffect, useState } from 'react';
import { generateClient, SelectionSet } from 'aws-amplify/data';

const client = generateClient<Schema>();

const selectionSet = ['id', 'name', 'content', 'likes'] as const;
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
      console.error('Error fetching data: ', error);
    }
  };

  useEffect(() => {
    fetchComentarios();
  }, []);

  const deleteComentario = async (id: string) => {
    try {
      await client.models.Comentario.delete({ id });
      setComentario((prevComentarios) => prevComentarios.filter((comentario) => comentario.id !== id));
    } catch (error) {
      console.error('Error deleting comentario: ', error);
    }
  };

  const addlikeComentario = async (id: string) => {
    const comentario = comentarios.find((comentario) => comentario.id === id);

    if (comentario) {
      const updatedComentarios = comentarios.map((c) =>
        c.id === id ? { ...c, likes: (c.likes || 0) + 1 } : c
      );

      setComentario(updatedComentarios);

      try {
        await client.models.Comentario.update({ id, likes: (comentario.likes || 0) + 1 });
      } catch (error) {
        console.error('Error updating likes: ', error);
      }
    }
  };

  const groupComentariosByName = (comentarios: ComentarioWithDetails[]) => {
    return comentarios.reduce((groups, comentario) => {
      const { name } = comentario;
      if (name) { // Verifica que name no sea null o undefined
        if (!groups[name]) {
          groups[name] = [];
        }
        groups[name].push(comentario);
      }
      return groups;
    }, {} as Record<string, ComentarioWithDetails[]>);
  };

  const groupedComentarios = groupComentariosByName(comentarios);

  return (
    <Authenticator>
      {({ signOut }) => (
        <div>
          <h1>Eliminar Data</h1>

          <div className="list">
            <ul>
              {Object.entries(groupedComentarios).map(([name, comentarios]) => (
                <li key={name} className="comentario-group">
                  <div className="comentario-name">
                    <strong>{name}</strong>
                  </div>
                  {comentarios.map((comentario) => (
                    <div key={comentario.id} className="comentario-item">
                      <div className="comentario-icons">
                        <i className="bx bx-like like-icon" onClick={() => addlikeComentario(comentario.id)}></i>
                        {comentario.likes}
                        <i className="bx bx-dislike dislike-icon"></i>
                      </div>

                      <div className="comentario-text" onClick={() => deleteComentario(comentario.id)}>
                        {comentario.content}
                      </div>
                    </div>
                  ))}
                </li>
              ))}
            </ul>
          </div>

          <button onClick={signOut}>Sign out</button>
        </div>
      )}
    </Authenticator>
  );
};

export default Data;
