<script>
    import FilePond, {registerPlugin} from 'svelte-filepond';
    import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
    import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
    import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
    import FilePondPluginFileRename from 'filepond-plugin-file-rename';
    import './filepond.css';
    import {beforeNavigate} from "$app/navigation";

    export let name;

    registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileValidateType,
        FilePondPluginFileRename);

    let pond;
    let inputName = 'filepond';
    let isUploading = false;

    let fileRenameFunction = (file) => {
        return `${name}_${file.name}`;
    };

    let getLabelIdle = () => {
        return `<div class="hello">Hallo <strong>${name}</strong>!</div><div class="uploadLink">Klik hier om foto's en videos te delen.</div>`
    };

    let activateIsUploading = () => {
        isUploading = true;
    }

    let deactivateIsUploading = () => {
        isUploading = false;
    }

    beforeNavigate(({cancel}) => {
        if (isUploading) {
            if (!confirm('An upload is in progress. Leaving this page will cancel the upload.')) {
                cancel();
            }
        }
    });
</script>

<FilePond bind:this={pond} {inputName}
          server="/upload"
          allowMultiple={true}
          acceptedFileTypes="{['image/*', 'video/*']}"
          fileRenameFunction={fileRenameFunction}
          onaddfilestart={activateIsUploading}
          onprocessfiles={deactivateIsUploading}
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
