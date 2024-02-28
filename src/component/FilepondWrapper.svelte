<style global>
    @import 'filepond/dist/filepond.css';
    @import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

    :global(.filepond--root) {
        max-height: 100dvh;
    }
    :global(.filepond--credits) {
        display: none;
    }

    :global(.filepond--panel-root) {
        background-color: #a3b18a;
    }

    :global(.filepond--image-preview) {
        background-color: white;
    }

    :global(.filepond--file-action-button) {
        cursor: pointer;
    }

    :global(.filepond--root .hello) {
        margin-top: 70px;
        font-size: 3rem;
    }

    :global(.filepond--root .hello, .filepond--root .uploadLink) {
        cursor: pointer;
    }

    :global(.filepond--root .filepond--list-scroller) {
        margin-top: 10em;
    }

    @media (min-width: 30em) {
        :global(.filepond--item) {
            width: calc(50% - 0.5em);
        }
    }

    @media (min-width: 50em) {
        :global(.filepond--item) {
            width: calc(33.33% - 0.5em);
        }
    }
</style>

<script>
    import FilePond, {registerPlugin} from 'svelte-filepond';
    import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
    import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
    import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
    import FilePondPluginFileRename from 'filepond-plugin-file-rename';

    export let name;

    // Register the plugins
    registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileValidateType,
        FilePondPluginFileRename);

    let pond;
    let inputName = 'filepond';
    let fileRenameFunction = (file) => {
        return `${name}_${file.name}`;
    };
    let getLabelIdle = () => {
        return `<div class="hello">Hallo <strong>${name}</strong>!</div><div class="uploadLink">Klik hier om foto's en videos te delen.</div>`
    };
</script>

<FilePond bind:this={pond} {inputName}
          server="/upload"
          allowMultiple={true}
          acceptedFileTypes="{['image/*', 'video/*']}"
          fileRenameFunction={fileRenameFunction}
          labelIdle={getLabelIdle()}
          labelInvalidField="Veld bevat ongeldige bestanden"
          labelFileWaitingForSize="Wachten op grootte"
          labelFileSizeNotAvailable="Grootte niet beschikbaar"
          labelFileLoading="Laden"
          labelFileLoadError="Fout tijdens laden"
          labelFileProcessing="Uploaden"
          labelFileProcessingComplete="Upload afgerond"
          labelFileProcessingAborted="Upload geannuleerd"
          labelFileProcessingError="Fout tijdens upload"
          labelFileProcessingRevertError="Fout bij herstellen"
          labelFileRemoveError="Fout bij verwijderen"
          labelTapToCancel="tik om te annuleren"
          labelTapToRetry="tik om opnieuw te proberen"
          labelTapToUndo="tik om ongedaan te maken"
          labelButtonRemoveItem="Verwijderen"
          labelButtonAbortItemLoad="Afbreken"
          labelButtonRetryItemLoad="Opnieuw proberen"
          labelButtonAbortItemProcessing="Annuleren"
          labelButtonUndoItemProcessing="Ongedaan maken"
          labelButtonRetryItemProcessing="Opnieuw proberen"
          labelButtonProcessItem="Upload"
          labelMaxFileSizeExceeded="Bestand is te groot"
          labelMaxTotalFileSizeExceeded="Maximale totale grootte overschreden"
          labelFileTypeNotAllowed="Ongeldig bestandstype"
          imageValidateSizeLabelFormatError="Afbeeldingstype niet ondersteund"
          imageValidateSizeLabelImageSizeTooSmall="Afbeelding is te klein"
          imageValidateSizeLabelImageSizeTooBig="Afbeelding is te groot"
/>
