<script>
    export let id = null
    export let value = ''
    export let placeholder = null, autofocus = false

    function focus(el) {
        if (autofocus) {
            el.focus()
        }
    }
</script>

<input type="text" bind:value={value} {...{placeholder, id}} use:focus/>

<style>
    input[type=text] {
        width: 500px;
        border: 1px solid rgb(230, 230, 230);
        border-radius: 2px;
        padding: 6px 8px;

        font-size: inherit;
        transition: border-color 125ms ease-in-out;
    }

    input[type=text]:active, input[type=text]:focus {
        border-width: 2px;
        border-color: var(--active-color);
        padding: 5px 7px;
    }
</style>
