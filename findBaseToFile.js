export function changeBase64ToFileOrBlob(base64String, type = "file") {
  let arr = base64String.split(",");
  let mime = arr[0].match(/:(.*?);/)[1]; // 此处得到的为文件类型
  let bstr = window.atob(arr[1]); // 此处将base64解码
  let n = bstr.length;
  let u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  if (type === "blob") {
    let blob = new Blob([u8arr], { type: mime });
    return blob;
  } else {
    // 通过以下方式将以上变量生成文件对象，三个参数分别为文件内容、文件名、文件类型
    let file = new File([u8arr], "filename", { type: mime });
    return file;
  }
}

