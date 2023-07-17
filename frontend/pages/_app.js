import { useState } from "react";
import Head from "next/head";
import AppContext from "@/components/AppContext";
import Layout from "@/components/layout";
import "../styles/globals.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:1337/graphql',
  cache: new InMemoryCache()
});

function updateCart(state, item, operation) {
  const { items, total } = state.cart;
  let foundItem = items.find((i) => i.id === item.id);
  
  if (operation === 'remove' && foundItem && foundItem.quantity === 1) {
    const index = items.findIndex((i) => i.id === foundItem.id);
    items.splice(index, 1);
    return {
      ...state,
      cart: {
        items: [...items],
        total: total - item.price
      }
    };
  }

  const updatedItem = operation === 'add' ? 
    (!foundItem ? { ...item, quantity: 1 } : { ...foundItem, quantity: foundItem.quantity + 1 }) :
    (foundItem && foundItem.quantity > 1 ? { ...foundItem, quantity: foundItem.quantity - 1 } : foundItem);
  
  const updatedItems = items.map((item) => item.id === updatedItem.id ? updatedItem : item);
  if (!foundItem && operation === 'add') updatedItems.push(updatedItem);
  const newTotal = total + item.price * (operation === 'add' ? 1 : -1);

  return {
    ...state,
    cart: {
      items: updatedItems,
      total: newTotal
    }
  };
}

function MyApp(props) {
  const { Component, pageProps } = props;

  const [state, setState] = useState({
    cart: {
      items: [],
      total: 0,
    },
    user: null,
  });

  const { cart, user } = state;

  const setUser = (user) => {
    setState((prevState) => ({ ...prevState, user }));
  };

  const addItem = (item) => {
    setState((prevState) => updateCart(prevState, item, 'add'));
  };

  const removeItem = (item) => {
    setState((prevState) => updateCart(prevState, item, 'remove'));
  };

  return (
    <ApolloProvider client={client}>
      <AppContext.Provider
        value={{ cart, addItem, removeItem, isAuthenticated: false, user, setUser }}
      >
        <Head>
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
            integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
            crossOrigin="anonymous"
          />
        </Head>

        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppContext.Provider>
    </ApolloProvider>
  );
}

export default MyApp;
