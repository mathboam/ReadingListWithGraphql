import React, {Component} from 'react';
import * as compose from 'lodash.flowright'
import {graphql} from 'react-apollo';
import {getAuthors,addBookMutation,getBooksQuery} from '../queries/queries';

class AddBook extends Component{

    constructor(props){
        super(props);
        this.state = {
            name:'',
            genre:'',
            author_id: ''
        }
    }

    displayAuthors(){
        const data = this.props.getAuthors;
        console.log(this.props);
        
        if (data.loading) {
            return(<option>loading authors.....</option>)
        }else{
            return (data.authors.map((author)=>{
                return (
                <option key={author.id} value={author.id}>{author.name}</option>
                )
            }))
        }
    }

    submitForm(e){
        e.preventDefault();
        // console.log(this.state);
        this.props.addBookMutation({
                variables:{
                    name:this.state.name,
                    genre:this.state.genre,
                    author_id:this.state.author_id
                },
                refetchQueries:[{query:getBooksQuery}]
            }
        );
    }
    render(){
        return(
            <form id="addbook" onSubmit={this.submitForm.bind(this)}>
                <div className="field">
                    <label>Book name:</label>
                    <input type="text" onChange={(e)=> this.setState({name:e.target.value})}></input>
                </div>

                <div className="field">
                    <label>Genre:</label>
                    <input type="text" onChange={(e)=> this.setState({genre:e.target.value})}></input>
                </div>

                <div className="field">
                    <label>Author:</label>
                    <select onChange={(e)=> this.setState({author_id:e.target.value})}>
                        <option>select author</option>
                        {this.displayAuthors()}
                    </select>
                </div>

                <button>+</button>
            </form>
        )
    }
}

export default compose(
    graphql(getAuthors,{name:"getAuthors"}),
    graphql(addBookMutation,{name:"addBookMutation"})
    )(AddBook);