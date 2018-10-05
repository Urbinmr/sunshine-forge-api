// in test/integration/spaces_test.js
const { expect } = require('chai')
const request = require('supertest')
const app = require('../../app')
const Space = require('../../models/space')

describe('Spaces', () => {
    let api
    beforeEach(async () => {
        api = request(app)
        const spaces = await Space.forge({}).fetchAll()
        await spaces.forEach(space => space.destroy())
    })

    afterEach(async () => {
        const spaces = await Space.forge({}).fetchAll()
        await Promise.all(spaces.map(space => space.destroy()))
    })

    describe('GET /spaces', () => {
        it('returns a list of spaces in the database', async () => {
            const space = {
                name: 'Madame Bovary',
                memory_quotamb: 30,
                disk_quotamb: 15
            }
            await Space.forge(space).save()

            const res = await api.get('/spaces')
            expect(res.status).to.equal(200)
            expect(res.body.length).to.equal(1)
            expect(res.body[0].name).to.equal(space.name)
            expect(res.body[0].memory_quotamb).to.equal(space.memory_quotamb)
            expect(res.body[0].disk_quotamb).to.equal(space.disk_quotamb)
        })

        it('returns a space given an id in the database', async () => {
            const spaces = [{
                name: 'Madame Bovary',
                memory_quotamb: 30,
                disk_quotamb: 15
            }, {
                name: 'A tale of two cities',
                memory_quotamb: 31,
                disk_quotamb: 16
            }]
            savedSpaces = []
            savedSpaces[0] = await Space.forge(spaces[0]).save()
            savedSpaces[1] = await Space.forge(spaces[1]).save()
            const res = await api.get(`/spaces/${savedSpaces[1].get('id')}`)

            expect(res.status).to.equal(200)
            expect(res.body.name).to.equal(spaces[1].name)
            expect(res.body.memory_quotamb).to.equal(spaces[1].memory_quotamb)
            expect(res.body.disk_quotamb).to.equal(spaces[1].disk_quotamb)
        })

        it('saves a space in the database', async () => {
            //const shouldBeEmpty = await Space.forge({}).fetchAll()

            const space = {
                name: 'Madame Bovary',
                memory_quotamb: 30,
                disk_quotamb: 15
            }

            await api.post('/spaces')
                .send(space)
                .set('Accept', 'application/json')
                .expect(200)

            const spacesRes = await Space.forge({}).fetchAll()
            const spaces = spacesRes.toJSON()

            expect(spaces.length).to.equal(1)
            expect(spaces[0].name).to.equal(space.name)
            expect(spaces[0].memory_quotamb).to.equal(space.memory_quotamb)
            expect(spaces[0].disk_quotamb).to.equal(space.disk_quotamb)
        })

    })
})