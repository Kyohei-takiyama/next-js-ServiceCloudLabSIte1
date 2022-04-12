import Head  from "next/head";
import styles from './layout.module.css';
import Link from 'next/link';

const name = "Sercice Cloud Lab Demo site";
export const siteTitle = "Sercice Cloud Lab Demo Blog";

const Layout = ({children , home}) => {
    return (
        <div className={styles.container}>
            <Head>
                <link rel="icon" href="/favicon.ico"></link>
            </Head>
            <header className={styles.header}>
                {home ? (
                    <>
                        <img src="/images/DoD_650x350.png"></img>
                        <h1 className={`${styles.titlename}`}>{name}</h1>
                    </>
                ) : (
                    <>
                        <img src="/images/DoD_650x350.png"></img>
                        <h1 className={styles.titlename}>{name}</h1>
                    </>
                )}
            </header>
            {/* Layoutタグで囲った要素がchildrenに反映される */}
            <main>{children}</main>
            {!home && (
                <div>
                    <Link href="/">ホームへ戻る</Link>
                </div>
            )}
        </div>
    );
}

export default Layout;