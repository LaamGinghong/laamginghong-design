import React, { ChangeEvent, Component } from 'react'
import classNames from 'classnames'
import './style.less'
import { CheckboxProps } from './types'

interface CheckboxState {
    checked: boolean
}

export default class Checkbox extends Component<CheckboxProps, CheckboxState> {
    static getDerivedStateFromProps(
        props: CheckboxProps,
        state: CheckboxState,
    ): CheckboxState {
        if ('checked' in props) {
            return { ...state, checked: props.checked }
        }
        return null
    }

    state: CheckboxState = {
        checked: this.props.checked ?? this.props.defaultChecked,
    }

    private _handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { onChange, disabled } = this.props
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
        const {
            disabled,
            name,
            value,
            id,
            children,
            indeterminate,
        } = this.props
        const { checked } = this.state

        return (
            <label
                htmlFor={id ?? name ?? ''}
                className={classNames('checkbox-wrapper', { disabled })}>
                <span
                    className={classNames('checkbox', {
                        checked,
                        indeterminate: !checked && indeterminate,
                    })}>
                    <input
                        id={id ?? name ?? ''}
                        name={name}
                        value={value}
                        disabled={disabled}
                        checked={checked}
                        type='checkbox'
                        className='checkbox-input'
                        onChange={this._handleChange}
                    />
                    <span className='checkbox-inner' />
                </span>
                <span>{children}</span>
            </label>
        )
    }
}
