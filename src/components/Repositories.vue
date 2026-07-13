<template>
  <div class="repositories-section">
    <div class="section-header">
      <h2 class="section-title">
        <span class="title-accent">&gt;</span> REPOSITÓRIOS
        <span class="repo-count">({{ repos.length }})</span>
      </h2>
      <div class="repo-filter">
        <input v-model="filterQuery" placeholder="filtrar..." class="filter-input" />
      </div>
    </div>
    <div class="repo-list">
      <div v-for="repo in filteredRepos" :key="repo.id" class="repo-card cyber-card-sm" @click="$emit('select-repo', repo)">
        <div class="repo-glow"></div>
        <div class="repo-header">
          <h3 class="repo-name">{{ repo.name }}</h3>
          <span v-if="repo.fork" class="fork-badge">FORK</span>
        </div>
        <p v-if="repo.description" class="repo-desc">{{ repo.description }}</p>
        <div class="repo-meta">
          <span v-if="repo.language" class="repo-lang">
            <span class="lang-dot" :style="{ background: langColor(repo.language) }"></span>
            {{ repo.language }}
          </span>
          <span class="repo-stars" title="Estrelas">&#9733; {{ repo.stargazers_count }}</span>
          <span class="repo-forks" title="Forks">&#9827; {{ repo.forks_count }}</span>
          <span class="repo-issues" title="Issues">&#9888; {{ repo.open_issues_count }}</span>
          <span class="repo-size">{{ (repo.size / 1024).toFixed(1) }} MB</span>
        </div>
        <div class="repo-footer">
          <span class="repo-updated">&#9654; {{ timeAgo(repo.updated_at) }}</span>
          <a :href="repo.html_url" target="_blank" class="repo-link" @click.stop>ABRIR</a>
        </div>
      </div>
    </div>
    <p v-if="!filteredRepos.length && repos.length" class="no-results">NENHUM REPOSITÓRIO CORRESPONDE AO FILTRO.</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({ repos: Array })
defineEmits(['select-repo'])

const filterQuery = ref('')

const filteredRepos = computed(() => {
  if (!filterQuery.value) return props.repos
  const q = filterQuery.value.toLowerCase()
  return props.repos.filter(r =>
    r.name.toLowerCase().includes(q) ||
    (r.description && r.description.toLowerCase().includes(q)) ||
    (r.language && r.language.toLowerCase().includes(q))
  )
})

const langColors = {
  JavaScript: '#f1e05a', TypeScript: '#3178c6', Python: '#3572A5',
  Go: '#00ADD8', Rust: '#dea584', 'C++': '#f34b7d', C: '#555555',
  Java: '#b07219', Ruby: '#701516', PHP: '#4F5D95', HTML: '#e34c26',
  CSS: '#563d7c', Shell: '#89e051', Vue: '#41b883', Swift: '#F05138',
  Kotlin: '#A97BFF', Dart: '#00B4AB', Lua: '#000080', Haskell: '#5e5086',
  Elixir: '#6e4a7e', Clojure: '#db5855', Scala: '#c22d40', Zig: '#ec915c',
  Nix: '#7e7eff'
}

function langColor(lang) {
  return langColors[lang] || '#8b8b8b'
}

function timeAgo(dateStr) {
  const now = Date.now()
  const then = new Date(dateStr).getTime()
  const diff = now - then
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}min`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h`
  const days = Math.floor(hrs / 24)
  if (days < 30) return `${days}d`
  const months = Math.floor(days / 30)
  if (months < 12) return `${months}meses`
  return `${Math.floor(months / 12)}a`
}
</script>
