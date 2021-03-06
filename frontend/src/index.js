import React from 'react';
import ReactDOM from 'react-dom';
import {ApolloClient,ApolloProvider,HttpLink,InMemoryCache} from '@apollo/client'
import App from './App';
import {setContext} from 'apollo-link-context'

const authLink = setContext((_,{headers})=>{
  const token = localStorage.getItem('user-token')
  return {
    headers:{
      ...headers,
      authorization: token? `bearer ${token}` : null
    }
  }
})

const httpLink = new HttpLink({uri:'/graphql'})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
})


ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

