import React from 'react';
import moment from 'moment';
import postStyle from '../styles/Post.module.scss';
import Image from 'next/image';


export default function Post({ post }){

    const getContent = (index, text, obj, type) => {
        let modifiedText = text;

        if(obj){
                if(obj.bold){
                    modifiedText = (<b key={index}>{text}</b>)
                }
                if(obj.italic){
                    modifiedText = (<em key={index}>{text}</em>)
                }
                if(obj.underline){
                    modifiedText = (<u key={index}>{text}</u>)
                }
            }

    switch(type){
        case 'heading-three':
            return <h3 key={index} className={postStyle.post__headingThree}>{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h3>
        case 'paragraph':
            return <p key={index} className={postStyle.post__paragraph}>{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</p>;
        case 'heading-four':
            return <h4 key={index} className={postStyle.post__headingFour}>{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h4>;
        case 'image':
            return (
                 <img
                key={index}
                alt={obj.title}
                height={obj.height}
                width={obj.width}
                src={obj.src}
                  />
            );
            default:
                return modifiedText;   
        }
    }


    return (
        <div className={postStyle.post__display}>
            {post?.categories.map((category) => (
                <p key={category.name} className={postStyle.post__category}>{category.name}</p>
            ))}
            <h1>{post?.title}</h1>
            <div>
                <div className={postStyle.post__info}>
                    <Image src={post?.author.photo.url} alt={post?.author.name} />
                    <p>{post?.author.name}</p>
                </div>
                <div className={postStyle.post__date}>
                    <span>{moment(post?.createdAt).format('MMM DD, YYYY')}</span>
                </div>
            </div>
            <div className={postStyle.post__img}>
                <Image src={post?.featuredImage.url} alt={post?.title} />
            </div>
            <div className={postStyle.post__content}>
                {post?.content.raw.children.map((typeObj, index) => {
                    const children = typeObj.children.map((item, itemIndex) => getContent(itemIndex, item.text, item))
                    return getContent(index, children, typeObj, typeObj.type)
                })}
            </div>
  
        </div>

    )
}


