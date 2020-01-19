import React, { FC, ReactNode } from 'react'
import classNames from 'classnames'
import './style.less'

export interface LoadingProps {
  loading?: boolean
  text?: string
  indicator?: ReactNode
}

const Loading: FC<LoadingProps> = ({
  loading = true,
  text,
  indicator,
  children,
}) => {
  return (
    <div className='loading-wrap'>
      {loading && (
        <div
          className={classNames({
            'loading-children': !!children,
            loading: !children,
          })}>
          <div className='loading-content'>
            {indicator ? (
              indicator
            ) : (
              <div className='loading-dot'>
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
              </div>
            )}
            {text && <div className='loading-text'>{text}</div>}
          </div>
        </div>
      )}
      {!!children && <div className='loading-container'>{children}</div>}
    </div>
  )
}

export default Loading
