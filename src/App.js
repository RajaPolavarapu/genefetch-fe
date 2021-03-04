import './App.css';
import React from "react";


const getData = (value) => {
  return new Promise((resolve, reject) => {
    fetch(`https://genesuggest-emb.herokuapp.com/gene_suggest?limit=&species=homo_sapiens&query=${value}`)
      .then((response) => response.json())
      .then(result => {
        if (result && result.data) {
          resolve(result.data)
        } else {
          reject([])
        }
      })
      .catch(err => {
        reject([])
      })
  });
}

const App = () => {
  const [query, setQuery] = React.useState("");
  const [options, setOptions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const updateSuggestions = (e) => {
    const { value } = e.target;
    setQuery(value);
    setLoading(true);
    getData(value)
      .then(response => {
        setOptions(response)
        setLoading(false);
      })
      .catch(() => {
        setOptions([])
        setLoading(false);
      })
  }

  return (
    <div className="App" onClick={() => setOptions([])}>
      <header className="App-header">
        <p>Gene Suggest</p> 
        <div style={{ position: 'relative' }}>
          <div className="Aligner">
            <input type="text" placeholder="Type something..." className="Autosuggest-text"
              value={query}
              onChange={updateSuggestions}
              onFocus={updateSuggestions}
            />
          </div>
          <ul className="Autocomplete-wrap" style={{ marginTop: '-20px', maxHeight: '450px' }}>
            {
              loading ? <li className="List-item-2">Loading....</li> :
                options.map((item, index) => {
                  return <li className="List-item" onClick={() => {
                    setQuery(item);
                    setOptions([])
                  }} key={index}>{item}</li>
                })
            }
          </ul>
        </div>
      </header>
      <div className={"footer"}>
            Name: Raja Polavarapu <br/>
            Email: satyarajukits@gmail.com<br/>
            Mobile: +919441841403<br/>
      </div>
    </div>
  );
}

export default App;
