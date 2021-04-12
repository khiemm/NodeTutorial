const axios = require("axios").default;

const callApi = (body) => {
  return axios.post(
    "https://api.dev2.setel.my/api/gift-cards/admin/transactions/top-up",
    body,
    {
      headers: {
        "access-token":
          "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkNPWF9qU1hqMUpiRUlvdjRZdHYtdkZYSnU5TnBzNUxkTjVXZ1BSbVRlV2MifQ.eyJqdGkiOiJlYzNhZjI1Ny02MDY1LTRhNjMtYjE1ZS0yNzI3YmRiMWVhZTkiLCJuYmYiOjAsImlzcyI6Imh0dHA6Ly9hcGkuZGV2Mi5zZXRlbC5teS9hdXRoL3JlYWxtcy9aQVAiLCJhdWQiOiJ6YXAtYWNjb3VudHMiLCJzdWIiOiJkMzdlYWIwNi1iZThhLTQ2ZWEtYjUxMy00YTI0ZjYyNjJkOTAiLCJ0eXAiOiJCZWFyZXIiLCJpc3N1ZXIiOiJodHRwczovL2FwaS5kZXYyLnNldGVsLm15OjgwL2FwaS9pYW0vc2V0ZWwtZXh0ZXJuYWwtc2VydmljZXMiLCJuYW1lc3BhY2UiOiJzZXRlbC1leHRlcm5hbC1zZXJ2aWNlcyIsImludGVyZmFjZSI6eyJpZGVudGlmaWVyIjoiZGVmYXVsdCIsInR5cGUiOiJkZWZhdWx0In0sInNlc3Npb25fc3RhdGUiOiI1ZTQxYjk1ZS05MDI5LTQ1ZmMtOTczOS00YzhkZTdhZjkxZTQiLCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJ1c2VyIl19fSwiZ3JvdXBzIjpbImNhcmQtdGVhbSJdLCJpYXQiOjE2MTc3MTA0NjgsImV4cCI6MTYyNjcxMDQ2OH0.CL3x6aSQdgIubWI_X0jtyqlcqm5pRFNXx2kmMAnVFvvGyCTFvuiHP3g2_N0HW2sEbZkXeYTPiZhsCRDjz4ITL3wyfrfjEa07GycjanPbwv1Y4rivkBOhD_BkHAFyN4SKCBit_RThjWZhDMXmJSNjhFQ-t-ntsAN7TpbhIBSiW88NlBZfwRgKovdWqssvj0bfb6Ijjdmyf5VBf2XlgVNY4hl_Tf1AnLrXVfhNfhXebm6vau-WjudVATylZO_vIRszHrhksO0gxiLyx5i17NYd5fxN055a5NBB1o788Q059nTvUA1vtDPvL0cW7FIt3Kp3iHDabJM8MTRNAAmO8KvUMg",
        "Content-Type": "application/json",
      },
    }
  );
};

const main = async () => {
  const lol = await Promise.all([
    callApi({
      stan: "060433",
      mti: "060434",
      nii: "string",
      deviceId: "100002",
      merchantId: "60095804bb372d001039fb18",
      txLocalDate: "string",
      txLocalTime: "string",
      transactionType: "topup",
      isoTransactionType: "topup_eps",
      transactionAmount: 10,
      currency: "MYR",
      settlementBatchId: "060497",
      cardData: { cardNumber: "70838199237260311" },
      rawIsoData: {},
    }),
    callApi({
      stan: "060433",
      mti: "060434",
      nii: "string",
      deviceId: "100002",
      merchantId: "60095804bb372d001039fb18",
      txLocalDate: "string",
      txLocalTime: "string",
      transactionType: "topup",
      isoTransactionType: "topup_eps",
      transactionAmount: 10,
      currency: "MYR",
      settlementBatchId: "060497",
      cardData: { cardNumber: "70838199237260311" },
      rawIsoData: {},
    }),
  ]).catch((e) => {
    console.log(e);
  });
};

main();
