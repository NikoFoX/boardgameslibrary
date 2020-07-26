import User from '../db/models/User'
import Game from '../db/models/Game'
import { expect, assert } from 'chai'
import { agent } from 'supertest'
import app from '../app'
import { ObjectId } from 'mongodb'
import testDbHandler from './test-db-handler'
import Match from '../db/models/Match'
import { MATCH_RESULTS } from '../common/constants'
let request = agent(app)

describe('GET /game tests', function () {
	beforeEach(async function () {
		this.user = await User.create({
			username: 'jack',
			password: 'password'
		})
		this.request = request.set('Authorization', `Token ${this.user.token}`)
		this.game = await Game.create({
			user: this.user.id,
			title: 'Supergame',
			externalId: 123
		})
		// matches
		const matches = [
			{ game: this.game.id, result: MATCH_RESULTS.WIN },
			{ game: this.game.id, result: MATCH_RESULTS.LOSS },
			{ game: this.game.id, result: MATCH_RESULTS.DRAW },
			{ game: this.game.id, result: MATCH_RESULTS.OTHER }
		]
		await Match.create(matches)
		assert.equal(await Match.countDocuments({}), 4)
	})
	afterEach(async function () {
		await testDbHandler.clearDatabase()
	})

	describe('GET /game', function () {
		it('return all games for given user', async function () {
			const response = await this.request.get('/game/')
			assert.equal(200, response.status)
			const games = response.body
			assert.lengthOf(games, 1)
		})
	})
	describe('GET /game:id', function () {
		it('return game by id', async function () {
			const response = await this.request.get(`/game/${this.game.id}`)
			assert.equal(200, response.status)
			const foundGame = response.body
			assert.equal(this.game.title, foundGame.title)
			// check if returned correct matches
			assert.equal(1, foundGame.result_win)
			assert.equal(1, foundGame.result_loss)
			assert.equal(1, foundGame.result_draw)
			assert.equal(1, foundGame.result_other)
		})
		it('return 404 if game not found', async function () {
			const response = await this.request.get(`/game/${ObjectId()}`)
			assert.equal(404, response.status)
		})
	})
})

describe('POST /game test', function () {
	beforeEach(async function () {
		this.user = new User({ username: 'jack', password: 'password' })
		await this.user.save()
		this.request = request.set('Authorization', `Token ${this.user.token}`)
	})
	afterEach(async () => {
		await testDbHandler.clearDatabase()
	})

	describe('Create new game', function () {
		it('no data - returns 400', async function () {
			const response = await request.post('/game', {})
			assert.equal(response.status, 400)
			assert.include(response.text, 'Path `externalId` is required')
			// assert.include(response.text, 'Path `user` is required')
			assert.include(response.text, 'Path `title` is required')
		})
		it('create game', async function () {
			const gameData = {
				title: 'Supergame',
				user: this.user.id,
				externalId: 123
			}
			const response = await request.post('/game').send(gameData)
			assert.equal(201, response.status)
			const games = await Game.find({})
			assert.lengthOf(games, 1)
			assert.equal(games[0].title, 'Supergame')
		})
		it('create duplicate game', async function () {
			const gameData = {
				title: 'Supergame',
				user: this.user.id,
				externalId: 123
			}
			// first game
			await request.post('/game').send(gameData)
			// try duplicate - should return status 400
			const response = await request.post('/game').send(gameData)
			assert.equal(400, response.status)
			// check if only 1 game exists
			const games = await Game.find({})
			assert.lengthOf(games, 1)
			assert.equal(games[0].title, 'Supergame')
		})
	})

	describe('Update game', function () {
		it('fail to update game by non-existing id', async () => {
			const response = await request.patch(`/game/${ObjectId()}`)
			assert.equal(response.status, 404)
		})
	})
})
