import React, { Component, MouseEvent, Ref } from 'react'
import dayjs from 'dayjs'
import classNames from 'classnames'
import { isNil } from 'laamginghong-utils'
import { CloseCircleFilled } from '../icon'
import { Flex } from '../flex'
import './style.less'

export interface SelectionProps {
    focus: boolean
    allowClear: boolean
    placeholder: string
    value: Date
    disabled: boolean
    format: string
    selectionRef: Ref<HTMLDivElement>
    onFocus(): void
    onBlur(e: null): void
}

class Selection extends Component<SelectionProps> {
    private _handleOpen = (event: MouseEvent<HTMLDivElement>): void => {
        event.stopPropagation()
        const { onFocus, disabled } = this.props
        if (disabled) {
            return
        }
        onFocus()
    }

    private _handleClear = (event: MouseEvent<HTMLSpanElement>): void => {
        event.stopPropagation()
        const { onBlur } = this.props
        onBlur(null)
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
        const { placeholder, value, format, allowClear, focus, disabled, selectionRef } = this.props
        return (
            <Flex
                ref={selectionRef}
                className={classNames('date-picker-selection', {
                    disabled,
                    'date-picker-selection-focus': focus,
                })}
                onClick={this._handleOpen}>
                {value ? (
                    <Flex className='date-picker-selection-content' alignItems='center'>
                        {dayjs(value).format(format)}
                    </Flex>
                ) : (
                    <Flex className='date-picker-selection-placeholder' alignItems='center'>
                        {placeholder}
                    </Flex>
                )}
                {allowClear && !disabled && !isNil(value) && (
                    <CloseCircleFilled className='date-picker-selection-close' onClick={this._handleClear} />
                )}
            </Flex>
        )
    }
}

export default Selection
