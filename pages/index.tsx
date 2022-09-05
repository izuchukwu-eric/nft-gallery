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
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <div>
        <input onChange={(e) => setWalletAddress(e.target.value)} value={wallet} type={"text"} placeholder="Add your wallet address" />
        <input onChange={(e) => setCollectionAddress(e.target.value)} value={collection} type={"text"} placeholder="Add the collection address" />
        <label>
          <input onChange={(e) => setFetchForCollection(e.target.checked)} type={"checkbox"} />
          Fetch for collection
        </label>
        <button onClick={
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
