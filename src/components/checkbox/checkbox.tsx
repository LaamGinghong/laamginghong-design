import React, { ChangeEvent, Component } from 'react'
import classNames from 'classnames'
import './style.less'

export interface CheckboxProps {
    /* 当前项的值 */
    value?: number | string | boolean
    /* 当前项的name */
    name?: string
    /* 当前项label的htmlFor */
    id?: string
    /* 选中态 */
    checked?: boolean
    /* 默认选中态 */
    defaultChecked?: boolean
    /* 禁用态 */
    disabled?: boolean
    /* 半选态 */
    indeterminate?: boolean
    /**
     * 变化时的回调。
     *
     * 由于event.target.value的类型固定为string，因此内部将value的值处理为JSON，
     * 因此调用方在获取event.target.value的时候，需要将JSON解析回正确的类型
     */
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

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
                        value={JSON.stringify(value)}
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

export interface CheckboxGroupProps {}
