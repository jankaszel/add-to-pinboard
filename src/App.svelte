<script>
    import {Router, Link, Route} from "svelte-routing";
    import Add from './routes/Add.svelte'
    import Settings from './routes/Settings.svelte'

    let url = ''
</script>

<Router url="{url}">
    <nav>
        <Link to="/">Add</Link>
        <Link to="settings">Settings</Link>
    </nav>
    <div>
        <Route path="settings" component="{Settings}"/>
        <Route path="/">
            <Add/>
        </Route>
    </div>
</Router>
