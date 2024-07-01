import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from "../../amplify/data/resource";
import { Link } from 'react-router-dom';
import './Searcher.css'

const client = generateClient<Schema>();

const fetchJuegos = async () => {
  const { data } = await client.models.Juego.list();
  return data;
};

const Searcher: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredJuegos, setFilteredJuegos] = useState<Schema["Juego"]["type"][]>([]);
  const { data: juegos, error, isLoading } = useQuery('juegos', fetchJuegos);

  useEffect(() => {
    if (searchTerm.length >= 3) {
      const results = juegos?.filter(juego =>
        juego?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredJuegos(results || []);
    } else {
      setFilteredJuegos([]);
    }
  }, [searchTerm, juegos]);

  if (isLoading) return <div></div>;
  if (error) return <div></div>;

  return (
    <div className='search-container'>
      <input className='search-box'
        type="text"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <div>
        {filteredJuegos.length > 0 ? (
          filteredJuegos.map(juego => (
            <div key={juego.id} className='hits-container'>
              <a className='hit-item'><Link to={`/game/${juego.name}`}>{juego.name}</Link></a>
            </div>
          ))
        ) : (
          searchTerm.length >= 3 && <div></div>
        )}
      </div>
    </div>
  );
};

export default Searcher;