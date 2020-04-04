import React, { ChangeEvent, Component } from 'react'
import { isString } from 'laamginghong-utils'
import { RadioGroupProps, Options } from './types'
import Radio from './radio'

interface RadioGroupState {
    value: string
}

export default class RadioGroup extends Component<
    RadioGroupProps,
    RadioGroupState
> {
    static getDerivedStateFromProps(
        props: RadioGroupProps,
        state: RadioGroupState,
    ): RadioGroupState {
        if ('value' in props) {
            return { ...state, value: props.value }
        }
        return null
    }

    state: RadioGroupState = {
        value: this.props.value ?? this.props.defaultValue,
    }

    private _handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        if (!('value' in this.props)) {
            this.setState({ value: event.target.value })
        }
        const { onChange } = this.props
        const { value } = this.state
        onChange && onChange(value)
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
        const { options, disabled, name } = this.props
        const { value } = this.state

        return (
            <div className='radio-group'>
                {options.map((option) => {
                    if (isString(option)) {
                        return (
                            <Radio
                                key={option as string}
                                value={option as string}
                                checked={value === option}
                                disabled={disabled}
                                name={name}
                                onChange={this._handleChange}
                                id={option as string}>
                                {option}
                            </Radio>
                        )
                    }
                    return (
                        <Radio
                            key={(option as Options).value}
                            value={(option as Options).value}
                            checked={(option as Options).value === value}
                            disabled={disabled || (option as Options).disabled}
                            name={name}
                            onChange={this._handleChange}
                            id={(option as Options).value}>
                            {(option as Options).label}
                        </Radio>
                    )
                })}
            </div>
        )
    }
}
