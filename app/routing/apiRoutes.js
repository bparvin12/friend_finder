var friends = require("../data/friends.js")

module.exports = function (app) {
    app.get("/api/friends", function(req, res){
        res.json(friends);
    });

    app.post("/api/friends", function(req, res) {
        
        var bestMatch = {
            name: "",
            photo: "",
            friendDifference: 1000
        };

        console.log(req.body);

        //parse the users input/results
        var userData = req.body;
        var userScores = userData.scores; 

        //ISSUE
        console.log(userScores);

        //variabe to calculate the difference between user scores and scores of each user 
        var totalDifference = 0;

        //here we loop through all the friend possibilities in the database 
        for (var i = 0; i < friends.length; i++) {
            console.log(friends[i]);
            totalDifference = 0;

            //loop through all scores for each friend
            for (var j=0; j < friends[i].scores[j]; j++) {

                //calculate the difference between the scores and sum into the totalDifference
                totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));

                //if the sum of difference is less than the differences of the current "best match"
                if (totalDifference <= bestMatch.friendDifference) {

                    //reset the bestMatch to be the new friend 
                    bestMatch.name = friends[i].name;
                    bestMatch.photo = friends[i].photo;
                    bestMatch.friendDifference = totalDifference; 
                }
            }
        }

        //finally save the users data to the database (this has to happen after the check
        //otherwise they will always match with themself 
        friends.push(userData);

        res.json(bestMatch);
    });

}