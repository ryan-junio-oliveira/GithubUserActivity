<template>
  <Transition name="glitch-fade">
    <div v-if="message" class="error-alert" @click="$emit('close')">
      <span class="error-icon">⚠</span>
      <span class="error-text">{{ message }}</span>
      <button class="error-close">&times;</button>
    </div>
  </Transition>
</template>

<script setup>
defineProps({ message: String })
defineEmits(['close'])
</script>
