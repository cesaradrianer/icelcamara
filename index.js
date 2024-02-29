const webCamElement = document.getElementById("webCam");
const canvasElement = document.getElementById("canvas");
const downloadLink = document.getElementById('download-link');
const webcam = new Webcam(webCamElement, "user", canvasElement);
const camaraOpciones = document.getElementById('available-cameras')
webcam.start();

const tamañoCamara = {
  video: {
    ancho: {
      min: 1280,
      ideal: 1920,
      max: 2560,
    },
    alto: {
      min: 720,
      ideal: 1080,
      max: 1440
    }
  }
}

async function enlistarCamaras() {

  const dispositivos = await navigator.mediaDevices.enumerateDevices();
  const videoDevices = dispositivos.filter(dispositivo => dispositivo.kind == 'videoinput')
  const camaras = videoDevices.map(camara => {

    return `<option id="${camara.deviceId}">${camara.label}</option>`

  })
  camaraOpciones.innerHTML = camaras.join('')

}

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

camaraOpciones.onchange = () => {

  if ('mediaDevices' in navigator && navigator.mediaDevices.getUserMedia) {

    const nuevaCamara = {
      ...tamañoCamara,
      deviceId: {
        exact: camaraOpciones.value
      }
    }

    empezarStream(nuevaCamara)

  }

}

async function empezarStream(tamañoCamara) {

  const stream = await navigator.mediaDevices.getUserMedia(tamañoCamara)
  webCamElement.srcObject = stream

}

enlistarCamaras()