<template>
  <div class="main-wrapper">
    <canvas ref="particleCanvas" class="particles-canvas"></canvas>

    <header class="app-header">
      <div class="cyber-grid"></div>
      <h1 class="app-title">
        CYBERGIT
        <span class="app-title-glitch">CYBERGIT</span>
        <span class="version-tag">v2.0</span>
      </h1>
      <p class="app-subtitle">// GITHUB USER ACTIVITY EXPLORER</p>
    </header>

    <SearchBar
      :loading="loading"
      @search-user="handleSearchUser"
      @search-repo="handleSearchRepo"
    />

    <ErrorAlert
      :message="error"
      @close="clearError"
    />

    <main class="app-main">
      <LoadingSpinner :visible="loading && !user" text="ACESSANDO A MATRIX..." />

      <div v-if="!loading && !user && !error" class="no-user-message">
        <div class="cyber-icon">⎔</div>
        <p>DIGITE UM USUÁRIO PARA COMEÇAR</p>
      </div>

      <template v-if="user">
        <UserProfile :user="user" :contributions="contributions" />

        <Organizations :orgs="orgs" />

        <div class="tabs">
          <button
            v-for="tab in tabs"
            :key="tab.key"
            :class="['tab-btn', { active: activeTab === tab.key }]"
            @click="activeTab = tab.key"
          >
            {{ tab.label }}
          </button>
        </div>

        <div class="tab-content">
          <Repositories
            v-if="activeTab === 'repos'"
            :repos="repos"
            @select-repo="openRepoDetail"
          />
          <ActivityFeed
            v-if="activeTab === 'activity'"
            :events="events"
          />
          <FollowersPanel
            v-if="activeTab === 'followers'"
            :followers="followers"
            @select-user="handleSearchUser"
          />
        </div>
      </template>
    </main>

    <RepoDetailModal
      :repo="repoDetail"
      :languages="repoLanguages"
      :commits="repoCommits"
      :branches="repoBranches"
      :contributors="repoContributors"
      :readme="repoReadme"
      @close="closeRepoDetail"
    />

    <footer class="app-footer">
      <span>
        CYBERGIT &nbsp;|&nbsp; DADOS DA
        <a href="https://docs.github.com/en/rest" target="_blank">API DO GITHUB</a>
        &nbsp;|&nbsp; FEITO COM &#9881; E &#9889;
      </span>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useGithub } from './composables/useGithub.js'
import SearchBar from './components/SearchBar.vue'
import ErrorAlert from './components/ErrorAlert.vue'
import LoadingSpinner from './components/LoadingSpinner.vue'
import UserProfile from './components/UserProfile.vue'
import Repositories from './components/Repositories.vue'
import ActivityFeed from './components/ActivityFeed.vue'
import FollowersPanel from './components/FollowersPanel.vue'
import Organizations from './components/Organizations.vue'
import RepoDetailModal from './components/RepoDetailModal.vue'

const {
  loading, error,
  user, repos, events, followers, orgs,
  repoDetail, repoLanguages, repoCommits, repoBranches, repoContributors, repoReadme,
  contributions,
  loadUser, loadRepoDetail, clearError, closeRepoDetail
} = useGithub()

const activeTab = ref('repos')
const tabs = [
  { key: 'repos', label: 'REPOSITÓRIOS' },
  { key: 'activity', label: 'ATIVIDADES' },
  { key: 'followers', label: 'SEGUIDORES' }
]

const particleCanvas = ref(null)
let animFrameId = null

function handleSearchUser(username) {
  activeTab.value = 'repos'
  loadUser(username)
}

function handleSearchRepo(fullName) {
  const [owner, repo] = fullName.split('/')
  if (owner && repo) {
    loadRepoDetail(owner, repo)
  }
}

function openRepoDetail(repo) {
  loadRepoDetail(repo.owner.login, repo.name)
}

function initParticles() {
  const canvas = particleCanvas.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  let w, h

  function resize() {
    w = canvas.width = window.innerWidth
    h = canvas.height = window.innerHeight
  }
  resize()
  window.addEventListener('resize', resize)

  const particles = Array.from({ length: 40 }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    r: Math.random() * 1.5 + 0.5,
    a: Math.random() * 0.3 + 0.1
  }))

  function draw() {
    ctx.clearRect(0, 0, w, h)
    for (const p of particles) {
      p.x += p.vx
      p.y += p.vy
      if (p.x < 0) p.x = w
      if (p.x > w) p.x = 0
      if (p.y < 0) p.y = h
      if (p.y > h) p.y = 0

      ctx.beginPath()
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(0, 240, 255, ${p.a})`
      ctx.fill()
    }

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 120) {
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.strokeStyle = `rgba(0, 240, 255, ${0.06 * (1 - dist / 120)})`
          ctx.stroke()
        }
      }
    }

    animFrameId = requestAnimationFrame(draw)
  }

  draw()

  onUnmounted(() => {
    cancelAnimationFrame(animFrameId)
    window.removeEventListener('resize', resize)
  })
}

onMounted(() => {
  initParticles()
})
</script>
