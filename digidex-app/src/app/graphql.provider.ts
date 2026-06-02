import { ApplicationConfig, inject } from '@angular/core';
import { Apollo, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';

const uri = 'http://localhost:4000/'; // ← l'URL de notre serveur GraphQL

export function provideApollo() {
  return {
    provide: APOLLO_OPTIONS,
    useFactory: () => {
      const httpLink = inject(HttpLink);
      return {
        link: httpLink.create({ uri }),
        cache: new InMemoryCache(),   // ← cache automatique des résultats
      };
    },
  };
}