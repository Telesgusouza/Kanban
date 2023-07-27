import Menu from '@/components/Menu';
import Statistics from '@/components/Statistics';

import styles from './styles.module.css'; 
import Head from 'next/head';

export default function report() {

    return (
        <div className={styles.container } >
            <Head>
                <title>Relatório</title>
            </Head>
            <Menu />
            <div className={styles.containerRight + " containerRight"} >
                <Statistics />
            </div>
        </div>
    )
}