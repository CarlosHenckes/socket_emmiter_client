
module.exports = function (app){
    var HomeController = {
        index: function (request, response){
            response.render('home/index');
        }
    };
    return HomeController;
};