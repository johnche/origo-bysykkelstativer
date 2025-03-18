<script>
	let { children } = $props();
</script>

<svelte:head>
	<style>
		html,
		body {
			margin: 0;
			padding: 0;
			min-height: 100vh;
			/* mobile viewport bug fix */
			min-height: -webkit-fill-available;
			font-family: Droid, sans-serif;
		}

		html {
			height: -webkit-fill-available;
		}
	</style>
</svelte:head>

<main>
	<nav>Oslo Bysykkel 🚲</nav>
	{@render children()}
</main>

<style>
	main {
		height: 100dvh;
		display: flex;
		flex-direction: column;
	}

	nav {
		height: 4rem;
		display: flex;
		align-items: center;
		justify-content: center;
		border-bottom: 1px solid #e1e1e1;
	}
</style>
