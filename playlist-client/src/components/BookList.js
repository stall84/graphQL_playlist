import React, { useState } from 'react';
import { useQuery } from '@apollo/client';

// Queries/Mutations
import { GET_BOOKS } from '../graphql/queries';
// Other Components
import BookDetails from './BookDetails';




function BookList() {

  const [bookId, setBookId] = useState({bookID: ''});

  const { loading, error, data } = useQuery(GET_BOOKS);
    if (loading) return 'Loading, Please wait...';
    if (error) return `Error! ${error.message}`;

    
  
  return (
    <>
    <div >
      <ul id="book-list"><h3>Books</h3>
          {data.books.map(book => (
              <li key={book.id} value={book.id} onClick={e => console.log('You Clicked: ', e.target.value)}>
                  {book.name}
              </li>
          ))}
      </ul>
    </div>
    <BookDetails />
    </>
  );
}

export default BookList;
