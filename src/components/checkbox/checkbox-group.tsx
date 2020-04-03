import React, { ChangeEvent, Component } from 'react'
import { isString } from 'laamginghong-utils'
import { CheckboxGroupProps, Options } from './types'
import Checkbox from './checkbox'

interface CheckboxGroupState {
    value: string[]
}

export default class CheckboxGroup extends Component<
    CheckboxGroupProps,
    CheckboxGroupState
> {
    static defaultProps = {
        defaultValue: [],
    }

    static getDerivedStateFromProps(
        props: CheckboxGroupProps,
        state: CheckboxGroupState,
    ): CheckboxGroupState {
        if ('value' in props) {
            return { ...state, value: props.value }
        }
        return null
    }

    state: CheckboxGroupState = {
        value: this.props.value ?? this.props.defaultValue,
    }

    private _handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { onChange, disabled } = this.props
        if (disabled) {
            return
        }
        let { value } = this.state
        if (event.target.checked) {
            value.push(event.target.value)
        } else {
            value = value.filter((item) => item !== event.target.value)
        }
        if (!('value' in this.props)) {
            this.setState({ value })
        }
        onChange && onChange([...value])
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
        const { options, name, disabled } = this.props
        const { value } = this.state

        return (
            <div className='checkbox-group'>
                {options.map((option) => {
                    if (isString(option)) {
                        return (
                            <Checkbox
                                key={option as string}
                                onChange={this._handleChange}
                                checked={value.includes(option as string)}
                                name={name}
                                id={option as string}
                                value={option as string}
                                disabled={disabled}>
                                {option}
                            </Checkbox>
                        )
                    }
                    return (
                        <Checkbox
                            key={(option as Options).value}
                            onChange={this._handleChange}
                            checked={value.includes((option as Options).value)}
                            name={name}
                            id={(option as Options).value}
                            value={(option as Options).value}
                            disabled={disabled || (option as Options).disabled}>
                            {(option as Options).label}
                        </Checkbox>
                    )
                })}
            </div>
        )
    }
}
