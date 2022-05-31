import { gql, GraphQLClient } from "graphql-request";
import { api_endpoint } from "../constants";


const graphQLClient = new GraphQLClient(api_endpoint);

export const getPosts = async () => {
    const query = gql `
        query getPosts{
            postsConnection(orderBy:  updatedAt_DESC, first: 6) {
                edges {
                    node {
                            author {
                            name
                            id
                                photo {
                                    url
                                }
                            }
                        createdAt
                        slug
                        title
                        excerpt
                            featuredImage {
                                url
                            }
                        categories {
                            name
                            slug
                        }

                    }
                }
            }
        }

    `
    const resultPosts = await graphQLClient.request(query);
    return resultPosts.postsConnection.edges;
}



export const getPost = async (slug) => {
    const query = gql `
        query getPost($slug: String!){
            post(where: {slug: $slug}){
                            author {
                            name
                            id
                                photo {
                                    url
                                }
                            bio
                            }
                        createdAt
                        slug
                        title
                            featuredImage {
                                url
                            }
                        categories {
                            name
                            slug
                        }
                        content{
                            raw
                        }
                    }
        }
    `;
    const resultPost = await graphQLClient.request(query, {slug});
    return resultPost.post;
}

export const getCategories = async () => {
    const query = gql `
        query getCategories{
            categories{
                name
                slug
            }
        }
    `;
    const resultCategories =  await graphQLClient.request(query);
    return resultCategories.categories;
}



export const getCategoryOnPost = async (slug) => {
    const query = gql `
        query getCategoryOnPost($slug: String!){
            postsConnection(where: {categories_some: {slug: $slug}}) {
                edges {
                    cursor
                    node {
                            author {
                            name
                            id
                                photo {
                                    url
                                }
                            }
                        createdAt
                        slug
                        title
                        excerpt
                            featuredImage {
                                url
                            }
                        categories {
                            name
                            slug
                        }
                    }
                }
            }
        }
    `
        
    const resultCategoryOnPost = await graphQLClient.request(query, {slug});

    return resultCategoryOnPost.postsConnection.edges;
}

export const getRelatedPost = async (categories, slug) => {
    const query = gql `
        query getRelatedPost($slug: String!, $categories: [String!]){
            posts(
                where: { slug_not: $slug, AND: {categories_some: { slug_in: $categories}}}
                last: 3
            ){
                title
                featuredImage{
                    url
                }
                createdAt
                slug
            }
        }
    `
    const resultRelated = await graphQLClient.request(query, { categories, slug });
    return resultRelated.posts;
}
