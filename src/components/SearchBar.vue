<template>
  <div class="search-section">
    <div class="search-container">
      <div class="cyber-grid"></div>
      <div class="search-inner">
        <div class="search-glow"></div>
        <div class="search-mode-switch">
          <button
            :class="['mode-btn', { active: mode === 'user' }]"
            @click="mode = 'user'"
          >
            <span class="mode-icon">&#9783;</span>
            USUÁRIO
          </button>
          <button
            :class="['mode-btn', { active: mode === 'repo' }]"
            @click="mode = 'repo'"
          >
            <span class="mode-icon">&#9881;</span>
            REPO
          </button>
        </div>
        <div class="input-group">
          <input
            ref="inputRef"
            v-model="query"
            :placeholder="mode === 'user' ? 'usuário do github...' : 'repositório...'"
            class="cyber-input"
            @keyup.enter="search"
            @input="onInput"
          />
          <button class="cyber-button" @click="search" :disabled="!query.trim()">
            <span class="btn-text">EXECUTAR</span>
            <span class="btn-glitch">EXECUTAR</span>
          </button>
        </div>
        <div v-if="mode === 'repo' && suggestions.length" class="suggestions">
          <div
            v-for="r in suggestions"
            :key="r.id"
            class="suggestion-item"
            @click="selectSuggestion(r)"
          >
            <img :src="r.owner.avatar_url" class="suggestion-avatar" />
            <div class="suggestion-info">
              <strong>{{ r.full_name }}</strong>
              <span class="suggestion-stars">&#9733; {{ r.stargazers_count }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { searchRepositories } from '../api/github.js'

const emit = defineEmits(['search-user', 'search-repo'])
const props = defineProps({
  loading: Boolean
})

const query = ref('')
const mode = ref('user')
const suggestions = ref([])
const inputRef = ref(null)

let debounceTimer = null

function onInput() {
  if (mode.value === 'user') return
  clearTimeout(debounceTimer)
  if (query.value.trim().length < 2) {
    suggestions.value = []
    return
  }
  debounceTimer = setTimeout(async () => {
    try {
      const data = await searchRepositories(query.value.trim(), 1)
      suggestions.value = (data.items || []).slice(0, 5)
    } catch {
      suggestions.value = []
    }
  }, 400)
}

function selectSuggestion(r) {
  query.value = r.full_name
  suggestions.value = []
  emit('search-repo', r.full_name)
}

function search() {
  if (!query.value.trim()) return
  suggestions.value = []
  if (mode.value === 'user') {
    emit('search-user', query.value.trim())
  } else {
    emit('search-repo', query.value.trim())
  }
}

watch(mode, () => {
  suggestions.value = []
  query.value = ''
  inputRef.value?.focus()
})
</script>
