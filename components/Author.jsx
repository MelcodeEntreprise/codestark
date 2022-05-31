import React from 'react';
import authorStyle from '../styles/Post.module.scss';
import Image from 'next/image';


export default function Author({ author }){
    return(
        <div>
            <div className={authorStyle.author__img}>
                <Image src={author?.photo.url} alt={author?.name} />
            </div>
            <div className={authorStyle.author__infos}>
                <h1>{author?.name}</h1>
                <p>{author?.bio}</p>
            </div>
        </div>
    )
}