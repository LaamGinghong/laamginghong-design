import { createFromIconfontCN } from '@ant-design/icons'
import { IconBaseProps } from '@ant-design/icons/lib/components/Icon'
import { CSSProperties, FC } from 'react'

const BaseIcon: FC<IconBaseProps & { type: string }> = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1646381_ko4ikg8cp6a.js',
  extraCommonProps: {
    style: { fontSize: '54px' } as CSSProperties,
  },
})

export default BaseIcon
