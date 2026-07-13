<template>
  <div v-if="orgs.length" class="orgs-section">
    <div class="section-header">
      <h2 class="section-title">
        <span class="title-accent">&gt;</span> ORGANIZAÇÕES
      </h2>
    </div>
    <div class="orgs-row">
      <a v-for="org in orgs" :key="org.id" :href="org.html_url" target="_blank" class="org-badge" :title="org.login">
        <img :src="org.avatar_url" :alt="org.login" class="org-avatar" />
        <span class="org-name">{{ org.login }}</span>
      </a>
    </div>
  </div>
</template>

<script setup>
defineProps({ orgs: Array })
</script>
