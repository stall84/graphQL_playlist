import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_BOOKS } from '../graphql/queries';




function BookList() {

  const { loading, error, data } = useQuery(GET_BOOKS);
    if (loading) return 'Loading, Please wait...';
    if (error) return `Error! ${error.message}`;

  return (
    <div >
      <ul id="book-list"><h3>Books</h3>
          {data.books.map(book => (
              <li key={book.id}>
                  {book.name}
              </li>
          ))}
      </ul>
    </div>
  );
}

export default BookList;
