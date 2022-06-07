import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'
import fetch from 'node-fetch'

export default async function handler(
  _: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  try {
    const response = await fetch(
      'https://api.github.com/repos/iterative/mlem',
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
        }
      }
    )
    const data = await response.json()

    res.status(200).json({ ok: true, data: { star: data.stargazers_count } })
  } catch (error) {
    console.error(error)
    res.status(500).json({ ok: false, message: 'Error getting github stars' })
  }
}
