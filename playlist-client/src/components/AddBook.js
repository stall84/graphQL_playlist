import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client';
import { GET_AUTHORS } from '../queries/queries';




function AddBook() {

    const initialState = { name: '', genre: '', authorID: '' };

    const [ formState, setFormState ] = useState(initialState);

    const { loading, error, data } = useQuery(GET_AUTHORS);
    if (loading) return 'Loading, Please wait...';
    if (error) return `Error! ${error.message}`;

    if ( !loading && !error ) {
    var authorSelect = () => {
        return data.authors.map(author => {
        return <option key={author.id} value={author.id} >{author.name}</option>
        })
    }
}

    return (
        <>
        {/* <div>
            <ul><h3>Authors</h3>
                {data.authors.map(author => (
                    <li key={author.id}>{author.name}</li>
                ))}
            </ul>
        </div> */}
        <form id="add-book">

            <div className="field" style={styles.formField} >
                <label>Book Name</label>
                <input type="text" />
            </div>

            <div className="field" style={styles.formField} >
                <label>Genre</label>
                <input type="text" />
            </div>
            
            <div className="field" style={styles.formField} >
                <label>Author</label>
                <select>
                    <option>Select Author</option>
                    {authorSelect()}
                </select>
            </div>
            <button>+</button>
        </form>
        </>
    )
}

const styles = {
    formField: { width: '15em', display: 'flex', flexDirection: 'column', padding: '5px', marginTop: '10px', marginBottom: '10px' },
   
};

export default AddBook
