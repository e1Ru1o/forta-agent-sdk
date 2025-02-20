import { createBlockEvent, createTransactionEvent, formatAddress, keccak256 } from "."
import { BlockEvent, EventType, Network, TransactionEvent } from "../../sdk"

describe("keccak256", () => {
  it("generates correct hash", () => {
    const str = "some string"

    const hash = keccak256(str)

    expect(hash).toEqual("0x83c737ad570e9f3e71e0d2800958e44770d812e92db2c1758626613d1e6ba514")
  })
})

describe("formatAddress", () => {
  it("correctly formats address", () => {
    const address = "0xABC123DEF"

    const formattedAddress = formatAddress(address)

    expect(formattedAddress).toEqual("0xabc123def")
  })
})

describe("createBlockEvent", () => {
  it("returns correctly formatted BlockEvent", () => {
    const networkId = 1
    const web3Block = {
      "baseFeePerGas": "0x1b9d3f158b",
      "difficulty": "9130034435939756",
      "extraData": "0xe4b883e5bda9e7a59ee4bb99e9b1bc090721",
      "gasLimit": 30029295,
      "gasUsed": 21829296,
      "hash": "0x550bf22138e7cd31602ecc180fac4e1d719ac52cfad41c8320078683a3b90859",
      "logsBloom": "0x04b025210385118f9800b948a02882e1485e804163339070e12f7050c100540820144d50c0885201816450214a00812492b4e00338809ac344004661187132940a04036910f809172b32423a0851ca2027101ad210420e4020040581a0080300020d094407610544894e2e06c8b4a8a20000db6854020440bc044ad0850832b000a165507040228819c21503052a4e3448c200495184080d8224904001d226062349a9c30d677a0d471104992bbf2421302852193030e7201040a1b11b21c2d0548c0466caa9a841a8440880420145482a5182204d02c25af08240c603f3218c19f93b198a32454094010501892651043852684331a709d4000339938083102d",
      "miner": "0x829BD824B016326A401d083B33D092293333A830",
      "mixHash": "0xe8cbde8d58c522b754766a2480f839887a3771ddc84491a1e8b52f512cc14b17",
      "nonce": "0xb226e219ac6add78",
      "number": 13309526,
      "parentHash": "0xa66b125e5bd6a1c27ec6d986eb898796532378552f9aec41b87cdb0d39bb69c1",
      "receiptsRoot": "0xb0d3b93e4ff7e71a75f9a40208a6024d2fed33f5ee7a5f3734979799b8171b3f",
      "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
      "size": 44657,
      "stateRoot": "0x3266f900e7894f13c05b16877d6c362c49981d3b645487cce6f8674e024243c5",
      "timestamp": 1632768366,
      "totalDifficulty": "31393651082871943563908",
      "transactions": [
          {
              "accessList": [],
              "blockHash": "0x550bf22138e7cd31602ecc180fac4e1d719ac52cfad41c8320078683a3b90859",
              "blockNumber": 13309526,
              "chainId": "0x1",
              "from": "0xC9f7bc0Ed37b821A34bFD508059c75460d6EFB37",
              "gas": 634772,
              "gasPrice": "120102274187",
              "hash": "0xfadb14c4d6bc7985583f6aded4d64bd0e071010ff4c29ab341a357550147fb28",
              "input": "0x530ed69400000000000000000000000000000000000000000000000000000000000000050000000000000000000000000000000000000000000000000000000000000005000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000418ed8709d206b533ab0b6fc526987bff7ec7b5eae527062bb09af80f7f578231c0734276e7d4675fdf7c9fbe540578891cf9fac872d8663c7c634afb01c39f9931c00000000000000000000000000000000000000000000000000000000000000",
              "maxFeePerGas": "0x228a814e70",
              "maxPriorityFeePerGas": "0x59682f00",
              "nonce": 387,
              "r": "0x2724a8ec2e2f3f634f04e954cf3b966bf9f734ada1611a44cd435441c83742e1",
              "s": "0x7ae8047b83dc285a32f9fe6fb0b84927fc789e2a411ea2616deb3efd7c77a9a2",
              "to": "0x127E479Ac59A1EA76AfdEDf830fEcc2909aA4cAE",
              "transactionIndex": 0,
              "type": "0x2",
              "v": "0x0",
              "value": "400000000000000000"
          }
      ],
      "transactionsRoot": "0xb5bbf490945d26e4f0c5ca88f8ca12807abcfd46f272de2712d814a43bdeef44",
      "uncles": []
    } as any

    const blockEvent = createBlockEvent(web3Block, networkId)

    expect(blockEvent).toBeInstanceOf(BlockEvent)
    expect(blockEvent.type).toEqual(EventType.BLOCK)
    expect(blockEvent.network).toEqual(Network.MAINNET)
    expect(blockEvent.blockHash).toEqual(web3Block.hash)
    expect(blockEvent.blockNumber).toEqual(web3Block.number)
    expect(blockEvent.block).toStrictEqual({
      difficulty: web3Block.difficulty.toString(),
      extraData: web3Block.extraData,
      gasLimit: web3Block.gasLimit.toString(),
      gasUsed: web3Block.gasUsed.toString(),
      hash: web3Block.hash,
      logsBloom: web3Block.logsBloom,
      miner: formatAddress(web3Block.miner),
      mixHash: web3Block.mixHash,
      nonce: web3Block.nonce,
      number: web3Block.number,
      parentHash: web3Block.parentHash,
      receiptsRoot: web3Block.receiptsRoot,
      sha3Uncles: web3Block.sha3Uncles,
      size: web3Block.size.toString(),
      stateRoot: web3Block.stateRoot,
      timestamp: web3Block.timestamp,
      totalDifficulty: web3Block.totalDifficulty.toString(),
      transactions: web3Block.transactions.map((tx: any) => tx.hash),
      transactionsRoot: web3Block.transactionsRoot,
      uncles: web3Block.uncles
    })
  })
})

describe("createTransactionEvent", () => {
  it("returns correctly formatted TransactionEvent", () => {
    const networkId = 1
    const web3Block = {
      "hash": "0x550bf22138e7cd31602ecc180fac4e1d719ac52cfad41c8320078683a3b90859",
      "number": 13309526,
      "timestamp": 1632768366,
      "transactions": [
          {
              "accessList": [],
              "blockHash": "0x550bf22138e7cd31602ecc180fac4e1d719ac52cfad41c8320078683a3b90859",
              "blockNumber": 13309526,
              "chainId": "0x1",
              "from": "0xC9f7bc0Ed37b821A34bFD508059c75460d6EFB37",
              "gas": 634772,
              "gasPrice": "120102274187",
              "hash": "0xfadb14c4d6bc7985583f6aded4d64bd0e071010ff4c29ab341a357550147fb28",
              "input": "0x530ed69400000000000000000000000000000000000000000000000000000000000000050000000000000000000000000000000000000000000000000000000000000005000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000418ed8709d206b533ab0b6fc526987bff7ec7b5eae527062bb09af80f7f578231c0734276e7d4675fdf7c9fbe540578891cf9fac872d8663c7c634afb01c39f9931c00000000000000000000000000000000000000000000000000000000000000",
              "maxFeePerGas": "0x228a814e70",
              "maxPriorityFeePerGas": "0x59682f00",
              "nonce": 387,
              "r": "0x2724a8ec2e2f3f634f04e954cf3b966bf9f734ada1611a44cd435441c83742e1",
              "s": "0x7ae8047b83dc285a32f9fe6fb0b84927fc789e2a411ea2616deb3efd7c77a9a2",
              "to": "0x127E479Ac59A1EA76AfdEDf830fEcc2909aA4cAE",
              "transactionIndex": 0,
              "type": "0x2",
              "v": "0x0",
              "value": "400000000000000000"
          }
      ],
    } as any
    const web3Receipt = {
      "blockHash": "0x550bf22138e7cd31602ecc180fac4e1d719ac52cfad41c8320078683a3b90859",
      "blockNumber": 13309526,
      "contractAddress": "0x351d579AC59a1ea76afdedf567becc3518ee5deb",
      "cumulativeGasUsed": 634772,
      "effectiveGasPrice": "0x1bf6a7448b",
      "from": "0xc9f7bc0ed37b821a34bfd508059c75460d6efb37",
      "gasUsed": 634772,
      "logs": [{
        "address": "0xB9f7bc0Ed37b821A34bFD508059c75460d6EFB37",
        "topics": ["topic1"],
        "data": "0xdata",
        "logIndex": 1,
        "blockNumber": 13309526,
        "blockHash": "0x550bf22138e7cd31602ecc180fac4e1d719ac52cfad41c8320078683a3b90859",
        "transactionIndex": 1,
        "transactionHash": "0xfadb14c4d6bc7985583f6aded4d64bd0e071010ff4c29ab341a357550147fb28"
      }],
      "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
      "status": false,
      "to": "0x127e479ac59a1ea76afdedf830fecc2909aa4cae",
      "transactionHash": "0xfadb14c4d6bc7985583f6aded4d64bd0e071010ff4c29ab341a357550147fb28",
      "transactionIndex": 0,
      "type": "0x2"
    } as any
    const traces: any = [{
      "blockHash": "0x550bf22138e7cd31602ecc180fac4e1d719ac52cfad41c8320078683a3b90859",
      "blockNumber": 13309526,
      "result": {
        "gasUsed": "12345",
        "address": "0xC9f7bc0Ed37b821A34bFD508059c75460d6EFB37",
        "code": "1",
        "output": "0x01"
      },
      "action": {
        "callType": "someType",
        "to": "0xC9f7bc0Ed37b821A34bFD508059c75460d6EFB37",
        "input": "0xinput",
        "from": "0xc9F7bc0ed37b821A34bfd508069c75460d6efb37",
        "value": "500",
        "init": "xyz",
        "address": "0xC9f7bc0Ed37b821A34bFD508059c75460d6EFB38",
        "balance": "100",
        "refundAddress": "0xC9f7bc0Ed37b821A34bFD508059c75460d6EFB56"
      },
      "subtraces": 5,
      "traceAddress": [1, 2],
      "transactionHash": "0xfadb14c4d6bc7985583f6aded4d64bd0e071010ff4c29ab341a357550147fb28",
      "transactionPosition": 1,
      "type": "call",
      "error": ""
    }]

    const txEvent = createTransactionEvent(web3Receipt, web3Block, networkId, traces)

    expect(txEvent).toBeInstanceOf(TransactionEvent)
    expect(txEvent.type).toEqual(EventType.BLOCK)
    expect(txEvent.network).toEqual(Network.MAINNET)
    const web3Tx = web3Block.transactions[0]
    expect(txEvent.transaction).toStrictEqual({
      hash: web3Tx.hash,
      from: formatAddress(web3Tx.from),
      to: formatAddress(web3Tx.to),
      nonce: web3Tx.nonce,
      gas: web3Tx.gas.toString(),
      gasPrice: web3Tx.gasPrice,
      value: web3Tx.value,
      data: web3Tx.input,
      r: web3Tx.r,
      s: web3Tx.s,
      v: web3Tx.v
    })
    const web3Log = web3Receipt.logs[0]
    expect(txEvent.receipt).toStrictEqual({
      blockNumber: web3Receipt.blockNumber,
      blockHash: web3Receipt.blockHash,
      transactionIndex: web3Receipt.transactionIndex,
      transactionHash: web3Receipt.transactionHash,
      status: web3Receipt.status,
      logsBloom: web3Receipt.logsBloom,
      contractAddress: formatAddress(web3Receipt.contractAddress),
      gasUsed: web3Receipt.gasUsed.toString(),
      cumulativeGasUsed: web3Receipt.cumulativeGasUsed.toString(),
      root: '',
      logs: [{
        address: formatAddress(web3Log.address),
        topics: web3Log.topics,
        data: web3Log.data,
        logIndex: web3Log.logIndex,
        blockNumber: web3Log.blockNumber,
        blockHash: web3Log.blockHash,
        transactionIndex: web3Log.transactionIndex,
        transactionHash: web3Log.transactionHash,
        removed: false
      }]
    })
    expect(txEvent.traces).toStrictEqual(traces.map((trace: any) => ({
      action: {
        callType: trace.action.callType,
        to: formatAddress(trace.action.to),
        input: trace.action.input,
        from: formatAddress(trace.action.from),
        value: trace.action.value,
        init: trace.action.init,
        address: formatAddress(trace.action.address),
        balance: trace.action.balance,
        refundAddress: formatAddress(trace.action.refundAddress),
      },
      blockHash: trace.blockHash,
      blockNumber: trace.blockNumber,
      result: {
        gasUsed: trace.result.gasUsed,
        address: trace.result.address,
        code: trace.result.code,
        output: trace.result.output
      },
      subtraces: trace.subtraces,
      traceAddress: trace.traceAddress,
      transactionHash: trace.transactionHash,
      transactionPosition: trace.transactionPosition,
      type: trace.type,
      error: trace.error,
    })))
    const traceAction = traces[0].action
    expect(txEvent.addresses).toStrictEqual({
      [formatAddress(web3Tx.from)]: true,
      [formatAddress(web3Tx.to)]: true,
      [formatAddress(web3Log.address)]: true,
      [formatAddress(traceAction.address)]: true,
      [formatAddress(traceAction.refundAddress)]: true,
      [formatAddress(traceAction.to)]: true,
      [formatAddress(traceAction.from)]: true,
    })
    expect(txEvent.block).toStrictEqual({
      hash: web3Block.hash,
      number: web3Block.number,
      timestamp: web3Block.timestamp
    })
  })
})