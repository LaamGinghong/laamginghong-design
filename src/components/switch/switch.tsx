import React, { FC, useCallback, useEffect, useState } from 'react'
import classNames from 'classnames'
import { LoadingOutlined } from '../icon'
import './style.less'

export interface SwitchProps {
    loading?: boolean
    checked: boolean
    disabled?: boolean
    size?: 'small'
    checkedText?: string
    unCheckedText?: string
    onChange: (checked: boolean) => void
}

const Switch: FC<SwitchProps> = ({ checked, loading, disabled, size, checkedText, unCheckedText, onChange }) => {
    const [showLoading, setShowLoading] = useState(loading)
    const handleClick = useCallback((): void => {
        onChange && onChange(!checked)
    }, [checked, onChange])

    useEffect(() => {
        setTimeout(() => {
            setShowLoading(loading)
        }, 200)
    }, [loading])

    return (
        <button
            type='button'
            disabled={disabled || loading}
            className={classNames('switch', {
                checked,
                disabled: disabled || loading,
                'switch-small': size === 'small',
            })}
            onClick={handleClick}>
            {showLoading && <LoadingOutlined className={classNames('switch-loading', { small: size === 'small' })} />}
            <span className='switch-inner'>{checked ? checkedText : unCheckedText}</span>
        </button>
    )
}

export default Switch
