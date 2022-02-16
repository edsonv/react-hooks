import { useState, useEffect, useReducer, useMemo, useRef } from 'react';

const initialState = {
  favorites: []
}

const favoriteReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_FAVORITE':
      return {
        ...state,
        favorites: [...state.favorites, action.payload]
      }

    default:
      return state;
  }
}

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [favorites, dispatch] = useReducer(favoriteReducer, initialState);
  const [search, setSearch] = useState('');
  const searchInput = useRef(null);

  const handleClick = favorite => {
    dispatch({ type: 'ADD_TO_FAVORITE', payload: favorite });
  }

  const handleSearch = () => {
    setSearch(searchInput.current.value);
  }

  // const filteredUsers = characters.filter(user => {
  //   return user.name.toLowerCase().includes(search.toLowerCase());
  // });

  const filteredUsers = useMemo(() => (
    characters.filter(user => {
      return user.name.toLowerCase().includes(search.toLowerCase());
    })
  ), [characters, search]);

  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character/')
      .then(response => response.json())
      .then(data => setCharacters(data.results))
  }, []);

  return (
    <div className="Characters">
      { favorites.favorites.map(favorite => (
        <li key={ favorite.id }>
          { favorite.name }
        </li>
      )) }
      <div className="Seachr">
        <input type="text" value={ search } ref={ searchInput } onChange={ handleSearch } />
      </div>
      { filteredUsers.map(character => (
        <div className="item" key={ character.id }>
          <h2>{ character.name }</h2>
          <button type='button' onClick={ () => handleClick(character) }>Agregar a Favoritos</button>
        </div>
      )) }
    </div>
  )
}

export default Characters;