const eventModel = require("../model/event");

const route = require("express").Router();

//create new event
route.post("/v1/events", async (req, res) => {
  try {
    const { title, description, location, startTime, endTime } = req.body;

    const event = await eventModel.create({
      title: title,
      description: description,
      location: location,
      startTime: startTime,
      endTime: endTime,
    });

    res.status(201).json({
      status: "success",
      event,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message
    });
  }
});

//list all events
route.get("/v1/events", async (req, res) => {
  try {
    const { id } = req.params;
    const event = await eventModel.find({ id: id });
    res.status(200).json({
      status: "success",
      event,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
});

//get a specific event
route.get("/v1/events/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const event = await eventModel.findById(id);

    res.status(200).json({
      status: "success",
      event,
    });
  } catch (error) {
    res.status(404).json({
    //   status: "failed",
    //   message:error.message
      error: "there is no event with that id",
    });
  }
});

//delete a specific event
route.delete("/v1/events/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const event = await eventModel.findByIdAndDelete(id);

    if(!event)
    {
        return res.status(204).json({
            error:"no id found"
        })
    }
    res.status(204).json({
      status: "success",
    });
  } catch (error) {
    res.status(204).json({
      status: "failed",
      message: error.message,
    // error:"no event found with that id"
    });
  }
});

//update an event
route.put("/v1/events/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description, location, startTime, endTime } = req.body;
    const update = {
      title: title,
      description: description,
      location: location,
      startTime: startTime,
      endTime: endTime,
    };


    //validation errors
    if (title === "") {
      return res.status(400).json({
        error: "validation error: title is required",
      });
    }
    if (description === "") {
        return res.status(400).json({
          error: "validation error: description is required",
        });
      }
      if (location === "") {
        return res.status(400).json({
          error: "validation error: location is required",
        });
      }
      if (startTime === "") {
        return res.status(400).json({
          error: "validation error: startTime is required",
        });
      }
      if (endTime === "") {
        return res.status(400).json({
          error: "validation error: endTime is required",
        });
      }

    const event = await eventModel.findByIdAndUpdate(id, update, { new: true });
    res.status(200).json({
      status: "success",
      event,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
});

module.exports = route;
