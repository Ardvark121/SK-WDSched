// Set the variable that is linked in the html that will be appened to in order to add the time boxes
var SchedContain = $("#Big-Container");

//Set the variable that is linked to local storage
const SKusrdatta = JSON.parse(localStorage.getItem("SKusrdatta")) || [];
//Set the variable that will be called on in order to time the box placments
var timestart = 9;
// Set the variable for the linked day.js
var today = dayjs();
var RawTime = today.format("h");
// This turns the time into a readable integer
var CurrentTime = parseInt(RawTime);
if (today.format("a") == "pm") {
  CurrentTime = CurrentTime += 11;
}
$(function (event) {
  // Formats the data from the day.js and adds it to the p element under the title by id
  var Date = dayjs("2020-11-03").format("[Today is] dddd, MMMM D YYYY");
  $("#currentDay").text(Date);
  // This creates new boxes and adds it to the local array and adds them to the page if nothing is saved
  if (SKusrdatta.length === 0) {
    timestart = 9;
    for (var i = 0; i < 12; i++) {
      const OABlock = $("<section>");
      OABlock.addClass("row time-block");
      const timesect = $("<div>");
      timesect.addClass("col-2 col-md-1 hour text-center py-3");
      // converts the data from day.js back into string version of the time
      if (timestart < 12) {
        timesect.text(timestart + "AM");
      } else if (timestart == 12) {
        timesect.text(timestart + "PM");
      } else {
        var timestartpm = timestart - 11;
        timesect.text(timestartpm + "PM");
      }
      const Timeblockval = {
        time: timesect.text(),
        text: "",
      };
      SKusrdatta.push(Timeblockval);
      OABlock.append(timesect);
      const BlockText = $("<textarea>");
      // This uses compares the current time to the time in the box and colors it accordingly based on if the time is in the past present or future
      if (timestart < CurrentTime) {
        BlockText.addClass("col-8 col-md-10 description past");
      } else if (timestart == CurrentTime) {
        BlockText.addClass("col-8 col-md-10 description present");
      } else {
        BlockText.addClass("col-8 col-md-10 description future");
      }
      BlockText.attr("rows", "3");
      BlockText.text("");
      OABlock.append(BlockText);
      const BlockbutI = $("<i>");
      BlockbutI.addClass("fas fa-save");
      BlockbutI.attr("aria-hidden", "true");
      const Blockbut = $("<button>");
      Blockbut.append(BlockbutI);
      Blockbut.addClass("btn saveBtn col-2 col-md-1");
      Blockbut.attr("aria-label", "save");
      OABlock.append(Blockbut);
      SchedContain.append(OABlock);
      // This adjusts the timing varable set
      timestart++;
    }
    // This creates the boxes already stored in the local array if it has something stored
  } else {
    timestart = 9;
    $.each(SKusrdatta, function (index, value) {
      const OABlock = $("<section>");
      OABlock.addClass("row time-block");
      const timesect = $("<div>");
      timesect.addClass("col-2 col-md-1 hour text-center py-3");
      timesect.text(value.time);
      OABlock.append(timesect);
      const BlockText = $("<textarea>");
      // This uses compares the current time to the time in the box and colors it accordingly based on if the time is in the past present or future
      if (timestart < CurrentTime) {
        BlockText.addClass("col-8 col-md-10 description past");
      } else if (timestart == CurrentTime) {
        BlockText.addClass("col-8 col-md-10 description present");
      } else {
        BlockText.addClass("col-8 col-md-10 description future");
      }
      BlockText.attr("rows", "3");
      BlockText.text(value.text);
      OABlock.append(BlockText);
      const BlockbutI = $("<i>");
      BlockbutI.addClass("fas fa-save");
      BlockbutI.attr("aria-hidden", "true");
      const Blockbut = $("<button>");
      Blockbut.append(BlockbutI);
      Blockbut.addClass("btn saveBtn col-2 col-md-1");
      Blockbut.attr("aria-label", "save");
      OABlock.append(Blockbut);
      SchedContain.append(OABlock);
      timestart++;
    });
  }

  // sets a variable to all the save buttons by class
  const saveBtn = $(".saveBtn");
  // This is activated if the save button is pushed and adds the data from that into the local array
  saveBtn.on("click", function (event) {
    // This gets the time and text from the other divs in the same div as the selected save button
    var es = $(this).siblings(".description").val();
    var et = $(this).siblings(".hour").text();
    const Timeblockval = {
      time: et,
      text: es,
    };
    // This comapares the time to the times already saved in the div and changes the text of the object to match the new one
    if (SKusrdatta.some((SKusrdatta) => SKusrdatta.time === et)) {
      for (var i = 0; i < SKusrdatta.length; i++) {
        if (SKusrdatta[i].time == et) {
          SKusrdatta[i].text = es;
          let string = JSON.stringify(SKusrdatta);
          localStorage.setItem("SKusrdatta", string);
          console.log(SKusrdatta);
        }
      }
    }
  });
  console.log(SKusrdatta);
});
