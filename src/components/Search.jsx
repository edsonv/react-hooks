const Search = ({ search, searchInput, handleSearch }) => (
  <div className="Search">
    <input type="text" value={ search } ref={ searchInput } onChange={ handleSearch } />
  </div>
)

export default Search;