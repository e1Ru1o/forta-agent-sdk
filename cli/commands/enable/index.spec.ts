import provideEnable from "."
import { CommandHandler } from "../.."

describe("enable", () => {
  let enable: CommandHandler
  const mockWeb3AgentRegistry = {
    eth: {
      accounts: {
        wallet: {
          add: jest.fn()
        }
      }
    }
  } as any
  const mockAppendToFile = jest.fn()
  const mockGetCredentials = jest.fn()
  const mockAgentRegistry = {
    agentExists: jest.fn(),
    isDisabled: jest.fn(),
    enableAgent: jest.fn()
  } as any
  const mockAgentId = "0xagentid"

  const resetMocks = () => {
    mockAgentRegistry.agentExists.mockReset()
    mockAgentRegistry.isDisabled.mockReset()
    mockAgentRegistry.enableAgent.mockReset()
  }

  beforeAll(() => {
    enable = provideEnable(
      mockWeb3AgentRegistry, mockAppendToFile, mockGetCredentials, mockAgentRegistry, mockAgentId
    )
  })

  beforeEach(() => {
    resetMocks()
  })

  it("throws error if agent does not exist", async () => {
    mockAgentRegistry.agentExists.mockReturnValueOnce(false)

    try {
      await enable({})
    } catch (e) {
      expect(e.message).toBe(`agent id ${mockAgentId} does not exist`)
    }

    expect(mockAgentRegistry.agentExists).toHaveBeenCalledTimes(1)
    expect(mockAgentRegistry.agentExists).toHaveBeenCalledWith(mockAgentId)
  })

  it("does nothing if agent already enabled", async () => {
    mockAgentRegistry.agentExists.mockReturnValueOnce(true)
    mockAgentRegistry.isDisabled.mockReturnValueOnce(false)

    await enable({})

    expect(mockAgentRegistry.agentExists).toHaveBeenCalledTimes(1)
    expect(mockAgentRegistry.agentExists).toHaveBeenCalledWith(mockAgentId)
    expect(mockAgentRegistry.isDisabled).toHaveBeenCalledTimes(1)
    expect(mockAgentRegistry.isDisabled).toHaveBeenCalledWith(mockAgentId)
    expect(mockAgentRegistry.enableAgent).toHaveBeenCalledTimes(0)
  })

  it("enables agent in agent registry contract", async () => {
    const systemTime = new Date()
    jest.useFakeTimers('modern').setSystemTime(systemTime)
    mockAgentRegistry.agentExists.mockReturnValueOnce(true)
    mockAgentRegistry.isDisabled.mockReturnValueOnce(true)
    const mockPublicKey = "0x123"
    const mockPrivateKey = "0x456"
    mockGetCredentials.mockReturnValueOnce({ publicKey: mockPublicKey, privateKey: mockPrivateKey })

    await enable({})

    expect(mockAgentRegistry.agentExists).toHaveBeenCalledTimes(1)
    expect(mockAgentRegistry.agentExists).toHaveBeenCalledWith(mockAgentId)
    expect(mockAgentRegistry.isDisabled).toHaveBeenCalledTimes(1)
    expect(mockAgentRegistry.isDisabled).toHaveBeenCalledWith(mockAgentId)
    expect(mockGetCredentials).toHaveBeenCalledTimes(1)
    expect(mockGetCredentials).toHaveBeenCalledWith()
    expect(mockWeb3AgentRegistry.eth.accounts.wallet.add).toHaveBeenCalledTimes(1)
    expect(mockWeb3AgentRegistry.eth.accounts.wallet.add).toHaveBeenCalledWith(mockPrivateKey)
    expect(mockAgentRegistry.enableAgent).toHaveBeenCalledTimes(1)
    expect(mockAgentRegistry.enableAgent).toHaveBeenCalledWith(mockPublicKey, mockAgentId)
    expect(mockAppendToFile).toHaveBeenCalledTimes(1)
    expect(mockAppendToFile).toHaveBeenCalledWith(`${systemTime.toUTCString()}: successfully enabled agent id ${mockAgentId}`, 'publish.log')
    jest.useRealTimers()
  })
})