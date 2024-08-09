import { gql } from 'graphql-tag';

const GET_FILES = gql`
  {
    allFiles {
      id,
      name,
      size,
      createdAt,
      tags,
      description
    }
  }`

export { GET_FILES };