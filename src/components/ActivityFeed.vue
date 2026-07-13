<template>
  <div class="activity-section">
    <div class="section-header">
      <h2 class="section-title">
        <span class="title-accent">&gt;</span> ATIVIDADES RECENTES
      </h2>
    </div>
    <div v-if="!events.length" class="empty-state">NENHUMA ATIVIDADE RECENTE.</div>
    <div class="activity-timeline">
      <div v-for="event in events" :key="event.id" class="activity-item">
        <div class="timeline-dot" :class="eventDotClass(event.type)"></div>
        <div class="activity-card cyber-card-sm">
          <div class="activity-header">
            <span class="activity-type" :class="eventTypeClass(event.type)">
              {{ formatEventType(event.type) }}
            </span>
            <span class="activity-repo">
              <a :href="`https://github.com/${event.repo.name}`" target="_blank">
                {{ event.repo.name }}
              </a>
            </span>
          </div>
          <div class="activity-body">
            <span v-if="event.payload.commits" class="activity-commits">
              {{ event.payload.commits.length }} commit{{ event.payload.commits.length > 1 ? 's' : '' }}
            </span>
            <span v-if="event.payload.action" class="activity-action">
              ação: {{ event.payload.action }}
            </span>
            <span v-if="event.payload.ref" class="activity-ref">
              {{ event.payload.ref_type || 'branch' }}: {{ event.payload.ref }}
            </span>
            <span v-if="event.payload.pull_request" class="activity-pr">
              PR #{{ event.payload.pull_request.number }}
            </span>
            <span v-if="event.payload.issue" class="activity-issue">
              Issue #{{ event.payload.issue.number }}
            </span>
          </div>
          <div class="activity-footer">
            <span class="activity-date">{{ timeAgo(event.created_at) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({ events: Array })

function eventDotClass(type) {
  const map = {
    PushEvent: 'dot-push',
    CreateEvent: 'dot-create',
    IssuesEvent: 'dot-issue',
    PullRequestEvent: 'dot-pr',
    WatchEvent: 'dot-star',
    ForkEvent: 'dot-fork',
    IssueCommentEvent: 'dot-comment',
    ReleaseEvent: 'dot-release',
    DeleteEvent: 'dot-delete',
    PublicEvent: 'dot-public',
    MemberEvent: 'dot-member'
  }
  return map[type] || 'dot-default'
}

function eventTypeClass(type) {
  const map = {
    PushEvent: 'type-push',
    CreateEvent: 'type-create',
    IssuesEvent: 'type-issue',
    PullRequestEvent: 'type-pr',
    WatchEvent: 'type-star',
    ForkEvent: 'type-fork'
  }
  return map[type] || ''
}

function formatEventType(type) {
  const map = {
    PushEvent: 'PUSH',
    CreateEvent: 'CRIAÇÃO',
    IssuesEvent: 'ISSUE',
    PullRequestEvent: 'PULL REQUEST',
    WatchEvent: 'ESTRELA',
    ForkEvent: 'FORK',
    IssueCommentEvent: 'COMENTÁRIO',
    ReleaseEvent: 'RELEASE',
    DeleteEvent: 'REMOÇÃO',
    PublicEvent: 'PUBLICADO',
    MemberEvent: 'MEMBRO',
    GollumEvent: 'WIKI',
    CommitCommentEvent: 'COMENTÁRIO COMMIT'
  }
  return map[type] || type.replace('Event', '').toUpperCase()
}

function timeAgo(dateStr) {
  const now = Date.now()
  const then = new Date(dateStr).getTime()
  const diff = now - then
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}min atrás`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h atrás`
  const days = Math.floor(hrs / 24)
  if (days < 30) return `${days}d atrás`
  const months = Math.floor(days / 30)
  if (months < 12) return `${months}m atrás`
  return `${Math.floor(months / 12)}a atrás`
}
</script>
