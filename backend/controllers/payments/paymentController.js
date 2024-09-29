const formidable = require("formidable");
const sellerModel = require("../../models/sellerModel");
const withdrawRequest = require("../../models/withdrawRequest");
const { responseReturn } = require("../../utilities/response");
const paymentModel = require("../../models/productModel");

class paymentController {
  // to sum all the amount of 1 seller
  //   sumAmount = (data) => {
  //     let sum = 0;
  //     for (let i = 0; i < data.length; i++) {
  //       sum = sum + data[i];
  //       }
  //       return sum;
  //   }
  generateMockPayments = () => {
    return [{ amount: 3000 }, { amount: 4000 }, { amount: 3000 }]; // Example payments
  };

  // Sum the amounts
  sumMockPayments = (payments) => {
    return payments.reduce((acc, payment) => acc + payment.amount, 0);
  };

  sumAmounts = (withdraws) => {
    return withdraws.reduce((sum, item) => sum + item.amount, 0);
  };

  gettingSellerPaymentsDetails = async (req, res) => {
    const { sellerId } = req.params;

    try {
      // Simulate fetching payments
      const payments = this.generateMockPayments();
      const totalAmount = this.sumMockPayments(payments);

      // Fetch pending and successful withdrawals
      const pendingWithdraws = await withdrawRequest.find({
        sellerId: sellerId,
        status: "pending",
      });

      const successfulWithdraws = await withdrawRequest.find({
        sellerId: sellerId,
        status: "success",
      });

      const pendingAmount = this.sumAmounts(pendingWithdraws);
      const withdrawAmount = this.sumAmounts(successfulWithdraws);

      // Calculate available amount
      const availableAmount = totalAmount - (pendingAmount + withdrawAmount);

      responseReturn(res, 200, {
        totalAmount,
        pendingAmount,
        withdrawAmount,
        availableAmount,
        pendingWithdraws,
        successfulWithdraws,
      });
    } catch (error) {
      console.error("Error fetching seller payment details:", error.message);
      responseReturn(res, 500, { message: "Internal Server Error" });
    }
  };

  withdrawalRequest = async (req, res) => {
    const { amount, sellerId } = req.body;

    try {
      const withdrawal = await withdrawRequest.create({
        sellerId,
        amount: parseInt(amount),
      });
      responseReturn(res, 200, {
        withdrawal,
        message: "Withdrawal request sent successfully",
      });
    } catch (error) {
      console.error("Error creating withdrawal request:", error.message);
      responseReturn(res, 500, {
        message: "Internal Server Error",
      });
    }
  };
  getPendingAmounts = async (req, res) => {
    const { sellerId } = req.params;
    try {
      const pendingWithdrawals = await withdrawRequest
        .find({
          sellerId,
          status: "pending",
        })
        .sort({ createdAt: -1 });
      responseReturn(res, 200, {
        pending: pendingWithdrawals,
      });
    } catch (error) {
      responseReturn(res, 500, {
        message: "Internal Server Error",
      });
    }
  };

  getWithdrawedAmounts = async (req, res) => {
    const { sellerId } = req.params;
    try {
      const successfulWithdrawals = await withdrawRequest
        .find({
          sellerId,
          status: "success",
        })
        .sort({ createdAt: -1 });
      responseReturn(res, 200, {
        success: successfulWithdrawals,
      });
    } catch (error) {
      responseReturn(res, 500, {
        message: "Internal Server Error",
      });
    }
  };
  gettingPaymentRequest = async (req, res) => {
    try {
      const withdrawalRequest = await withdrawRequest.find({
        status: "pending",
      });
      responseReturn(res, 200, { pending: withdrawalRequest });
    } catch (error) {
      responseReturn(res, 500, {
        message: "Internal Server Error",
      });
    }
  };
  confirmingPaymentRequest = async (req, res) => {
    const { paymentId } = req.body;
    try {
      const updatedPayment = await WithdrawModel.findByIdAndUpdate(
        paymentId,
        { status: "success" },
        { new: true }
      );

      if (!updatedPayment) {
        responseReturn(res, 404, { message: "Payment request not found" });
      }
      responseReturn(res, 200, {
        message: "Payment request confirmed successfully",
        payment: updatedPayment,
      });
    } catch (error) {
      responseReturn(res, 500, {
        message: "Internal Server Error",
      });
    }
  };
}

module.exports = new paymentController();
