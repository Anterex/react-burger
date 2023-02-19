import React from 'react'
import { TailSpin } from 'react-loader-spinner'
import styles from './loading-spinner.module.css'

export const LoadingSpinner = () => {
  return (
    <div className={styles.spinnerContainer}>
      <TailSpin
        height="80"
        width="80"
        color="#1C1C21"
        ariaLabel="tail-spin-loading"
        radius="1"
        visible={true}
      />
    </div>
  )
}
