function runDash(){
	try{
		getTokenCounts()
		getRefCount()
	}catch(e){
		alert(e)
		console.log(e)
	}
		setTimeout(() => {
			runDash()
		}, 10000)
}

async function getTokenCounts(){
	totalTokens = await tokenContract.methods.totalSupply().call() / 1e18
	$('.total-tokens')[0].innerHTML = abrNum(totalTokens, 2)
		
	let tokenBuyPrice = await tokenContract.methods.calculateTokensReceived(toHexString(1e18)).call() / 1e18
	//let tokenSellPrice = await tokenContract.methods.calculateEthereumReceived(toHexString(1e18)).call() / 1e18
	
	let roundData = await priceFeed.methods.latestRoundData().call()
	let bnbPrice = roundData.answer/1e8
	let sqdUsdValueFull = bnbPrice / tokenBuyPrice
	
	$('.token-buy-price')[0].innerHTML = "1 BNB = " + abrNum(tokenBuyPrice, 4) +" SQD"
	
	userTokens = await tokenContract.methods.balanceOf(user.address).call()
	$('.user-tokens')[0].innerHTML = abrNum(userTokens / 1e18,2)
	$('#user-tokens')[0].innerHTML = "Bal: " + abrNum(userTokens / 1e18,2) + " SQD"
	$('.sqdUsdValue')[0].innerHTML = "1 SQD = $"+prettyReadOut(sqdUsdValueFull)
}

async function buyToken(){
	console.log("refferal",user.ref);
	let ref
	if(validateErcAddress(user.ref))
		ref = user.ref
	else if(user.ref == user.address)
		ref = zeroAddress
	else 
		ref = zeroAddress
	
	let amount = toHexString( $('.buy-token-input')[0].value * 1e18 )
	await tokenContract.methods.buy(ref).send({
		from: user.address,
		value: amount,
		gasLimit:210000
	}).then(res => {
		console.log(res)
		getTokenCounts()
		alert("Bought " + res.events.Transfer.returnValues.tokens/1e18 +' tokens\n for '+amount/1e18+ ' BNB')
		console.log(res)
	})
}
async function getBuyOutput(){
	let amount = $('.buy-token-input')[0].value
	let tokens = abrNum( await tokenContract.methods.calculateTokensReceived(toHexString(amount*1e18)).call() / 1e18, 2)
	$('.buy-button-text')[0].innerHTML = 'Buy ' + (tokens) + ' Tokens<br> for '+ amount +' BNB'
}
let bnbPurchased
async function getSellOutput(){
	let amount = $('.sell-token-input')[0].value
	bnbPurchased = abrNum( (await tokenContract.methods.calculateEthereumReceived(toHexString(amount*1e18)).call() / 1e18), 2)
	$('.sell-button-text')[0].innerHTML = 'Sell ' + amount + ' Tokens<br> for '+ (bnbPurchased) +' BNB'
}
async function sellToken(){
	let bnb = bnbPurchased
	let amount = $('.sell-token-input')[0].value * 1e18
	if(amount > userTokens){
		amount = userTokens
		$('.sell-token-input')[0].value = userTokens/1e18
		getSellOutput()
	}
	if(amount > 0){
		amount = toHexString(amount)
		await tokenContract.methods.sell(amount).send({
			from: user.address,
			gasLimit:210000
		}).then(res => {
			console.log(res)
			getTokenCounts()
			alert("Sold " + res.events.Transfer.returnValues.tokens/1e18 +' tokens for '+bnb+ ' BNB')
			console.log(res)
		})
	}else
		alert("No tokens to sell.")
}
async function getRefCount(){
	let refCount = await stakeContract.methods.getUserDownlineCount(user.address).call()
	$('.ref-count')[0].innerHTML = "Level 1: " + refCount[0]
	$('.ref-count')[1].innerHTML = "Level 2: " + refCount[1]
	$('.ref-count')[2].innerHTML = "Level 3: " + refCount[2]
}