import { IconBaseProps } from '@ant-design/icons/lib/components/Icon'
import create from '@ant-design/icons/lib/components/IconFont'
import { CSSProperties, FC } from 'react'

const BaseIcon: FC<IconBaseProps & { type: string }> = create({
    scriptUrl: '//at.alicdn.com/t/font_1646381_ko4ikg8cp6a.js',
    extraCommonProps: {
        style: { fontSize: '54px' } as CSSProperties,
    },
})

export default BaseIcon
