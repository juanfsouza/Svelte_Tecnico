<script lang="ts">
  export let message: string;
  export let onClose: () => void;
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div
  class="fixed inset-0 bg-black/90 bg-opacity-50 flex items-center justify-center"
  role="dialog"
  aria-modal="true"
  on:click={onClose} 
>
  <div 
    class="bg-white p-10 rounded-lg shadow-lg relative" 
    on:click|stopPropagation
  >
    <button
      class="absolute top-2 right-2 transition-transform duration-200 hover:scale-120 text-red-600"
      on:click={onClose}
      aria-label="Fechar modal"
    >
      ✕
    </button>

    <p class="text-xl text-center">{message}</p>

    <button
      class="btn btn-primary w-full mt-5 border border-gray-600 rounded-2xl px-4 py-2 transition-colors duration-300 hover:bg-zinc-600 hover:text-white flex items-center justify-center"
      on:click={onClose}
      aria-label="Fechar modal"
    >
      Fechar
    </button>
  </div>
</div>
