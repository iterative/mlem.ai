const { graphql } = require('@octokit/graphql')
const NodeCache = require('node-cache')

const { isProduction } = require('../../utils')

const cache = new NodeCache({ stdTTL: 900 })

async function getFreshGithubData() {
  try {
    const { repository } = await graphql(
      `
        {
          repository(owner: "iterative", name: "mlem") {
            stargazerCount
          }
        }
      `,
      {
        headers: {
          authorization: `token ${process.env.GITHUB_TOKEN}`
        }
      }
    )

    const stars = repository.stargazerCount

    cache.set('stars', stars)

    return { stars }
  } catch (e) {
    return { error: e.message || e }
  }
}

async function getStars() {
  const cachedValue = cache.get('stars')
  if (cachedValue) {
    if (!isProduction) console.log('Using cache for "stars"')
    return cachedValue
  } else {
    console.log('Not using cache for "stars"')
    const { stars } = await getFreshGithubData()
    return stars
  }
}

async function stars(req, res) {
  if (!process.env.GITHUB_TOKEN) {
    // We have no GitHub key, so reject as unauthorized
    res.status(403).send()
  } else {
    const stars = await getStars()
    if (stars) {
      // If we got stars, successfully return a data payload with them
      res.status(200).json({ stars })
    } else {
      // Stars are missing for some reason: return 404
      res.status(404).send()
    }
  }
}

module.exports = {
  stars
}
