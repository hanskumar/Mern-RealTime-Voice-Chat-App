import React from 'react'
import styles from './Home.module.css';
import Card from '../../components/shard/Card/Card';
import Button from '../../components/shard/Button/Button';
import { Link, useHistory } from 'react-router-dom';

const Home = () => {

    const signInLinkStyle = {
        color: '#0077ff',
        fontWeight: 'bold',
        textDecoration: 'none',
        marginLeft: '10px',
    };

    const history = useHistory();
    const startRegister = ()=>{
        history.push('/authenticate');
    }

    return (
        <div className={styles.cardWrapper}>
            <Card title="Welcome to Mern Voice Chat APP!" icon="logo">
                <p className={styles.text}>
                    We’re working hard to get Voice Chat APP ready for everyone!
                    While we wrap up the finishing youches, we’re adding people
                    gradually to make sure nothing breaks
                </p>
                <div>
                    <Button onClick={startRegister} text="Lets Go.!" />
                </div>
                <div className={styles.signinWrapper}>
                    <span className={styles.hasInvite}>
                        Have an invite text?
                    </span>
                    <Link style={signInLinkStyle} to="/authenticate">
                        Sign in
                    </Link>
                </div>
            </Card>
        </div>
    )
}

export default Home
