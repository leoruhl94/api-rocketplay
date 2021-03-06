const Router = require("express");
const router = Router();
const { conn, Users } = require("../libs/sequelize");
const sequelize = conn;

router.get("/", async (req, res, next) => {
  let { schemaName, memberEmail } = req.query;
  schemaName = schemaName.replace(/\s/g, "").toLowerCase();
  try {
    if (!schemaName) {
      res.status(400).json({ message: "U have to send me the schema name " });
    }
    if (!memberEmail) {
      const sql = `
            SELECT * FROM ${schemaName}.members
            WHERE status = 'active'
            `;

      const members = await sequelize.query(sql, {
        type: sequelize.QueryTypes.SELECT,
      });

      return res.status(200).json(members);
    } else {
      const sql = `
            SELECT * FROM ${schemaName}.members
            WHERE mail = '${memberEmail}' AND status = 'active'
            `;

      const members = await sequelize.query(sql, {
        type: sequelize.QueryTypes.SELECT,
      });
      return res.status(200).json(members);
    }
  } catch (error) {
    next(error);
  }
});

router.put("/", async (req, res, next) => {
  try {
    let { schemaName, newUserType, memberId } = req.body;
    schemaName = schemaName.replace(/\s/g, "").toLowerCase();
    const sql = `
        UPDATE ${schemaName}.members SET usertype='${newUserType}' WHERE id='${memberId}'
        `;
    const respond = await sequelize.query(sql, {
      type: sequelize.QueryTypes.INSERT,
    });
    res.status(200).json({ message: "Member succesfully updated" });
  } catch (error) {
    next(error);
  }
});

// router.delete("/", async (req, res, next) => {
//     let { schemaName, memberId } = req.body
//     schemaName = schemaName.replace(/\s/g, "").toLowerCase();
//     try {
//         const sql = `
//         SELECT * FROM ${schemaName}.members
//         WHERE id = '${memberId}'
//         `

//         const member = await sequelize.query(sql, {
//             type: sequelize.QueryTypes.SELECT
//         })
//         console.log(member)
//         if(member[1] === 1) {
//             const sqlDelete = `
//             DELETE FROM ${schemaName}.members
//             WHERE id = '${memberId}'
//             `

//             await sequelize.query(sqlDelete, {
//                 type: sequelize.QueryTypes.INSERT
//             })
//             // res.status(200).json({message: "Member succesfully deleted"})
//         } else {
//             res.json({message: "Could not delete the member :c"})
//         }
//         try {
//             let usuario = Users.findOne({where: {
//                 mail: member.mail
//             }})
//             console.log(usuario)
//             // usuario.update({workspaces: arrayFiltrado})
//         } catch (error) {

//         }
//     } catch(error) {
//         next(error)
//     }
// })

router.put("/status", async (req, res, next) => {
  let { schemaName, mail, status } = req.body;
  schemaName = schemaName.replace(/\s/g, "").toLowerCase();
  try {
    let sql = `
        UPDATE ${schemaName}.members
        SET status='${status}'
        WHERE mail = '${mail}'
        `;

    await sequelize.query(sql, {
      type: sequelize.QueryTypes.INSERT,
    });

    let sql2 = `
        SELECT * FROM ${schemaName}.members
        WHERE mail = '${mail}'
        `;

    let member = await sequelize.query(sql2, {
      type: sequelize.QueryTypes.SELECT,
    });
    console.log(member);
    try {
      let usuario = await Users.findOne({
        where: {
          mail: member[0].mail,
        },
      });
      console.log(usuario);
      let arrayFiltrado = usuario.workspaces?.filter((ws) => ws !== schemaName);
      usuario.update({ workspaces: arrayFiltrado });
    } catch (error) {
      console.log(error);
    }

    res.status(200).json({ message: "Status updated succesfully" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
