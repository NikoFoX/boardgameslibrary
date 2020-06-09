import supertest from 'supertest'
import { expect, assert } from 'chai'
import app from '../app'
import Game from '../db/models/Game'
import Match from '../db/models/Match'
import { MATCH_RESULTS } from '../common/constants'
import { ObjectId } from 'mongodb'
let request = supertest(app)

describe('match tests', () => {
	beforeEach(async () => {
		await Game.deleteMany({})
		await Match.deleteMany({})

		let game = new Game({})
		await game.save()
		const matches = [{ game: game.id }, { game: game.id }]
		await Match.create(matches)
		this.match = new Match({ result: MATCH_RESULTS.WIN, game: game })
		await this.match.save(0)
	})

	describe('GET /match', () => {
		it('return all 3 matches', async () => {
			const res = await request.get('/match')
			expect(res.status).to.equal(200)
			expect(res.body.length).to.equal(3)
		})
	})

	describe('GET /match/:id', () => {
		it('return 404 if no match found for given id', async () => {
			const nonExistingmatchId = ObjectId()
			console.log(nonExistingmatchId)
			const res = await request.get(`/match/${nonExistingmatchId}`)
			expect(res.status).to.equal(404)
			expect(res.text).to.equal('Match not found')
		})

		it('return a match of given id', async () => {
			const res = await request.get(`/match/${this.match.id}`)
			expect(res.status).to.equal(200)
			const match = res.body
			expect(match).to.have.property('result', MATCH_RESULTS.WIN)
		})
	})
})
