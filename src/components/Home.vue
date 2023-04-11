<template>
  <div class="main-container">
    <h1>Welcome to WebChat.</h1>
    <p>Used solution stack:</p>
    <ul class="stack">
      <li>ASP .NET Core Web API</li>
      <li class="description">
        Backend that exposes API for getting chat history, adding friends and making chat rooms.
        Also provides authentication and authorization with Identity framework.
      </li>
      <li>Entity Framework</li>
      <li class="description">ORM for my relational database.</li>
      <li>SQL Server</li>
      <li class="description">
        Relational database for storing friends relationships, chat histories and info about chat rooms.
      </li>
      <li>Vue</li>
      <li class="description">
        Frontend framework for SPA that provides routing and component system.
      </li>
      <li>SignalR</li>
      <li class="description">
        Backend lib and browser client for realtime message sending between clients.
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Home"
}
</script>

<style scoped>
  .main-container {
    display: flex;
    flex-direction: column;
    align-items: start;
    max-width: 70%;
  }

  h1 {
    margin-bottom: 10px;
  }

  .stack {
    margin-top: 20px;
    margin-left: 20px;
    list-style: none;
    text-align: start;
  }

  .description {
    margin-left: 20px;
    margin-bottom: 10px;
    margin-top: 5px;
    font-style: italic;
  }
</style>