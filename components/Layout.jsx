import React, {useState, useEffect} from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { getCategories } from '../services';
import headerStyle from '../styles/Header.module.scss';
import footerStyle from '../styles/Footer.module.scss';
import ActiveLink from './ActiveLink';
import Image from 'next/image';



export default function Layout({children}){

    const [showMenu, setShowMenu] = useState(false);
    const handleShowMenu = () => {
        setShowMenu(!showMenu);
    }


    const [categories, setCategories] = useState([]);
    useEffect(() => {
        getCategories().then((newCategories) => setCategories(newCategories));
    }, []);

    return(
        <div>
            <Head>
                <meta name="description" content="Apprendre les langages informatiques pour le dévéloppement de site web" />
                <meta name="twitter:card" content="summary" />
                <meta property="og:site_name" content="codestark.vercel.app.com"/>
                <meta property="og:language" content="fr"/>
                <meta name="twitter:author" content="@melcode_"/>
                <link rel="icon" href="/codestark.ico" />
            </Head>

            <header className="container header">
                <div className={headerStyle.header__logo}>
                    <Link href="/">
                        <a>CodeStark</a>
                    </Link>
                </div>

                <nav>
                    <ul className={`${headerStyle.header__nav} ${showMenu ? `${headerStyle.showNav}` : "hidden"}`}>
                        {categories.map((category, index) => (
                            <li key={category.name}>
                                <ActiveLink activeClassName={headerStyle.link__active} href={`/categorie/${category?.slug}`}>
                                    <a>{category?.name}</a>
                                </ActiveLink>
                            </li>
                        ))}
                       
                    </ul>
                    <button className={`${headerStyle.nav__burger} ${showMenu ? `${headerStyle.showNav}` : "hidden"}`} onClick={handleShowMenu}>
                        <span className={headerStyle.burger__item}></span>
                    </button>
                </nav>
            </header>

            <main>{children}</main>

            <footer>
              <div className={footerStyle.footer__display}>
              <div>
                    <h1>Melcode</h1>
                    <h3>Me retrouver</h3>
                    <div className={footerStyle.footer__sociaux}>
                        <a href="https://www.facebook.com/melcodeentreprise" target="_blank" rel="noopener noreferrer"><Image src="/svg/facebook.svg" alt="facebook" width="20" height="20" /></a>
                        <a href="https://twitter.com/MelCode_" target="_blank" rel="noopener noreferrer"><Image src="/svg/twitter.svg" alt="twitter" width="20" height="20" /></a>
                    </div>
                </div>
                <div>
                    <p>Après avoir appris sur internet, j'ai crée ce blog pour des passionnés de
                        développement web autodidacte comme moi, je tiens à soligner quand étant un dev
                        junior, je peux encore avoir certains manquements sur différentes notions.
                    </p>
                </div>
                <div>
                    <h3>Me contacter directement</h3>
                    <p> <Image src="/svg/email.svg" alt="email" width="15" height="15" />melcodeentreprise@gmail.com</p>
                    <p><Image src="/svg/call.svg" alt="call" width="15" height="15" />(+241) 066 74 34 53</p>
                    <p><Image src="/svg/location.svg" alt="location" width="15" height="15" />Libreville</p>
                </div>
              </div>
              <hr />
              <p className={footerStyle.footer__hr}>Design et Développé par Melcode@2022</p>
            </footer>

        </div>
    )
}