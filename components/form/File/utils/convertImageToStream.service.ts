export const convertFileToReadableStream = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function () {
      const dataURL = reader.result as any;
      const byteString = atob(dataURL?.split(",")[1]);
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(arrayBuffer);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const imageBlob = new Blob([arrayBuffer], { type: "image/jpeg" });

      // Create an image URL
      const imageUrl = URL.createObjectURL(imageBlob);

      // Resolve the promise with the image URL
      resolve(imageUrl);
    };

    reader.onerror = function (error) {
      // Reject the promise in case of an error
      reject(error);
    };
  });
};
