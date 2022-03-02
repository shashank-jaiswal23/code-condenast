const password = "conde";

module.exports = async (req, res) => {
  const { p } = req.query;

  if (p === password) {
    res.json({
      authorized: true,
      status: 200,
    });
  } else {
    res.json({
      error: "wrong password",
      status: 401,
    });
  }
};
