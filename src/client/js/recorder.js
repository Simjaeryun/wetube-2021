import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
const startBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");

let stream;
let recorder;
let videoFile;

const handleDownload = async () => {
  const ffmpeg = createFFmpeg({
    log: true,
    corePath: "/assets/ffmpeg-core.js",
  });
  await ffmpeg.load();
  ffmpeg.FS("writeFile", "recording.webm", await fetchFile(videoFile));
  await ffmpeg.run("-i", "recording.webm", "-r", "60", "output.mp4");
  await ffmpeg.run(
    "-i",
    "recording.webm",
    "-ss",
    "00:00:01",
    "-frames:v",
    "1",
    "thumbnail.jpg"
  );

  const mp4File = ffmpeg.FS("readFile", "output.mp4");
  const mp4Blob = new Blob([mp4File.buffer], { type: "video/mp4" });
  const mp4Url = URL.createObjectURL(mp4Blob);

  const thumbFile = ffmpeg.FS("readFile", "thumbnail.jpg");
  const thumbBlob = new Blob([thumbFile.buffer], { type: "image/jpg" });
  const thumbUrl = URL.createObjectURL(thumbBlob);

  const a = document.createElement("a");
  a.href = mp4Url;
  a.download = "My Recording.mp4";
  document.body.appendChild(a);
  a.click();

  const thumbA = document.createElement("a");
  thumbA.href = thumbUrl;
  thumbA.download = "My Recording.jpg";
  document.body.appendChild(img);
  thumbA.click();
};

const handleStop = () => {
  startBtn.innerText = "Download Recording Recording";
  startBtn.removeEventListener("click", handleStop);
  startBtn.addEventListener("click", handleDownload);
  recorder.stop();
};

const handleStart = () => {
  startBtn.innerText = "Stop Recording";
  startBtn.removeEventListener("click", handleStart);
  startBtn.addEventListener("click", handleStop);
  recorder = new MediaRecorder(stream);
  recorder.ondataavailable = (e) => {
    console.log(e.data);
    videoFile = URL.createObjectURL(e.data);
    video.srcObject = null;
    video.src = videoFile;
    video.play();
  };
  recorder.start();
};

const init = async () => {
  stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
  });
  video.srcObject = stream;
  video.play();
};

init();

startBtn.addEventListener("click", handleStart);
