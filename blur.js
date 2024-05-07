function blurImage() {
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
        canvas.width = img.width;
        canvas.height = img.height;

        // Pengaburan gambar
        ctx.filter = "blur(5px)";
        ctx.drawImage(img, 0, 0);

        var blurredImage = canvas.toDataURL("image/jpeg");
        document.getElementById("output").innerHTML = '<img src="' + blurredImage + '" alt="Blurred Image">';

        // Menambahkan tombol download di bawah gambar
        var downloadLink = document.createElement("a");
        downloadLink.href = blurredImage;
        downloadLink.download = "blurred_image_by Elmi.jpg";
        downloadLink.innerHTML = "Download Gambar";
        document.getElementById("output").appendChild(downloadLink);
      };
    };
  }
}
