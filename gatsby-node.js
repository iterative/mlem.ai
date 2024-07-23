const Prism = require('prismjs')
const loadLanguages = require('prismjs/components/')
const { request } = require('@octokit/request')

const terminalSlides = require('./content/home-slides')

loadLanguages(['bash', 'python'])

const getBashHtml = bashText =>
  Prism.highlight(bashText, Prism.languages.bash, 'bash')

const getPythonHtml = pythonText =>
  Prism.highlight(pythonText, Prism.languages.python, 'python')

const formattedTerminalLines = terminalSlides.map(string => {
  const lines = string.split(/\r?\n/).map(line => {
    const l = line.trim()
    const commandPromptReg = /^(\$|>{3}|\.{3})/

    if (commandPromptReg.test(l)) {
      const prompt = l.match(commandPromptReg)[0]
      const text = l.replace(commandPromptReg, '')

      return {
        promptString: prompt,
        text: prompt === '$' ? getBashHtml(text) : getPythonHtml(text)
      }
    } else {
      return { text: l, promptString: null }
    }
  })
  return lines[0].text === '' ? lines.slice(1) : lines
})

async function getStars({ owner, repo }) {
  const response = await request({
    method: 'GET',
    url: '/repos/{owner}/{repo}',
    owner,
    repo,
    headers: {
      authorization: `token ${process.env.GITHUB_TOKEN}`
    }
  })

  const stars = response.data.stargazers_count

  return stars
}

exports.sourceNodes = ({ actions, createNodeId, createContentDigest }) => {
  const { createNode } = actions

  formattedTerminalLines.forEach((terminalLines, i) => {
    const formattedTerminalSlide = { lines: terminalLines }
    const nodeContent = JSON.stringify(formattedTerminalSlide)
    const nodeMeta = {
      id: createNodeId(`terminal-slide-${i}`),
      parent: null,
      children: [],
      internal: {
        type: 'TerminalSlide',
        content: nodeContent,
        contentDigest: createContentDigest(formattedTerminalSlide)
      }
    }

    const node = Object.assign({}, formattedTerminalSlide, nodeMeta)
    createNode(node)
  })
}

exports.createSchemaCustomization = async ({
  actions: { createTypes },
  schema
}) => {
  createTypes(
    schema.buildObjectType({
      name: 'StaticGithubData',
      fields: {
        stars: 'String!'
      }
    })
  )
}

exports.createResolvers = async ({ createResolvers }) => {
  createResolvers({
    Query: {
      staticGithubData: {
        type: 'StaticGithubData',
        async resolve() {
          const { GITHUB_TOKEN } = process.env
          if (GITHUB_TOKEN) {
            const stars = await getStars({ owner: 'iterative', repo: 'mlem' })
            return { stars }
          }
          return { stars: 719 }
        }
      }
    }
  })
}
