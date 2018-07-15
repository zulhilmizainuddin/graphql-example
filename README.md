# graphql-pets

GraphQL example project using Node.js, TypeScript, Express, Apollo, SQLite and Docker.

## Prerequisite
1. docker
2. docker-compose

## Getting Started
Run the following command to build and run the Docker image:

```bash
docker-compose up
```

Open GraphiQL in the browser with the url:

```
http://localhost:3000/graphiql
```

## Usage
Run the following queries in GraphiQL to query the GraphQL server:

#### List Owner

```graphql
query listOwners {
  owners {
    id
    name
    address
    phone
    email
  }
}
```

#### Add a Pet

```graphql
mutation addPet {
  addPet(email: "jane@email.com", name: "Rafiki", colour: "Gray", age: 20, breed: "Baboon")
}
```

#### Edit a Pet

```graphql
mutation editPet {
  editPet(email: "jane@email.com", id: 4, breed: "Mandrill")
}
```

#### Retrieve an Owner and their Pets

```graphql
query getOwnerAndPets {
  owner(email: "jane@email.com") {
    id
    name
    address
    phone
    email
    pets {
      id
      ownerid
      name
      colour
      age
      breed
    }
  }
}
```
