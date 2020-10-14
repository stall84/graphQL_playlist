import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_BOOK } from '../graphql/queries';




function BookDetails() {
const { loading, error, data } = useQuery(GET_BOOK);

if (loading) return 'Loading, Please Wait...';
if (error) return `There was an error querrying DB: ${error.message}`;


    return (
        <div id="book-details">
           <h2>Output book details here</h2> 
           {/* <ul id="details-ul">
           {data.map(book => (
               <li key={book.id}>
                   {book.name}
               </li>
           ))}
           </ul> */}
        </div>
    )
}

export default BookDetails
