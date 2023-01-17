const Option = require("../models/option");
const Question = require("../models/question");

//function to add vote to an option
module.exports.addVote = async function (req, res) {
  let option = await Option.findById(req.params.id);

  option.votes += 1;
  option.save();

  return res.json(200, {
    message: "Vote has been added",
  });
};

//function to delete an option and also delete option from options array of question
module.exports.deleteOption = async function (req, res) {
  let option = await Option.findById(req.params.id);

  if (option.votes > 0) {
    return res.json(400, {
      message: "The option can not be deleted because it has votes",
    });
  }

  let questions = await Question.find({});

  for (let question of questions) {
    if (question.options.includes(option.id)) {
      let index = question.options.indexOf(option.id);
      question.options.splice(index, 1);
      question.save();
    }
  }

  option.remove();
  option.save();

  return res.json(200, {
    message: "The option has been deleted",
  });
};
