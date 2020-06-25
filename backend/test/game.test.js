import User from '../db/models/User'
import Game from '../db/models/Game'
import { expect, assert } from 'chai'
import { agent } from 'supertest'
import app from '../app'
import { ObjectId } from 'mongodb'
import testDbHandler from './test-db-handler'
let request = agent(app)

describe('GET /game tests', () => {
	beforeEach(async () => {
		this.user = new User({ username: 'jack', password: 'password' })
		await this.user.save()
		this.request = request.set('Authorization', `Token ${this.user.token}`)
		this.game = new Game({ user: this.user.id, title: 'Supergame' })
		await this.game.save()
	})
	afterEach(async () => {
		await testDbHandler.clearDatabase()
	})

	describe('GET /game', () => {
		it('return all games for given user', async () => {
			const response = await this.request.get('/game/')
			assert.equal(200, response.status)
			const games = response.body
			assert.lengthOf(games, 1)
		})
	})
	describe('GET /game:id', () => {
		it('return game by id', async () => {
			const response = await this.request.get(`/game/${this.game.id}`)
			assert.equal(200, response.status)
			const foundGame = response.body
			assert.equal(this.game.title, foundGame.title)
		})
		it('return 404 if game not found', async () => {
			const response = await this.request.get(`/game/${ObjectId()}`)
			assert.equal(404, response.status)
		})
	})
})

describe('POST /game test', () => {
	beforeEach(async () => {
		this.user = new User({ username: 'jack', password: 'password' })
		await this.user.save()
		this.request = request.set('Authorization', `Token ${this.user.token}`)
	})
	afterEach(async () => {
		await testDbHandler.clearDatabase()
	})

	describe('Create new game', () => {
		it('no data - returns 400', async () => {
			const response = await request.post('/game', {})
			assert.equal(response.status, 400)
			assert.include(response.text, 'Path `user` is required')
			assert.include(response.text, 'Path `title` is required')
		})
		it('create game', async () => {
			const gameData = {
				title: 'Supergame',
				user: this.user.id
			}
			const response = await request.post('/game').send(gameData)
			assert.equal(201, response.status)
			const games = await Game.find({})
			assert.lengthOf(games, 1)
			assert.equal(games[0].title, 'Supergame')
		})
	})

	describe('Update game', () => {
		it('fail to update game by non-existing id', async () => {
			const response = await request.patch(`/game/${ObjectId()}`)
			assert.equal(response.status, 404)
		})
	})
})
