import * as React from 'react'
import { NextPage } from 'next'
import { AppProps as NextAppProps } from 'next/app'

import { EmptyObject } from 'degen/types'

declare module 'next' {
  export type NextLayout<P = EmptyObject> = (
    props: React.PropsWithChildren<P>,
  ) => React.ReactElement

  export type GetLayout<P = EmptyObject> = (
    page: React.ReactElement<P>,
  ) => React.ReactElement

  export type NextPageWithLayout<P = EmptyObject, IP = P> = NextPage<P, IP> & {
    getLayout?: GetLayout<P>
  }

  export type AppProps<P = EmptyObject> = NextAppProps<P> & {
    Component: NextPageWithLayout
  }
}
