import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import { getRelatedPost } from '../services';
import relatedStyle from '../styles/Related.module.scss';

export default function PostRelated({ categories, slug }) {
    const [related, setrelated] = useState([]);

    useEffect(() => {
      if(slug){
          getRelatedPost(categories, slug)
            .then((resultRelated) => setrelated(resultRelated))
      }else{
          return false
      }

    }, [slug])

    
    return(
        <div className={relatedStyle.related__display}>
            <div className={relatedStyle.related__form}>
                {related.map((post) => (
                    <div className={relatedStyle.related__img} key={post.title}>
                        <Link href={`/article/${post.slug}`} key={post.title}>
                            <img src={post.featuredImage.url} alt={post.title} />
                        </Link>
                    </div>               
                ))}
            </div>  
            
        </div>
    )
}