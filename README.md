# CYBERGIT — GitHub User Activity Explorer

Interface web responsiva em **Vue 3** com tema **cyberpunk** para explorar dados de usuários e repositórios do GitHub via API REST.

![Preview](https://img.shields.io/badge/status-finalizado-22c55e?style=flat-square)
![Vue](https://img.shields.io/badge/Vue_3-4FC08D?style=flat-square&logo=vuedotjs&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)

---

## Funcionalidades

- **Perfil completo do usuário** — avatar, bio, stats (repos, estrelas, forks, seguidores), organizações, linguagens mais usadas
- **Repositórios** — listagem com filtro em tempo real, cores por linguagem, métricas (stars, forks, issues, tamanho)
- **Atividades recentes** — timeline com 12 tipos de evento do GitHub (Push, Pull Request, Issues, Star, Fork, etc.)
- **Seguidores** — grid clicável para navegar entre perfis
- **Modal de repositório** — estatísticas detalhadas, barras de linguagens, branches, últimos commits, contribuidores, README
- **Busca inteligente** — alterna entre busca de usuário e repositório com autocomplete
- **Design cyberpunk** — neons, scanlines, animações, partículas em canvas, responsivo

## Endpoints da API Explorados

| Endpoint | Descrição |
|---|---|
| `GET /users/{username}` | Perfil do usuário |
| `GET /users/{username}/repos` | Repositórios |
| `GET /users/{username}/events` | Eventos recentes |
| `GET /users/{username}/followers` | Seguidores |
| `GET /users/{username}/following` | Seguindo |
| `GET /users/{username}/orgs` | Organizações |
| `GET /users/{username}/starred` | Repositórios estrelados |
| `GET /repos/{owner}/{repo}` | Detalhes do repositório |
| `GET /repos/{owner}/{repo}/languages` | Linguagens |
| `GET /repos/{owner}/{repo}/commits` | Commits |
| `GET /repos/{owner}/{repo}/branches` | Branches |
| `GET /repos/{owner}/{repo}/contributors` | Contribuidores |
| `GET /repos/{owner}/{repo}/readme` | README |
| `GET /search/users` | Busca de usuários |
| `GET /search/repositories` | Busca de repositórios |

## Como usar

```bash
npm install
npm run dev
```

Abra `http://localhost:5173` no navegador. Digite um usuário do GitHub e explore.

### Build para produção

```bash
npm run build
npm run preview
```

## Estrutura

```
src/
├── api/github.js              # Camada de API (fetch)
├── composables/useGithub.js   # Estado reativo
├── components/
│   ├── SearchBar.vue          # Busca com autocomplete
│   ├── UserProfile.vue        # Card de perfil
│   ├── Repositories.vue       # Lista de repositórios
│   ├── ActivityFeed.vue       # Timeline de atividades
│   ├── FollowersPanel.vue     # Grid de seguidores
│   ├── Organizations.vue      # Badges de orgs
│   ├── RepoDetailModal.vue    # Modal de detalhes
│   ├── LoadingSpinner.vue     # Loader animado
│   └── ErrorAlert.vue         # Alerta de erro
├── App.vue                    # Orquestrador + partículas
├── style.css                  # Tema cyberpunk
└── main.js                    # Entry point
```

## Referência

Projeto baseado no desafio [GitHub User Activity](https://roadmap.sh/projects/github-user-activity) do roadmap.sh, expandido para explorer completo da API do GitHub.

- [Documentação da API do GitHub](https://docs.github.com/en/rest)
