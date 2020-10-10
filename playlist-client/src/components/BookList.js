import React from 'react';
import { gql, useQuery } from '@apollo/client';



const GET_BOOKS = gql`
   query GetBooks {
        books {
            name
            id
        }
    }
`;

function BookList() {

  const { loading, error, data } = useQuery(GET_BOOKS);
    if (loading) return 'Loading, Please wait...';
    if (error) return `Error! ${error.message}`;

  return (
    <div >
      <ul id="book-list">
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
