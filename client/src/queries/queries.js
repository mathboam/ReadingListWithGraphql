import {gql} from 'apollo-boost';

const getAuthors = gql`
{
    authors{
        name
        id
    }
}
`

const getBooksQuery = gql`
    {
        books{
            name
            id
        }
    }
`

const getBookDetails =gql`
query($id:ID!){
    book(id:$id){
        name
        id
        genre
        author{
            id
            name
            age
            books{
                id
                name
                genre
            }
        }
    }
}
`

const addBookMutation = gql`
mutation($name:String!,$genre:String!,$author_id:ID!){
    addBook(name:$name,genre:$genre,author_id:$author_id){
        name
        id
    }
}
`

export {getAuthors,getBooksQuery,addBookMutation,getBookDetails};