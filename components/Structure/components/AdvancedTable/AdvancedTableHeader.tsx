import { Children, PropsWithChildren } from 'react';

interface Props {}

const AdvancedTableHeader = (props: PropsWithChildren<Props>) => {

  return (
    <>{props.children}</>
  )
}

export default AdvancedTableHeader