import {describe, expect, test, jest} from '@jest/globals'
import {app} from '../src/server/blockchainServer'
import block from '../src/lib/block';
import blockchain from '../src/lib/blockchain';
import  request  from 'supertest'
import Block from '../src/lib/__mocks__/block';

jest.mock('../src/lib/block')
jest.mock('../src/lib/blockchain')

describe("Mock", () => {
    
})