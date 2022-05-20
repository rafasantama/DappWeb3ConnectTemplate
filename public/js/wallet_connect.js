import metamaskConfig from './connection.js';
import { ethers } from './ethers-5.1.esm.min.js';
Swal.fire({
    imageUrl: '../img/loader.gif',
    title: 'Verificando usuario...',
    text: 'Estamos verificando el usuario en la Blockchain. Espere unos segundos porfavor.',
    showConfirmButton: false
})

const onboardButton = document.getElementById('connectButton');
const onboardButtonNav = document.getElementById('connectButtonNav');
const metamaskMessage = document.getElementById('metamask_message');

const onClickConnect = async() => {
    try {
        const newAccounts = await ethereum.request({
            method: 'eth_requestAccounts',

        });
        console.log('Se conectó Metamask...')
    } catch (error) {
        console.error(error);
    }
};

if (window.ethereum) {
    let accounts = await window.ethereum.request({ method: 'eth_accounts' });
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });

    console.log('Metamask is Installed!');
    console.log(accounts);
    console.log(chainId);

} else {
    // Show alert if Ethereum provider is not detected
    console.log('Metamask is not Installed!')
    alert("Please install Mask");
}

let accounts = await window.ethereum.request({ method: 'eth_accounts' });
console.log("...............")
console.log(accounts);

if (window.ethereum && accounts != '') {
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    if (chainId != '0x4') {
        // await ethereum.request({
        //     method: 'wallet_addEthereumChain',
        //     params: [{
        //         //chainId: '0x38',
        //         chainId: '0xaef3',
        //         //rpcUrls: ['https://bsc-dataseed.binance.org/'],
        //         rpcUrls: ['https://alfajores-forno.celo-testnet.org'],
        //         //chainName: 'Binance Smart Chain',
        //         chainName: 'Alfajores',
        //         nativeCurrency: { name: 'CELO', decimals: 18, symbol: 'CELO' },
        //         //blockExplorerUrls: ['https://bscscan.com/'],
        //         blockExplorerUrls: ['https://alfajores-blockscout.celo-testnet.org'],
        //     }, ],
        // });

        await ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{
                chainId: '0x4',
            }, ],
        });

        location.reload();
    }
    console.log('Metamask is connected!')
    onboardButton.style.display = 'none';
    onboardButtonNav.style.display = 'none';
    metamaskMessage.style.display = 'none';

    const connect = document.getElementById('connectToWallet');
    const account = await metamaskConfig.getAccount();

    // event triggered when account is changed in metamask
    ethereum.on('accountsChanged', async(accounts) => {

            console.log('Account changed from', account)
            showAccount.innerText = await signer.getAddress();
            setTimeout(Swal.close(),3000);
        })
        // event triggered when metamask is connected to chain and can make rpc request
    ethereum.on('connect', (chainId) => {
        console.log(chainId)
        console.log('Metamask Connected:', ethereum.isConnected())
    })

    // event triggered when metamask is disconnected from chain and can not make rpc request
    ethereum.on('disconnect', (chainId) => {
        console.log(chainId)
        console.log('Metamask Connected:', ethereum.isConnected())
        alert('Metamask is not connected to Rinkeby network. Retry!')
    })
    let getAccountAddress = await metamaskConfig.getAccount();

    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    // Prompt user for account connections
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    console.log("Account:", await signer.getAddress());
    console.log("Solo hace falta firmar........");
    console.log(getAccountAddress);
    document.getElementById('connectButtonNav').innerHTML=getAccountAddress;
    document.getElementById('showAccount').innerHTML=getAccountAddress;
    // console.log(document.getElementById("file_hash").innerHTML);
    document.getElementById('metamask_message').style.display = 'none';
    document.getElementById('web3_container').style.display = 'block';

    setTimeout(Swal.close(),3000);

} else {
    onboardButton.onclick = onClickConnect;
    onboardButtonNav.onclick = onClickConnect;
    console.log('Metamask is not connected')
    document.getElementById('web3_container').style.display = 'none';
    document.getElementById('metamask_message').style.display = 'block';
    setTimeout(Swal.close(),3000);
};

ethereum.on('accountsChanged', async(accounts) => {
    console.log('Account changed from', accounts)
    location.reload();
});
/**
 * Number.prototype.format(n, x, s, c)
 * 
 * @param integer n: length of decimal
 * @param integer x: length of whole part
 * @param mixed   s: sections delimiter
 * @param mixed   c: decimal delimiter
 */
 function format(number, n, x, s, c) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
        num = number.toFixed(Math.max(0, ~~n));

    return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
};

