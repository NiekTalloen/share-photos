<script>
    import { fly } from 'svelte/transition';
    import {page} from '$app/stores';
    import FilepondWrapper from "../../../component/FilepondWrapper.svelte";

    let name = $page.params.name;
</script>

<div class="app"
     in:fly="{{ y: -50, duration: 250, delay: 300 }}"
     out:fly="{{ y: -50, duration: 250 }}" >
    <FilepondWrapper name={name}/>
</div>
