function resizeImage() {
  var input = document.getElementById("imageFile");
  var file = input.files[0];

  if (file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
      var img = new Image();
      img.src = e.target.result;
      img.onload = function () {
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        var maxSize = 500; // ukuran maksimum gambar yang diizinkan
        var ratio = Math.min(maxSize / img.width, maxSize / img.height);
        canvas.width = img.width * ratio;
        canvas.height = img.height * ratio;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        var resizedImage = canvas.toDataURL("image/jpeg");
        document.getElementById("output").innerHTML = '<img src="' + resizedImage + '" alt="Resized Image">';

        // Menambahkan tombol download di bawah gambar
        var downloadLink = document.createElement("a");
        downloadLink.href = resizedImage;
        downloadLink.download = "resized_image_by Elmi.jpg";
        downloadLink.innerHTML = "Download Gambar";
        document.getElementById("output").appendChild(downloadLink);
      };
    };
  }
}
