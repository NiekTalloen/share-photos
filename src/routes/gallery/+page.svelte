<style>
    .app {
        min-width: 100%;
        min-height: 100%;
        background-color: #a3b18a;
        padding-top: 5rem;
    }

    .container {
        padding: 2rem;
        display: grid;
        grid-gap: 2rem;
        align-items: center;
        justify-content: center;
        justify-items: center;
    }

    .link-to-gallery {
        position: fixed;
        top: 0;
        z-index: 3;
        height: 3rem;
        background: white;
        width: 100%;
        text-align: center;
    }

    .link-to-gallery, .link-to-gallery:hover, .link-to-gallery:active, .link-to-gallery:focus {
        text-decoration: none;
        color: black;
    }
</style>


<script>
    import Polaroid from "../../component/Polaroid.svelte";
    import {fly} from 'svelte/transition';
    import {onMount} from "svelte";
    import {afterNavigate} from "$app/navigation";

    /** @type {import('./$types').PageData} */
    export let data;

    function randomRotation() {
        return Math.random() * 10 - 5 + "deg";
    }

    onMount(() => {
        const images = document.querySelectorAll("*[data-src]");
        const imageObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        const image = entry.target;
                        image.setAttribute('src', image.getAttribute('data-src'));
                        image.removeAttribute('data-src');
                        observer.unobserve(image);
                    }
                });
            }, {
                root: null, // null means: the viewport
                rootMargin: "0px 0px 500px 0px"
            });

        images.forEach(image => imageObserver.observe(image));
    });

    let previousPage;

    afterNavigate(({from}) => {
        previousPage = from?.url.pathname || previousPage || '/'
    })
</script>

<svelte:head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes">
</svelte:head>

<a class="link-to-gallery" href="{previousPage}"><p>Deel jouw foto's en filmpjes!</p></a>

<div class="app"
     in:fly="{{ y: -50, duration: 250, delay: 300 }}"
     out:fly="{{ y: -50, duration: 250 }}">
    <div class="container">
        {#each data.imageNamesAndSizes as image}
            <Polaroid rotate={randomRotation()}
                      landscape={image.width > image.height}
                      compact={true}>
                <div slot="image">
                    <img data-src={'/gallery/' + image.name} src="loading.webp" alt=""/>
                </div>
            </Polaroid>
        {/each}
    </div>
</div>

