<script>
</script>

<section class="polaroid">
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

        transform: rotate(2deg);
        border: solid white 20px;
        border-bottom-width: 60px;
        background: white;
    }

    .photo {
        width: 100%;
        height: 100%;
        max-height: 100vh;
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
