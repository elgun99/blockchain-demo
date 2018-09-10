import React from 'react';
import Block from '../components/Block';
import AddBlock from '../components/AddBlock';
import './App.css';
const {Blockchain} = require('../components/Blockchain');

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      blockchain: new Blockchain(),
      addData: ''
    }
  }

  onClick(i) {
    let bchain = this.state.blockchain;
    if(bchain.chain[i].index !== 0) {
      bchain.chain[i].previousHash = bchain.chain[i - 1].hash;
    }
    bchain.fixNonce(bchain.chain[i]);
    this.setState({blockchain: bchain}, () => console.log(this.state));
  }
  onAddClick(e) {
    let bchain = this.state.blockchain;
    bchain.addToChain(bchain.createBlock(this.state.addData));
    this.setState({blockchain: bchain, addData: ''}, () => console.log(this.state));
  }
  onChange(i, e) {
    let bchain = this.state.blockchain;
    bchain.chain[i].data = e.target.value;
    this.setState({blockchain: bchain}, () => console.log(this.state));
  }
  onAddChange = (e) => {
    this.setState({addData: e.target.value}, () => console.log(this.state));
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  render() {
    let chain = this.state.blockchain.getChain();
    let pvBlock = {};
    let renderChain = chain.map((block) => {
      let blockBackGround = "bg-washed-green";
      let blockButtonColor= "blue-grey";
      let blockHashOptions= "f6 ba br2 b--dashed green-text";
      let check = true;
      if(block.index !== 0 && (pvBlock.check === false || !this.state.blockchain.checkNewBlockIsValid(block, pvBlock) || !this.state.blockchain.hashIsValid(block))) {
        blockBackGround = "bg-washed-red";
        blockButtonColor= "success";
        blockHashOptions= "f6 ba br2 b--dashed red-text";
        check = false;
      }
      else if (block.index === 0 && !this.state.blockchain.hashIsValid(block)) {
        blockBackGround = "bg-washed-red";
        blockButtonColor= "success";
        blockHashOptions= "f6 ba br2 b--dashed red-text";
        check = false;
      }
      pvBlock = block;
      pvBlock.check = check;
      return <Block
        onChange={(e) => this.onChange(block.index, e)}
        onClick={() => this.onClick(block.index)}
        index={block.index}
        data={block.data}
        nonce={block.nonce}
        pHash={block.previousHash}
        hash={block.hash}
        background={blockBackGround}
        buttonColor={blockButtonColor}
        hashOptions={blockHashOptions}
        key={block.index}
      />

    }
    );
    renderChain.push(<AddBlock key='2342432432' data={this.state.addData} onChange={this.onAddChange} onClick={this.onAddClick.bind(this)}/>);
    return (
      <div>
        <div id="container">
          <h1>Blockchain Demo</h1>
        </div>
        {renderChain}
      </div>
    );
  }
}

export default App;
