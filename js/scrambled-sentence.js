var origString = "What is your name ?";
var ans = "What is your name?";

var origMap = new Map();
origMap.set(0, origString);
console.log(origMap);

var origArray = origString.split(" ");
console.log(origArray);

var tileValue = [];
var tileID = [];
var tilesTurned = 0;

Array.prototype.scramble = function () {
  var i = this.length,
    j,
    tempValue;
  while (--i > 0) {
    j = Math.floor(Math.random() * (i + 1));
    tempValue = this[j];
    this[j] = this[i];
    this[i] = tempValue;
  }
};

function start() {
  tilesTurned = 0;
  var output = "";
  origArray.scramble();
  for (var i = 0; i < origArray.length; i++) {
    output +=
      '<div class="redTile" id="tile_' +
      i +
      '" onclick="revealTile(this,\'' +
      origArray[i] +
      "')\"></div>";
  }
  document.getElementById("sentence-game").innerHTML = output;
  console.log(origArray);
                setTimeout(function () {
                swal({
                  title: ans,
                  timer: 3000
                });
              }, 500);
}

function revealTile(tile, val) {
  if (tile.innerHTML == "" && tileValue.length < origArray.length) {
    //first move
    tile.style.background = "#fff";
    tile.style.color = "#f21a1d";
    tile.innerHTML = val;

    if (tileValue.length < origArray.length) {
      tileValue.push(val);
      tileID.push(tile.id);
      tilesTurned += 1;
      console.log(tilesTurned);
      console.log(tileValue);

      if (tileValue.length == origArray.length) {
        var newString = tileValue.join(" ");
        console.log(newString);
        var newMap = new Map();
        newMap.set(0, newString);
        console.log(newMap);
        compareMaps();

        function compareMaps() {
          var testVal;
          if (origMap.size !== newMap.size) {
            return false;
          }
          for (var [key, val] of origMap) {
            testVal = newMap.get(key);
            // in cases of an undefined value, make sure the key
            // actually exists on the object so there are no false positives
            if (
              testVal !== val ||
              (testVal === undefined && !newMap.has(key))
            ) {
              console.log("not equal to");
              function restart() {
                var element = document.getElementById("button");
                element.classList.toggle("startClicked");
                if (element.innerHTML === "Help") {
                  element.innerHTML = "Start";
                } else {
                  element.innerHTML = "Help";
                }
                tileValue = [];
                tileID = [];
              }
              setTimeout(restart, 500);
              setTimeout(function () {
                swal({
                  title: "Try again",
                  icon: "error",
                });
              }, 500);
            } else {
              console.log("equal to");
              function restart() {
                var element = document.getElementById("button");
                element.classList.toggle("startClicked");
                if (element.innerHTML === "Help") {
                  element.innerHTML = "Start";
                } else {
                  element.innerHTML = "Help";
                }
                tileValue = [];
                tileID = [];
              }
              setTimeout(restart, 500);
              setTimeout(function () {
                swal({
                  title: "Congratulations!",
                  text: ans,
                  icon: "success",
                });
              }, 500);
            }
          }
        }
      }
    }
  }
}
