import { describe, test } from 'node:test';
import assert from 'node:assert';
import request from 'supertest';
import app from '../src/app.js';

describe('Pruebas de la API de Servicios', () => {
    
    test('GET /api/services debe responder con status 200 y un array en payload', async () => {
        const response = await request(app).get('/api/services');

        assert.strictEqual(response.status, 200);
        assert.strictEqual(response.body.status, 'success');
        assert.ok(Array.isArray(response.body.payload));
    });

    test('POST /api/services debe devolver 400 si faltan campos obligatorios', async () => {
        const response = await request(app)
            .post('/api/services')
            .send({});

        assert.strictEqual(response.status, 400);
        assert.strictEqual(response.body.status, 'error');
    });

});
