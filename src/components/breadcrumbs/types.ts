import { ReactNode } from 'react'

interface BreadcrumbsProps {
  breadcrumbs: BreadcrumbOptions[]
  onClick?(): void
  separator?: ReactNode
}

interface BreadcrumbOptions {
  text: string
  onClick?(options: BreadcrumbOptions): void
  href?: string
  renderItem?: (options: BreadcrumbOptions) => ReactNode
  preventDefault?: boolean
}

interface BreadcrumbProps extends BreadcrumbOptions {
  separator: ReactNode
}

export type { BreadcrumbProps, BreadcrumbsProps, BreadcrumbOptions }
