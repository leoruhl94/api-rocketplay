const { Router } = require("express");
const router = Router();
const { conn, Users } = require("../libs/sequelize");
const config = require("../config/config.js");
const { default: axios } = require("axios");
const sequelize = conn;
const URL_BASE =
  config.env === "production"
    ? "https://api-rocketplay.herokuapp.com"
    : "http://localhost:3002";
router.get("/", async (req, res, next) => {
  let { schemaName, title } = req.query;
  schemaName = schemaName.replace(/\s/g, "").toLowerCase();
  try {
    // titulo - id - thumbnail - channel - category
    sql = `
            SELECT v.title, v.id AS videoid, v.thumbnail, cat.name AS category, cat.id as "catId"
            FROM ${schemaName}.videos AS v
            LEFT JOIN ${schemaName}.categories AS cat ON v."categoryId" = cat.id
            WHERE (v.title like '%${title}%')
            `;

    let videos = await sequelize.query(sql, {
      type: sequelize.QueryTypes.SELECT,
    });

    // let response = await axios.get(URL_BASE + "/channels", {
    //   params: { schemaName: schemaName, channelId: videos },
    // });

    videos = videos.map(async (video) => {
      let channelName = await axios.get(URL_BASE + "/channels", {
        params: { schemaName: schemaName, channelId: videos.catId },
      });
      video.channelName = channelName;
      return video;
    });

    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
