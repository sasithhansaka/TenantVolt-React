import React from 'react';
import styles from './ProductHeader.module.css';

function ProductHeader() {
    return (
        <div className={styles.productHeader}>
            <h1>TESLA SAROS 10</h1>
            <p className={styles.description}>
                The Tesla Optimus Gen 2 is A Cutting-Edge Humanoid Robot That Tesla Created To Revolutionize Automation And Human-Robot Interaction.
            </p>
            <div className={styles.features}>
                {[...Array(4)].map((_, i) => (
                    <p key={i}>Fcdvgb Eggehegegce Geg E Ge Gedcfed Ge Dgecggh</p>
                ))}
            </div>
            <div className={styles.divider}></div>
        </div>
    );
}

export default ProductHeader;