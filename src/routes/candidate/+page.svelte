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
  <div class="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-6">
    <h2 class="text-3xl font-semibold text-center text-gray-800">Informações do Candidato</h2>
    <div class="space-y-2 text-lg text-gray-700">
      <p><strong>Nome:</strong> {candidateName}</p>
      <p><strong>Telefone:</strong> {candidatePhone}</p>
      <p><strong>Email:</strong> {candidateEmail}</p>
    </div>

    <button on:click={goBack} class="btn btn-outline btn-info w-full py-2 flex items-center justify-center text-black border border-gray-600 rounded-2xl transition-transform duration-200 hover:bg-black hover:text-white hover:scale-102">
      <i class="fa fa-arrow-left mr-2"></i> Voltar
    </button>
  </div>
</main>
