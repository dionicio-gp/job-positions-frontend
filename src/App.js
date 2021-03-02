import { useState, useEffect, useCallback } from "react";
import { CITIES, DESCRIPTIONS}  from './constants/commons';
import './App.css';

const App = () => {
  const [jobPosts, setJobPosts] = useState([]);
  const [description, setDescription] = useState('');
  const [city, setCity] = useState('');

  const getJobPost = useCallback(
    () => {
      fetch(`http://127.0.0.1:3333/positions?description=${description}&location=${city}`)
        .then(response => response.json())
        .then(data => setJobPosts(data));
    },
    [description,city],
  )

useEffect(() => {
  if(description || city){
      getJobPost();
    }
}, [description, city, getJobPost])

  return (
    <div className="App">
      <header className="App-header">
      <label>
        Job Description:
        <input list="description" value={description} onChange={(event) => setDescription(event.target.value)} />
        <datalist id="description">
          {DESCRIPTIONS.map((description) => <option value={description} />)}
        </datalist>
      </label>
      <label>
        Location:
        <input  list="location" value={city} onChange={(event) => setCity(event.target.value)} />
        <datalist id="location">
          {CITIES.map((jobCity) =>  <option value={jobCity} />)}
        </datalist>
      </label>
      </header>
      <div className="jobs-container">
          {
            jobPosts.map((jobPost) => {


            return ( <details>
                  <summary> {jobPost.title}</summary>
                  <p><a href={jobPost.company_url}> {jobPost.company} </a></p>
                  <p  dangerouslySetInnerHTML={{
                      __html: jobPost.description
                    }}></p>
                </details>
                )
          })
          }
      </div>
    </div>
  );
}

export default App;
