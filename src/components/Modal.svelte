<script lang="ts">
  export let message: string;
  export let onClose: () => void;
</script>

  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<div
  data-testid="modal"
  class="fixed inset-0 bg-black/90 bg-opacity-50 flex items-center justify-center modal-box"
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
  </div>
</div>

