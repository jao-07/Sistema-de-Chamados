import React from 'react';
import styles from './Loading.module.css'

const Loading = () => {
    return (
        <div className={styles.overlay}>
            <svg className={styles.spinner} viewBox="0 0 50 50">
                <circle cx="25" cy="25" r="20" stroke="green" strokeWidth="5" fill="none" strokeDasharray="90 30" />
            </svg>
        </div>
    )
}

export default Loading;