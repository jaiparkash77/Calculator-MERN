const Calculator = require("../model/calculatorModel");

//Calculate new
exports.newCalculate = async (req, res) => {
  try {
    const { name, calculation, result } = req.body;
    console.log(name,calculation,result)
    const calculate = await Calculator.create({
      // user: req.user._id,
      name,
      calculation,
      result,
    });
    res.status(200).json({
      success: true,
      data: calculate,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all Calculates
exports.getAllCalculates = async (req, res, next) => {
  const calculates = await Calculator.find();

  res.status(200).json({
    success: true,
    calculates,
  });
};

// Update Calculate
exports.updateCalculate = async (req, res, next) => {
  const { calculation, result } = req.body;
  const updateCalculate = await Calculator.findByIdAndUpdate(req.params.id, {
    calculation,
    result,
  });
  if(!updateCalculate) {
    return res
      .status(404)
      .json({ message: "Calculate not found with this Id" });
  }

  res.status(200).json({
    success: true,
    updateCalculate
  });
};

// Delete Calculate
exports.deleteCalculate = async (req, res, next) => {
    const calculate = await Calculator.findById(req.params.id);
    if (!calculate) {
        return res
          .status(404)
          .json({ message: "Calculate not found with this Id" });
      }
  
    await calculate.deleteOne({_id: req.params.id});
  
    res.status(200).json({
      success: true,
    });
  };
