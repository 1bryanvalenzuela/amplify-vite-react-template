import '@aws-amplify/ui-react/styles.css'
import type { Schema } from "../data/resource";
import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

const Comments: React.FC = () => {
    const [comentarios, setComentario] = useState<Array<Schema["Comentario"]["type"]>>([]);
    const [name, setName] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        client.models.Comentario.observeQuery().subscribe({
          next: (data: { items: any; }) => setComentario([...data.items]),
        });
        }, []);

    function createComentario() {
      if (name && content) {
        client.models.Comentario.create({ name, content, likes: 0}).then(() => {
        setName('');
        setContent('');
        });
      }
    }

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
  <div className='comments'>

    <div className="list">

       <div className="comentar">
            <input 
            type="text" 
           placeholder="Usuario" 
           value={name} 
           onChange={(e) => setName(e.target.value)} 
             /> <br />
           <input className="content"
            type="text" 
           placeholder="Comentario" 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
             /> <br />
      <button onClick={createComentario}>Comentar</button>
      </div>

        {comentarios.map((comentario) => (
          <div key={comentario.id} className="comentario-item">
          
          <div className="comentario-text">
          <a href="#"><strong> {comentario.name} </strong></a> <br /> {comentario.content} 
          </div>

          <div className="comentario-icons">
          <i className='bx bx-like like-icon' onClick={() => addlikeComentario(comentario.id)}></i>
          {comentario.likes}
          <i className='bx bx-dislike dislike-icon' onClick={() => dislikeComentario(comentario.id)}></i>
          </div>
          
          </div>
        ))}

    </div>

  </div>
    );
};
 
export default Comments;