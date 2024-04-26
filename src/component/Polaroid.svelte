<script>
    export let rotate;
    export let landscape;
    export let compact;
</script>

<section class="polaroid"
         style={rotate ? `transform: rotate(${rotate});` : ''}
         class:landscape={landscape}
         class:compact={compact}>
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
        height: 268px;
        width: 200px;

        border: solid white 20px;
        border-bottom-width: 60px;
        background: white;
        position: relative;
        transition: all 0.4s;
    }

    .polaroid.landscape {
        height: 200px;
        width: 300px;
    }

    .polaroid.compact {
        border-bottom-width: 40px;
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
