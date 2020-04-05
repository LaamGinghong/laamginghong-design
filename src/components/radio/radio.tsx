import React, { ChangeEvent, Component } from 'react'
import classNames from 'classnames'
import { RadioProps } from './types'
import './style.less'

interface RadioState {
    checked: boolean
}

export default class Radio extends Component<RadioProps, RadioState> {
    static getDerivedStateFromProps(
        props: RadioProps,
        state: RadioState,
    ): RadioState {
        if ('checked' in props) {
            return { ...state, checked: props.checked }
        }
        return null
    }

    state: RadioState = {
        checked: this.props.checked ?? this.props.defaultChecked,
    }

    private _handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { disabled, onChange } = this.props
        if (disabled) {
            return
        }
        if (!('checked' in this.props)) {
            this.setState({ checked: event.target.checked })
        }
        onChange && onChange(event)
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
        const { id, name, disabled, value, children } = this.props
        const { checked } = this.state
        return (
            <label
                htmlFor={id ?? name ?? ''}
                className={classNames('radio-wrapper', { disabled })}>
                <span
                    className={classNames('radio', {
                        checked,
                    })}>
                    <input
                        id={id ?? name ?? ''}
                        name={name}
                        value={value}
                        disabled={disabled}
                        checked={checked}
                        type='radio'
                        className='radio-input'
                        onChange={this._handleChange}
                    />
                    <span className='radio-inner' />
                </span>
                <span>{children}</span>
            </label>
        )
    }
}
