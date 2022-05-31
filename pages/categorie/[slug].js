import React  from 'react';
import  CardPost  from '../../components/CardPost';
import { getCategories, getCategoryOnPost } from '../../services';
import categoryStyle from '../../styles/Category.module.scss';


export default function Categories({ posts }){

    return (
       <div className="container">
          <div className={categoryStyle.categoryDisplay}> 
            {posts.map((post, index) => (
              <CardPost key={index} post={post.node} />
        
             ))}
            </div>
       </div>
    )
}

export async function getStaticProps({ params }){
    const posts = await getCategoryOnPost(params.slug);
    return {
      props: { posts }
    }
}

export async function getStaticPaths() {
  const categories = await getCategories();
  return {
    paths: categories.map(({ slug }) => ({ params: { slug } })),
    fallback: false,
  };
}

