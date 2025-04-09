import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

const UploadVideo = () => {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");

  const handleUpload = () => {
    const storageRef = ref(storage, `videos/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed", null, console.error, () => {
      getDownloadURL(uploadTask.snapshot.ref).then(setUrl);
    });
  };

  return (
    <div>
      <input type="file" accept="video/*" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
      {url && <video controls src={url} width="400" />}
    </div>
  );
};

export default UploadVideo;
