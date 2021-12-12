const Router = require("express");
const { conn, Users, Schemas } = require("../libs/sequelize");
const router = Router();
const UsersService = require("../services/usersService");
const WorkspaceService = require("../services/workspaceService");
/////////////////////////////////////////////

let usersService = new UsersService();
let workspaceService = new WorkspaceService();

router.delete("/delete", async (req, res, next) => {
  try {
    const { schemaName } = req.body;
    let schema = await workspaceService.deleteWorkspaceByName(schemaName);
    res.send("Schema deleted succesfully", schema);
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
    res.json("all schemas deleted", allSchemas);
  } catch (error) {
    next(error);
  }
});

router.get("/find", async (req, res, next) => {
  try {
    const { code } = req.query;
    let foundWorkspace = await workspaceService.findWorkspaceByCode(code);
    if (foundWorkspace) {
      return res.status(200).json({found:foundWorkspace , message:"Yupiii, Workspace found"});
    }
    return res.status(200).json({found:{} , message:"Sorry, Workspace not found"});
  } catch (error) {
    res.send(error);
  }
});
router.post("/join", async (req, res, next) => {
  try {
    const { schemaName, userEmail, schemaTitle } = req.body;
    console.log("BODY => ", schemaName, userEmail);
    let joined = await workspaceService.joinWorkspace(schemaName, userEmail);
    if (joined) {
      let user = await usersService.findOneUser(userEmail);
      let workspaces = user.workspaces || [];
      let workspacesTitles = user.workspacesTitles || [];
      await user.update({ workspaces: [...workspaces, schemaName] });
      await user.update({ workspacesTitles: [...workspacesTitles, schemaTitle] });
      return res
        .status(201)
        .json({ status: true, message: "succesfully joined" });
    }
    return res.status(200).json({ status: false, message: "failed to join" });
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
