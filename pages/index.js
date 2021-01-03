import Head from 'next/head'
import { comment } from 'postcss';
import styles from '../styles/Home.module.css'
import App from '../components/App'
import Card from '../components/Card'

const index = () => {
  return (
    <>
      <h1 className="text-5xl font-bold p-8">museum for you</h1>
      <App></App>
    </>
  );
};

export default index;