import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_BOOK } from '../graphql/queries';




function BookDetails({ id }) {

    //const { bookID } = props.bookID
    
    const { loading, error, data, refetch } = useQuery(GET_BOOK, {variables: { id } } );
    const [ bookDetail, setBookDetail ] = useState('');

    if (loading) return 'Loading, Please Wait...';
    if (error) return `There was an error querrying DB: ${error.message}`;
    console.log("BookDetails ID: ", id)
    //console.log("Query Data Object: ", "variables: ")

        return (
            <div id="book-details">
            <h2>Output book details here</h2> 
            <button onClick={() => refetch()}>Refetch</button>
            <button onClick={() => setBookDetail(data)}>LOG</button>
            <ul id="details-ul">
            
            {/* {data.map(book => (
                <li key={book.id}>
                    {book.name}
                    {book.genre}
                </li>
            ))} */}
            </ul>
            </div>
        )
    }

export default BookDetails
