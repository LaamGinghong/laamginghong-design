import React, { Component } from 'react'
import classNames from 'classnames'
import { LoadingOutlined } from '../icon'
import './style.less'

interface SwitchProps {
    loading?: boolean
    checked?: boolean
    defaultChecked?: boolean
    disabled?: boolean
    size?: 'small'
    checkedText?: string
    unCheckedText?: string
    onChange?: (checked: boolean) => void
}

interface SwitchState {
    checked: boolean
    showLoading: boolean
}

class Switch extends Component<SwitchProps, SwitchState> {
    static getDerivedStateFromProps(
        props: SwitchProps,
        state: SwitchState,
    ): SwitchState {
        if ('checked' in props) {
            return { ...state, checked: props.checked }
        }
        return null
    }

    state: SwitchState = {
        checked: this.props.checked ?? this.props.defaultChecked,
        showLoading: false,
    }

    componentDidUpdate(prevProps: Readonly<SwitchProps>): void {
        const { loading } = this.props
        if (prevProps.loading !== loading) {
            setTimeout((): void => {
                this.setState({ showLoading: loading })
            }, 200)
        }
    }

    private _handleClick = (): void => {
        const { onChange } = this.props
        const { checked } = this.state
        if (!('checked' in this.props)) {
            this.setState({ checked: !checked })
        }
        onChange && onChange(!checked)
    }

    render():
        | React.ReactElement<any, string | React.JSXElementConstructor<any>>
        | string
        | number
        | {}
        | React.ReactNodeArray
        | React.ReactPortal
        | boolean
        | null
        | undefined {
        const {
            disabled,
            loading,
            size,
            checkedText,
            unCheckedText,
        } = this.props
        const { checked, showLoading } = this.state

        return (
            <button
                type='button'
                disabled={disabled || loading}
                className={classNames('switch', {
                    checked,
                    disabled: disabled || loading,
                    'switch-small': size === 'small',
                })}
                onClick={this._handleClick}>
                {showLoading && (
                    <LoadingOutlined
                        className={classNames('switch-loading', {
                            small: size === 'small',
                        })}
                    />
                )}
                <span className='switch-inner'>
                    {checked ? checkedText : unCheckedText}
                </span>
            </button>
        )
    }
}

export { Switch, SwitchProps }
