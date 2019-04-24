
function catpure() {
    chrome.tabs.captureVisibleTab(function (screenshotUrl) {

        var fd = new FormData();
        fd.append('file', dataURItoBlob(screenshotUrl));
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    var response = JSON.parse(xhttp.response);
                    if (response.error) {
                        alert('Error: ' + response.error);
                        return;
                    }
                    var image_url = response;
                    alert(JSON.stringify(image_url))
                } else {
                    alert('Error :( ');
                }
            }
        };
        xhttp.open('POST', 'http://localhost:3001/upload', true);
        xhttp.send(fd);
    });
}

function dataURItoBlob(dataURI, fileName = 'image.jpg') {
    if (dataURI) {
        const mime = dataURI.split(',')[0].split(':')[1].split(';')[0],
            binary = atob(dataURI.split(',')[1]),
            array = [],
            fd = new FormData();
        for (let i = 0; i < binary.length; i++) {
            array.push(binary.charCodeAt(i));
        }
        const blobObj = new Blob([new Uint8Array(array)], { type: mime });
        blobObj.lastModifiedDate = new Date();
        fd.set('file', blobObj, fileName);
        return fd.get('file');
    }
    return null;
}

// Listen for a click on the camera icon. On that click, take a screenshot.
/* chrome.browserAction.onClicked.addListener(function () {
}); */

document.addEventListener('DOMContentLoaded', function () {
    var link = document.getElementById('button');
    // onClick's logic below:
    link.addEventListener('click', catpure);
});
