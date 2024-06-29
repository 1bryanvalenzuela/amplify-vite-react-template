import '@aws-amplify/ui-react/styles.css'
import type { Schema } from "../../amplify/data/resource";
import { useEffect, useState } from "react";
import { generateClient, SelectionSet } from "aws-amplify/data";
import { Link } from 'react-router-dom';

const client = generateClient<Schema>();

const selectionSet = ['id', 'name', 'content'] as const; // Asegúrate de que estos campos existen en tu modelo Comentario
type JuegoWithDetails = SelectionSet<Schema['Comentario']['type'], typeof selectionSet>;

const Home: React.FC = () => {
  const [juego, setJuego] = useState<JuegoWithDetails[]>([]);

  const fetchJuegos = async () => {
    try {
      const { data: JuegosWithDetails } = await client.models.Juego.list({
        selectionSet,
      });
      setJuego(JuegosWithDetails);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchJuegos();
  }, []);

  return (
    <body>
      <div className='cuerpo'>
        <aside className='left'></aside>
      <main>
      <h1>Novedades</h1>
      <div className="grid-container">
        {juego.map((juego) => (
          <div className="grid-item" key={juego.id}>
          <div className="comentario-text">
          <Link to={`/game/${juego.name}`}>
          <img className="foto" src="https://cdn2.unrealengine.com/a-beginner-s-guide-to-league-of-legends-teemo-1215x717-dc27844d5953.jpg" alt="League of Legends" 
    height={120} width={200}/>
          </Link>
          </div>
          
          </div>
        ))}
      </div>
      </main>
      <aside className='right'></aside>
      </div>
    </body>

    );
};

export default Home;
