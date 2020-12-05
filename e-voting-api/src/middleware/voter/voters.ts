import express from 'express'
import VotersRepo from '../../model/repositories/VotersRepo'

const voters = new VotersRepo()

export async function login (
  req: express.Request,
  res: express.Response,
  next: any
) {
  try {
    const { username, password } = req.body

    const response = await voters.findByUsername(username)

    if (response.password === password) {
      res.send()
    } else {
      res.status(403).send()
    }
  } catch (error) {
    console.log(error)
    res.status(400).send(error)
  }
}

export async function findAllVoters (
  req: express.Request,
  res: express.Response,
  next: any
) {
  try {
    const response = await voters.findAll()
    res.status(200).send(response)
  } catch (error) {
    console.log(error)
    res.status(404).send(error)
  }
}

export async function findVoterFromParams (
  req: express.Request,
  res: express.Response,
  next: any
) {
  try {
    const { username } = req.params
    const response = await voters.findByUsername(username)
    res.send(response)
  } catch (error) {
    console.log(error)
    res.status(400).send(error)
  }
}

export async function findVoterAttachedToElection (
  req: express.Request,
  res: express.Response,
  next: any
) {
  try {
    const { electionName } = req.params
    const response = await voters.findVoterByElection(electionName)
    res.send(response)
  } catch (error) {
    console.log(error)
    res.status(400).send(error)
  }
}
