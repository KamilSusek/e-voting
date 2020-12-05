import express from 'express'
import jwt from 'jsonwebtoken'
import sha256 from 'crypto-js/sha256'
import Database from '../model/database/Database'

const router = express.Router()

router.post('/admin/login', async (req, res) => {
  const { username, password } = req.body
  const db = Database.getInstance().getDatabase()

  const admin = await db.aDMIN.findOne({
    where: {
      username: username
    }
  })

  if (admin && admin.password === sha256(password).toString()) {
    const token = jwt.sign({ username }, 'secret_key')

    res.send({ token: token, role: 'admin' })
  } else {
    res.status(403).send()
  }
})

router.get('/api-ping', ensureToken, verifyToken, ensureAdmin, (req, res) => {
  res.send('ok')
})

router.post('/login', async (req, res) => {
  const { username, password } = req.body
  const db = Database.getInstance().getDatabase()

  const voter = await db.voter.findOne({
    where: {
      username: username
    }
  })

  if (voter.password === password) {
    //sha256(password).toString()) {
    const token = jwt.sign({ username }, 'secret_key')

    res.send({ token: token, role: 'user' })
  } else {
    res.status(403).send()
  }
})

export function ensureToken (
  req: express.Request,
  res: express.Response,
  next: Function
) {
  const bearerHeader = req.headers['authorization']
  console.log(bearerHeader)
  if (bearerHeader !== undefined) {
    const bearer = bearerHeader.split(' ')
    const bearerToken = bearer[1]
    req.body.token = bearerToken

    next()
  } else {
    res.status(403).send()
  }
}

export function verifyToken (
  req: express.Request,
  res: express.Response,
  next: Function
) {
  console.log(req.body.token)

  jwt.verify(req.body.token, 'secret_key', (err: any, data: any) => {
    if (err) {
      res.status(403).send()
    } else {
      next()
    }
  })
}

export function ensureAdmin (
  req: express.Request,
  res: express.Response,
  next: Function
) {
  const role = req.headers['role']
  if (role === 'admin') {
    next()
  } else {
    res.status(403).send()
  }
}

export function ensureUser (
  req: express.Request,
  res: express.Response,
  next: Function
) {
  const role = req.headers['role']
  if (role === 'user') {
    next()
  } else {
    res.status(403).send()
  }
}

export default router
