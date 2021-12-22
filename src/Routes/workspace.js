const Router = require("express");
const { conn, Users, Schemas } = require("../libs/sequelize");
const router = Router();
const UsersService = require("../services/usersService");
const WorkspaceService = require("../services/workspaceService");
/////////////////////////////////////////////
let sequelize = conn;
let usersService = new UsersService();
let workspaceService = new WorkspaceService();

router.delete("/delete", async (req, res, next) => {
  try {
    const { schemaName } = req.body;
    let schema = await workspaceService.deleteWorkspaceByName(schemaName);
    res.send({ message: "Schema deleted succesfully", data: schema });
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    let allSchemas = await workspaceService.showAllWorkspaces();
    res.send(allSchemas);
  } catch (error) {
    next(error);
  }
});

router.delete("/deleteall", async (req, res, next) => {
  try {
    let allSchemas = await workspaceService.destroyAllWorkspaces();
    res.status(200).json({ message: "all schemas deleted", data: allSchemas });
  } catch (error) {
    next(error);
  }
});

router.get("/find", async (req, res, next) => {
  try {
    const { code } = req.query;
    let foundWorkspace = await workspaceService.findWorkspaceByCode(code);
    if (foundWorkspace) {
      return res
        .status(200)
        .json({ found: foundWorkspace, message: "Yupiii, Workspace found" });
    }
    return res
      .status(200)
      .json({ found: {}, message: "Sorry, Workspace not found" });
  } catch (error) {
    res.send(error);
  }
});
router.post("/join", async (req, res, next) => {
  try {
    const { schemaName, userEmail, schemaTitle } = req.body;
    let user = await usersService.findOneUser(userEmail);
    if (user.workspaces?.includes(schemaName)) {
      return res
        .status(201)
        .json({ message: "You are already in this workspace" });
    }
    let sql = `
    SELECT * FROM ${schemaName}.members
    WHERE mail = '${userEmail}'
    `;

    let member = await sequelize.query(sql, {
      type: sequelize.QueryTypes.SELECT,
    });

    if (member.length === 1 && member[0].status === "deleted") {
      console.log("Entre aca 2.0");
      return res
        .status(200)
        .json({ message: "You are banned from this workspace!" });
    }

    let joined = await workspaceService.joinWorkspace(schemaName, userEmail);
    if (joined) {
      let workspaces = user.workspaces || [];
      let workspacesTitles = user.workspacesTitles || [];
      await user.update({ workspaces: [...workspaces, schemaName] });
      await user.update({
        workspacesTitles: [...workspacesTitles, schemaTitle],
      });
      return res
        .status(201)
        .json({ status: true, message: "succesfully joined" });
    }
    return res.status(200).json({ status: false, message: "failed to join" });
  } catch (error) {
    res.send(error);
  }
});


router.put("/leave", async (req, res, next) => {
  try {
    const { schemaName, userEmail, schemaTitle } = req.body;
    let user = await usersService.findOneUser(userEmail);

    let newWorkspaces = user.workspaces.filter(
      (workspace) => workspace !== schemaName
    );
    await user.update({ workspaces: newWorkspaces });

    let newWorkspacesTitles = user.workspacesTitles.filter(
      (workspace) => workspace !== schemaTitle
    );
    await user.update({ workspacesTitles: newWorkspacesTitles });

    res.status(200).json({message: "U have left this workspace!"})

  } catch (error) {
    next(error)
  }
})

router.put("/", async (req, res, next) => {
  try {
    let { schemaName, name, code } = req.body;
    schemaName = schemaName.replace(/\s/g, "").toLowerCase();
    let workspace = await workspaceService.findWorkspaceByName(schemaName);
    if(name) (console.log(await workspace.update({title: name})))

    if(code) await workspace.update({code: code})

    res.status(200).json({message: "Schema updated succesfully."});
  } catch (error) {
    next(error);
  }
});

module.exports = router;
