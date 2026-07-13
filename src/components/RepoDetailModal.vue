<template>
  <Transition name="modal-fade">
    <div v-if="repo" class="modal-overlay" @click.self="$emit('close')">
      <div class="modal-container cyber-card">
        <button class="modal-close" @click="$emit('close')">&times;</button>

        <div class="modal-header">
          <h2 class="modal-title">{{ repo.full_name }}</h2>
          <p v-if="repo.description" class="modal-desc">{{ repo.description }}</p>
        </div>

        <div class="modal-stats">
          <div class="ms-item">
            <span class="ms-value">{{ repo.stargazers_count }}</span>
            <span class="ms-label">ESTRELAS</span>
          </div>
          <div class="ms-item">
            <span class="ms-value">{{ repo.forks_count }}</span>
            <span class="ms-label">FORKS</span>
          </div>
          <div class="ms-item">
            <span class="ms-value">{{ repo.open_issues_count }}</span>
            <span class="ms-label">ISSUES</span>
          </div>
          <div class="ms-item">
            <span class="ms-value">{{ repo.watchers_count }}</span>
            <span class="ms-label">WATCHERS</span>
          </div>
          <div class="ms-item">
            <span class="ms-value">{{ repo.size ? (repo.size / 1024).toFixed(1) + 'MB' : '—' }}</span>
            <span class="ms-label">TAMANHO</span>
          </div>
          <div class="ms-item">
            <span class="ms-value">{{ repo.license?.spdx_id || '—' }}</span>
            <span class="ms-label">LICENÇA</span>
          </div>
        </div>

        <div v-if="languages && Object.keys(languages).length" class="modal-languages">
          <h3 class="ms-title">LINGUAGENS</h3>
          <div class="lang-bar">
            <div
              v-for="(bytes, lang) in langPercentages"
              :key="lang"
              class="lang-bar-segment"
              :style="{ width: bytes + '%', background: langColor(lang) }"
              :title="`${lang}: ${Math.round(bytes)}%`"
            ></div>
          </div>
          <div class="lang-list">
            <span v-for="(bytes, lang) in langPercentages" :key="lang" class="lang-tag-sm">
              <span class="lang-dot-sm" :style="{ background: langColor(lang) }"></span>
              {{ lang }} {{ Math.round(bytes) }}%
            </span>
          </div>
        </div>

        <div class="modal-columns">
          <div class="modal-col">
            <h3 class="ms-title">BRANCHES</h3>
            <div v-if="branches.length" class="branch-list">
              <span v-for="b in branches" :key="b.name" class="branch-item">
                &#9881; {{ b.name }}
              </span>
            </div>
            <p v-else class="no-data">Nenhuma branch.</p>
          </div>
          <div class="modal-col">
            <h3 class="ms-title">ÚLTIMOS COMMITS</h3>
            <div v-if="commits.length" class="commit-list">
              <div v-for="c in commits.slice(0, 5)" :key="c.sha" class="commit-item">
                <span class="commit-sha">{{ c.sha.slice(0, 7) }}</span>
                <span class="commit-msg">{{ c.commit.message.split('\n')[0] }}</span>
              </div>
            </div>
            <p v-else class="no-data">Nenhum commit.</p>
          </div>
        </div>

        <div v-if="contributors.length" class="modal-contributors">
          <h3 class="ms-title">CONTRIBUIDORES</h3>
          <div class="contrib-row">
            <a v-for="c in contributors.slice(0, 10)" :key="c.id" :href="c.html_url" target="_blank" class="contrib-avatar-wrap" :title="`${c.login} — ${c.contributions} commits`">
              <img :src="c.avatar_url" :alt="c.login" class="contrib-avatar" />
              <span class="contrib-count">{{ c.contributions }}</span>
            </a>
          </div>
        </div>

        <div v-if="readme" class="modal-readme">
          <h3 class="ms-title">README</h3>
          <pre class="readme-content">{{ readme }}</pre>
        </div>

        <div class="modal-footer">
          <a :href="repo.html_url" target="_blank" class="cyber-button repo-external">
            <span>ABRIR NO GITHUB</span>
          </a>
          <a v-if="repo.homepage" :href="repo.homepage" target="_blank" class="cyber-button repo-external secondary">
            <span>HOMEPAGE</span>
          </a>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  repo: Object,
  languages: Object,
  commits: Array,
  branches: Array,
  contributors: Array,
  readme: String
})

defineEmits(['close'])

const langPercentages = computed(() => {
  if (!props.languages) return {}
  const total = Object.values(props.languages).reduce((a, b) => a + b, 0)
  const result = {}
  for (const [lang, bytes] of Object.entries(props.languages)) {
    result[lang] = (bytes / total) * 100
  }
  return result
})

const langColors = {
  JavaScript: '#f1e05a', TypeScript: '#3178c6', Python: '#3572A5',
  Go: '#00ADD8', Rust: '#dea584', 'C++': '#f34b7d', C: '#555555',
  Java: '#b07219', Ruby: '#701516', PHP: '#4F5D95', HTML: '#e34c26',
  CSS: '#563d7c', Shell: '#89e051', Vue: '#41b883', Swift: '#F05138',
  Kotlin: '#A97BFF', Dart: '#00B4AB', Lua: '#000080', Haskell: '#5e5086'
}

function langColor(lang) {
  return langColors[lang] || '#8b8b8b'
}
</script>
