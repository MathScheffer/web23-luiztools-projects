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
            previousHash: "abc",
            data: "OVO LOBKCASDFADF"
        })

        expect(response.status).toEqual(201);
        expect(response.body.index).toEqual(1)
    })

    test('POST /block - should return 422 if body was null', async() => {
        console.log(block)
        const response = await request(app).post('/block/').send({})

        expect(response.status).toEqual(422);
    })

    test('POST /block - should return 422 if block was invalid', async() => {
        console.log(block)
        const response = await request(app).post('/block/').send({
            index: -1,
            previousHash: "abc",
            data: "OVO LOBKCASDFADF"
        })

        expect(response.status).toEqual(422);
        expect(response.body.message).toEqual("invalid  mock block");
    })

    test('POST /block - Should return 422 if block doesnt have previous hash as a string', async() => {
        const response = await request(app).post('/block/').send({
            index: -1,
            previousHash: 321,
            data: "OVO LOBKCASDFADF"
        })

        
        expect(response.status).toEqual(422);
        expect(response.body.message).toEqual("corpo da requisição está incompleto ou contém campos inválidos");
    })
})