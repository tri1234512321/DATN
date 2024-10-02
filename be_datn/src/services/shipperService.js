/** @format */

import bcrypt from "bcryptjs";
import db from "../models/index";

const createShift = async (data) => {
  try {
    // Create a new shift in the database
    let shift = await db.Shift.create({
      idJob: data.idJob,
      idShipper: data.idShipper,
      accepted: 0
    });

    if (shift) {
      return {
        EC: 0,
        EM: "Ok",
        data: shift,
      };
    } else {
      return {
        EC: 1,
        EM: "Create shift failed!",
        data: null,
      };
    }
  } catch (e) {
    // Log the error and return a failure response
    console.error("Error on creating Shift:", e);
    return {
      EC: 2,
      EM: "An error occurred while creating shift.",
    };
  }
};

const getShift = async (idJob,idShipper) => {
  try {
    // console.log(idJob,typeof(idJob),idShipper,typeof(idShipper))
    let shifts = await db.Shift.findOne({
      where: { idJob: idJob, idShipper:idShipper},
    });

    if (shifts) {
      return {
        EC: 0,
        EM: "Get all shifts",
        data: shifts,
      };
    } else {
      return {
        EC: 1,
        EM: "No shifts found!",
        data: null,
      };
    }
  } catch (e) {
    // Log the error and return a failure response
    console.error("Error on getting Shifts:", e);
    return {
      EC: 2,
      EM: "An error occurred while getting shifts.",
    };
  }
};

const deleteShift = async (idShift) => {
  try {
    // Check if the shift exists
    let shift = await db.Shift.findOne({
      where: { id: idShift },
    });

    if (!shift) {
      return {
        EC: 2,
        EM: "Shift not found!",
      };
    }

    // Delete the shift
    await db.Shift.destroy({
      where: { id: idShift },
    });

    return {
      EC: 0,
      EM: `Shift ${idShift} deleted successfully!`,
    };
  } catch (e) {
    // Log the error and return a failure response
    console.error("Error on deleting Shift:", e);
    return {
      EC: 2,
      EM: "An error occurred while deleting the shift.",
    };
  }
};

//get all job
const getAllJob = async () => {
  try {
    const allJob = await db.Job.findAll();

    if (allJob.length > 0) {
      return {
        EC: 0,
        EM: "Get all job",
        data: allJob,
      };
    } else {
      return {
        EC: 1,
        EM: "No jobs found.",
        data: null,
      };
    }
  } catch (e) {
    console.error("Error retrieving jobs:", e);
    return {
      EC: 2,
      EM: "An error occurred while retrieving jobs.",
    };
  }
};

const getAcceptedShift = async (idShipper) => {
  try {
    const allShifts = await db.Shift.findAll({
      where: {
        idShipper,
        accepted: 1,
      },
    });

    if (allShifts.length === 0) {
      return {
        EC: 1,
        EM: "No Shifts found.",
        data: null,
      };
    }

    // Fetch jobs concurrently for all shifts
    const shiftsWithJobs = await Promise.all(
      allShifts.map(async (shift) => {
        const job = await db.Job.findOne({ where: { id: shift.idJob } });
        return {
          ...shift, // Convert to plain object
          job,
        };
      })
    );

    return {
      EC: 0,
      EM: "Get all shifts",
      data: shiftsWithJobs,
    };
  } catch (e) {
    console.error("Error retrieving shifts:", e);
    return {
      EC: 2,
      EM: "An error occurred while retrieving shifts.",
    };
  }
};


module.exports = {
  createShift: createShift,
  getShift: getShift,
  deleteShift: deleteShift,
  getAllJob:getAllJob,
  getAcceptedShift,
};
