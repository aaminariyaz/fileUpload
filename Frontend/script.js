$(document).ready(function(){
    // image preview before upload
    $('#fileInput').change(function(event){
        const file = event.target.files[0];
        if(file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                $('#preview').attr('src', e.target.result).show();
            }
            reader.readAsDataURL(file);
        } else {
            $('#preview').hide();
        }
    });

    // handle form submission for upload
    $('#uploadForm').submit(function(event){
        event.preventDefault();
        const formData = new FormData(this);

        $.ajax({
            url: 'http://localhost:3000/upload',
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            success: function(response) {
                $('#message').text('File uploaded successfully').addClass('success').removeClass('error');
            },
            error: function(response) {
                $('#message').text('Error uploading file').addClass('error').removeClass('success');
            }
        });
    });

    //handle image retrieval by name
    $('#retrieveBtn').click(function(){
        const name = $('#retrieveName').val();
        // if(!name) {
        //     alert("Please enter a name");
        //     return;
        // }

        $.ajax({
            url: `http://localhost:3000/retrieve/${name}`,
            type: 'GET',
            success: function(response) {
                const path = response.path;
                $('#retrievedImage').html(`<img src=""http://localhost:3000/${path}" alt="Retrieved Image" />`);
            },
            error: function(error) {
                $('#retrievedImage').html(` <p class="error">Image not found</p>`);
            }
        });
    });

});
