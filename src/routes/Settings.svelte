<script>
    import TextInput from "../components/TextInput.svelte";

    const fieldKey = 'pinboard-api-token'
    let token = localStorage.getItem(fieldKey)
    $: localStorage.setItem(fieldKey, token)

    function handleSubmit(e) {
        e.preventDefault()
    }

    function handleReset(e) {
        console.log('hi?')
        e.preventDefault()
        token = ''
        localStorage.removeItem(fieldKey)
    }
</script>

<main>
    <h1>Settings</h1>

    <form on:submit={handleSubmit} on:reset={handleReset}>
        <label for="token">Instead of asking for your password, we ask you to provide your Pinboard API token:</label>
        <TextInput id="token" bind:value={token} placeholder="Pinboard API token"/>
        <em>You'll find it via pinboard.in → Settings → Password.</em>

        <div class="actions">
            <button disabled={!token} on:click={handleSubmit}>Save</button>
            <button disabled={!token} on:click={handleReset}>Reset</button>
        </div>
    </form>
</main>

<style>
    form {
        display: flex;
        flex-direction: column;
    }

    em {
        display: block;
        width: 100%;

        font-size: 12px;
        line-height: 135%;
        font-style: normal;
    }

    .actions {
        padding-top: 10px;
    }
</style>
