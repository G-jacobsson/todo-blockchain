import './App.css';
import { ethers } from 'ethers';

if (window.ethereum) {
  window.provider = new ethers.BrowserProvider(window.ethereum);
  console.log(window.provider);
} else {
  console.error('Metamask not found');
}

function App() {
  return <></>;
}

export default App;
