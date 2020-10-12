import { gql } from '@apollo/client';

const ADD_BOOK = gql`
    mutation {
        addBook( name: "", genre: "", authorID: "" ) {
        name
    }
    }`;






export { ADD_BOOK };