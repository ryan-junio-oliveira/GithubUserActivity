<template>
  <div v-if="visible" class="loading-overlay">
    <div class="spinner-ring"></div>
    <p class="loading-text">{{ text }}</p>
  </div>
</template>

<script setup>
defineProps({
  visible: Boolean,
  text: { type: String, default: 'CARREGANDO...' }
})
</script>
