const { Router } = require("express");
const router = Router();
const { conn } = require("../libs/sequelize");
const config = require("../config/config.js");
const { default: axios } = require("axios");
const sequelize = conn;
const URL_BASE =
  config.env === "production"
    ? "https://api-rocketplay.herokuapp.com"
    : "http://localhost:3002";

router.get("/", async (req, res, next) => {
  let { schemaName, title, category, channel } = req.query;
  schemaName = schemaName.replace(/\s/g, "").toLowerCase();
  try {
    console.log("title: ", title, "category: ", category, "channel: ", channel)
    let sql = `
            SELECT v.title, v.id AS videoid, v.thumbnail, cat.name AS category, cat.id as "catId"
            FROM ${schemaName}.videos AS v
            LEFT JOIN ${schemaName}.categories AS cat ON v."categoryId" = cat.id
            WHERE (LOWER(v.title) like '%${title.toLocaleLowerCase()}%')
            `;

    let videos = await sequelize.query(sql, {
      type: sequelize.QueryTypes.SELECT,
    });

    for (const item of videos) {
      let sql2 = `
      SELECT cha.name AS "channelName" 
      FROM ${schemaName}.categories cat 
      LEFT JOIN ${schemaName}.channels cha 
      ON cat."channelId" = cha.id
      WHERE cat.id = '${item.catId}'
    `;
      let channel = await sequelize.query(sql2, {
        type: sequelize.QueryTypes.SELECT,
      });
      
      item.channelName = channel[0].channelName;
    }
    if (channel) {
      videos = videos.filter(item => item.channelName === channel)
      if (category) {
        videos = videos.filter(item => item.category === category)
      }
    }
    res.status(200).json(videos)
    /* try {
      videos.map(async (video) => {
        let response = await axios.get(URL_BASE + "/category", {
          params: { schemaName: schemaName, categoryId: video.catId },
        });

        video.channelName = response.data[0].name;
      });
      res.status(200).json(videos);
    } catch (error) {
      next(error);
    } */
  } catch (error) {
    next(error);
  }
});

module.exports = router;
