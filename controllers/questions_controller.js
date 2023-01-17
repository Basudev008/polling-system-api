const Question = require("../models/question");
const Option = require("../models/option");

//function to create a question
module.exports.create = function (req, res) {
  console.log(req);
  Question.create(
    {
      title: req.body.title,
      options: [],
    },
    function (err, question) {
      if (err) {
        console.log("Error in creating question", err);
        return res.json(400, {
          message: "Error in creating the Question",
        });
      }

      console.log(question);
      return res.json(200, {
        message: `Raised a Question : ${question.title}`,
        id: question.id,
      });
    }
  );
};

//function to create an option
module.exports.createOption = async function (req, res) {
  let question = await Question.findById(req.params.id);

  let option = await Option.create({
    text: req.body.text,
    votes: 0,
  });

  Option.findByIdAndUpdate(
    option.id,
    {
      link_to_vote: `https://polling-system.onrender.com/options/${option.id}/add_vote`,
    },
    function (err, option) {
      if (err) {
        console.log("Error in creating option", err);
        return res.json(400, {
          message: "Error in creating the option",
        });
      }

      question.options.push(option);
      question.save();

      return res.json(200, {
        message: `Created an option : ${option.text}`,
        id: option.id,
      });
    }
  );
};

//function to view question details with given id
module.exports.viewQuestion = function (req, res) {
  Question.findById(req.params.id)
    .populate("options")
    .exec(function (err, question) {
      if (err) {
        return res.json(400, {
          message: "No question exist with given id",
        });
      }

      return res.json(200, {
        question,
      });
    });
};

//function to delete a question and produce
//error if any of its option has votes
module.exports.deleteQuestion = async function (req, res) {
  let question = await Question.findById(req.params.id).populate("options");

  for (let i = 0; i < question.options.length; i++) {
    if (question.options[i].votes > 0) {
      return res.json(400, {
        message:
          "The question can not be deleted because one of the option has votes",
      });
    }
  }

  Question.findByIdAndDelete(question.id);

  return res.json(200, {
    message: "The question has been deleted",
  });
};
