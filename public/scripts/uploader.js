'use strict'

$(document).ready(function() {
  class Uploader {
    constructor($input, file, url, callback) {
      this.$input = $input;
      this.file = file;
      this.progress = "0%";
      this.error = null;
      this.upload = new ActiveStorage.DirectUpload(file, url, this);
      this.callback = callback;
    }

    start() {
      this.upload.create((error, blob) => {
        if (error) {
          this.error = error;
        } else {
          this.callback(this, blob);
        }
      });
    }

    directUploadWillStoreFileWithXHR(request) {
      request.upload.addEventListener('progress', event => this.directUploadDidProgress(event))
    }

    directUploadDidProgress(event) {
      this.progress = `${100 * event.loaded / event.total}%`;
      this.$input.trigger('progress', [this.progress]);
    }
  }

  const uploaders = [];
  const onInputChange = function(event) {
    const $input = $(event.target);
    for (let file of event.target.files) {
      let uploader = new Uploader($input, file, '/api/uploads', (uploader, blob) => {
        uploaders.splice(uploaders.indexOf(uploader), 1);
        let upload = {
          name: blob.filename,
          href: blob.signed_id,
          mediaType: blob.content_type,
          file: file,
          dataURL: null
        };
        const reader = new FileReader();
        reader.addEventListener('load', () => {
          upload.dataURL = reader.result;
          $input.trigger('uploaded', [upload]);
          $input.hide();
          const $hidden = $(`<input type="hidden" name="${$input.data('name')}" value="${upload.href}" />`).insertAfter($input);
          const $img = $(`<img class="upload-preview" src="${upload.dataURL}" />`).insertAfter($input);
          $img.on('click', function(event) {
            $img.remove();
            $hidden.remove();
            $input.show();
          });
        });
        reader.readAsDataURL(upload.file);
      });
      uploaders.push(uploader);
      uploader.start();
    }
    $input.value = null;
  };

  $('input[type="file"]').each(function(index, input) {
    $(input).on('change', onInputChange);
  });
});
