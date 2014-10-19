
var education_template = '<div class="educationarray"> <h6><span class="arrow">►</span><span>Education#</span></h6> <div class="education hide"> <div class="row-fluid"> <div class="control-group"> <label class="control-label">School/College: </label> <input type="text" class="schoolname" name="schoolname"> </div> </div> <div class="row-fluid"> <div class="control-group"> <label class="control-label">University: </label> <input type="text" class="universityname" name="universityname"> </div> </div> <div class="row-fluid"> <div class="control-group"> <label class="control-label">Degree Name: </label> <input type="text" class="degreename" name="degreename"> </div> </div> <div class="row-fluid"> <div class="control-group"> <label class="control-label">Level: </label> <input type="text" class="degreelevel" name="degreelevel"> </div> </div> <div class="row-fluid"> <div class="span6"> <div class="control-group"> <label class="control-label">Attended From: </label> <input type="text" class="input-small attendedstartdate" name="attendedstartdate"> </div> </div> <div class="span6"> <div class="control-group"> <label class="control-label">Attended To: </label> <input type="text" class="input-small attendedenddate" name="attendedenddate"> </div> </div> </div> <div class="row-fluid"> <div class="control-group"> <label class="control-label">Graduated: </label> <input type="checkbox" class="graduated" name="graduated"> </div> </div> </div></div>';

$('#educationprofile').on("click", ".adddegree", function () {    
    $(this).parent('h3').next('.educationarray').append(education_template);
});

var certification_template = '<div class="certificationarray"> <h6><span class="arrow">►</span><span>Professional Certifications#</span></h6> <div class="certification hide"> <div class="row-fluid"> <div class="control-group"> <label class="control-label">Organization Name: </label> <input type="text" class="professionalorganizationname" name="professionalorganizationname"> </div> </div> <div class="row-fluid"> <div class="control-group"> <label class="control-label">Certification Name: </label> <input type="text" class="certificationname" name="certificationname"> </div> </div> <div class="row-fluid"> <div class="control-group"> <label class="control-label" for="completed">Completed: </label> <input type="checkbox" class="completed" name="completed"> </div> </div> <div class="row-fluid"> <div class="control-group"> <label class="control-label2" for="validtill">Valid Till: </label> <input type="text" class="validtill" name="validtill"> </div> </div> </div></div>';

$('#educationprofile').on("click", ".addcertification", function () {    
    $(this).parent('h3').next('.certificationarray').append(certification_template);
});

$('#educationprofile').on("click", "h6", function () {
    var arrowel = $(this).find('.arrow');
    var arrowtext = $.trim(arrowel.text());
    if (arrowtext == '►') {
        arrowel.html('▼');
    }else{    
        arrowel.html('►');
    }
    $(this).next('div').toggle();
});

$('#educationprofile').on("click", ".graduated", function () {
    var cb = $(this);    
    if (cb.is(':checked') == true) {
        cb.val('true');        
    } else {
        cb.val('false');        
    }
});

$('#educationprofile').on("click", ".completed", function () {
    var cb = $(this);    
    if (cb.is(':checked') == true) {
        cb.val('true');        
    } else {
        cb.val('false');        
    }
});