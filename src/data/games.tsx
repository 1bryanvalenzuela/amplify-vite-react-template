import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from "../../amplify/data/resource";
import Comments from "./comments";
import "./games.css";

const client = generateClient<Schema>();

const fetchGame = async (name: string) => {
  const { data: juegos } = await client.models.Juego.list();
  return juegos.find((juego: Schema["Juego"]["type"]) => juego.name === name);
};

const GamePage: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  
  const { data: game, error, isLoading } = useQuery(['game', name], () => fetchGame(name!), {
    enabled: !!name,
    cacheTime: 1000 * 60 * 5, // 5 minutes
    staleTime: 1000 * 60 * 1, // 1 minute
  });

  if (isLoading) return <div></div>;
  if (error) return <div>Error loading game data</div>;

  return (
    <body>
      <div className='cuerpo'>
      <aside className='left'></aside>

      <main>
  <div className='juego-todo'>
  {game ? (<h1>{game.name}</h1>) : (<h1>Not found</h1>)}
    <div className="grid-container-games">

    <ul className="juego-foto"> 
    <br />
    <img className="foto" src="https://cdn2.unrealengine.com/a-beginner-s-guide-to-league-of-legends-teemo-1215x717-dc27844d5953.jpg" alt="League of Legends" 
    height={150} width={250}/> 
    </ul>
    <ul className="juego-list">
        {game ? (
          <p className='juego-text'>{game.content} </p>
        ) : (
          <p className='juego-text'>Juego no encontrado </p>
        )}
    </ul>

    </div>
    <div className="Comentario"><Comments></Comments></div>
    </div>
    </main>

    <aside className='right-games'>
    <div className="grid-container-games-desc">
    <ul className="juego-list">
        {game ? (
          <p className='juego-text'>{game.content} {game.content} {game.content} {game.content} </p>
        ) : (
          <p className='juego-text'>Juego no encontrado </p>
        )}
    </ul>
    </div>

    </aside>
    </div>
  </body>
  );
}

export default GamePage;