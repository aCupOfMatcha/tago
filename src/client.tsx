import { ApolloClient, InMemoryCache } from '@apollo/client';
import { makeObservable, observable, action } from'mobx';

class clientStore {
  client = new ApolloClient({
    uri: 'https://localhost:8000/graphql/',
    cache: new InMemoryCache(),
    headers: {
      Authorization: `${localStorage.getItem('Authorization')}`,
    },
  });
  constructor() {
    makeObservable(this, {
      client: observable,
      setAuth: action,
      delAuth: action,
    });
  }
  setAuth = () => {
    this.client = new ApolloClient({
      uri: 'https://localhost:8000/graphql/',
      cache: new InMemoryCache(),
      headers: {
        Authorization: `${localStorage.getItem('Authorization')}`,
      },
    });;
  };
  delAuth = () => {
    localStorage.removeItem('Authorization');
    this.client = new ApolloClient({
      uri: 'https://localhost:8000/graphql/',
      cache: new InMemoryCache(),
    });
  };
}

export default new clientStore();