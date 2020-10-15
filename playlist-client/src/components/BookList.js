import React, { useState } from 'react';
import { useQuery } from '@apollo/client';

// Queries/Mutations
import { GET_BOOKS } from '../graphql/queries';
// Other Components
import BookDetails from './BookDetails';




function BookList() {

  const [ bookId, setBookId] = useState('');

  const { loading, error, data } = useQuery(GET_BOOKS);
    if (loading) return 'Loading, Please wait...';
    if (error) return `Error! ${error.message}`;

    
  
  return (
    <>
    <div >
      <ul id="book-list"><h3>Books in Database</h3>
          {data.books.map(book => (
              <li key={book.id} onClick={e => setBookId(book.id)}>
                  {book.name}
              </li>
          ))}
      </ul>
    </div>
    { bookId &&
    <BookDetails id={bookId} />
    }
    </>
  );
}

export default BookList;
