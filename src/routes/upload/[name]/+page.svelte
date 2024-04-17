<script>
    import {fly} from 'svelte/transition';
    import {page} from '$app/stores';
    import FilepondWrapper from "../../../component/FilepondWrapper.svelte";

    let name = $page.params.name;
</script>

<style>
    .link-to-gallery {
        z-index: 3;
        position: fixed;
        top: 0;
        height: 3rem;
        background: white;
        width: 100%;
        text-align: center;
    }

    .link-to-gallery, .link-to-gallery:hover, .link-to-gallery:active, .link-to-gallery:focus {
        text-decoration: none;
        color: black;
    }

    .filepond--container {
        padding-top: 5rem;
    }
</style>
<svelte:head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes">
</svelte:head>

<a class="link-to-gallery" href="/gallery"><p>Bekijk de foto's van anderen!</p></a>

<div class="filepond--container"
     in:fly="{{ y: -50, duration: 250, delay: 300 }}"
     out:fly="{{ y: -50, duration: 250 }}">
    <FilepondWrapper name={name}/>
</div>
