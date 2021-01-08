import React from 'react'
import { useRouter } from 'next/router'
import { useAtom } from 'jotai'
import { omit } from 'lodash'

import { ButtonLink } from 'lib/components/ButtonLink'
import { networkAtom } from 'lib/hooks/useNetwork'
import { poolAddressesAtom } from 'lib/hooks/usePoolAddresses'

export const ButtonRelativeLink = (props) => {
  const router = useRouter()
  const poolAlias = router.query.poolAlias

  const [network] = useAtom(networkAtom)
  const [poolAddresses] = useAtom(poolAddressesAtom)
  
  let href = `/pools/[networkName]/[prizePoolAddress]${props.link}`
  let as = `/pools/${network.name}/${poolAddresses.prizePool}${props.link}`

  if (poolAlias) {
    href = `/[poolAlias]${props.link}`
    as = `/${poolAlias}${props.link}`  
  }

  const newProps = omit(props, ['link'])

  return <ButtonLink
    {...newProps}
    href={href}
    as={as}
  >
    {props.children}
  </ButtonLink>
}
