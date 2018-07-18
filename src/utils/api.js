var api = {
    getComics(){
        var url = 'http://localhost/sampl2/util/api.php';
        return fetch(url).then((tres) => res.json);
    }
};

module.exports = api;