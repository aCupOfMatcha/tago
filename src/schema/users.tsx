import { gql } from 'graphql-tag';

const GET_USERS = gql`
  {
    allUsers {
      id,
      name,
      gender,
      email,
    }
  }`

const GET_USER_BY_NAME = gql`
  query ($name: String!) {
    usersByName(name: $name) {
      id,
      name,
      gender,
      email,
    }
  }
`

const GET_USER_BY_ID = gql`
  query ($id: ID!) {
    usersById(id: $id) {
      id,
      name,
      gender,
      email,
      avatar {
        avatarUrl,
        md5
      }
    }
  }
`

const CREATE_USER = gql`
  mutation ($name: String!, $avatar: ID, $gender: String!, $email: String) {
    createUser(name: $name, avatar: $avatar, gender: $gender, email: $email) {
      ok
    }
  }
`

const EDIT_USER = gql`
  mutation ($id: ID!, $name: String!, $avatar: ID, $gender: String!, $email: String!) {
    updateUser(id: $id, name: $name, avatar: $avatar, gender: $gender, email: $email) {
      ok
    }
  }
`

const DELETE_USER_BY_ID = gql`
  mutation ($id: ID!) {
    deleteUser(id: $id) {
      ok
    }
  }
`

export { GET_USERS, GET_USER_BY_NAME, GET_USER_BY_ID, CREATE_USER, EDIT_USER, DELETE_USER_BY_ID };