import React, { FC } from 'react'

export interface LoadingForButtonProps {
  loading?: boolean
}

const LoadingForButton: FC<LoadingForButtonProps> = ({ loading }) => {
  return (
    loading && (
      <div className='loading-for-button'>
        <div />
        <div />
        <div />
        <div />
      </div>
    )
  )
}

export default LoadingForButton
