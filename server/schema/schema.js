const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList,
    GraphQLID,
    GraphQLInt,
    GraphQLSchema
} = require('graphql');

// const mongoose = require('mongoose')
const Author = require('../model/author');
const Book = require('../model/book');

const _ = require('lodash')


const authorType = new GraphQLObjectType({
    name:'Author',
    description:"This is a writer of a book",
    fields:()=>({
        id:{
            type:GraphQLNonNull(GraphQLID)
        },
        name:{
            type:GraphQLNonNull(GraphQLString)
        },
        age:{
            type:GraphQLNonNull(GraphQLInt)
        },
        books:{
            type: new GraphQLList(bookType),
            resolve:(parent,args)=>{
                // console.log(parent);
                // return _.filter(Book,{author_id:parent.id})
                const authbooks = Book.find({author_id:parent.id})
                return authbooks;

            }
        }
    })
})

const bookType = new GraphQLObjectType({
    name:"Book",
    description:"This is a book",
    fields:()=>({
        id:{
            type:GraphQLNonNull(GraphQLID)
        },
        name:{
            type:GraphQLNonNull(GraphQLString),
        },
        genre:{
            type:GraphQLNonNull(GraphQLString),
        },
        author:{
            type: authorType,
            resolve:(parent,args) =>{
                // console.log(parent);
                // return _.find(Author,{id:parent.author_id})
                return Author.findById(parent.author_id)
            }
        }
    })
})



const rootQuery = new GraphQLObjectType({
    name:'rootQuery',
    description:'this is a root query',
    fields:()=>({
        book:{
            type:bookType,
            args:{
                id:{
                    type:GraphQLID
                }
            },
            resolve:(parent,args)=>{
                // code to get date from db / other source
            //    return _.find(Book,{id:args.id})
            return Book.findById(args.id)
               
            }
        },
        author:{
            type:authorType,
            args:{
                id:{
                    type:GraphQLNonNull(GraphQLID)
                }
            },
            resolve:(parent,args)=>{
                // return _.find(Author,{id:args.id})
                return Author.findById(args.id)
            }
        },
        books:{
            type: new GraphQLList(bookType),
            resolve:()=>{
                return Book.find();
            }
        },
        authors:{
            type: new GraphQLList(authorType),
            resolve:() => {
                return Author.find();
            }
        }
    })
})

const Mutation = new GraphQLObjectType({
    name:'Mutation',
    description:"This is a mutation",
    fields:()=>({
        addAuthor:{
            type:authorType,
            args:{
                name:{
                    type: new GraphQLNonNull(GraphQLString)
                },
                age:{
                    type: new GraphQLNonNull(GraphQLInt)
                }
            },
            resolve:(parent, args)=>{
                let author = new Author({
                    name:args.name,
                    age:args.age
                });
                return author.save();
            }
        },
        addBook:{
            type:bookType,
            args:{
                name:{
                    type: new GraphQLNonNull(GraphQLString)
                },
                genre:{
                    type: new GraphQLNonNull(GraphQLString)
                },
                author_id:{
                    type: new GraphQLNonNull(GraphQLID)
                }
            },
            resolve:(parent,args)=>{
                let book = new Book({
                    name:args.name,
                    genre:args.genre,
                    author_id:args.author_id,
                });
                return book.save();
            }
        }
    })   
   
})

module.exports = new GraphQLSchema({
    query:rootQuery,
    mutation:Mutation
})