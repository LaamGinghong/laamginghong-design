import React, { FC } from 'react'
import classNames from 'classnames'
import './style.less'

export interface LoadingForSwitchProps {
  loading: boolean
  checked: boolean
  size?: 'small'
}

const LoadingForSwitch: FC<LoadingForSwitchProps> = ({
  loading,
  checked,
  size,
}) => {
  return (
    loading && (
      <div
        className={classNames('loading-for-switch', {
          checked,
          'loading-for-switch-small': size === 'small',
        })}>
        <div />
        <div />
        <div />
        <div />
      </div>
    )
  )
}

export default LoadingForSwitch
