import './App.css';
import React from "react";


const getSpecies = () => {
  return new Promise((resolve, reject) => {
    fetch(`https://genesuggest-emb.herokuapp.com/unique_species`)
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

const getData = ({ query, species="homo_sapiens", limit=10 }) => {
  return new Promise((resolve, reject) => {
    fetch(`https://genesuggest-emb.herokuapp.com/gene_suggest?limit=${limit}&species=${species}&query=${query}`)
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
  const [uniqspecies, setUniqSpecies] = React.useState([]);
  const [species, setSpecies] = React.useState("homo_sapiens");

  const [limit, setLimit] = React.useState(10)
  const [options, setOptions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const updateSuggestions = (e) => {
    const { value } = e.target;
    setQuery(value);
    setLoading(true);
    getData({ query: value, species, limit })
      .then(response => {
        setOptions(response)
        setLoading(false);
      })
      .catch(() => {
        setOptions([])
        setLoading(false);
      })
  }

  React.useEffect(() => {
    getSpecies()
      .then(result => { setUniqSpecies(result) })
      .catch(err => setUniqSpecies(["homo_sapiens"]))
  }, [])

  return (
    <div className="App" onClick={() => setOptions([])}>
      <header className="App-header">
        <p>Gene Suggest</p>
        <div style={{ position: 'relative' }}>
          <div className={"selectElements"}>
            <select className={"Select Select1"} value={species} onChange={(e) => {
              setQuery("");
              setSpecies(e.target.value);
            }} placeholder="Select Species">
              {
                uniqspecies.map((item, index) => <option key={index} value={item}>{item}</option>)
              }
            </select>
            <select className="Select Select2" value={limit} onChange={e => {
              setQuery("");
              setLimit(e.target.value)
            }}>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
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
        Name: Raja Polavarapu <br />
            Email: satyarajukits@gmail.com<br />
            Mobile: +919441841403<br />
      </div>
    </div>
  );
}

export default App;
