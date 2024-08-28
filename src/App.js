import { useEffect, useState } from 'react';
import './App.css';
import Axios from 'axios';

// const rsp = await fetch('https://catfact.ninja/fact');
// const data = await rsp.json();
// console.log(data);

function App() {
  const [catfact, setCatFact] = useState('');
  const [userAge, setUserAge] = useState(null);
  const [name, setName] = useState('');
  const [excuse, setExcuse] = useState('');

  const fetchCatFact = async () => {
    const rsp = await Axios.get('https://catfact.ninja/fact');
    const { fact } = rsp.data;
    setCatFact(fact);
  };

  const fetchAge = async (currName) => {
    const rsp = await Axios.get(`https://api.agify.io?name=${currName}`);
    setUserAge(rsp.data);
  };

  const fetchExcuse = async (category) => {
    const rsp = await Axios.get(`https://excuser.herokuapp.com/v1/excuse/${category}/`);
    setExcuse(rsp.data[0].excuse);
  };

  useEffect(() => fetchCatFact, []);

  return (
    <div className="App">
      <button type="button" onClick={fetchCatFact}>Generate Cat Fact</button>
      <p>{catfact}</p>
      <hr />
      <input placeholder="Ex. Bob" onChange={(e) => setName(e.target.value)} value={name} />
      <button type="button" onClick={() => fetchAge(name)}>Predict Age</button>
      <h2>
        Name:
        {userAge?.name}
      </h2>
      {' '}
      <h2>
        Predicted Age:
        {userAge?.age}
      </h2>
      {' '}
      <h2>
        Count:
        {userAge?.count}
      </h2>
      <hr />
      <h1>Generate an excuse</h1>
      <button type="button" onClick={() => fetchExcuse('party')}>Party</button>
      <button type="button" onClick={() => fetchExcuse('family')}>Family</button>
      <button type="button" onClick={() => fetchExcuse('office')}>Office</button>
      <p>{excuse}</p>
    </div>
  );
}

export default App;
