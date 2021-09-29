import { GetLayout, NextLayout } from 'next'

const Layout: NextLayout = ({ children }) => <main>{children}</main>

export const getLayout: GetLayout = (page) => <Layout>{page}</Layout>

export default Layout
