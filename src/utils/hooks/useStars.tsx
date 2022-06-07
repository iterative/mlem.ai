import { useEffect, useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import fetch from 'isomorphic-fetch'

export default function useStars(): number | null {
  const staticStars =
    useStaticQuery(graphql`
      query GithubStarsQuery {
        github {
          repository(name: "mlem", owner: "iterative") {
            stargazerCount
          }
        }
      }
    `).github.repository.stargazerCount || 888

  // Maintain an updatable state so we can update stars on delivery
  const [stars, setStars] = useState(staticStars)

  // Run an IIFE to update from the server on the client side.
  useEffect(() => {
    ;(async (): Promise<void> => {
      const res = await fetch(`/api/github/stars`)
      if (res.status === 200) {
        const json = await res.json()
        setStars(json.stars)
      } else {
        console.warn(
          `Stars update response status was ${res.status}! Using static value.`
        )
      }
    })()
  }, [])

  return stars
}
