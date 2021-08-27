var nextWithdraw = 0
async function startUp(){
	try{
		$("#stakeContractAddress").effect("fade", 2500, function() {
			$("#stakeContractAddress").fadeIn();
			$("#stakeContractAddress").on('click',function() {
			window.open(bscScan);
			})
		});
		checkAllowance()
		$('#reflink')[0].innerHTML = thisURL+user.address;
		contractBalances()
		planPercents()
		await getTotalNumberOfDeposits()
		getUserDepositInfo()
		getUserReferrer()
		getUserCheckpoint()
		getUserReferralTotalBonus()
		getUserDownlineCount()
		getUserTotalDeposits()
		getUserAvailable()
		getUserReferralWithdrawn()
		getUserReferralBonus()
		getUserWithdrawTime()
		
		$('.contract-address')[0].innerHTML = `<a class="btn btn-sm btn-primary display-5" href="https://bscscan.com/address/`+tokenAddress+`" target="_blank"><br>Contract Address\n` + tokenAddress + `</a></div>`
	}catch(e){
		alert(e)
		console.log(e)
	}
	setTimeout(() => {
		startUp()
	}, 10000)
}

async function stake(planId){
	let ref
	if(validateErcAddress(user.ref))
		ref = user.ref
	else if(user.ref == user.address)
		ref = zeroAdddress
	else 
		ref = zeroAddress
	
	let stakeAmount = $('#plan'+(planId+1)+'amount')[0].value * 1e18
	let userBal = await tokenContract.methods.balanceOf(user.address).call()
	console.log( parseInt(stakeAmount) )
	console.log(userBal)
	if(stakeAmount > userBal)
		stakeAmount = toHexString(userBal)
	else
		stakeAmount = toHexString($('#plan'+(planId+1)+'amount')[0].value * 1e18)

	$('#plan'+(planId+1)+'amount')[0].value = parseInt(stakeAmount) / 1e18
	$('#plan'+(planId+1)+'Total')[0].innerHTML = (parseFloat(stakeAmount * plans[planId].totalPercent / 100 / 1e18)).toFixed(3);

	console.log( parseInt(stakeAmount) )
	if(stakeAmount > 0)
		await stakeContract.methods.invest(ref, planId, stakeAmount).send({
			from: user.address
		}).then(res => {
			alert( 'TX Hash\n https://bscscan.com/tx/'+res.blockHash+ '\nReferrer\n'+ref );
			getTotalNumberOfDeposits()
			getUserDepositInfo()
			console.log(res)
		})
	else
		alert("You have no tokens to stake.")
}
  
$('#withdraw').on('click', function() {      
  return new Promise(async (resolve, reject) => {
		stakeContract.methods.withdraw().send({
			from:user.address
		}).on("transactionHash", async (hash) => {
			//console.log("transactionHash: ", hash);
			$("#withDrawId").text(hash);
		}).then(getUserDividends())
  })
});
  //Read Function
  async function getUserDividends() {
    
    return new Promise(async (resolve, reject) => {
      let reward=await stakeContract.methods.getUserDividends(user.address).call();
      $("#getUserDividends").text("Dividend:" +web3.utils.fromWei(reward),"ether"+"  "+ "SQD");
    })}
    async function getPercent() {
      let planId=$("#getPercentPlanId").val();
      
      return new Promise(async (resolve, reject) => {
        let percent=await stakeContract.methods.getPercent(planId).call();
        $("#percentage").text("percentage:" +percent/100+"%");
      })
}
let totalUserDeposits
async function getTotalNumberOfDeposits() {
    totalUserDeposits = await stakeContract.methods.getUserAmountOfDeposits(user.address).call();
    $("#TotalNumberOfDeposits").text("Total: "+totalUserDeposits);
}
async function getUserWithdrawTime() {
    lastWithdrawTime = await stakeContract.methods.getUserWithdrawTime(user.address).call();
	nextWithdraw = parseInt(lastWithdrawTime) + 86400;
	getWithdrawTimer();
	//console.log("withdraw time",lastWithdrawTime);
}
async function getUserAvailable() {
  
  return new Promise(async (resolve, reject) => {
    let data=await stakeContract.methods.getUserAvailable(user.address).call();
    dataTrunc = data / 1e18;
    //console.log("available",data);
    $("#getUserAvailable").text(abrNum(dataTrunc, 4)+" "+"SQD");
  })
}
async function getUserReferralBonus() {
  
  return new Promise(async (resolve, reject) => {
    let data=await stakeContract.methods.getUserReferralBonus(user.address).call();
	dataTrunc = data / 1e18;
    //console.log("data",data);
    $("#getUserReferralBonus").text(abrNum(dataTrunc, 4)+" "+"SQD");
  })
}
async function getUserReferralWithdrawn() {
  
  return new Promise(async (resolve, reject) => {
    let data=await stakeContract.methods.getUserReferralWithdrawn(user.address).call();
	dataTrunc = data / 1e18;
    //console.log("data",data);
    $("#getUserReferralWithdrawn").text(abrNum(dataTrunc, 4)+" "+"SQD");
  })
}
async function getUserTotalDeposits() {
    let depositData = await stakeContract.methods.getUserTotalDeposits(user.address).call();
	depositDataTrunc = depositData / 1e18;
    //console.log("depositTotal",depositData);
    $("#getUserTotalDeposits").text(abrNum(depositDataTrunc, 4)+" "+"SQD");
	userTokens = await tokenContract.methods.balanceOf(user.address).call() / 1e18;
	$("#user-tokens").text("Bal: " + abrNum(userTokens, 2) + " SQD");
}
async function getUserDownlineCount() {
  
  return new Promise(async (resolve, reject) => {
    let data=await stakeContract.methods.getUserDownlineCount(user.address).call();
    //console.log("Downline",data);
    downline= $('#getUserDownlineCount')[0].innerHTML = parseInt(data[0]) + parseInt(data[1]) + parseInt(data[2]);
    
    $("#getUserDownlineCountIndex1").text("uint:" +data[0]);
    $("#getUserDownlineCountIndex2").text("uint:" +data[1]);
    $("#getUserDownlineCountIndex3").text("uint:" +data[2]);
  })
}
async function getUserDepositInfo() {
	
	$('.active-stakes')[0].innerHTML = `
	<tr class="container-fluid">
	<td colspan="3"id="getUserDepositInfo1" style="color:red;margin-left: 400px;" class="heading mbr-card-title mbr-fonts-style display-5">Plan</td>
	<td colspan="3"id="getUserDepositInfo2" style="color:red;margin-right: 400px;" class="heading mbr-card-title mbr-fonts-style display-5">Percent</td>
	<td colspan="3"id="getUserDepositInfo3" style="color:red;margin-right: 400px;" class="heading mbr-card-title mbr-fonts-style display-5">Amount</td>
	<td colspan="3"id="getUserDepositInfo4" style="color:red;margin-right: 400px;" class="heading mbr-card-title mbr-fonts-style display-5">Profit</td>
	<td colspan="3"id="getUserDepositInfo5" style="color:red;margin-right: 400px;" class="heading mbr-card-title mbr-fonts-style display-5">Start</td>
	<td colspan="3"id="getUserDepositInfo6" style="color:red;margin-right: 400px;" class="heading mbr-card-title mbr-fonts-style display-5">Finish</td>
	<td colspan="3"id="getUserDepositInfo6" style="color:white;margin-right: 400px;" class="heading mbr-card-title mbr-fonts-style display-5">Status</td>
	
</tr>
	`
	for(let i = 0; i < totalUserDeposits; i++){
		let data = await stakeContract.methods.getUserDepositInfo(user.address, i).call();
		let now = new Date().getTime();
		let isFinished = false;
		let start = (new Date(data[4] * 1000).getMonth()+1) +'/'+ new Date(data[4] * 1000).getDate() 
		let end = (new Date(data[5] * 1000).getMonth()+1) +'/'+ new Date(data[5] * 1000).getDate() +" @ "+ new Date(data[5] * 1000).getHours() +":"+ new Date(data[5] * 1000 / 60 * 60).getMinutes()
		const stakeEnd = data[5] *1000;		
		let distance = parseInt(stakeEnd) - parseInt(now);
		
		if (distance <= 0 ) {
			isFinished = "Completed";
	   } else {
			isFinished ="Still Collecting";
	   }		
		
		try {
			let newRow = `
		<tr class="container-fluid">
				<td colspan="3"id="getUserDepositInfo1" style="margin-right: 400px;padding-right: 40px;" class="mbr-content-title mbr-light mbr-fonts-style display-7">${parseInt(data[0])+1}</td>
				<td colspan="3"id="getUserDepositInfo2" style="margin-right: 400px;padding-right: 40px;" class="mbr-content-title mbr-light mbr-fonts-style display-7">${data[1]/10+"%"}</td>
				<td colspan="3"id="getUserDepositInfo3" style="margin-right: 400px;padding-right: 40px;" class="mbr-content-title mbr-light mbr-fonts-style display-7">${web3.utils.fromWei(data[2], "ether")}</td>
				<td colspan="3"id="getUserDepositInfo4" style="margin-right: 400px;padding-right: 40px;" class="mbr-content-title mbr-light mbr-fonts-style display-7">${web3.utils.fromWei(data[3], "ether")}</td>
				<td colspan="3"id="getUserDepositInfo5" style="margin-right: 400px;padding-right: 40px;" class="mbr-content-title mbr-light mbr-fonts-style display-7">${start}</td>
				<td colspan="3"id="getUserDepositInfo6" style="margin-right: 400px;padding-right: 40px;"class="mbr-content-title mbr-light mbr-fonts-style display-7">${end}</td>
				<td colspan="3"id="isFinished" style="color:red;margin-right: 400px;padding-right: 40px;"class="mbr-content-title mbr-light mbr-fonts-style display-7">${isFinished}</td>
			</tr>
		`
		$('.active-stakes')[0].innerHTML += newRow;
			
		} catch (error) {
			alert(error);
		}
	}	
}

async function getUserReferrer() {
  
  return new Promise(async (resolve, reject) => {
    let data = await stakeContract.methods.getUserReferrer(user.address).call();
    $("#getUserReferrerAddress").text("refferer:" +data);
  })
}
async function getUserCheckpoint() {
  return new Promise(async (resolve, reject) => {
    let data=await stakeContract.methods.getUserCheckpoint(user.address).call();
    $("#getUserCheckpointdata").text("getUserCheckpoint:" +data);
    checkpoint = data;
  })
}
async function getUserReferralTotalBonus() {
  
  return new Promise(async (resolve, reject) => {
    let dataFull = (await stakeContract.methods.getUserReferralTotalBonus(user.address).call() / 1e18);
	let data = abrNum(dataFull, 4)
    $("#getUserReferralTotalBonus").text(data+" "+"SQD");
  })
}
 
function copyToClipboard(reflink) {
	var aux = document.createElement("input");
	aux.setAttribute("value", document.getElementById(reflink).innerHTML);
	document.body.appendChild(aux);
	aux.select();
	document.execCommand("copy");
	document.body.removeChild(aux);
	alert("Copied");
}

function clearSelection() {
    if (window.getSelection) {
        window.getSelection().removeAllRanges()
    } else if (document.selection) {
        document.selection.empty()
    }
}
async function contractBalances(){
	let roundData = await priceFeed.methods.latestRoundData().call()
	let bnbPrice = roundData.answer/1e8

	let contractBalanceFull = (await web3.eth.getBalance(tokenAddress) / 1e18)
	$('#balanceContract').text(prettyReadOut(contractBalanceFull))
	$('#totalBalanceValue').text("($"+prettyReadOut(contractBalanceFull*bnbPrice)+")")

	let totalStakedFull = await stakeContract.methods.totalStaked().call()
	let totalTokens = await tokenContract.methods.totalSupply().call()
	let bnbRec = await tokenContract.methods.calculateEthereumReceived(totalTokens).call() / 1e18
	let totalStakedValue = bnbPrice * bnbRec

	totalStakedFull = totalStakedFull / 1e18
	$('#totalStaked').text(prettyReadOut(totalStakedFull) )
	$('#totalStakedValue').text("($"+prettyReadOut(totalStakedValue)+")")
}

var plans = []
async function planPercents() {
	for(let i = 0; i < 6; i++){
		plans[i] = {
			percent: 0,
			totalPercent: 0,
			day: 0,
			depositAmount: 0,
			total: 0
		}
		let percent = await stakeContract.methods.getPercent(i).call()
		$('#plan'+(i+1)+'Percent')[0].innerHTML = parseFloat(percent/10)+ "%";
		plans[i].percent = percent/10;
		let c = await stakeContract.methods.getPlanInfo(i).call()                   
		plans[i].totalPercent = $('#plan'+(i+1)+'TPercent')[0].innerHTML = (c.time * plans[i].percent).toFixed(2);
		plans[i].day = $('#plan'+(i+1)+'Day')[0].innerHTML = c.time;
		
		plans[i].depositAmount = $('#plan'+(i+1)+'amount').on('input', function(){
			amount = this.value * plans[i].totalPercent / 100
			$('#plan'+(i+1)+'Total')[0].innerHTML = (parseFloat(amount)).toFixed(3);
		});
	}
}
setTimeout(getWithdrawTimer,500);
function getWithdrawTimer() {

	const timeEnd = parseInt(nextWithdraw);
	const milliseconds = timeEnd * 1000 // 1606073880000
	//console.log("timer time",milliseconds);
	
	var x = setInterval(function () {
	  var now = new Date().getTime();
	  var distance = milliseconds - now;
	  //var days = Math.floor(distance / (1000 * 60 * 60 * 24));
	  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
	
	  document.getElementById("withdrawTimer").innerHTML = "Withdraw in: "+hours + "h " + minutes + "m " + seconds + "s ";
	
	  if (distance < 0) {
		clearInterval(x);
		document.getElementById("withdrawTimer").innerHTML = "Withdraw SQD";
	  }
	
	}, 1000);
	}