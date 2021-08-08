import Video from "../models/Video";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ createdAt: "desc" });
    return res.render("home", { pageTitle: "Home", videos });
  } catch {
    return res.send("server-Error");
  }
};

export const watch = async (req, res) => {
  const id = req.params.id;
  const video = await Video.findById(id);
  console.log(video.fileUrl);
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
  const video = await Video.findById(id);
  try {
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
  try {
    await Video.findByIdAndUpdate(id, {
      title,
      description,
      hashtags: Video.formatHashtags(hashtags),
    });
    return res.redirect(`/`);
  } catch {
    return res.status(404).render("404", { pageTitle: "Video Not Found" });
  }
};

export const getUpload = (req, res) => {
  return res.render("videos/upload", { pageTitle: "Upload Video" });
};

export const postUpload = async (req, res) => {
  const { path } = req.file;
  const { title, description, hashtags } = req.body;
  try {
    await Video.create({
      title,
      description,
      fileUrl: path ? path : fileUrl,
      hashtags: Video.formatHashtags(hashtags),
    });
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.render("videos/upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  try {
    await Video.findByIdAndDelete(id);
    return res.redirect("/");
  } catch {
    return res.status(404).render("404", { pageTitle: "Video Not Found" });
  }
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
    });
  }
  return res.render("search", {
    pageTitle: `Search for ${keyword}`,
    videos,
  });
};
