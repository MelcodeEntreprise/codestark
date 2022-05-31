import React, {useState} from 'react';
import Author from '../../components/Author';
import Post from '../../components/Post';
import PostRelated from '../../components/PostRelated';
import { getPost, getPosts } from '../../services';
import authorStyle from '../../styles/Post.module.scss';



export default function PostDetails ({ post }) {

    const [showComments, setShowComments] = useState(false);

    return(
       <div className="container">
            <section>
                <Post post={post}/>
            </section>
            <section>
                <PostRelated slug={post?.slug} categories={post?.categories.map((category)=> category.slug)}/>
            </section>
            <section className={authorStyle.author__section}>
                <Author author={post?.author} />
            </section>
        
       </div>
    )
}

export async function getStaticProps({ params }){
    const data = await getPost(params.slug);
    return {
      props: { post:data }
    }
}

export async function getStaticPaths() {
    const posts = await getPosts();
    return {
        paths: posts.map(({ node: { slug }}) => ({ params: { slug }})),
        fallback: true
    }
}