import algoliasearch from 'algoliasearch/lite';
import { useState } from 'react';
import {
  InstantSearch,
  SearchBox,
  Hits,
  Highlight,
  Configure,
  Snippet,
} from 'react-instantsearch'; // Importa desde react-instantsearch-dom en lugar de react-instantsearch
import { Link } from 'react-router-dom';
import "./Searcher.css";

const searchClient = algoliasearch("PAFPT8Q62Z", "5c184f15f30b76527bf5bc272879bd9d");

function Hit({ hit }) {
  return (
    <div className="hit-item">
      <p>
        <Link to={`/game/${hit.name}`}>
          <Highlight attribute="name" hit={hit} />
        </Link>
        <Snippet attribute="name" hit={hit} />
      </p>
    </div>
  );
}

function Searcher() {
  const [isSearchBoxActive, setIsSearchBoxActive] = useState(false);

  const handleSearchBoxFocus = () => {
    setIsSearchBoxActive(true);
  };

  const handleSearchBoxBlur = () => {
    setIsSearchBoxActive(false);
  };

  return (
    <div className="search-container">
      <InstantSearch searchClient={searchClient} indexName="Juego" insights>
        <div className="space">Búsqueda</div>
        <div className="search-box">
          <SearchBox onFocus={handleSearchBoxFocus} onBlur={handleSearchBoxBlur} />
        </div>
        {isSearchBoxActive && (
          <div className="hits-container">
            <Hits hitComponent={Hit} />
          </div>
        )}
        <Configure hitsPerPage={5} />
      </InstantSearch>
    </div>
  );
}

export default Searcher;