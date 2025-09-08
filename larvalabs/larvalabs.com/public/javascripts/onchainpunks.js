var Onchainpunks = {};

Onchainpunks.ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"uint8","name":"index","type":"uint8"},{"internalType":"bytes","name":"encoding","type":"bytes"},{"internalType":"string","name":"name","type":"string"}],"name":"addAsset","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint64","name":"key1","type":"uint64"},{"internalType":"uint32","name":"value1","type":"uint32"},{"internalType":"uint64","name":"key2","type":"uint64"},{"internalType":"uint32","name":"value2","type":"uint32"},{"internalType":"uint64","name":"key3","type":"uint64"},{"internalType":"uint32","name":"value3","type":"uint32"},{"internalType":"uint64","name":"key4","type":"uint64"},{"internalType":"uint32","name":"value4","type":"uint32"}],"name":"addComposites","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"index","type":"uint8"},{"internalType":"bytes","name":"_punks","type":"bytes"}],"name":"addPunks","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"index","type":"uint16"}],"name":"punkAttributes","constant": true,"outputs":[{"internalType":"string","name":"text","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"index","type":"uint16"}],"name":"punkImage","constant": true,"outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"index","type":"uint16"}],"constant": true,"name":"punkImageSvg","outputs":[{"internalType":"string","name":"svg","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sealContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes","name":"_palette","type":"bytes"}],"name":"setPalette","outputs":[],"stateMutability":"nonpayable","type":"function"}];

window.addEventListener('load', function() {
    console.log("LOAD EVENT");
    // Modern dapp browsers...
    if (window.ethereum) {
        let web3 = new Web3(ethereum);
        window.web3 = web3;
    }
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    else if (typeof web3 !== 'undefined') {
        // Use Mist/MetaMask's provider
        console.log("- Found web3");
        // window.web3 = new Web3(web3.currentProvider);
        let web3 = new Web3(web3.currentProvider);
        window.web3 = web3;
    } else {
        window.web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/90880ea69ac546a091223cba5f884868"));
    }
    var contractAddress = "0x16F5A35647D6F03D5D3da7b35409D65ba03aF3B2";
    Onchainpunks.contract = web3.eth.contract(Onchainpunks.ABI).at(contractAddress);
});

var startApp = async () => {
    await ethereum.enable();
    web3.eth.defaultAccount = web3.eth.accounts[0];
};

var queryPunk = function (index) {
    Onchainpunks.contract.punkImageSvg(index, function(error, result) {
        if(!error) {
            result = result.replace("data:image/svg+xml;utf8,", "");
            document.getElementById('punkSvg').innerHTML = result;
        } else {
            console.log(error);
        }
    });
    Onchainpunks.contract.punkAttributes(index, function(error, result){
        if(!error)
            document.getElementById('punkAttributes').textContent = result;
        else
            console.log(error);
    });
    return true;
};

