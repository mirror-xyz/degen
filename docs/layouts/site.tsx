import { GetLayout, NextLayout } from 'next'

const Layout: NextLayout = ({ children }) => <>{children}</>

export const getLayout: GetLayout = (page) => <Layout>{page}</Layout>

export default Layout
