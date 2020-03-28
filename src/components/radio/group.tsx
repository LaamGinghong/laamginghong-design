import React, { Component } from 'react'
import classNames from 'classnames'
import Radio from './radio'
import './style.less'

export interface GroupProps {
    disabled?: boolean
    value: any
    onChange(value: any): void
    options: { label: string; value: any; disabled?: boolean }[]
    block?: boolean
}

class Group extends Component<GroupProps> {
    private _handleChecked = (value): void => {
        const { onChange } = this.props
        onChange(value)
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
        const { options, value, disabled, block } = this.props
        return (
            <div className={classNames('radio-group', { block })}>
                {options.map((item, index) => (
                    <Radio
                        checked={item.value === value}
                        value={item.value}
                        disabled={disabled || item.disabled}
                        key={item.value + item.label}
                        block={block}
                        onChecked={this._handleChecked}>
                        {item.label}
                    </Radio>
                ))}
            </div>
        )
    }
}

export default Group
