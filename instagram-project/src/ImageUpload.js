import React, { useState } from "react";
import { Button, Input } from "@material-ui/core";
import { storage, db } from "./firebase";
import firebase from "firebase";
import LinearProgress from "@material-ui/core/LinearProgress";
import "./ImageUpload.css";

function ImageUpload({ username }) {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //progress
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        //error
        console.log(error);
      },
      () => {
        //completion
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            //post image
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username,
            });
            setProgress(0);
            setCaption("");
            setImage(null);
          });
      }
    );
  };

  return (
    <div className="imageUpload">
      <Input
        className="imageUpload__caption"
        type="text"
        placeholder="Enter a caption..."
        onChange={(event) => setCaption(event.target.value)}
        value={caption}
        margin="dense"
      />
      <Input className="imageUpload__file" type="file" onChange={handleChange} disableUnderline="true" margin="dense" />
      <LinearProgress className="imageUpload__progress" variant="buffer" value={progress} max="100" />
      <Button className="imageUpload__uploadButton" onClick={handleUpload}>Upload</Button>
    </div>
  );
}

export default ImageUpload;
