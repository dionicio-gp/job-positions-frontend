import { useState, useEffect, useCallback } from "react";
import { LOCATIONS, DESCRIPTIONS}  from './constants/commons';
import './App.css';

import JobDetail from "./components/job-detail"

const App = () => {
  const [jobPosts, setJobPosts] = useState([]);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  const getJobPost = useCallback(
    (jobDescription = '',jobLocation ='') => {
      fetch(`http://127.0.0.1:3333/positions?description=${jobDescription}&location=${jobLocation}`)
        .then(response => response.json())
        .then(data => setJobPosts(data));
    },
    [],
  )

  useEffect(() => {
    getJobPost('','');
  }, [getJobPost])

  return (
    <div className="App">
      <header className="App-header">
      <label className='input_label'>
        Job Description:
        <input
          className='input'
          list="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <datalist id="description">
          {DESCRIPTIONS.map((description) => <option value={description} />)}
        </datalist>
      </label>
      <label className='input_label'>
        Location:
        <input
          className='input'
          list="location"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
        />
        <datalist id="location">
          {LOCATIONS.map((jobLocation) =>  <option value={jobLocation} />)}
        </datalist>
      </label>
      <button
        className="search_button"
        onClick={() => getJobPost(description,location)}
        >
        Search
      </button>
      </header>
      <div className="jobs_container">
          {
            jobPosts.map((jobPost) => {
            return ( 
              <JobDetail
                key={jobPost.id}
                title = {jobPost.title}
                description={jobPost.description}
                companyName={jobPost.company}
                companyURL={jobPost.company_url}
              />
                )
          })
          }
      </div>
    </div>
  );
}

export default App;
