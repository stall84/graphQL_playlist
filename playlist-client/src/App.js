import React from 'react';
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import { ApolloClient, ApolloProvider, InMemoryCache, gql } from '@apollo/client';

// Apollo Client Config

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
})



function App() {
  return (
    <ApolloProvider client={client}>
    <div id="main">
      <h1>Book-Author Playlist</h1>
      <BookList />
      <AddBook />
    </div>
    
    </ApolloProvider>
  );
}

export default App;
