// in test/integration/apps_test.js
const { expect } = require('chai')
const request = require('supertest')
const app = require('../../app')
const AppModel = require('../../models/app')
const Space = require('../../models/space')

describe('apps', () => {
    let api
    let space
    beforeEach(async () => {
        api = request(app)
        const apps = await AppModel.forge({}).fetchAll()
        await apps.forEach(a => a.destroy())
        space = await Space.forge({ name: 'Madame Bovary', memory_quotamb: 30, disk_quotamb: 15 }).save()

    })

    afterEach(async () => {
        const apps = await AppModel.forge({}).fetchAll()
        await Promise.all(apps.map(a => a.destroy()))
    })

    describe('GET /apps', () => {
        it('returns a list of apps in the database', async () => {
            const dbApp = {
                name: 'Madame Bovary',
                memory_allocationmb: 30,
                disk_allocationmb: 15,
                space_id: space.get('id')
            }
            await AppModel.forge(dbApp).save()

            const res = await api.get('/apps')
            expect(res.status).to.equal(200)
            expect(res.body.length).to.equal(1)
            expect(res.body[0].name).to.equal(dbApp.name)
            expect(res.body[0].memory_allocationmb).to.equal(dbApp.memory_allocationmb)
            expect(res.body[0].disk_allocationmb).to.equal(dbApp.disk_allocationmb)
            expect(res.body[0].space_id).to.equal(dbApp.space_id)
        })
    })
})