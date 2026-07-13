import { ref, reactive } from 'vue'
import * as api from '../api/github.js'

export function useGithub() {
  const loading = ref(false)
  const error = ref(null)

  const user = ref(null)
  const repos = ref([])
  const events = ref([])
  const followers = ref([])
  const following = ref([])
  const orgs = ref([])
  const starred = ref([])

  const repoDetail = ref(null)
  const repoLanguages = ref(null)
  const repoCommits = ref([])
  const repoBranches = ref([])
  const repoContributors = ref([])
  const repoReadme = ref(null)

  const searchResults = reactive({ users: [], repositories: [] })
  const contributions = ref(null)

  function resetUserData() {
    user.value = null
    repos.value = []
    events.value = []
    followers.value = []
    following.value = []
    orgs.value = []
    starred.value = []
    contributions.value = null
    repoDetail.value = null
    repoLanguages.value = null
    repoCommits.value = []
    repoBranches.value = []
    repoContributors.value = []
    repoReadme.value = null
  }

  async function loadUser(username) {
    loading.value = true
    error.value = null
    resetUserData()
    try {
      const [userData, reposData, eventsData, followersData, followingData, orgsData, contribsData] = await Promise.all([
        api.fetchUser(username),
        api.fetchRepos(username),
        api.fetchEvents(username),
        api.fetchFollowers(username),
        api.fetchFollowing(username),
        api.fetchOrgs(username),
        api.fetchUserContributions(username)
      ])
      user.value = userData
      repos.value = reposData
      events.value = eventsData
      followers.value = followersData
      following.value = followingData
      orgs.value = orgsData
      contributions.value = contribsData
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  async function loadMoreRepos(username, page) {
    try {
      const more = await api.fetchRepos(username, page)
      repos.value.push(...more)
      return more
    } catch (err) {
      error.value = err.message
    }
  }

  async function loadMoreEvents(username, page) {
    try {
      const more = await api.fetchEvents(username, page)
      events.value.push(...more)
      return more
    } catch (err) {
      error.value = err.message
    }
  }

  async function loadRepoDetail(owner, repo) {
    loading.value = true
    error.value = null
    try {
      const [detail, langs, commits, branches, contributors, readme] = await Promise.all([
        api.fetchRepoDetail(owner, repo),
        api.fetchRepoLanguages(owner, repo),
        api.fetchRepoCommits(owner, repo),
        api.fetchRepoBranches(owner, repo),
        api.fetchRepoContributors(owner, repo),
        api.fetchRepoREADME(owner, repo)
      ])
      repoDetail.value = detail
      repoLanguages.value = langs
      repoCommits.value = commits
      repoBranches.value = branches
      repoContributors.value = contributors
      repoReadme.value = readme
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  async function searchUsers(query) {
    loading.value = true
    error.value = null
    try {
      const data = await api.searchUsers(query)
      searchResults.users = data.items || []
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  async function searchRepos(query) {
    loading.value = true
    error.value = null
    try {
      const data = await api.searchRepositories(query)
      searchResults.repositories = data.items || []
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  function clearError() {
    error.value = null
  }

  function closeRepoDetail() {
    repoDetail.value = null
    repoLanguages.value = null
    repoCommits.value = []
    repoBranches.value = []
    repoContributors.value = []
    repoReadme.value = null
  }

  return {
    loading, error,
    user, repos, events, followers, following, orgs, starred,
    repoDetail, repoLanguages, repoCommits, repoBranches, repoContributors, repoReadme,
    searchResults, contributions,
    loadUser, loadMoreRepos, loadMoreEvents, loadRepoDetail,
    searchUsers, searchRepos,
    clearError, closeRepoDetail, resetUserData
  }
}
