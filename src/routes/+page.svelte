<style>
    .app {
        min-width: 100%;
        min-height: 100%;
        background-color: #a3b18a;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100dvh;
        width: 100dvw;
    }

    .overlay {
        position: absolute;
        animation: fade-in 1s forwards;

        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.9rem;
        padding: 30px;

        inset: 0;
        color: white;
        background-image: linear-gradient(rgba(57, 57, 57, 0.5), rgba(57, 57, 57, 0.7));
    }

    .overlay .text {
        opacity: 0;
        animation: fade-in 1s 0.5s forwards;
        text-align: center;
    }

    @keyframes fade-in {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }


    input {
        background: 0;
        border: 0;
        outline: none;
        transition: padding 0.3s 0.2s ease;
        margin-top: 10px;
    }

    input:focus {
        padding-bottom: 5px;
    }

    /* Expanded sibling selector for input focus */
    input:focus + .line::after {
        transform: scaleX(1);
    }

    .field {
        opacity: 0;
        animation: fade-in 1s 1s forwards;
        position: relative;
    }

    .field .line {
        width: 100%;
        height: 2px;
        position: absolute;
        bottom: -4px;
        background: #bdc3c7;
    }

    .field .line::after {
        content: " ";
        position: absolute;
        width: 100%;
        transform: scaleX(0);
        transition: transform 0.3s ease;
        background: #a3b18a;
    }
</style>


<script>
    import { fly } from 'svelte/transition';
    import Polaroid from "../component/Polaroid.svelte";
    import {goto} from "$app/navigation";

    let name;
    let inputElement;

    function debounce(func, wait) {
        let timeout;
        return function (...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    function handleSubmit() {
        inputElement.blur();
        goto(`upload/${name}`);
    }

    // Debounce the handleSubmit function
    const debouncedSubmit = debounce(handleSubmit, 2000);

</script>

<div class="app"
     in:fly="{{ y: -50, duration: 250, delay: 300 }}"
     out:fly="{{ y: -50, duration: 250 }}" >
    <Polaroid>
        <div class="image-wrapper" slot="image">
            <img src="shaary-en-stijn.jpg" alt="Shaary en Stijn">
            <div class="overlay">
                <h3 class="text">Deel jouw foto's en filmpjes!</h3>
            </div>
        </div>
        <div slot="description">
            <div class="field">
                <input type="text"
                       bind:this={inputElement}
                       bind:value={name}
                       on:input={debouncedSubmit}
                       placeholder="Wat is jouw naam?">
                <div class="line"></div>
            </div>
        </div>
    </Polaroid>
</div>
