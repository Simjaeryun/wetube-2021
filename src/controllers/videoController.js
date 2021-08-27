import Video from "../models/Video";
import User from "../models/User";
import Comment from "../models/Comment";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({})
      .sort({ createdAt: "desc" })
      .populate("owner");
    return res.render("home", { pageTitle: "Home", videos });
  } catch {
    return res.send("server-Error");
  }
};

export const watch = async (req, res) => {
  const id = req.params.id;
  const video = await Video.findById(id).populate("owner").populate("comments");
  console.log(video);
  try {
    return res.render("videos/watch", {
      pageTitle: video.title,
      video,
    });
  } catch {
    return res.status(404).render("404", { pageTitle: "Video Not Found" });
  }
};

export const getEdit = async (req, res) => {
  const id = req.params.id;
  const {
    user: { _id },
  } = req.session;
  const video = await Video.findById(id);
  try {
    if (String(video.owner) !== String(_id)) {
      req.flash("error", "You are not the the owner of the video.");
      return res.status(403).redirect("/");
    }
    return res.render("videos/edit", {
      pageTitle: `Edit : ${video.title} `,
      video,
    });
  } catch {
    return res.status(404).render("404", { pageTitle: "Video Not Found" });
  }
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const video = await Video.exists({ _id: id });
  const videoModified = await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  if (String(videoModified.owner) !== String(video._id)) {
    return res.status(403).redirect("/");
  }
  req.flash("succes", "Canges saved");
  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  res.header("Cross-Origin-Embedder-Policy", "require-corp");
  res.header("Cross-Origin-Opener-Policy", "same-origin");
  res.header(
    "Access-Control-Allow-Origin",
    "https://sims-wetube.herokuapp.com"
  );
  return res.render("videos/upload", { pageTitle: "Upload Video" });
};

export const postUpload = async (req, res) => {
  const {
    user: { _id },
  } = req.session;
  const { video, thumb } = req.files;
  console.log(video, thumb);
  const { title, description, hashtags } = req.body;
  const isHeroku = process.env.NODE_ENV === "production";
  try {
    const newVideo = await Video.create({
      title,
      description,
      fileUrl: isHeroku ? video[0].location : video[0].path,
      thumbUrl: isHeroku ? thumb[0].location : video[0].path,
      owner: _id,
      hashtags: Video.formatHashtags(hashtags),
    });
    const user = await User.findById(_id);
    user.videos.push(newVideo._id);
    user.save();

    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.status(400).render("upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const video = await Video.findById(id);
  const user = await User.findById(_id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }

  await Video.findByIdAndDelete(id);
  user.videos.splice(user.videos.indexOf(id), 1);
  user.save();
  return res.redirect("/");
};

//Global Router

export const search = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  if (keyword) {
    videos = await Video.find({
      title: {
        $regex: new RegExp(keyword, "i"),
      },
    }).populate("owner");
  }
  return res.render("search", {
    pageTitle: `Search for ${keyword}`,
    videos,
  });
};

// Register
export const registerView = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.sendStatus(404);
  }
  video.meta.views = video.meta.views + 1;
  await video.save();
  return res.sendStatus(200);
};

// Comment
export const createComment = async (req, res) => {
  const {
    session: { user },
    body: { text },
    params: { id },
  } = req;

  const video = await Video.findById(id);

  if (!video) {
    return res.sendStatus(404);
  }

  const comment = await Comment.create({
    text,
    owner: user._id,
    video: id,
  });
  video.comments.push(comment._id);
  video.save();
  return res.status(201).json({ newCommentId: comment._id });
};

export const deleteComment = async (req, res) => {
  const {
    body: { commentId },
  } = req;
  const comment = await Comment.findById(commentId);
  console.log(commentId);
  if (!comment) {
    return res.sendStatus(404);
  }
  await Comment.findByIdAndDelete(commentId);
  return res.sendStatus(201);
};
