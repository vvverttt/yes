var Cryptopunks = {};

Cryptopunks.CONTRACT_ADDRESS = "0xd4e4078ca3495de5b1d4db434bebc5a986197782";
Cryptopunks.NULL_ADDRESS = "0x0000000000000000000000000000000000000000";
Cryptopunks.TX_HASHES = "_Autoglpyhs_Hashes";
Cryptopunks.TX_DIV_ID = "#pendingTransactions";
Cryptopunks.EVENT_START_BLOCK = 3914490;
Cryptopunks.ETHER_CONVERSION = {USD: 230.999999};

Cryptopunks.currentPunkIndex = -1;

Cryptopunks.gasPrice = 40 * 1000000001;

Cryptopunks.PunkState = {
	web3Queried: false,
    web3ready: false,
    web3UsingInfura: false,
    web3NotPresent: false,
    accountQueried: false,
    accountUnlocked: false,
    account: null,
    accountHasBalance: false,
    accountBalanceInWei: 0,
    accountBalanceInEther: 0,
    transactions: [],
    isOwned: true,
    isOwner: false,
    canBuy: false,
    forSale: false,
    hasBid: false,
    ownsBid: false,
    punkData: {
	    loadComplete: false,
	    punkIndex: -1,
        owner: Cryptopunks.NULL_ADDRESS,
        offerValue: 0,
        onlySellTo: Cryptopunks.NULL_ADDRESS,
        bidder: Cryptopunks.NULL_ADDRESS,
        bidValue: 0,
    },
    events: {
	    allSorted: [],
	    transfers: [],
	    bids: [],
	    bidsWithdrawn: [],
	    bought: [],
	    offeredForSale: [],
        claimed: []
    },
    loadingDone: {
	    owner: false,
	    bid: false,
        offer: false,
        eventsClaimed: false
    },
    postCreateReload: false,
    createTransactionHash: null,
};

Cryptopunks.ABI = [{"constant":true,"inputs":[{"name":"_interfaceID","type":"bytes4"}],"name":"supportsInterface","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"TOKEN_LIMIT","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"_name","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_approved","type":"address"},{"name":"_tokenId","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"ARTIST_PRINTS","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"BENEFICIARY","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_id","type":"uint256"}],"name":"symbolScheme","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"id","type":"uint256"}],"name":"draw","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_id","type":"uint256"}],"name":"creator","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"name":"_owner","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"PRICE","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"_symbol","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_operator","type":"address"},{"name":"_approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_tokenId","type":"uint256"},{"name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"seed","type":"uint256"}],"name":"createGlyph","outputs":[{"name":"","type":"string"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"index","type":"uint256"},{"indexed":true,"name":"a","type":"address"},{"indexed":false,"name":"value","type":"string"}],"name":"Generated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":true,"name":"_tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_approved","type":"address"},{"indexed":true,"name":"_tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_operator","type":"address"},{"indexed":false,"name":"_approved","type":"bool"}],"name":"ApprovalForAll","type":"event"}];

Vue.component('account-link', {
    props: ['account'],
    template: '<a v-bind:href="\'/cryptopunks/accountInfo?account=\'+account">{{ account.substring(0,8) }}</a>'
});

Vue.component('glyph-transaction-link', {
    props: ['hash', 'linktext'],
    template: '<a v-bind:href="\'/autoglyphs/glyphForTransaction?hash=\'+hash">{{ linktext }}</a>'
});

Vue.component('transaction-link', {
    props: ['hash'],
    template: '<a v-bind:href="\'https://etherscan.io/tx/\'+hash">{{hash.substring(0,8)}}</a>'
});

Vue.component('value-display', {
    data: function() {
        return {
            etherConversion: Cryptopunks.ETHER_CONVERSION
        };
    },
    props: ['amount', 'short'],
    computed: {
        valueStr: function() {
            var ether = web3.fromWei(Cryptopunks.GLYPH_PURCHASE_COST, 'ether').toNumber();
            var usdVal = (ether * this.etherConversion.USD);
            var usdValStr = '$'+usdVal.toFixed(2);

            var fractionDigits = 2;
            if (this.short) fractionDigits = 0;

            var formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: fractionDigits,
                maximumFractionDigits: fractionDigits,
            });
            if (formatter) {
                usdValStr = formatter.format(usdVal);
            }

            // The divide by 1 here removes trailing zeros
            if (this.short) {
                return '' + (ether.toPrecision(4) / 1) + ' (' + usdValStr + ')';
            } else {
                return '' + (ether.toPrecision(4) / 1) + ' ETH (' + usdValStr + ' USD)';
            }
        }
    },
    template: '<span>{{valueStr}}</span>'
});

var autoglyphCreate = new Vue({
    el: '#create_autoglpyh',
    data: {
        state: Cryptopunks.PunkState
    },
    computed: {
        accountShort: function() {
            if (this.state.accountUnlocked) {
                return this.state.account.substring(0,10);
            } else {
                return "none";
            }
        },
        hasPendingTransaction: function() {
            var items = Cryptopunks.PunkState.transactions;
            // console.log("Transactions: " + items);
            for (i = 0; i < items.length; i++) {
                var item = items[i];
                if (item.pending) {
                    return true;
                }
            }
            return false;
        },
        accountMessage: function() {
            if (this.state.web3UsingInfura) {
                return "Please download Metamask"
            } else if (this.state.accountUnlocked) {
                return this.state.account;
            } else {
                return "Allow access to Metamask below"
            }
        }
    }
});

window.addEventListener('load', function() {
	console.log("LOAD EVENT");
    var width = $(window).width();
    // Modern dapp browsers...
    if (window.ethereum) {
        web3 = new Web3(ethereum);
        window.web3 = web3;
    }
	// Checking if Web3 has been injected by the browser (Mist/MetaMask)
	else if (typeof web3 !== 'undefined') {
		// Use Mist/MetaMask's provider
		console.log("- Found web3");
		// window.web3 = new Web3(web3.currentProvider);
        web3 = new Web3(web3.currentProvider);
		window.web3 = web3;
    } else {
		console.log("- Didn't find web3.");
		// console.log('No web3? You should consider trying MetaMask!')
        // console.log("Jquery width: " + width);
/*
        if (width > 576) {
            Cryptopunks.PunkState.web3NotPresent = true;
        }
*/
		// fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
        // window.web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/90880ea69ac546a091223cba5f884868"));
        // Cryptopunks.PunkState.web3UsingInfura = true;
    }
	Cryptopunks.PunkState.web3Queried = true;

    startApp();
});

var startApp = function () {

	if (web3) {
		console.log("Found web3.");
		var MyContract = web3.eth.contract(Cryptopunks.ABI);
        Cryptopunks.punkContract = MyContract.at(Cryptopunks.CONTRACT_ADDRESS);
        Cryptopunks.PunkState.web3ready = true;

        if (typeof cryptopunksContractLoadedCallback !== 'undefined' && Cryptopunks.PunkState.web3UsingInfura) {
            cryptopunksContractLoadedCallback();
        }

        Cryptopunks.clearTransactions();

        /*
        var test = Cryptopunks.punkContract.totalSupply(function(error, result){
            if(!error)
                console.log(result);
            else
                console.log(error);
        });
        */

        var accountInterval = setInterval(function() {
            web3.eth.getAccounts(function(err, accounts) {
                // console.log(accounts);
                if (accounts[0] !== Cryptopunks.PunkState.account) {
                    console.log("Metamask account changed: "+accounts[0]);
                    Cryptopunks.PunkState.account = accounts[0];
                    web3.eth.defaultAccount = accounts[0];
                    Cryptopunks.punkContract.defaultAccount = accounts[0];
                    if (Cryptopunks.PunkState.account === undefined) {
                        Cryptopunks.PunkState.accountUnlocked = false;
                    } else {
                        // Cryptopunks.refreshPendingWidthdrawals();
                        // Cryptopunks.showPunkActions(${punkIndex});

                        Cryptopunks.PunkState.accountUnlocked = true;
                    }

                    if (typeof cryptopunksContractLoadedCallback !== 'undefined') {
                        cryptopunksContractLoadedCallback();
                    }
                }
                Cryptopunks.PunkState.accountQueried = true;
            });
        }, 100);

        Cryptopunks.restoreTransactions();
        setInterval(Cryptopunks.checkTransactions, 1000);

        $.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD', function(data) {
            Cryptopunks.ETHER_CONVERSION.USD = data.USD;
            console.log("Value of ether now " + Cryptopunks.ETHER_CONVERSION.USD);
        })

        $.get('https://ethgasstation.info/json/ethgasAPI.json', function(data) {
            if (data.fast) {
                var gasPriceGwei = data.fast/10
                console.log("Fast gas price in gwei: " + gasPriceGwei)
                Cryptopunks.gasPrice = web3.toWei(gasPriceGwei, "gwei");
                console.log("Gas price now " + Cryptopunks.gasPrice);
            }
        })
	}
};

Cryptopunks.createGlyph = function(seed, price) {
    Cryptopunks.punkContract.createGlyph(seed, {gas: 4000000, gasPrice: Cryptopunks.gasPrice, value: price}, function(error, result) {
        if(!error) {
            console.log(result);
            console.log("Success!");
            Cryptopunks.PunkState.createTransactionHash = result;
            Cryptopunks.trackTransaction("Create", result);
        } else {
            console.log(error);
            console.log("Failure.");
        }
    });
    return true;
};

Cryptopunks.test = function() {
    Cryptopunks.punkContract.totalSupply(function(error, result){
        if(!error)
            console.log("Total supply: " + result);
        else
            console.log(error);
    });
	return true;
};

Cryptopunks.requestMetamaskAccess = async () => {
    try {
        // Request account access if needed
        console.log("Requesting metamask access...");
        await ethereum.enable();
        // Acccounts now exposed
        // web3.eth.sendTransaction({/* ... */});
    } catch (error) {
        // User denied account access...
    }
}

var allEventsContainsEvent = function(item) {
    for (var i = 0; i < Cryptopunks.PunkState.events.allSorted.length; i++) {
        var obj = Cryptopunks.PunkState.events.allSorted[i];
        if (obj.transactionHash === item.transactionHash) {
            return true;
        }
        if (item.blockNumber > obj.blockNumber) {
            // No need to lok any further
            return false;
        }
    }
    return false;
};

Cryptopunks.addToAllEvents = function(event) {
    if (!allEventsContainsEvent(event)) {
        Cryptopunks.PunkState.events.allSorted.push(event);
        Cryptopunks.PunkState.events.allSorted.sort(function (a, b) {
            return b.blockNumber - a.blockNumber;
        })
    }
};

Cryptopunks.clearTransactions = function() {
	localStorage.setItem(Cryptopunks.TX_HASHES, JSON.stringify([]));
	Cryptopunks.PunkState.transactions = [];
	// $(Cryptopunks.TX_DIV_ID).html('');
};

Cryptopunks.restoreTransactions = function() {
	var storedData = localStorage.getItem(Cryptopunks.TX_HASHES);
	var items = [];
	if (storedData) {
		items = JSON.parse(storedData);
	}
    console.log("Restored transactions from local storage, length: "+items.length);
	Cryptopunks.PunkState.transactions = items;

	// Clear content
/*
	for (i = 0; i < items.length; i++) {
		var item = items[i];
		Cryptopunks.showTransaction(item);
	}
*/
};

Cryptopunks.showTransaction = function(transaction) {
	var div = $(Cryptopunks.TX_DIV_ID);
	if (transaction.failed) {
		div.append('<p id="' + transaction.hash + '">' + transaction.name + ' <i>failed</i>.</p>');
	} else {
		div.append('<p id="' + transaction.hash + '"><a href="https://etherscan.io/tx/' + transaction.hash + '">' + transaction.name + '</a> <i>pending</i>.</p>');
	}

};

Cryptopunks.trackTransaction = function(name, hash) {
	var storedData = localStorage.getItem(Cryptopunks.TX_HASHES);
	var hashes = [];
	if (storedData) {
		hashes = JSON.parse(storedData);
	}
	var transaction = {
		'name' : name,
		'hash' : hash,
		'pending' : true
	};
	hashes.push(transaction);
	localStorage.setItem(Cryptopunks.TX_HASHES, JSON.stringify(hashes));
	Cryptopunks.PunkState.transactions = hashes;
	// Cryptopunks.showTransaction(transaction);
};

Cryptopunks.showFailure = function(name) {
	var transaction = {
		'name' : name,
		'hash' : '0x0',
		'pending' : false,
		'failed' : true
	};
    Cryptopunks.PunkState.transactions.push(transaction);
	// Cryptopunks.showTransaction(transaction);
};

Cryptopunks.checkTransactions = function() {
	console.log("Checking transactions...");
	var storedData = localStorage.getItem(Cryptopunks.TX_HASHES);
	var items = [];
	if (storedData) {
		items = JSON.parse(storedData);
	}
	Cryptopunks.PunkState.transactions = items;
	// Clear content
	for (i = 0; i < items.length; i++) {
		var item = items[i];
		if (item.pending) {
			web3.eth.getTransaction(item.hash, function (error, result) {
				if (!error) {
					if (result) {
						// console.log(result);
						if (result.blockNumber) {
							// Completed.
							// $('#' + item.hash + ' i').text("completed");
							item.pending = false;
                            console.log("Reloading glyphs...");
                            Cryptopunks.triggerServerGlyphReload()

							localStorage.setItem(Cryptopunks.TX_HASHES, JSON.stringify(items));
						}
					}
				} else {
					console.log(error);
					console.log("Failure.");
				}
			});
		} else {
			// items.splice(i, 1);
			// i--;
		}
	}
	localStorage.setItem(Cryptopunks.TX_HASHES, JSON.stringify(items));
};

Cryptopunks.triggerServerGlyphReload = function() {
	console.log("About to reload.");
	$.ajax({

		url : "/autoglyphs/loadNewGlyphs",
		type : 'GET',
		data : {
		},
		dataType:'text',
		success : function(data) {
			console.log("Reloaded glyphs.");

			Cryptopunks.PunkState.postCreateReload = true;
		},
		error : function(request,error)
		{
			console.log("Reload error.");
		}
	});
}

$(document).ready(function() {
    $('#autoglyph-font').change(function () {
        let font = $(this).val();
        // $('#autoglyphs-text').css("font-family", '');
        $('#autoglyphs-text').css("font-family", font);
    });
});