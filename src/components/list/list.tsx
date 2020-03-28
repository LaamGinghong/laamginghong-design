import React, { Component, ReactNode, RefObject } from 'react'
import { ListDataOption } from './list-item'
import ListHeader from './list-header'
import ListFooter from './list-footer'
import ListMenu from './list-menu'
import './style.less'

export interface ListProps<T> {
    data: ListDataOption<T>[]
    header?: string | ReactNode
    footer?: string | ReactNode
    noDataText?: string
    onClick?: (ref: RefObject<HTMLLIElement>, value: T) => void
}

class List<T> extends Component<ListProps<T>> {
    private _handleClick = (ref: RefObject<HTMLLIElement>, value: T): void => {
        const { onClick } = this.props
        onClick && onClick(ref, value)
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
        const { data, header, footer, noDataText } = this.props
        return (
            <div className='list'>
                {header && <ListHeader header={header} />}
                <ListMenu data={data} noDataText={noDataText} onClick={this._handleClick} />
                {footer && <ListFooter footer={footer} />}
            </div>
        )
    }
}

export default List
