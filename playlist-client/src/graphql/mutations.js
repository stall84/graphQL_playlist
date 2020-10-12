import { gql } from '@apollo/client';

const ADD_BOOK = gql`
    mutation($name: String!, $genre: String!, $authorID: ID!) {
        addBook( name: $name, genre: $genre, authorID: $authorID ) {
        name
    }
    }`;






export { ADD_BOOK };