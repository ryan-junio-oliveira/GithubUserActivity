const BASE_URL = 'https://api.github.com'

const headers = {
  'Accept': 'application/vnd.github.v3+json',
  'User-Agent': 'GitHub-User-Activity-Vue'
}

async function fetchJson(url) {
  const response = await fetch(url, { headers })
  if (!response.ok) {
    const msg = response.status === 403
      ? 'Limite de taxa da API excedido. Tente novamente em alguns minutos.'
      : response.status === 404
        ? 'Recurso não encontrado no GitHub.'
        : `Erro na API: ${response.status} ${response.statusText}`
    throw new Error(msg)
  }
  return response.json()
}

export function fetchUser(username) {
  return fetchJson(`${BASE_URL}/users/${encodeURIComponent(username)}`)
}

export function fetchRepos(username, page = 1, perPage = 30) {
  return fetchJson(`${BASE_URL}/users/${encodeURIComponent(username)}/repos?page=${page}&per_page=${perPage}&sort=updated`)
}

export function fetchEvents(username, page = 1) {
  return fetchJson(`${BASE_URL}/users/${encodeURIComponent(username)}/events?page=${page}&per_page=30`)
}

export function fetchFollowers(username, page = 1) {
  return fetchJson(`${BASE_URL}/users/${encodeURIComponent(username)}/followers?page=${page}&per_page=30`)
}

export function fetchFollowing(username, page = 1) {
  return fetchJson(`${BASE_URL}/users/${encodeURIComponent(username)}/following?page=${page}&per_page=30`)
}

export function fetchOrgs(username) {
  return fetchJson(`${BASE_URL}/users/${encodeURIComponent(username)}/orgs`)
}

export function fetchStarred(username, page = 1) {
  return fetchJson(`${BASE_URL}/users/${encodeURIComponent(username)}/starred?page=${page}&per_page=30`)
}

export function fetchRepoDetail(owner, repo) {
  return fetchJson(`${BASE_URL}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`)
}

export function fetchRepoLanguages(owner, repo) {
  return fetchJson(`${BASE_URL}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/languages`)
}

export function fetchRepoCommits(owner, repo, page = 1) {
  return fetchJson(`${BASE_URL}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/commits?page=${page}&per_page=10`)
}

export function fetchRepoBranches(owner, repo) {
  return fetchJson(`${BASE_URL}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/branches`)
}

export function fetchRepoContributors(owner, repo, page = 1) {
  return fetchJson(`${BASE_URL}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/contributors?page=${page}&per_page=10`)
}

export function fetchRepoREADME(owner, repo) {
  const rh = { ...headers, 'Accept': 'application/vnd.github.v3.raw' }
  return fetch(`${BASE_URL}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/readme`, { headers: rh })
    .then(r => {
      if (!r.ok && r.status === 404) return null
      if (!r.ok) throw new Error('Erro ao buscar README')
      return r.text()
    })
}

export function searchUsers(query, page = 1) {
  return fetchJson(`${BASE_URL}/search/users?q=${encodeURIComponent(query)}&page=${page}&per_page=20`)
}

export function searchRepositories(query, page = 1, sort = 'stars') {
  return fetchJson(`${BASE_URL}/search/repositories?q=${encodeURIComponent(query)}&page=${page}&per_page=20&sort=${sort}`)
}

export function fetchUserContributions(username) {
  return fetchJson(`${BASE_URL}/users/${encodeURIComponent(username)}/repos?per_page=100&sort=pushed`)
    .then(repos => {
      const totalStars = repos.reduce((acc, r) => acc + r.stargazers_count, 0)
      const totalForks = repos.reduce((acc, r) => acc + r.forks_count, 0)
      const languages = [...new Set(repos.filter(r => r.language).map(r => r.language))]
      return { totalRepos: repos.length, totalStars, totalForks, languages }
    })
}
