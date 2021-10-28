import * as React from 'react'

import { AllOrNone } from '../../types'

export type OptionalTitle = AllOrNone<{ title: string; titleId: string }>

export type IconProps = React.SVGProps<SVGSVGElement> & OptionalTitle
