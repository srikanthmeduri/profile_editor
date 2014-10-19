
//add project
var project_template = '<div class="projectinfoarray"> <h6><span class="arrow">►</span><span>Project#</span></h6> <div class="project hide"> <div class="control-group"> <label class="control-label">Name: </label> <input type="text" class="input-xxlarge projectname" name="projectname"> </div> <div class="control-group"> <label class="control-label">Description: </label> <textarea class="input-xxlarge projectdescription" name="projectdescription"></textarea> </div> <div class="control-group"> <label class="control-label">Is Current? </label> <input type="checkbox" class="iscurrentproject" name="iscurrentproject" value="false"> </div> <div class="row-fluid"> <div class="span6"> <div class="control-group"> <label class="control-label">Start Date: </label> <input type="text" class="input-small assignmentstart" name="assignmentstart"> </div> </div> <div class="span6"> <div class="control-group"> <label class="control-label">End Date: </label> <input type="text" class="input-small assignmentend" name="assignmentend"> </div> </div> </div> <div class="control-group"> <label class="control-label">Role: </label> <input type="text" class="roleinprojectteam" name="roleinprojectteam"> </div> <div class="control-group"> <label class="control-label">Responsibilities: </label> <textarea class="input-xxlarge responsibilitiesonprojectteam" name="responsibilitiesonprojectteam"></textarea> </div> <div class="control-group"> <label class="control-label">Skills: </label> <textarea class="input-xxlarge skillsonprojectteam" name="skillsonprojectteam"></textarea> </div> </div> </div>';

$('#professionalprofile').on("click", ".addproject", function () {    
    $(this).parent('h3').next('.projectinfoarray').append(project_template);
});

$('#professionalprofile').on("click", "h6", function () {
    var arrowel = $(this).find('.arrow');
    var arrowtext = $.trim(arrowel.text());
    if (arrowtext == '►') {
        arrowel.html('▼');
    } else {
        arrowel.html('►');
    }
    $(this).next('div').toggle();
});


//add job
var jobposition_template = '<div class="jobpositionarray"> <h1><span class="arrow">►</span><span>Job Position#</span></h1> <div class="jobposition hide"> <div class="row-fluid"> <div class="span6"> <label class="control-label">Title:</label> <input type="text" class="jobtitle" name="jobtitle"> </div> <div class="span6"> <div> <label class="control-label">Is Current? </label> <input type="checkbox" class="iscurrentjob" name="iscurrentjob" value="false"> </div> <div> <label class="control-label">Start Date: </label> <input type="text" class="input-small startdate" name="startdate"> <label class="control-label">End Date: </label> <input type="text" class="input-small enddate" name="enddate"> </div> </div> </div> <div class="row-fluid" style="margin-left: 50px;"> <h5>Location</h5> <div class="control-group"> <label class="control-label">City: </label> <input type="text" class="joblocationcity" name="joblocationcity"> </div> <div class="control-group"> <label class="control-label">State: </label> <input type="text" class="joblocationstate" name="joblocationstate"> </div> <div class="control-group"> <label class="control-label">Country: </label> <input type="text" class="joblocationcountry" name="joblocationcountry"> </div> <div class="control-group"> <label class="control-label">Zip: </label> <input type="text" class="joblocationzip" name="joblocationzip"> </div> </div> <div class="row-fluid"> <div class="control-group"> <label class="control-label">Responsibilities: </label> <textarea class="input-xxlarge jobresponsibilities" name="jobresponsibilities"></textarea> </div> <div class="control-group"> <label class="control-label">Skills: </label> <textarea class="input-xxlarge jobskills" name="jobskills"></textarea> </div> </div> <div class="row-fluid"> <div class="span6"> <h5>Company</h5> <div class="control-group"> <label class="control-label">Name: </label> <input type="text" class="companyname" name="companyname"> </div> <div class="control-group"> <label class="control-label">Description: </label> <textarea class="companydescription" name="companydescription"> </textarea> </div> <div class="control-group"> <label class="control-label">City: </label> <input type="text" class="companylocationcity" name="companylocationcity"> </div> <div class="control-group"> <label class="control-label">State: </label> <input type="text" class="companylocationstate" name="companylocationstate"> </div> <div class="control-group"> <label class="control-label">Country: </label> <input type="text" class="companylocationcountry" name="companylocationcountry"> </div> <div class="control-group"> <label class="control-label">Zip: </label> <input type="text" class="companylocationzip" name="companylocationzip"> </div> </div> <div class="span6"> <h5>Agency</h5> <div class="control-group"> <label class="control-label">Name: </label> <input type="text" class="agencyname" name="agencyname"> </div> <div class="control-group"> <label class="control-label">Description: </label> <textarea class="agencydescription" name="agencydescription"></textarea> </div> <div class="control-group"> <label class="control-label">City: </label> <input type="text" class="agencylocationcity" name="agencylocationcity"> </div> <div class="control-group"> <label class="control-label">State: </label> <input type="text" class="agencylocationstate" name="agencylocationstate"> </div> <div class="control-group"> <label class="control-label">Country: </label> <input type="text" class="agencylocationcountry" name="agencylocationcountry"> </div> <div class="control-group"> <label class="control-label">Zip: </label> <input type="text" class="agencylocationzip" name="agencylocationzip"> </div> </div> </div> <div class="row-fluid"> <h3><span class="projectinfotitle">Project</span><a class="addproject">+ Add More Projects</a> <div class="clear-fix"></div> </h3> <div class="projectinfoarray"> <h6><span class="arrow">▼</span><span>Project#</span></h6> <div class="project"> <div class="control-group"> <label class="control-label">Name: </label> <input type="text" class="input-xxlarge projectname" name="projectname"> </div> <div class="control-group"> <label class="control-label">Description: </label> <textarea class="input-xxlarge projectdescription" name="projectdescription"></textarea> </div> <div class="control-group"> <label class="control-label">Is Current? </label> <input type="checkbox" class="iscurrentproject" name="iscurrentproject" value="false"> </div> <div class="row-fluid"> <div class="span6"> <div class="control-group"> <label class="control-label">Start Date: </label> <input type="text" class="input-small assignmentstart" name="assignmentstart"> </div> </div> <div class="span6"> <div class="control-group"> <label class="control-label">End Date: </label> <input type="text" class="input-small assignmentend" name="assignmentend"> </div> </div> </div> <div class="control-group"> <label class="control-label">Role: </label> <input type="text" class="roleinprojectteam" name="roleinprojectteam"> </div> <div class="control-group"> <label class="control-label">Responsibilities: </label> <textarea class="input-xxlarge responsibilitiesonprojectteam" name="responsibilitiesonprojectteam"></textarea> </div> <div class="control-group"> <label class="control-label">Skills: </label> <textarea class="input-xxlarge skillsonprojectteam" name="skillsonprojectteam"></textarea> </div> </div> </div> </div> </div> </div>';

$('#addjob').click(function () {
    $('.jobpositionarray').append(jobposition_template);
});

$('.jobpositionarray').on("click", "h1", function () {
    var arrowel = $(this).find('.arrow');
    var arrowtext = $.trim(arrowel.text());
    if (arrowtext == '►') {
        arrowel.html('▼');
    }else{    
        arrowel.html('►');
    }
    $(this).next('div').slideToggle();
});


$('#professionalprofile').on("click", ".iscurrentjob", function () {
    var cb = $(this);
    var $enddate = cb.parents('.jobposition').find('.enddate');

    if (cb.is(':checked') == true) {
        cb.val('true');
        $enddate.val('').prop('disabled', true);
    } else {
        cb.val('false');
        $enddate.prop('disabled',false);
    }
});

$('#professionalprofile').on("click", ".iscurrentproject", function () {
    var cb = $(this);
    var $enddate = cb.parents('.project').find('.assignmentend');

    if (cb.is(':checked') == true) {
        cb.val('true');
        $enddate.val('').prop('disabled', true);
    } else {
        cb.val('false');
        $enddate.prop('disabled', false);
    }
});