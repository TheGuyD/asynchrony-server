const express = require('express');

const getAllUsers = require(`./get-all-users`);
const getUserInfo = require(`./get-user-info`);
const createUser=require(`./create-user`);
const createCost=require(`./create-cost`);
const getFullReport=require(`./get-user-full-report`);
const getReportByYearAndMonth=require(`./get-full-report-by-date`);
const router = express.Router();

//the available endpoints users/...

router.get(`/`,getAllUsers);
router.get(`/:id`,getUserInfo);
router.get(`/:id/reports`,getFullReport);
router.get(`/:id/reports/date/:year&:month`,getReportByYearAndMonth)
router.post(`/`,createUser);
router.post(`/cost/:id`,createCost);


module.exports = router;





