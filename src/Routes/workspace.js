const Router = require("express");
const { conn, Users, Schemas } = require("../libs/sequelize");
const router = Router();
const UsersService = require("../services/usersService");
const WorkspaceService = require("../services/workspaceService");
/////////////////////////////////////////////

let usersService = new UsersService();
let workspaceService = new WorkspaceService();

router.get("/delete", async (req, res, next) => {
  try {
    const { schemaName } = req.body;
    let schema = await workspaceService.deleteWorkspaceByName(schemaName)
    res.send("Schema deleted succesfully", schema);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    let allSchemas = await workspaceService.showAllWorkspaces()
    res.send(allSchemas);
  } catch (error) {
    next(error);
  }
});

router.get("/deleteall", async (req, res, next) => {
  try {
    let allSchemas = await workspaceService.destroyAllWorkspaces()
    res.send("all schemas deleted", allSchemas);
  } catch (error) {
    next(error);
  }
});

router.get("/find", async (req, res, next) => {
  try {
    const { code } = req.body;
    return res
      .status(200)
      .json(await workspaceService.findWorkspaceByCode(code));
  } catch (error) {
    res.send(error);
  }
});
router.post("/join", async (req, res, next) => {
  try {
    const { schemaName, userEmail } = req.body;
    console.log("BODY => ", schemaName, userEmail);
    return res
      .status(200)
      .json(await workspaceService.joinWorkspace(schemaName, userEmail));
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
