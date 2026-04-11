import {describe, expect, test, jest} from '@jest/globals'
import {app} from '../src/server/blockchainServer'
import block from '../src/lib/block';
import blockchain from '../src/lib/blockchain';
import  request  from 'supertest'
import Block from '../src/lib/__mocks__/block';

jest.mock('../src/lib/block')
jest.mock('../src/lib/blockchain')

describe('Blockchain Server tests', () => {
    test('GET /status  ', async () => {
        const response = await request(app).get('/status/')

        expect(response.status).toEqual(200);
        expect(response.body.validation.success).toEqual(true)
    })

    test('GET /block/:indexOrHash - should get genesis with index', async () => {
        const response = await request(app).get('/block/0');

        expect(response.status).not.toBe(404);
        expect(response.body.index).toEqual(0);
    })

    test('GET /block/:indexOrHash - should get genesis with hash', async () => {
        const response = await request(app).get('/block/abc');

        expect(response.status).not.toBe(404);
        expect(response.body.index).toEqual(0);
    })

    test('POST /block - should post', async() => {
        console.log(block)
        const response = await request(app).post('/block/').send({
            index: 1,
            previous_hash: "abc",
            data: "OVO LOBKCASDFADF"
        })

        expect(response.status).toEqual(201);
        expect(response.body.index).toEqual(1)
    })
})