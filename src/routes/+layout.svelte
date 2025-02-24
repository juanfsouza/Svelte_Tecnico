<script lang="ts">
	import '../app.css';
	let { children } = $props();
  </script>
  
  <head>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
  </head>
  
  <main>
	{@render children()}
  </main>
  