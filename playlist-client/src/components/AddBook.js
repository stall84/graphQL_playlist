import React, { useEffect, useState } from 'react'
import { useQuery, useMutation, fromPromise } from '@apollo/client';
import { GET_AUTHORS } from '../graphql/queries';
import { ADD_BOOK } from '../graphql/mutations';




function AddBook() {

    const initialState = { name: '', genre: '', authorID: '' };

    const [ formState, setFormState ] = useState(initialState);
    
    const [ addBook, { bookData } ] = useMutation(ADD_BOOK);

    const setInput = (key, value) => {
        setFormState({ ...formState, [key]: value })
    }

    const sendData = (e) => {
        e.preventDefault();
        console.log('InitialState: ', initialState);
        console.log('FormState: ', formState);
        setFormState(initialState);
    }    

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
       
        <form id="add-book" onSubmit={sendData} >

            <div className="field" style={styles.formField} >
                <label>Book Name</label>
                <input type="text" onChange={ e => setInput( 'name', e.target.value) } />
            </div>

            <div className="field" style={styles.formField} >
                <label>Genre</label>
                <input type="text" onChange={ e => setInput( 'genre', e.target.value) } />
            </div>
            
            <div className="field" style={styles.formField} >
                <label>Author</label>
                <select onChange={ e => setInput( 'authorID', e.target.value) } >
                    <option>Select Author</option>
                    {authorSelect()}
                </select>
            </div>
            <button type="submit">+</button>
        </form>
        </>
    )
}

const styles = {
    formField: { width: '15em', display: 'flex', flexDirection: 'column', padding: '5px', marginTop: '10px', marginBottom: '10px' },
   
};

export default AddBook
