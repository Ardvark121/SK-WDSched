// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
var SchedContain = $("#Big-Container");
const SKusrdatta = JSON.parse(localStorage.getItem("SKusrdatta")) || [];
var timestart = 9;

var today = dayjs();
var RawTime = today.format("h");
var CurrentTime = parseInt(RawTime);
if (today.format("a") == "pm") {
  CurrentTime = CurrentTime += 11;
}

console.log(CurrentTime);
$(function (event) {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of thes
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  var Date = dayjs("2020-11-03").format("[Today is] dddd, MMMM D YYYY");
  $("#currentDay").text(Date);
  if (SKusrdatta.length === 0) {
    timestart = 9;
    for (var i = 0; i < 12; i++) {
      const OABlock = $("<section>");
      OABlock.addClass("row time-block");
      const timesect = $("<div>");
      timesect.addClass("col-2 col-md-1 hour text-center py-3");
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
      timestart++;
    }
  } else {
    var timestart = 9;
    $.each(SKusrdatta, function (index, value) {
      const OABlock = $("<section>");
      OABlock.addClass("row time-block");
      const timesect = $("<div>");
      timesect.addClass("col-2 col-md-1 hour text-center py-3");
      timesect.text(value.time);
      OABlock.append(timesect);
      const BlockText = $("<textarea>");
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

  const saveBtn = $(".saveBtn");
  saveBtn.on("click", function (event) {
    var es = $(this).siblings(".description").val();
    var et = $(this).siblings(".hour").text();
    const Timeblockval = {
      time: et,
      text: es,
    };

    if (SKusrdatta.length === 0) {
      SKusrdatta.push(Timeblockval);
      let string = JSON.stringify(SKusrdatta);
      localStorage.setItem("SKusrdatta", string);
      console.log(SKusrdatta);
    } else if (SKusrdatta.some((SKusrdatta) => SKusrdatta.time === et)) {
      for (var i = 0; i < SKusrdatta.length; i++) {
        if (SKusrdatta[i].time == et) {
          SKusrdatta[i].text = es;
          let string = JSON.stringify(SKusrdatta);
          localStorage.setItem("SKusrdatta", string);
          console.log(SKusrdatta);
        }
      }
    } else if (SKusrdatta.some((SKusrdatta) => SKusrdatta.time !== et)) {
      SKusrdatta.push(Timeblockval);
      let string = JSON.stringify(SKusrdatta);
      localStorage.setItem("SKusrdatta", string);
      console.log(SKusrdatta);
    }
  });
  console.log(SKusrdatta);
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});
