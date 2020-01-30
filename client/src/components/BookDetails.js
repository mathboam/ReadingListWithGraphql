import React,{Component} from 'react';
import {graphql} from 'react-apollo';
import * as compose from 'lodash.flowright';
import {getBookDetails} from '../queries/queries'


class BookDetails extends Component{
    displayBookDetails(){
        const {book} = this.props.data;
        if(book){
            return(
                <div>
                    <h2>{book.name}</h2>
                    <p>{book.genre}</p>
                    <p>{book.author.name}</p>
                    <p>All books by author:</p>
                    <ul className="other-books">
            {book.author.books.map((otherbook)=> {
            return (<li key={otherbook.id}>{otherbook.name}</li>)
            })}
                    </ul>
                </div>
            )
        }else{
            return(
                <div>
                    No book selected....
                </div>
            )
        }
    }
    render(){
        console.log(this.props);
        
        return(
            <div id="book-details">
                {this.displayBookDetails()}
            </div>
        )
    }

}


export default compose(
    graphql(getBookDetails,{
        options:(props) =>{
            return{
                variables:{
                    id:props.bookId
                }
            }
        }
    })
)(BookDetails); 