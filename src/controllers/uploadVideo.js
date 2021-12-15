const Router = require('express');
const router = Router();
const getTime = require("../services/getTime.js")
const { awsAccessKey, awsSecretAccessKey, bucketName } = require('../config/config.js')
const { conn } = require("../libs/sequelize");
const sequelize = conn;

router.get("/aws-client", async (req, res, next) => {
  try {
    const creds = {
      accessKeyId: awsAccessKey,
      secretAccessKey: awsSecretAccessKey
    }

    
    res.status(200).json({ creds: creds, bucket: bucketName })
  } catch (error) {
    next(error)
  }
})

router.post("/database", async (req, res, next) => {
  try {
    // id - title - description - link - externalid - channelname - channelavatar - thumbnail - userId - categoryId
    // Avatar - Autor - Descripcion - UUID (video) - Link AWS - Titulo video - Likes - 
    let { title, avatar, author, description, thumbnail, memberId, categoryId } = req.body
    let thumb = thumbnail === '-thumb' ? "defaultThumbnail" : thumbnail
    const schemaName = author.replace(/\s/g, "").toLowerCase();
    let timestamps = getTime()

    const sql = `
    INSERT INTO ${schemaName}.videos (title, description, channelname, channelavatar, thumbnail, link, "memberId", "categoryId", "createdAt", "updatedAt")
    VALUES ('${title}', '${description}', '${author}', '${avatar}', '${thumb}', '${title}', '${memberId}', '${categoryId}', '${timestamps}', '${timestamps}')
    `;
    
    await sequelize.query(sql, {
      type: sequelize.QueryTypes.INSERT
    })
    res.status(200).json({message: "Video created successfully"})
  } catch (error) {
    next(error)
  }
})

module.exports = router;
