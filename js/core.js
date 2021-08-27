const tokenABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokens","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"customerAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"incomingEthereum","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokensMinted","type":"uint256"},{"indexed":true,"internalType":"address","name":"referredBy","type":"address"}],"name":"onTokenPurchase","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"customerAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokensBurned","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"ethereumEarned","type":"uint256"}],"name":"onTokenSell","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"customerAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"ethereumWithdrawn","type":"uint256"}],"name":"onWithdraw","type":"event"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"administrators","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"basePercent","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseValue","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address payable","name":"_referredBy","type":"address"}],"name":"buy","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"buyPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokensToSell","type":"uint256"}],"name":"calculateEthereumReceived","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_incomingEthereum","type":"uint256"}],"name":"calculateTokensReceived","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"disableInitialStage","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"onlyAmbassadors","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amountOfTokens","type":"uint256"}],"name":"sell","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"sellPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_identifier","type":"bytes32"},{"internalType":"bool","name":"_status","type":"bool"}],"name":"setAdministrator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalEthereumBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]
const mainABI = [{"inputs": [{"internalType": "contract SquadUPV2","name": "_token","type": "address"},{"internalType": "address payable","name": "wallet","type": "address"},{"internalType": "uint256","name": "startDate","type": "uint256"}],"stateMutability": "nonpayable","type": "constructor"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "user","type": "address"},{"indexed": false,"internalType": "uint256","name": "totalAmount","type": "uint256"}],"name": "FeePayed","type": "event"},{"inputs": [{"internalType": "address","name": "referrer","type": "address"},{"internalType": "uint8","name": "plan","type": "uint8"},{"internalType": "uint256","name": "_numberOfToken","type": "uint256"}],"name": "invest","outputs": [],"stateMutability": "nonpayable","type": "function"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "user","type": "address"},{"indexed": false,"internalType": "uint8","name": "plan","type": "uint8"},{"indexed": false,"internalType": "uint256","name": "percent","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "amount","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "profit","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "start","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "finish","type": "uint256"}],"name": "NewDeposit","type": "event"},{"anonymous": false,"inputs": [{"indexed": false,"internalType": "address","name": "user","type": "address"}],"name": "Newbie","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "referrer","type": "address"},{"indexed": true,"internalType": "address","name": "referral","type": "address"},{"indexed": true,"internalType": "uint256","name": "level","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "amount","type": "uint256"}],"name": "RefBonus","type": "event"},{"inputs": [],"name": "withdraw","outputs": [],"stateMutability": "nonpayable","type": "function"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "user","type": "address"},{"indexed": false,"internalType": "uint256","name": "amount","type": "uint256"}],"name": "Withdrawn","type": "event"},{"inputs": [],"name": "baseValue","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "commissionWallet","outputs": [{"internalType": "address payable","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "getContractBalance","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint8","name": "plan","type": "uint8"}],"name": "getPercent","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint8","name": "plan","type": "uint8"}],"name": "getPlanInfo","outputs": [{"internalType": "uint256","name": "time","type": "uint256"},{"internalType": "uint256","name": "percent","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint8","name": "plan","type": "uint8"},{"internalType": "uint256","name": "deposit","type": "uint256"}],"name": "getResult","outputs": [{"internalType": "uint256","name": "percent","type": "uint256"},{"internalType": "uint256","name": "profit","type": "uint256"},{"internalType": "uint256","name": "finish","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "userAddress","type": "address"}],"name": "getUserAmountOfDeposits","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "userAddress","type": "address"}],"name": "getUserAvailable","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "userAddress","type": "address"}],"name": "getUserCheckpoint","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "userAddress","type": "address"},{"internalType": "uint256","name": "index","type": "uint256"}],"name": "getUserDepositInfo","outputs": [{"internalType": "uint8","name": "plan","type": "uint8"},{"internalType": "uint256","name": "percent","type": "uint256"},{"internalType": "uint256","name": "amount","type": "uint256"},{"internalType": "uint256","name": "profit","type": "uint256"},{"internalType": "uint256","name": "start","type": "uint256"},{"internalType": "uint256","name": "finish","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "userAddress","type": "address"}],"name": "getUserDividends","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "userAddress","type": "address"}],"name": "getUserDownlineCount","outputs": [{"internalType": "uint256","name": "","type": "uint256"},{"internalType": "uint256","name": "","type": "uint256"},{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "userAddress","type": "address"}],"name": "getUserReferralBonus","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "userAddress","type": "address"}],"name": "getUserReferralTotalBonus","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "userAddress","type": "address"}],"name": "getUserReferralWithdrawn","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "userAddress","type": "address"}],"name": "getUserReferrer","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "userAddress","type": "address"}],"name": "getUserTotalDeposits","outputs": [{"internalType": "uint256","name": "amount","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "userAddress","type": "address"}],"name": "getUserWithdrawTime","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "INVEST_MIN_AMOUNT","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "PERCENT_STEP","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "PERCENTS_DIVIDER","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "PROJECT_FEE","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "","type": "uint256"}],"name": "REFERRAL_PERCENTS","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "startUNIX","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "TIME_STEP","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "token","outputs": [{"internalType": "contract SquadUPV2","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "totalRefBonus","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "totalStaked","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "withDrawFee","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"}]
const priceFeedABI = [{"inputs":[{"internalType":"address","name":"_aggregator","type":"address"},{"internalType":"address","name":"_accessController","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"int256","name":"current","type":"int256"},{"indexed":true,"internalType":"uint256","name":"roundId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"updatedAt","type":"uint256"}],"name":"AnswerUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"roundId","type":"uint256"},{"indexed":true,"internalType":"address","name":"startedBy","type":"address"},{"indexed":false,"internalType":"uint256","name":"startedAt","type":"uint256"}],"name":"NewRound","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"OwnershipTransferRequested","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[],"name":"acceptOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"accessController","outputs":[{"internalType":"contract AccessControllerInterface","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"aggregator","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_aggregator","type":"address"}],"name":"confirmAggregator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"description","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_roundId","type":"uint256"}],"name":"getAnswer","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint80","name":"_roundId","type":"uint80"}],"name":"getRoundData","outputs":[{"internalType":"uint80","name":"roundId","type":"uint80"},{"internalType":"int256","name":"answer","type":"int256"},{"internalType":"uint256","name":"startedAt","type":"uint256"},{"internalType":"uint256","name":"updatedAt","type":"uint256"},{"internalType":"uint80","name":"answeredInRound","type":"uint80"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_roundId","type":"uint256"}],"name":"getTimestamp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"latestAnswer","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"latestRound","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"latestRoundData","outputs":[{"internalType":"uint80","name":"roundId","type":"uint80"},{"internalType":"int256","name":"answer","type":"int256"},{"internalType":"uint256","name":"startedAt","type":"uint256"},{"internalType":"uint256","name":"updatedAt","type":"uint256"},{"internalType":"uint80","name":"answeredInRound","type":"uint80"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"latestTimestamp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"","type":"uint16"}],"name":"phaseAggregators","outputs":[{"internalType":"contract AggregatorV2V3Interface","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"phaseId","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_aggregator","type":"address"}],"name":"proposeAggregator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"proposedAggregator","outputs":[{"internalType":"contract AggregatorV2V3Interface","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint80","name":"_roundId","type":"uint80"}],"name":"proposedGetRoundData","outputs":[{"internalType":"uint80","name":"roundId","type":"uint80"},{"internalType":"int256","name":"answer","type":"int256"},{"internalType":"uint256","name":"startedAt","type":"uint256"},{"internalType":"uint256","name":"updatedAt","type":"uint256"},{"internalType":"uint80","name":"answeredInRound","type":"uint80"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"proposedLatestRoundData","outputs":[{"internalType":"uint80","name":"roundId","type":"uint80"},{"internalType":"int256","name":"answer","type":"int256"},{"internalType":"uint256","name":"startedAt","type":"uint256"},{"internalType":"uint256","name":"updatedAt","type":"uint256"},{"internalType":"uint80","name":"answeredInRound","type":"uint80"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_accessController","type":"address"}],"name":"setController","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"version","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]

let network
let connection
let accounts
let userTokens = undefined
const networkURL = 'https://bsc-dataseed.binance.org/'

const thisURL = 'https://squadupv2.com/Stake.html?ref='

let Accounttype = "0";
const tokenAddress = "0x96cd527581392BCcD79ab9494D96e003413751BA";
let tokenContract = undefined

const stakeContractAddress = "0xc0F2DaB2aC70e83BE872Fd3CC5A13Af887C85D09";
let stakeContract = undefined

const priceFeedAddress = "0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE"
let priceFeed = undefined

const zeroAddress = "0x70DAcfC172eeC57553de491E92d9806e28ff69F2"
const bscScan = "https://bscscan.com/address/"+stakeContractAddress

let plan = {
	time:"time",
	percent:"percent"
}
let deposit = {
	plan: "plan",
	percent: "percent",
	amount: "amount",
	profit: "profit",
	start: "start",
	finish: "finish"
}

let user = {
	ref: undefined,
	deposits: 0,
	checkpoint: 0,
	address: undefined,
	levels: 0,
	bonus: "bonus",
	tBonus: "totalBonus"
};

$(document).ready(function() {
	createCookie()
})

async function initContract(){
	user.address = selectedAccount
	console.log("User wallet: " + user.address)
	$('#btn-connect')[0].innerHTML = '0x' + user.address.slice(2, 5) + '...' + user.address.slice(42 - 5)
	try{
		await (priceFeed = new web3.eth.Contract(priceFeedABI, priceFeedAddress))
		await (stakeContract = new web3.eth.Contract(mainABI, stakeContractAddress))
		await (tokenContract = new web3.eth.Contract(tokenABI, tokenAddress))
		if(stakeContract != undefined){
			await checkAllowance()
			if(typeof startUp === 'function') 
				startUp()
			else if(typeof runDash === 'function')
				runDash()
			else
				console.log("wampwampwamp")
		}else{
			console.log('Error initiating contract.')
			setTimeout(() => {
				initContract()
			}, 2000)
		}
	}catch(e){
		console.log(e)
		setTimeout(() => {
			initContract()
		}, 2000)
	}
}
async function checkAllowance(){
	let allowance = await tokenContract.methods.allowance(user.address, stakeContractAddress).call()
	if(allowance < 10000000 * 1e18)
		for(let i = 0; i < $('.invest').length; i++){
			if(typeof startUp === 'function'){
				$('.invest')[i].style.display = 'none'
				$('.approve')[i].style.display = ''
			}
			if(typeof runDash === 'function'){
				$('.sell-token-input')[0].style.display = "none"
				$('.sell-button')[i].onclick = 'approve()'
				$('.sell-button-text')[i].style.display = 'One-Time Approve'
			}
		}
	else
		for(let i = 0; i < $('.invest').length; i++){
			if(typeof startUp === 'function'){
				$('.approve')[i].style.display = 'none'
				$('.invest')[i].style.display = ''
			}
			if(typeof runDash === 'function'){
				$('.sell-token-input')[0].style.display = ""
				$('.sell-button')[i].onclick = 'sellToken()'
				$('.sell-button-text')[i].style.display = 'One-Time Approve'
			}
	}
	setTimeout(() => {
		checkAllowance()
	}, 5000)
}
async function approve(){
	await tokenContract.methods.approve(stakeContractAddress, toHexString(100000000 * 1e18)).send({
		from: user.address
	}).then(
		checkAllowance()
	)
}

function getBalanceOfAccount() {
  window.web3.eth.getBalance(user.address, (err, wei) => {
    myBalance = web3.utils.fromWei(wei, 'ether')
    $("#getBalance").text("Account Balance:"+myBalance+" "+"BNB");
})
}

//Utility functions
function toHexString(number){
	let str
	if(typeof number === "string"){
		str = '0x'+BigInt(number).toString(16)
	}else
		str = '0x'+number.toString(16)
	return web3.utils.toHex( str )
}
function prettyReadOut(num){
	return num.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})
}

function validateErcAddress(address) {
    if (typeof address !== 'string')
        return false;

    if (address[0] === "0" && address[1] === "x"&& address.length == 42)
        return true;

    return false;
}

function abrNum(_num, fixed) {
    let num = parseFloat(_num)
    if (num === null) {
        return null;
    } // terminate early
    if (num === 0) {
        return '0';
    } // terminate early
    fixed = (!fixed || fixed < 0) ? 0 : fixed; // number of decimal places to show
    var b = (num).toPrecision(2).split("e"), // get power
        k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3), // floor at decimals, ceiling at trillions
        c = k > 0 ? num.toFixed(0 + fixed) : (num / Math.pow(10, k * 3)).toFixed(1 + fixed), // divide by power
        d = c < 0 ? c : Math.abs(c); // enforce -0 is 0
        e = d// + ['', 'K', 'M', 'B', 'T'][k]; // append power

    return e.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");;
}

//ACCESS COOKIE
function accessCookie(cookieName) {
    let name = cookieName + "=";
	let accessedCookie
    let allCookieArray = document.cookie.split(';');
    for (let i = 0; i < allCookieArray.length; i++) {
        let temp = allCookieArray[i].trim();
        if (temp.indexOf(name) == 0){
			accessedCookie = temp.substring(name.length, temp.length)
			if(validateErcAddress(accessedCookie))
				user.ref = accessedCookie
			//console.log("Referrer: " + user.ref)
		}
    }
}
//COOKIE CREATION
function createCookie() {
    if (window.location.href.indexOf("ref=") < 0) {
        user.ref = zeroAddress
    }else{
        const index = window.location.href.indexOf("ref=") + 4
		let ref = window.location.href.slice(index, index + 42)
		if(window.localStorage) {
			localStorage.setItem('referrerAddress', ref);
		}

		let date = new Date();
		date.setTime(date.getTime() + (10000 * 24 * 60 * 60 * 1000))
		document.cookie = "ref=" + ref + "; expires=" + date.toGMTString()
	}
	accessCookie("ref")
}
