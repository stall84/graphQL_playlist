import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_BOOK } from '../graphql/queries';




function BookDetails({ id }) {

    //const { bookID } = props.bookID
    
    const { loading, error, data } = useQuery(GET_BOOK, {variables: { id } } );
 

    if (loading) return 'Loading, Please Wait...';
    if (error) return `There was an error querrying DB: ${error.message}`;
    
    
    const DisplayBookDetails = () => {
        const { book } = data;
        if (book) {
            return (
                <div>
                    <h2>{book.name}</h2>
                    <h3>{book.genre}</h3>
                    <h3>{book.author.name}</h3>
                    <p>All Books By Author:</p>
                    <ul className="other-books">
                        { book.author.books.map(item => {
                            return <li key={item.id}>{item.name}</li>
                        })
                        }
                    </ul>
                </div>
            )
        }
    }

        return (
            <div id="book-details">
                <DisplayBookDetails />
            </div>
        )
    }

export default BookDetails
