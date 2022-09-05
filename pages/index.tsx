import type { NextPage } from 'next'
import { useState } from 'react';
import NFTCard from "../components/nftCard";

const alchemyAPIKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;


const Home: NextPage = () => {
  const [wallet, setWalletAddress] = useState("");
  const [collection, setCollectionAddress] = useState("");
  const [NFTs, setNFTs] = useState([]);
  const [fetchForCollection, setFetchForCollection] = useState(false);


  const fetchNFTs = async () => {
    let nfts;
    console.log("fetching nfts");
    // Setup request options:
    var requestOptions = {
      method: 'GET',
    };
    const baseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${alchemyAPIKey}/getNFTs/`;

    if(!collection.length) {
      // Fetch nft owned by a wallet address:
      const fetchURL = `${baseURL}?owner=${wallet}`;

      nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
    } else {
      //Fetch nfts for a collection owned by a wallet address
      console.log("fetching nfts for collection owned by address");

      const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}`

      nfts = await fetch(fetchURL, requestOptions).then(data => data.json());
    }

    if(nfts) {
      console.log(nfts)
      setNFTs(nfts.ownedNFT);
    }
  }

  const fetchNFTsForCollection = async () => {
     // Setup request options:
     var requestOptions = {
      method: 'GET',
    };
    if(collection.length) {
      const baseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${alchemyAPIKey}/getNFTsForCollection`;
      const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${"true"}`;
      const nfts = await fetch(fetchURL, requestOptions).then(data => data.json());
     if(nfts) {
      console.log("NFTs in collection:", nfts);
      setNFTs(nfts.nfts);
     } 
    }
  }

  return (
    <div className="flex flex-col items-center justify-center py-8 gap-y-3">
      <div className='flex flex-col w-full justify-center items-center gap-y-2'>
        <input disabled={fetchForCollection} className='w-2/5 bg-slate-100 py-2 px-2 rounded-lg text-gray-800 focus:outline-blue-300 disabled:bg-slate-50 disabled:text-gray-50' onChange={(e) => setWalletAddress(e.target.value)} value={wallet} type={"text"} placeholder="Add your wallet address" />
        <input className='w-2/5 bg-slate-100 py-2 px-2 rounded-lg text-gray-800 focus:outline-blue-300 disabled:bg-slate-50 disabled:text-gray-50' onChange={(e) => setCollectionAddress(e.target.value)} value={collection} type={"text"} placeholder="Add the collection address" />
        <label className='text-gray-600'>
          <input onChange={(e) => setFetchForCollection(e.target.checked)} type={"checkbox"} className="mr-2" />
          Fetch for collection
        </label>
        <button className='disabled:bg-slate-500 text-white bg-blue-400 px-4 py-2 mt-3 rounded-sm w-1/5' onClick={
            () =>
             {if (fetchForCollection) {
              fetchNFTsForCollection()
            } else fetchNFTs()
          }
        }
        >
          Let's go!!
        </button>
      </div>
      <div>
        {
          NFTs.length && NFTs.map((nft, i) => {
            return (
              <NFTCard nft={nft} key={i + 1} />
            )
          })
        }
      </div>
    </div>
  )
}

export default Home
