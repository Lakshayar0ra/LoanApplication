exports.getBalanceSheet = async (req, res, next) => {
  try {
    // Request to Accounting Software for Balance Sheet...
    const balanceSheet = await fetchSheet();
    res.status(200).json(balanceSheet);
  } catch (error) {
    next(error);
  }
};

exports.getOutcome = async (req, res, next) => {
  try {
    const { balanceSheet, loanAmount, businessName, yearEstablished } = req.body;
    // Implement required filters to extract past 12 months Balance Sheet...
    past12MonthsBalanceSheet = balanceSheet.slice(0, 12);

    const past12MonthsProfit = past12MonthsBalanceSheet.reduce((acc, curr) => acc + curr.profitOrLoss, 0);
    const averageAssetValue = past12MonthsBalanceSheet.reduce((acc, curr) => acc + curr.assetsValue, 0) / 12;

    let preAssessment;
    if (averageAssetValue > loanAmount) {
      preAssessment = 100;
    } else if (past12MonthsProfit > 0) {
      preAssessment = 60;
    } else {
      preAssessment = 20;
    }

    const annualSummary = balanceSheet.reduce((acc, curr) => {
      if (acc[curr.year]) {
        acc[curr.year].profitOrLoss += curr.profitOrLoss;
      } else {
        acc[curr.year] = { profitOrLoss: curr.profitOrLoss };
      }
      return acc;
    }, {});

    const decisionEngineRequestPayload = {
      businessName,
      yearEstablished,
      preAssessment,
      annualSummary
    };
    console.log("Requesting Decision Engine : ", decisionEngineRequestPayload);
    // Request to Decision Engine for Final Outcome...
    const finalOutcome = await fetchLoanOutcome(decisionEngineRequestPayload, loanAmount);
    res.status(200).json(finalOutcome);
  } catch (error) {
    next(error);
  }
};

async function fetchSheet() {
  // Fetching Balance Sheet from Accounting Software...
  return new Promise((resolve, reject) => {
    const balanceSheet = require("../db.json");
    resolve(balanceSheet);
  });
}

async function fetchLoanOutcome(decisionEnginePayload, loanAmount) {
  const { preAssessment } = decisionEnginePayload;

  // Fetching Final Outcome from the Decision Engine...
  return new Promise((resolve, reject) => {
    const approvedAmount = (loanAmount * preAssessment) / 100;
    const result = {
      success: true,
      status: 'Approved',
      requestedLoanAmount: loanAmount,
      approvedAmount,
      loanTenure: "2 years",
      rateOfInterest: '11%'
    };
    resolve(result);
  });
}