// GET homepage
// const index = (req, res) => {
//     res.render('index', { title: 'Travlr Getaways' });
// };

// module.exports = {
//     index
// };

const index = (req, res) => {
    pageTitle = process.env.npm_package_description + " - Home";
    res.render("index", { title: pageTitle });
};

module.exports = {
    index,
};