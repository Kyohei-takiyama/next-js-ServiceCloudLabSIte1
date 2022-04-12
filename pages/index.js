/*
  Linkタグとaタグの違い
  Linkタグはリロードしない



*/ 
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css';
import Layout, { siteTitle } from '../components/Layout'
import utilStyle from '../styles/utils.module.css'
import { getPostsData } from '../lib/post';

// SSGの場合
export async function getStaticProps(){
  const allPostsData = getPostsData();
  console.log("allPostsData",allPostsData);

  return{
    props:{
      allPostsData,
    }
  }
}

// SSRの場合
// export async function getServerSideProps(context){

//   return{
//     props:{

//     }
//   }
// }


export default function Home({allPostsData}) {
  return (
    <div>
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={`${utilStyle.headingMd} ${utilStyle.padding1px}`}>
        <p>いまだかつてないCX/EX体験の追及</p>
      <div className={styles.grid}>
        {allPostsData.map(({id,title,date , thumbnail}) => (
        <article key={id}>
          <Link href={`/posts/${id}`}>
            <img src={`${thumbnail}`} alt='' className={styles.thumbnailImage} />
          </Link>
          <Link href={`/posts/${id}`}>
            <a className={utilStyle.boldText}>{title}</a>
          </Link>
          <br></br>
          <small className={utilStyle.lightText}>{date}</small>
        </article>
        ) )}
      </div>
      </section>

    </Layout>
    </div>
  )
}

