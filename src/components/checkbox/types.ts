import { ChangeEvent } from 'react'

interface CheckboxProps {
    /* 当前项的值 */
    value?: string
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
     */
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

interface Options {
    label: string
    value: string
    disabled?: boolean
}

type OptionsType = (string | Options)[]

interface CheckboxGroupProps {
    /* 默认值 */
    defaultValue?: string[]
    /* 当前值 */
    value?: string[]
    /* 禁用态 */
    disabled?: boolean
    /* 当前Group下所有input[type='checkbox']的name属性 */
    name?: string
    /* 制定可选项 */
    options: OptionsType
    /* 变化时的回调 */
    onChange?: (value: string[]) => void
}

export { CheckboxProps, CheckboxGroupProps, Options }
