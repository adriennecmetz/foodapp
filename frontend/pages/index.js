import React, { useState } from "react";
import { ApolloProvider } from "@apollo/client";
import RestaurantList from "../components/restaurantList";
import { InputGroup, InputGroupAddon, Input } from "reactstrap";
import apolloClient from '../lib/apollo';

export default function Home() {
  const [query, setQuery] = useState("");

  return (
    <ApolloProvider client={apolloClient}>
      <div className="search">
        <h2>Local Restaurants</h2>
        <InputGroup>
          <InputGroupAddon addonType="append">
            <span className="input-group-text" id="basic-addon2">Search</span>
          </InputGroupAddon>
          <Input
            onChange={(e) => setQuery(e.target.value.toLowerCase())}
            value={query}
          />
        </InputGroup>
        <br />
      </div>
      <RestaurantList search={query} />
    </ApolloProvider>
  );
}
