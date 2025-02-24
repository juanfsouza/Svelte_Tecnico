<script lang="ts">
  import Modal from '../components/Modal.svelte';
  import { onMount } from 'svelte';
  import { tick } from 'svelte';

  let name = '';
  let phone = '';
  let email = '';
  let showCandidatePage = false;
  let countdown = 15;
  let timer: number;
  let modalMessage = '';
  let showModal = false;
  let challengeStarted = false;
  let showAlert = false;

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
      challengeStarted = true; // Garantir que o desafio continua
      startCountdown(); // Retomar o contador
    }

    // Restaurar dados do candidato
    name = sessionStorage.getItem('candidateName') || '';
    phone = sessionStorage.getItem('candidatePhone') || '';
    email = sessionStorage.getItem('candidateEmail') || '';
  });


  function startChallenge() {
    if (!challengeStarted) {
      challengeStarted = true;
      startCountdown();
    }
  }

  async function submitChallenge() {
    if (!name.trim() || !phone.trim() || !email.trim()) {
      modalMessage = 'Preencha todos os campos antes de enviar!';
      showModal = true;
      return;
    }

    clearInterval(timer);
    console.log('Enviando formulário:', { name, phone, email });

    modalMessage = 'Desafio finalizado com sucesso!';
    showModal = true;

    sessionStorage.setItem('candidateName', name);
    sessionStorage.setItem('candidatePhone', phone);
    sessionStorage.setItem('candidateEmail', email);
    sessionStorage.removeItem('countdown');

    showAlert = true;
    
    await tick();

    setTimeout(() => {
      showAlert = false;
    }, 3000);
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

    {#if showAlert}
      <div class="alert alert-success shadow-lg rounded-md transition-all duration-300 animate-fadeIn fixed top-4 right-4 z-50">
        <i class="fa fa-check-circle text-white text-lg m-5"></i>
        <span class="mr-5">Desafio enviado com sucesso!</span>
      </div>
    {/if}

    {#if countdown < 15}
      <p class="text-xl mt-1 mb-5 text-center text-gray-700">
        Tempo restante: {String(Math.floor(countdown / 60)).padStart(2, '0')}:{String(countdown % 60).padStart(2, '0')}
      </p>
    {/if}
    
    {#if !showCandidatePage}
      <form on:submit|preventDefault={startChallenge} class="space-y-4">
        <div class="relative">
          <input type="text" bind:value={name} placeholder="Nome" class="input input-bordered w-full h-12 px-4 pl-12 border border-gray-300 rounded-md transition-transform duration-200 hover:scale-102 hover:border-gray-500" required />
          <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-400 text-xl transition-all duration-200 hover:text-zinc-500">
            <i class="fa fa-user"></i>
          </span>
        </div>
        
        <div class="relative">
          <input type="text" bind:value={phone} placeholder="Telefone" class="input input-bordered w-full h-12 px-4 pl-12 border border-gray-300 rounded-md transition-transform duration-200 hover:scale-102 hover:border-gray-500" required />
          <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-400 text-xl transition-all duration-200 hover:text-zinc-500">
            <i class="fa fa-phone"></i>
          </span>
        </div>
        
        <div class="relative">
          <input type="email" bind:value={email} placeholder="Email" class="input input-bordered w-full h-12 px-4 pl-12 border border-gray-300 rounded-md transition-transform duration-200 hover:scale-102 hover:border-gray-500" required />
          <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-400 text-xl transition-all duration-200 hover:text-zinc-500">
            <i class="fa fa-envelope"></i>
          </span>
        </div>
        
        <button type="submit" class="btn btn-primary w-full border border-gray-600 rounded-2xl px-4 py-2 transition-colors duration-300 hover:bg-black hover:text-white flex items-center justify-center">
          <i class="fa fa-play mr-2"></i> Iniciar Desafio
        </button>        
      </form>

      {#if challengeStarted}
      <button on:click={submitChallenge} class="btn btn-success w-full px-4 py-2 border border-black rounded-2xl transition-colors duration-300 hover:bg-black hover:text-white flex items-center justify-center">
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

  {#if challengeStarted}
    <a href={`/candidate?name=${encodeURIComponent(name)}&phone=${encodeURIComponent(phone)}&email=${encodeURIComponent(email)}`} 
      class="absolute top-4 right-4 flex items-center gap-2 px-4 py-2 border border-gray-600 text-white rounded-2xl btn btn-outline btn-info transition-all duration-200 hover:scale-105 hover:border-gray-500 hover:bg-white hover:text-gray-800">
      <i class="fa fa-user-circle"></i> Página do Candidato
    </a>
  {/if}

  {#if showModal}
    <Modal message={modalMessage} onClose={closeModal} />
  {/if}
</main>

<style>
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out;
  }
</style>