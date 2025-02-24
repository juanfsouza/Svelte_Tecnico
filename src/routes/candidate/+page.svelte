<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  let candidateName = '';
  let candidatePhone = '';
  let candidateEmail = '';

  onMount(() => {
    candidateName = sessionStorage.getItem('candidateName') || '';
    candidatePhone = sessionStorage.getItem('candidatePhone') || '';
    candidateEmail = sessionStorage.getItem('candidateEmail') || '';
  });

  function goBack() {
    goto('/');
  }
</script>

<main class="min-h-screen flex flex-col items-center justify-center p-8">
  <div class="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-4">
    <h2 class="text-2xl text-center">Informações do Candidato</h2>
    <p><strong>Nome:</strong> {candidateName}</p>
    <p><strong>Telefone:</strong> {candidatePhone}</p>
    <p><strong>Email:</strong> {candidateEmail}</p>

    <button on:click={goBack} class="btn btn-primary mt-4">Voltar</button>
  </div>
</main>
