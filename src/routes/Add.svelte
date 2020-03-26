<script>
    import {fade} from 'svelte/transition';
    import _ from 'lodash'
    import TextInput from '../components/TextInput.svelte'
    import Spinner from '../components/Spinner.svelte'

    let url, loading = false, adding = false, title, rev = 0
    const extractTitleDebounced = _.debounce(extractTitle, 250)

    $: if (url) {
        extractTitleDebounced(url, ++rev)
    }

    function focus(el) {
        el.focus()
    }

    async function extractTitle(url, _rev) {
        loading = true

        try {
            const res = await fetch(`https://add-to-pinboard.now.sh/api/extract?url=${encodeURIComponent(url)}`)
            const data = await res.json()

            if (_rev === rev) {
                title = data.title
            }
        } catch (err) {
            console.error(err)
            title = ''
        } finally {
            loading = false
        }
    }

    async function handleAdd(e) {
        e.preventDefault()

        if (!url || !title) {
            return
        }

        adding = true;
        const token = localStorage.getItem('pinboard-api-token')

        try {
            const res = await fetch('https://add-to-pinboard.now.sh/api/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({token, url, title})
            })

            if (res.status !== 200) {
                throw new Error(res.statusText)
            }

            url = ''
            title = ''
        } catch (err) {
            console.error(err)
        } finally {
            adding = false
        }
    }
</script>

<main>
    <h1>Add to Pinboard</h1>

    <form on:submit={handleAdd}>
        <label for="url">URL of the resource to add:</label>
        <div class="input">
            <TextInput id="url" bind:value={url} placeholder="https://www.eff.org/" autofocus/>
            {#if loading}
                <div transition:fade class="spinner">
                    <Spinner/>
                </div>
            {/if}
        </div>

        <label for="title">Title of the resource:</label>
        <TextInput id="title" bind:value={title}/>

        <div class="actions">
            <button disabled={!title || !url} on:click={handleAdd}>Add</button>
            {#if adding}
                <div transition:fade class="spinner">
                    <Spinner/>
                </div>
            {/if}
        </div>
    </form>

</main>

<style>
    :root {
        --active-color: #18a0fb;
    }

    main {
        padding: 1em;
    }

    h1 {
        font-size: 20px;
        font-weight: 500;
    }

    form {
        display: flex;
        flex-direction: column;
    }

    label {
        padding-top: 15px;
    }

    .spinner {
        padding-left: 5px;
    }

    .input {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .actions {
        display: flex;
        flex-direction: row;
        align-items: center;

        padding-top: 15px;
    }
</style>
