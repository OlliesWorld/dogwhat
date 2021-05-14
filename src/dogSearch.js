import React, { useState } from "react";
import './index.css';
require('dotenv').config()
export default function SearchDogs() {

    //states- input query, movies
    const [query, setQuery] = useState('');
    //create the state for movies, and update that state appropriate
    const [dogs, setDogs] = useState([]);

    const filterDogs = async (e) => {
        e.preventDefault();
        // const query = "Terrier"
        const url = `https://api.TheDogAPI.com/v1/breeds/search?q=${query}`;

        try {
            const res = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': 'APIKEY'
                }
            });
            const data = await res.json();
            setDogs(data);
            // console.log(data)
        } catch (err) {
            console.error(err);
        }

    }


    return (
        <>
            <form className="form" onSubmit={filterDogs}>
                <label className="label" htmlFor="query">What Kind of Dog</label>
                <input className="input" type="text" name="query"
                    placeholder="Terrier"
                    value={query} onChange={(e) => setQuery(e.target.value)}
                />
                <button className="button" type="submit">Search</button>
            </form>

            <div className="card-list">
                {dogs.filter(dog => dog.name).map(dog => (

                    < div className="card" key={dog.id} >

                        <div div className="card--content" >
                            <h2 className="card--title">{dog.name}</h2>
                            <p>Breed Group: <small>{dog.breed_group ? dog.breed_group : "no group assigned"}</small></p>
                            <p>Temperament: <small>{dog.temperament ? dog.temperament : "temperament unkown"}</small></p>
                            <p className="card--desc">Bred for:<small> {dog.bred_for ? dog.bred_for : "no official breed"}</small> </p>
                            <p><small>Life Span: </small>{dog.life_span}</p>
                            <div className="extra">
                                <p><small>weight: </small>{dog.weight.imperial}</p>
                                <p><small>height: </small>{dog.height.imperial}</p>
                            </div>
                        </div>

                    </div>
                ))
                }
            </div >
        </>
    )
}
