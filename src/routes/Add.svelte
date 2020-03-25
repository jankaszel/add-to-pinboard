<script>
    import {fade} from 'svelte/transition';
    import TextInput from '../components/TextInput.svelte'
    import Spinner from '../components/Spinner.svelte'

    let url, loading, title

    const extractTitle = async (url) => {
        loading = true
        const res = await fetch(`https://add-to-pinboard.now.sh/api/extract?url=${encodeURIComponent(url)}`)
        const data = await res.json()
        title = data.title
        loading = false
    }

    function handleSubmit(e) {
        e.preventDefault()

        if (url) {
            extractTitle(url)
        }
    }

    function focus(el) {
        el.focus()
    }
</script>

<main>
    <h1>Add to Pinboard</h1>

    <form on:submit={handleSubmit}>
        <TextInput bind:value={url} placeholder="URL to add" autofocus/>

        {#if loading}
            <div transition:fade>
                <Spinner/>
            </div>
        {/if}
    </form>

    {#if title}
        <p transition:fade>Title: {title}</p>
    {/if}
</main>

<style>
    :root {
        --active-color: #18a0fb;
    }

    main {
        text-align: center;
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;
    }

    h1 {
        font-size: 4em;
        font-weight: 100;
    }

    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }
</style>
