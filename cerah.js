function adjustBrightness() {
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

        // Gambar gambar ke dalam canvas
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Dapatkan data piksel gambar
        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var data = imageData.data;

        // Atur kecerahan gambar
        var brightnessValue = 50; // Nilai kecerahan yang ingin Anda atur (0-100)
        for (var i = 0; i < data.length; i += 4) {
          data[i] += brightnessValue; // Merah
          data[i + 1] += brightnessValue; // Hijau
          data[i + 2] += brightnessValue; // Biru
        }

        // Set ulang data piksel gambar
        ctx.putImageData(imageData, 0, 0);

        var imgWithAdjustedBrightness = canvas.toDataURL("image/png");
        document.getElementById("output").innerHTML = '<img src="' + imgWithAdjustedBrightness + '" alt="Gambar dengan Kecerahan Disesuaikan">';

        // Menambahkan tombol download di bawah gambar
        var downloadLink = document.createElement("a");
        downloadLink.href = imgWithAdjustedBrightness;
        downloadLink.download = "brightness by elmi.png";
        downloadLink.innerHTML = "Download Gambar";
        document.getElementById("output").appendChild(downloadLink);
      };
    };
  }
}
