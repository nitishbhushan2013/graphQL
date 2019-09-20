import React, {Component} from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getBookQuery = gql `
{
    books{
        name
        genre
    }
}`;



class bookList extends Component {

    getBooks = () => {
        return this.props.data.books.map(book => {
           return ( <li key={book.id}>{book.name}</li>)
        })
    }


    render() {

        return(
            <div>
                {
                    this.props.data.loading ? 
                    <div>loading... </div> :
                    <ui id="book-list">
                     {this.getBooks()}
                    </ui> 
                }
            </div>
        );

    }
    
    

    
    
}

// graphql would bind the query with the component and the response would be available in the props.
export default graphql (getBookQuery)(bookList);