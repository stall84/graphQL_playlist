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
    
    const DisplayBookDetails = () => {
        const { book } = data;
        if (book) {
            return (
                <div>
                    <h2>{book.name}</h2>
                    <h3>{book.genre}</h3>
                    <h3>{book.author.name}</h3>
                </div>
            )
        }
    }

        return (
            <div id="book-details">
                <DisplayBookDetails />
            {/* <h2>{data.book.name}</h2> 
            {/* <button onClick={() => refetch()}>Refetch</button>
            <button onClick={() => setBookDetail(data)}>LOG</button> */}
            {/* <ul id="details-ul">
                <li><b>Author:</b> {data.book.author.name}</li>
                <li><b>Genre:</b> {data.book.genre}</li>
                <li><b>ID:</b> {data.book.id}</li>
            </ul>  */}
            </div>
        )
    }

export default BookDetails
