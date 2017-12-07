var workingOnShown = false;
var postponedShown = false;
var finishedShown = false;    

$(document).ready(function() {
    $("#workingOnContent").slideUp(1000);
    $("#postponedContent").slideUp(1000);
    $("#finishedContent").slideUp(1000);    

    // SLIDES

    var myShow = function(content, icon) {
        $(content).slideDown(1000);
        $(icon).removeClass();
        $(icon).addClass("fa fa-caret-down");
    }

    var myHide = function(content, icon) {
        $(content).slideUp(1000);
        $(icon).removeClass();
        $(icon).addClass("fa fa-caret-right");
    }

    $("#workingButton").click(function() {
        if(!workingOnShown) {
            myShow("#workingOnContent", "#workingOnIcon");
            myHide("#postponedContent", "#postponedIcon");
            postponedShown = false;
            myHide("#finishedContent", "#finishedIcon");
            finishedShown = false;
        } else {
            myHide("#workingOnContent", "#workingOnIcon");
        }
        workingOnShown = !workingOnShown;
    });

    $("#postponedButton").click(function() {
        if(!postponedShown) {
            myShow("#postponedContent", "#postponedIcon");
            myHide("#workingOnContent", "#workingOnIcon");
            workingOnShown = false;
            myHide("#finishedContent", "#finishedIcon");
            finishedShown = false;
        } else {
            myHide("#postponedContent", "#postponedIcon");
        }
        postponedShown = !postponedShown;
    });

    $("#finishedButton").click(function() {
        if(!finishedShown) {
            myShow("#finishedContent", "#finishedIcon");
            myHide("#workingOnContent", "#workingOnIcon");
            workingOnShown = false;
            myHide("#postponedContent", "#postponedIcon");
            postponedShown = false;
        } else {
            myHide("#finishedContent", "#finishedIcon");
        }

        finishedShown = !finishedShown;
    });

    // MODALS
    $("#midnightJourneyModal").easyModal({top: 25});
    $("#theAceProgrammerModal").easyModal({top: 25});
    $("#pizzaClickerModal").easyModal({top:25});

    $("#midnightJourneyLink").click(function(e) {
        var target = $(this).attr('href');
        $(target).trigger('openModal');
        e.preventDefault();
    });

    $("#theAceProgrammerLink").click(function(e) {
        var target = $(this).attr('href');
        $(target).trigger('openModal');
        e.preventDefault();
    })

    $("#pizzaClickerLink").click(function(e) {
        var target = $(this).attr('href');
        $(target).trigger('openModal');
        e.preventDefault();
    });
});