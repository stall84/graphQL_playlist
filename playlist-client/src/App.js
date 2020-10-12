import React from 'react';
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import { ApolloClient, ApolloProvider, InMemoryCache, gql } from '@apollo/client';

// Apollo Client Config

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
})

// client
//   .query({
//     query: gql`
//      query GetBooks {
//        books {
//         name
//         genre
//       }
//       }
//     `
//   })
//   .then(result => console.log(`Result of GQL query: ${result.data.books[2].name} `))
//   .catch(error => console.error(`Ooops!.. U fukiewuckied it: ${error}`));

function App() {
  return (
    <ApolloProvider client={client}>
    <div id="main">
      <h1>Book-Author Playlist</h1>
      <BookList />
    </div>
    <AddBook />
    </ApolloProvider>
  );
}

export default App;
