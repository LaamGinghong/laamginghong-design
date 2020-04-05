import React, {
    ChangeEvent,
    Component,
    createRef,
    CSSProperties,
    ReactNode,
} from 'react'
import classNames from 'classnames'
import Option, { OptionProps } from './option'
import Selection from './selection'
import './style.less'
import { SelectContainer } from '../container'
import { Portal } from '../portal'
import Options from './options'
import { Input } from '../input'
import SelectNoData from './select-no-data'

export interface SelectProps<T> {
    data: OptionProps<T>[]
    allowClear?: boolean
    disabled?: boolean
    value?: T | T[]
    defaultValue?: T | T[]
    multiple?: boolean
    placeholder?: string
    showSearch?: boolean
    searchInputPlaceholder?: string
    onSelect?(value: T | T[]): void
    onSearch?: (e: string) => void
    style?: CSSProperties
    maxCount?: number
    maxCountText?: string
    noDataText?: string
    renderSelection?: (e: OptionProps<T>) => ReactNode
}

interface SelectState<T> {
    open: boolean
    value: T | T[]
    searchWord: string
}

class Select<T> extends Component<SelectProps<T>, SelectState<T>> {
    static getDerivedStateFromProps(
        props: SelectProps<any>,
        state: SelectState<any>,
    ): SelectState<any> {
        if ('value' in props) {
            return { ...state, value: props.value }
        }
        return null
    }

    state: SelectState<T> = {
        open: false,
        searchWord: '',
        value: this.props.value ?? this.props.defaultValue,
    }

    selectContainer = SelectContainer.create('select-container')

    private _selectionRef = createRef<HTMLDivElement>()

    componentDidMount(): void {
        window.addEventListener('click', this._handleClose)
    }

    componentWillUnmount(): void {
        window.removeEventListener('click', this._handleClose)
    }

    private _handleClose = (): void => {
        this.setState({ open: false, searchWord: '' })
    }

    private _handleOpen = (open: boolean): void => {
        this.setState({ open })
    }

    private _handleSelect = (value: T | T[]): void => {
        const { onSelect, multiple } = this.props
        if (!('value' in this.props)) {
            this.setState({ value })
        }
        this.setState({ open: multiple, searchWord: '' }, (): void => {
            onSelect && onSelect(value)
        })
    }

    private _handleClear = (value?: T | T[]): void => {
        const { onSelect } = this.props
        if (!('value' in this.props)) {
            this.setState({ value })
        }
        onSelect && onSelect(value)
    }

    private _handleChangeInput = (
        event: ChangeEvent<HTMLInputElement>,
    ): void => {
        this.setState({ searchWord: event.target.value })
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
            multiple,
            data,
            style,
            disabled,
            placeholder,
            showSearch,
            searchInputPlaceholder,
            allowClear,
            noDataText,
            maxCount,
            maxCountText,
            renderSelection,
        } = this.props
        const { open, searchWord, value = multiple ? [] : null } = this.state
        const optionsWidth =
            style?.width ?? `${this._selectionRef.current?.offsetWidth}px`

        return (
            <div className={classNames('select', { multiple })}>
                <Selection
                    selectionRef={this._selectionRef}
                    renderSelection={renderSelection}
                    placeholder={placeholder}
                    allowClear={allowClear}
                    open={open}
                    onOpen={this._handleOpen}
                    multiple={multiple}
                    disabled={disabled}
                    maxCount={maxCount}
                    maxCountText={maxCountText}
                    selected={
                        multiple
                            ? data.filter((item) =>
                                  (value as T[]).includes(item.value),
                              )
                            : data.find((item) => item.value === value)
                    }
                    onClear={this._handleClear}
                    style={style}
                />
                <Portal container={this.selectContainer}>
                    {open && (
                        <Options
                            style={{ minWidth: optionsWidth }}
                            target={this._selectionRef.current}>
                            {data.length > 0 ? (
                                <>
                                    {showSearch && (
                                        <div className='select-search'>
                                            <Input
                                                value={searchWord}
                                                placeholder={
                                                    searchInputPlaceholder
                                                }
                                                onChange={
                                                    this._handleChangeInput
                                                }
                                            />
                                        </div>
                                    )}
                                    {data
                                        .filter((item) =>
                                            searchWord
                                                ? item.name.indexOf(
                                                      searchWord,
                                                  ) > -1
                                                : true,
                                        )
                                        .map((item, index) => (
                                            <Option
                                                key={item.value + item.name}
                                                {...item}
                                                selected={value}
                                                multiple={multiple}
                                                onSelect={this._handleSelect}
                                            />
                                        ))}
                                </>
                            ) : (
                                <SelectNoData noDataText={noDataText} />
                            )}
                        </Options>
                    )}
                </Portal>
            </div>
        )
    }
}

export default Select
