<script lang="ts">
  import Modal from '../components/Modal.svelte';
  import { onMount } from 'svelte';

  let name = '';
  let phone = '';
  let email = '';
  let showCandidatePage = false;
  let countdown = 15;
  let timer: number;
  let modalMessage = '';
  let showModal = false;
  let challengeStarted = false;

  export let candidateName: string;
  export let candidatePhone: string;
  export let candidateEmail: string;

  function startCountdown() {
    const storedTime = sessionStorage.getItem('countdown');
    if (storedTime && parseInt(storedTime) > 0) {
      countdown = parseInt(storedTime);
    } else {
      countdown = 15;
    }

    timer = setInterval(() => {
      if (countdown > 0) {
        countdown--;
        sessionStorage.setItem('countdown', countdown.toString());
      } else {
        clearInterval(timer);
        modalMessage = 'Desafio finalizado com falha!';
        showModal = true;
        sessionStorage.removeItem('countdown');
      }
    }, 1000);
  }

  onMount(() => {
    const storedTime = sessionStorage.getItem('countdown');
    if (storedTime && parseInt(storedTime) > 0) {
      countdown = parseInt(storedTime);
    }
  });

  function startChallenge() {
    if (countdown === 15) {
      startCountdown();
      challengeStarted = true;
    }
  }

  function submitChallenge() {
    clearInterval(timer);
    modalMessage = 'Desafio finalizado com sucesso!';
    showModal = true;
    sessionStorage.setItem('candidateName', name);
    sessionStorage.setItem('candidatePhone', phone);
    sessionStorage.setItem('candidateEmail', email);
    sessionStorage.removeItem('countdown');
  }

  function closeModal() {
    showModal = false;

    if (modalMessage === 'Desafio finalizado com sucesso!') {
      setTimeout(() => {
        window.location.href = `/candidate?name=${encodeURIComponent(name)}&phone=${encodeURIComponent(phone)}&email=${encodeURIComponent(email)}`;
      }, 500);
    }
  }
  
  onMount(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  });
</script>
<main class="min-h-screen flex flex-col items-center justify-center p-8 transition-all">
  <div class="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-2">
    {#if countdown < 15}
      <p class="text-xl mt-1 mb-5 text-center text-gray-700">
        Tempo restante: {String(countdown).padStart(2, '0')}
      </p>
    {/if}
    {#if !showCandidatePage}
      <form on:submit|preventDefault={startChallenge} class="space-y-4">
        <div class="relative">
          <input type="text" bind:value={name} placeholder="Nome" class="input input-bordered w-full h-12 px-4 border border-gray-300 rounded-md transition-transform duration-200 hover:scale-102" required />
          <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
            <i class="fa fa-user"></i>
          </span>
        </div>

        <div class="relative">
          <input type="text" bind:value={phone} placeholder="Telefone" class="input input-bordered w-full h-12 px-4 border border-gray-300 rounded-md transition-transform duration-200 hover:scale-102" required />
          <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
            <i class="fa fa-phone"></i>
          </span>
        </div>

        <div class="relative">
          <input type="email" bind:value={email} placeholder="Email" class="input input-bordered w-full h-12 px-4 border border-gray-300 rounded-md transition-transform duration-200 hover:scale-102" required />
          <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
            <i class="fa fa-envelope"></i>
          </span>
        </div>
        
        <button type="submit" class="btn btn-primary w-full border border-gray-600 rounded-2xl px-4 py-2 transition-colors duration-300 hover:bg-zinc-600 hover:text-white flex items-center justify-center">
          <i class="fa fa-play mr-2"></i> Iniciar Desafio
        </button>
      </form>

      {#if challengeStarted}
        <button on:click={submitChallenge} class="btn btn-success w-full px-4 py-2 border border-zinc-600 rounded-2xl transition-colors duration-300 hover:bg-zinc-600 hover:text-white flex items-center justify-center">
          <i class="fa fa-check-circle mr-2"></i> Enviar
        </button>
      {/if}
    {:else}
      <div class="space-y-4 text-center">
        <p><strong>Nome:</strong> {candidateName}</p>
        <p><strong>Telefone:</strong> {candidatePhone}</p>
        <p><strong>Email:</strong> {candidateEmail}</p>

        <button on:click={() => showCandidatePage = false} class="btn btn-secondary mt-6 px-4 py-2 border border-gray-600 rounded-2xl transition-colors duration-300 hover:bg-gray-600 hover:text-white flex items-center justify-center">
          <i class="fa fa-arrow-left mr-2"></i> Voltar
        </button>
      </div>
    {/if}
  </div>

  <a href={`/candidate?name=${encodeURIComponent(name)}&phone=${encodeURIComponent(phone)}&email=${encodeURIComponent(email)}`}
     class="absolute text-white border border-gray-600 rounded-2xl p-2  top-4 right-4 btn btn-outline btn-info transition-transform duration-200 hover:scale-102 hover:text-black hover:bg-white flex items-center justify-center">
    <i class="fa fa-user-circle mr-2"></i> Página do Candidato
  </a>

  {#if showModal}
    <Modal message={modalMessage} onClose={closeModal} />
  {/if}
</main>
