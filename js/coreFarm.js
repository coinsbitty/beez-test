$(document).ready(function() {
	connect()
})

async function connect(){
	await init()
	onConnect()
}

function runFarm(){
	user.address = selectedAccount
	console.log("User wallet: " + user.address)
	$('#btn-connect')[0].innerHTML = '0x' + user.address.slice(2, 5) + '...' + user.address.slice(42 - 5)
	getTokenStats()
    initFarmContracts()
}

async function getTokenStats(){
    await autoContract()
    await (sqdContract = new web3.eth.Contract(sqdABI, sqd))    
    getUserBalance()
}
