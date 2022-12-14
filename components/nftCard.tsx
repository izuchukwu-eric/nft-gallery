import Image from 'next/image'
import React from 'react'

interface Props {
    nft: any
}

const nftCard = ({ nft }: Props) => {
    console.log(nft)
  return (
    <div className='w-1/4 flex flex-col'>
        <div className='rounded-md'>
            <img className='object-cover h-128 w-full rounded-t-md' src={nft.media[0].gateway} width={50} height={50} />
        </div>
        <div className='flex flex-col y-gap-2 px-2 py-3 bg-slate-100 rounded-b-md h110'>
            <div>
                <h2 className='text-xl text-gray-800'>{nft.title}</h2>
                <p className='text-gray-600'>Id: {nft.id.tokenId.substr(nft.id.tokenId.length -4)}</p>
                <p className='text-gray-600'>{`${nft.contract.address.substr(0, 5)}...${nft.contract.address.substr(nft.contract.address.length - 4)}`}</p>
            </div>
            <div className='flex-grow mt-2'>
                <p className='text-gray-600'>{nft.description?.substr(0, 150)}</p>
            </div>
            <div className='flex justify-center mb-1'>
                <a className='py-2 px-4 bg-blue-500 w-1/2 text-center rounded-m text-white cursor-pointer' target={"_blank"} href={`https://etherscan.io/token/${nft.contract.address}`}>View on etherscan</a>
            </div>
        </div>
    </div>
  )
}

export default nftCard