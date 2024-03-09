import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Crypto.css";

//
const Crypto = () => {
  //states for serching the currey name and store api data
  const [currencyName, setCurrencyName] = useState("");
  const [apiData, setApiDAta] = useState([]);
  const options = {
    headers: {
      "X-API-KEY": "DPt0SSFt21D6lEfexDcHDjD0x7Y/oSUw8KiW6z9YexY=",
    },
  };

  //useEffect for data fetch
  useEffect(() => {
    axios
      .get("https://openapiv1.coinstats.app/coins", options)
      .then((res) => setApiDAta(res.data.result))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container">
      <h2>Crypto Currency App</h2>
      <input
        type="text"
        placeholder="Enter Currency Name"
        onChange={(e) => setCurrencyName(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <td>Rank</td>
            <td>Name</td>
            <td>Symbol</td>
            <td>Market Cap</td>
            <td>Price</td>
            <td>Total Supply</td>
            <td>Available Supply</td>
            <td>Volume (24hr)</td>
            <td>Price To Btc</td>
          </tr>
        </thead>
        <tbody>
          {apiData
            .filter((val) => {
              return val.name
                .toLowerCase()
                .includes(currencyName.toLowerCase());
            })
            .map((val, index) => {
              return (
                <tr key={index}>
                  <td className="rank">{val.rank} </td>
                  <td className="rank">{val.name} </td>
                  <td>
                    <a href={val.websiteUrl}>
                      <img src={val.icon} alt="" />
                      {val.symbol}{" "}
                    </a>{" "}
                  </td>
                  <td>{val.marketCap.toFixed(2)} </td>
                  <td>$ {val.price.toFixed(2)} </td>
                  <td>{val.totalSupply} </td>
                  <td>{val.availableSupply} </td>
                  <td>{val.volume.toFixed(2)} </td>
                  <td>₿ {val.priceBtc.toFixed(6)} </td>
                </tr>
              );
            })}{" "}
        </tbody>
      </table>
    </div>
  );
};

export default Crypto;
