import { useEffect, useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import fetch from 'isomorphic-fetch'

export default function useStars(): number | null {
  const staticStars = useStaticQuery(graphql`
    query GithubStarsQuery {
      staticGithubData {
        stars
      }
    }
  `).staticGithubData.stars

  // Maintain an updatable state so we can update stars on delivery
  const [stars, setStars] = useState(staticStars)

  // Update on the client side
  useEffect(() => {
    fetch(`/api/github/stars?repo=mlem`).then(res => {
      if (res.status === 200) {
        res.json().then(json => {
          setStars(json.stars)
        })
      } else {
        console.warn(
          `Stars update response status was ${res.status}! Using static value.`
        )
      }
    })
  }, [])

  return stars
}
