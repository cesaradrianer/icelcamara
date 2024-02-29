const webCamElement = document.getElementById("webCam");
const canvasElement = document.getElementById("canvas");
const downloadLink = document.getElementById('download-link');
const webcam = new Webcam(webCamElement, "user", canvasElement);
const cameraOptions = document.getElementById('available-cameras')
webcam.start();
const cameras = webcam.webcamList

	function takeAPicture() {

    let fileName = document.getElementById("filename").value;
    console.log(fileName.length)
		let prefix = ''
		let picture = webcam.snap();
		
    if (fileName.length == 9) {

      prefix = 'P'

    } else if (fileName.length == 7) {

      prefix = 'D'

    } else {

      window.alert('Por favor ingresa un ID válido')
      return undefined

    }

		document.querySelector("a").href = picture;
		document.querySelector("a").download = prefix + fileName + ".png";
	}

  console.log(cameras)