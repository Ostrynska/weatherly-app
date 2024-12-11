import React from 'react';
import CardDetails from '../../components/CardDetails/CardDetails.tsx';
import styles from './Details.module.scss';

const Details: React.FC = () => {
  return (
    <section className={styles.section}>
      <CardDetails />
    </section>
  );
};

export default Details;
