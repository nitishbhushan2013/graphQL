import React, {Component} from 'react';
import ApolloClient from 'apollo-boost';
import ApolloProvider from '@apollo/react-hooks';
import BookList from './components/BookList/BookList';

// Apollo client setup
/*
The only thing you need to get started is the endpoint for your GraphQL server. If you don't pass in uri directly, it defaults to the /graphql endpoint on the same host your app is served from.
*/
const client = new ApolloClient({
  uri : "http://localhost:9003/graphql"
})

class App extends Components {
  render() {
    
    return (
    /*
      To connect Apollo Client to React, you will need to use the ApolloProvider component exported from @apollo/react-hooks. It wraps your React app and places the client on the context, which allows you to access it from anywhere in your component tree.
      Now ApolloProvider would get the data from the client and inject it to the app.
    */
    <ApolloProvider client={client}>
        <div className="App">
          <h1> GraphQL DEMO Project : Reading List</h1>
          <BookList/>
        </div>
      </ApolloProvider>
    );
  }
}
  

export default App;
