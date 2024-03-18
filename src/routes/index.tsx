import { NavigationContainer } from "@react-navigation/native";

import { StackRoutes } from "./stack.routes";
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJTdWJqZWN0IjoiYTY5MmQwOGEtYzU0ZC00NmY5LWJiM2UtMmM0NjVkMGRjZTAxIiwiU3RlYW1JZCI6IjM5Mjc0MzI5MCIsIm5iZiI6MTcxMDc1ODE1MiwiZXhwIjoxNzQyMjk0MTUyLCJpYXQiOjE3MTA3NTgxNTIsImlzcyI6Imh0dHBzOi8vYXBpLnN0cmF0ei5jb20ifQ.ZNC6WAkB9ahLNYRd7BWvq7RyLd2phUBz7GzuzofEx7w'
//const token = '1'
const httpLink = createHttpLink({
    uri: 'https://api.stratz.com/graphql',
});

const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        }
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});


export function Routes() {
    return (
        <ApolloProvider client={client}>
            <NavigationContainer>
                <StackRoutes />
            </NavigationContainer>
        </ApolloProvider>
    )
}