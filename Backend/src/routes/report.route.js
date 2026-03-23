const express = require("express");
const reportRouter = express.Router()
const authMiddleware = require("../middlewares/auth.middleware")
const reportController = require("../controllers/report.controller")
const upload = require("../middlewares/file.middleware")

reportRouter.post("/", authMiddleware.authUser, upload.single("resume"), reportController.generateReport)
reportRouter.get("/allreports", authMiddleware.authUser, reportController.getAllInterviewReportsController)
reportRouter.get("/:interviewId", authMiddleware.authUser, reportController.getInterviewReportByIdController)

module.exports = reportRouter
