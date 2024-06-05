import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from '@apollo/client';

import './index.css';

import store from './redux/Store';
import ScryfallSearch from './components/ScryfallSearch/ScryfallSearch';

let client = new ApolloClient({
  uri: 'http://localhost:8000/graphql/',
  cache: new InMemoryCache()
});



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <div id='app'>
          <h1>Search for any Magic card</h1>
          <ScryfallSearch />
        </div>
      </Provider>
    </ApolloProvider>
  </React.StrictMode>
);
