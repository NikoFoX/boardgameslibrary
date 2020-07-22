import { agent } from 'supertest'
import { expect, assert } from 'chai'
import app from '../app'
import Game from '../db/models/Game'
import Match from '../db/models/Match'
import { MATCH_RESULTS } from '../common/constants'
import { ObjectId } from 'mongodb'
import User from '../db/models/User'
import { v4 as uuid4 } from 'uuid'
import testDbHandler from './test-db-handler'
let request = agent(app)

describe('GET /match tests', () => {
	afterEach(async () => {
		await testDbHandler.clearDatabase()
	})
	beforeEach(async () => {
		this.user = new User({ username: 'jack', password: 'password' })
		await this.user.save()
		this.request = request.set('Authorization', `Token ${this.user.token}`)
		let game = new Game({
			user: this.user.id,
			title: 'Game 1',
			externalId: 123
		})
		await game.save()
		const matches = [{ game: game.id }, { game: game.id }]
		await Match.create(matches)
		this.match = new Match({ result: MATCH_RESULTS.WIN, game: game })
		await this.match.save()
	})

	describe('GET /match', () => {
		it('return all 3 matches', async () => {
			const res = await this.request.get('/match')
			expect(res.status).to.equal(200)
			expect(res.body.length).to.equal(3)
		})
		it('return 403 if token auth is wrong - no user found', async () => {
			const response = await request
				.get('/match')
				.set('Authorization', `Token ${uuid4()}`)
			expect(response.status).to.equal(403)
		})
	})

	describe('GET /match/:id', () => {
		it('return 404 if no match found for given id for request user', async () => {
			const nonExistingmatchId = ObjectId()
			const res = await this.request.get(`/match/${nonExistingmatchId}`)
			expect(res.status).to.equal(404)
			expect(res.text).to.equal('Match not found')
		})

		it('return a match of given id for given user', async () => {
			const res = await this.request.get(`/match/${this.match.id}`)
			expect(res.status).to.equal(200)
			const match = res.body
			expect(match).to.have.property('result', MATCH_RESULTS.WIN)
		})
	})
})
