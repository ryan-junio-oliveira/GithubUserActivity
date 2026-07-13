<template>
  <div v-if="user" class="profile-card cyber-card">
    <div class="profile-glow"></div>
    <div class="profile-header">
      <div class="avatar-wrapper">
        <img :src="user.avatar_url" :alt="user.login" class="avatar" />
        <div class="avatar-ring"></div>
        <div v-if="user.hireable" class="hireable-badge">CONTRATÁVEL</div>
      </div>
      <div class="profile-info">
        <h1 class="profile-name">{{ user.name || user.login }}</h1>
        <a :href="user.html_url" target="_blank" class="profile-login">@{{ user.login }}</a>
        <p v-if="user.bio" class="profile-bio">{{ user.bio }}</p>
        <p v-if="user.company" class="profile-company">&#9654; {{ user.company }}</p>
        <p v-if="user.location" class="profile-location">&#9654; {{ user.location }}</p>
      </div>
    </div>

    <div class="stats-grid">
      <div class="stat-item">
        <span class="stat-value">{{ contributions?.totalRepos ?? user.public_repos }}</span>
        <span class="stat-label">REPOSITÓRIOS</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">{{ contributions?.totalStars ?? '—' }}</span>
        <span class="stat-label">ESTRELAS</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">{{ contributions?.totalForks ?? '—' }}</span>
        <span class="stat-label">FORKS</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">{{ user.followers }}</span>
        <span class="stat-label">SEGUIDORES</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">{{ user.following }}</span>
        <span class="stat-label">SEGUINDO</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">{{ user.public_gists }}</span>
        <span class="stat-label">GISTS</span>
      </div>
    </div>

    <div v-if="user.twitter_username" class="profile-social">
      <span class="social-badge twitter">&#120143; {{ user.twitter_username }}</span>
    </div>

    <div v-if="user.blog" class="profile-blog">
      <a :href="blogUrl" target="_blank" class="blog-link">&#9654; {{ user.blog }}</a>
    </div>

    <div class="profile-footer">
      <span class="member-since">MEMBRO DESDE {{ formatDate(user.created_at) }}</span>
      <span v-if="user.updated_at" class="last-updated">ÚLTIMA ATIVIDADE {{ formatDate(user.updated_at) }}</span>
    </div>

    <div v-if="contributions?.languages?.length" class="languages-cloud">
      <span
        v-for="lang in contributions.languages"
        :key="lang"
        class="lang-tag"
      >{{ lang }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  user: Object,
  contributions: Object
})

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('pt-BR', {
    year: 'numeric', month: 'short', day: 'numeric'
  }).toUpperCase()
}

const blogUrl = computed(() => {
  if (!props.user?.blog) return '#'
  const b = props.user.blog
  return b.startsWith('http') ? b : `https://${b}`
})
</script>
