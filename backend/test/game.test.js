import User from '../db/models/User'
import Game from '../db/models/Game'
import { expect, assert } from 'chai'
import supertest, { agent } from 'supertest'
import app from '../app'
import { v4 as uuid4 } from 'uuid'
import { ObjectId } from 'mongodb'
let request = agent(app)

describe('GET /game tests', () => {
	before(async () => {
		this.user = new User({ username: 'jack', password: 'password' })
		this.request = request.set('Authorization', `Token ${this.user.token}`)
	})
	beforeEach(async () => {
		this.game = new Game({ user: this.user.id })
	})

	describe('GET /game', () => {
		it('return all games for given user', async () => {
			const response = await this.request.get('/game/')
			expect(response.status).to.equal(200)
			console.log(response.json())
			console.log(response.body)
		})
		it('return 403 if token auth is wrong - no user found', async () => {
			const response = await request
				.get('/game/')
				.set('Authorization', `Token ${uuid4()}`)
			expect(response.status).to.equal(403)
		})
	})
	describe('GET /game:id', () => {
		it('return game by id', async () => {
			const response = await this.request.get(`/game/${this.game.id}`)
			expect(response.status).to.equal(200)
			console.log(response.json())
			console.log(response.body)
		})
		it('return 404 if game not found', async () => {
			const response = await this.request.get(`/game/${ObjectId()}`)
			expect(response.status).to.equal(404)
		})
	})
})

describe('POST /game test', () => {
	before(async () => {
		this.user = new User({ username: 'jack', password: 'password' })
		this.request = request.set('Authorization', `Token ${this.user.token}`)
	})
	describe('Create new game', () => {
		it('no data - returns 400', async () => {
			const response = await request.post('/game', {})
			expect(response.status).to.equal(400)
		})
	})
})
