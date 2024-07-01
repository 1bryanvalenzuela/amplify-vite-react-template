import '@aws-amplify/ui-react/styles.css'
import type { Schema } from "../../amplify/data/resource";
import { generateClient} from "aws-amplify/data";
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';

const client = generateClient<Schema>();

const fetchJuegos = async () => {
  const { data } = await client.models.Juego.list();
  return data;
};

const Home: React.FC = () => {
  const { data: juegos, error, isLoading } = useQuery('juegos', fetchJuegos, {
    cacheTime: 1000 * 60 * 5, // 5 minutes
    staleTime: 1000 * 60 * 1, // 1 minute
  });

  if (isLoading) return <div></div>;
  if (error) return <div>Error al cargar.</div>;

  const activityJuegos = juegos?.slice(0, 4);

  const newJuegos = juegos?.slice(0, 4);

  const alltimeJuegos = juegos?.slice(0, 8);

  return (
    <body>
      <div className='cuerpo'>
        <aside className='left'></aside>
      <main>
      <h1>Mayor actividad durante la semana</h1>
      <div className="grid-container">
        {activityJuegos?.map((juego) => (
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

      <h1>Nuevos lanzamientos</h1>
      <div className="grid-container">
        {newJuegos?.map((juego) => (
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

      <h1>All-Time</h1>
      <div className="grid-container">
        {alltimeJuegos?.map((juego) => (
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
