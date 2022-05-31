import React from 'react';
import Link from 'next/link';
import moment from 'moment';
import cardStyle from '../styles/Card.module.scss';
import Image from 'next/image';



export default function CardPost({ post }){

    return (
        <>
      
        <div className={cardStyle.card__display}>
            <div className={cardStyle.card__img}>
                <Image src={post.featuredImage.url} alt={post.title} />
            </div>

            {post.categories.map((category, index) => (
                <p className={cardStyle.card__category} key={index}>{category.name}</p>
            ))}
            
            <h2 className={cardStyle.card__title}>
                <Link href={`/article/${post.slug}`}>
                    <a>{post.title}</a>
                </Link>
            </h2>
                <p className={cardStyle.card__body}>{post.excerpt}</p>
            <div>
                <div className={cardStyle.card__footer}>
                    <Image src={post.author.photo.url} alt={post.author.name} />
                    <p>{post.author.name}</p>
                </div>
                <div className={cardStyle.card__date}>
                    <span>{moment(post.createdAt).format('MMM DD, YYYY')}</span>
                </div>
            </div>
        
        </div>
        </>
    )
}