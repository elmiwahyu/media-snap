function addNoise() {
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
        ctx.drawImage(img, 0, 0);

        // Menambahkan efek noise
        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var data = imageData.data;
        for (var i = 0; i < data.length; i += 4) {
          var noise = Math.random() * 100; // Intensitas noise (dapat disesuaikan)
          data[i] += noise; // Merah
          data[i + 1] += noise; // Hijau
          data[i + 2] += noise; // Biru
        }
        ctx.putImageData(imageData, 0, 0);

        var noisyImage = canvas.toDataURL("image/jpeg");
        document.getElementById("output").innerHTML = '<img src="' + noisyImage + '" alt="Gambar dengan Efek Noise">';

        // Menambahkan tombol download di bawah gambar
        var downloadLink = document.createElement("a");
        downloadLink.href = noisyImage;
        downloadLink.download = "gambar_noise.jpg";
        downloadLink.innerHTML = "Download Gambar dengan Noise";
        document.getElementById("output").appendChild(downloadLink);
      };
    };
  }
}
