<script>
    export let rotate;
</script>

<section class="polaroid" style={rotate ? `transform: rotate(${rotate});` : ''}>
    <div class="photo">
        <slot name="image"></slot>
    </div>
    <div class="text">
        <slot name="description"></slot>
    </div>
</section>

<style>
    .polaroid {
        box-shadow: 0 5px 25px 0 rgba(0, 0, 0, 0.3);
        height: 300px;
        width: 200px;

        border: solid white 20px;
        border-bottom-width: 60px;
        background: white;
        position: relative;
        transition: all 0.4s;
    }

    .photo {
        width: 100%;
        height: 100%;
        max-height: 100vh;
    }

    .photo :global(*[slot=image]) {
        width: 100%;
        height: 100%;
    }

    .photo :global(img) {
        object-fit: cover;
        width: 100%;
        height: 100%;
    }

    .text {
        width: 100%;
        margin: 3% auto;
    }
</style>
