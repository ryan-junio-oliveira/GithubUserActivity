<template>
  <div class="followers-section">
    <div class="section-header">
      <h2 class="section-title">
        <span class="title-accent">&gt;</span> SEGUIDORES
        <span class="repo-count">({{ followers.length }})</span>
      </h2>
    </div>
    <div v-if="!followers.length" class="empty-state">NENHUM SEGUIDOR.</div>
    <div class="followers-grid">
      <div v-for="f in followers" :key="f.id" class="follower-card cyber-card-sm" @click="selectUser(f.login)">
        <img :src="f.avatar_url" :alt="f.login" class="follower-avatar" />
        <div class="follower-info">
          <span class="follower-login">@{{ f.login }}</span>
          <a :href="f.html_url" target="_blank" class="follower-link" @click.stop>PERFIL</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({ followers: Array })
const emit = defineEmits(['select-user'])

function selectUser(login) {
  emit('select-user', login)
}
</script>
