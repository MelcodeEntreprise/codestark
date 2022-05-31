import React, {useState} from 'react';
import Head from 'next/head';
import CardPost from '../components/CardPost';
import { getPosts } from '../services';
import cardStyle from '../styles/Card.module.scss';
import homeStyle from '../styles/Home.module.scss';
import Image from 'next/image';
import Link from 'next/link';



export default function Home({ posts }) {

  return (
      <>
        <Head>
          <title>Codestark - Accueil</title>
        </Head>
        <div className="container">
          <section className={homeStyle.home__display}>
            <div>
              <h1>Bienvenue sur <span>CodeStark</span></h1>
              <p>Débutant, passionné du monde du devéloppement web? cet endroit est fait pour vous.
                Axé autour des technologies de l'écosystème javaScript, ce blog regorge de toutes sortes
                d'astuces, tutos, et cours, pour un apprentissage et une évolution dans l'univers du devéloppement web.
              </p>

              <div className={homeStyle.home__head}>
                <Image src="/svg/css.svg" alt="css" width="50" height="50" />
                <Image src="/svg/js.svg" alt="js" width="50" height="50" />
                <Image src="/svg/node.svg" alt="node" width="50" height="50" />
                <Image src="/svg/mongo.svg" alt="mongo" width="50" height="50" />
                <Image src="/svg/react.svg" alt="react" width="50" height="50" />
              </div>
                  
            </div>
            <div>
              <Image src="/svg/home.svg" alt="home" width="650" height="650" />
            </div>
          </section>
          <section>
              <h1 className={cardStyle.card__title}>Les derniers articles</h1>
              <div className={cardStyle.card__section}>
                {posts.map((post, index) => <CardPost post={post.node} key={index} />)}
              </div>
          </section>  
        </div>
  
      </>
  )
}

export async function getStaticProps(){
  const posts = (await getPosts()) || [];
  return {
    props: {posts : posts}
  }
}

