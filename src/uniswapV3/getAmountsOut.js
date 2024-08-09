const { ethers } = require('ethers');
const { abi: QuoterAbi } = require('@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json');
const { WETH_ADDRESS, QUOTER_ADDRESS } = require('../configs/configs');



/**
 * Quotes the amount of tokenOut you would receive for a given amountIn of WETH using Uniswap V3.
 *
 * @param {string} nodeUrl - The URL of the Ethereum node to connect to.
 * @param {string} tokenAddress - The address of the token to exchange WETH for.
 * @param {string} amountIn - The amount of WETH to trade, specified in wei.
 * @param {string} [fee='3000'] - The fee tier of the pool to use, specified in basis points (e.g., 3000 for 0.3% fee).
 * @returns {Promise<{success: boolean, amountOut?: string, message?: string}>} - An object indicating success or failure, the amountOut on success, or an error message on failure.
 */
module.exports =async  (nodeUrl,tokenAddress,amountIn,fee='3000')=>{
  try {
    const PROVIDER= new ethers.providers.JsonRpcProvider(nodeUrl);
    const sqrtPriceLimitX96='0';


    const quoter = new ethers.Contract(
        QUOTER_ADDRESS,
        QuoterAbi,
        PROVIDER,
    );

    const amountOut= await quoter.callStatic.quoteExactInputSingle(
        WETH_ADDRESS,
        tokenAddress,
        fee,
        amountIn,
        sqrtPriceLimitX96
    );

    return {success: true, amountOut:amountOut.toString() };
    

    
  } catch (error) {
    return {success:false, message: error.message}
    
  }
  
}
