import Image from 'next/image'
import React from 'react'

interface Props {
    nft: any
}

const nftCard = ({ nft }: Props) => {
    console.log(nft)
  return (
    <div>
        <div>
            <img src={nft.media[0].gateway} width={50} height={50} />
        </div>
        <div>
            <h2>{nft.title}</h2>
            <p>{nft.id.tokenId.substr(nft.id.tokenId.length -4)}</p>
            <p>{`${nft.contract.address.substr(0, 5)}...${nft.contract.address.substr(nft.contract.address.length - 4)}`}</p>

        </div>
    </div>
  )
}

export default nftCard