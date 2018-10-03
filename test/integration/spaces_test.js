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

    after(async () => {
        const spaces = await Space.forge({}).fetchAll()
        await spaces.forEach(space => space.destroy())
    })

    describe('GET /spaces', () => {
        it('returns a list of spaces in the database', async () => {
            const space = {
                title: 'Madame Bovary',
                author: 'Gustave Flaubert'
            }
            await Space.forge(space).save()

            const res = await api.get('/spaces')
            expect(res.body.length).to.equal(1)
            expect(res.body[0].title).to.equal(space.title)
            expect(res.body[0].author).to.equal(space.author)
        })
    })
})