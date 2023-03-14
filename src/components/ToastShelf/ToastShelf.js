import React from 'react';

import Toast from '../Toast';
import { ToastContext } from '../ToastProvider/ToastProvider';

import styles from './ToastShelf.module.css';

function ToastShelf() {
  const {toastStack} = React.useContext(ToastContext)

  return (
    <ol className={styles.wrapper} role="region" aria-live='polite' aria-label='Notification'>
      {toastStack.map(({id, variant, message})=>(
        <li key={id} className={styles.toastWrapper}>
          <Toast id={id} variant={variant}>{message}</Toast>
        </li>))}
    </ol>
  );
}

export default React.memo(ToastShelf);