import express from 'express'
import VotersRepo from '../../model/repositories/VotersRepo'

const votersRepo = new VotersRepo()

export async function saveVoter (
  req: express.Request,
  res: express.Response,
  next: any
) {
  try {
    const { username, password } = req.body
    const response = await votersRepo.save({ username, password })
    res.status(201).send()
  } catch (error) {
    console.log(error)

    res.status(400).send(error)
  }
}
