$(function () {

    $('#general-profile-cancel').click(function () {        
        $('#generalprofile').hide();
        document.getElementById('generalprofile').reset();
    });

    $.ajaxSetup({ cache: false });

    $('#generalprofile').submit(function (e) {
        e.preventDefault();
        var data = $(this).serialize();

        var request = $.ajax({
            type: 'POST',
            url: '/genprofile',
            data: data,
            datatype: 'html'
        });

        request.done(function (profprofileform) {
            $('#generalprofile').hide();
            $('#professionalprofile').html(profprofileform).show();
            $.getScript("js/views/editprofile/profprofile.js");

            $('#professionalprofile').submit(function (e) {
                e.preventDefault();
                var data1 = processprofprofile();               
                var request1 = $.ajax({
                    type: 'POST',
                    url: '/profprofile',
                    data: JSON.stringify(data1),
                    contentType: "application/json",
                    datatype: 'html'
                });

                request1.done(function (eduprofileform) {
                    $('#professionalprofile').hide();
                    $('#educationprofile').html(eduprofileform).show();
                    $.getScript("js/views/editprofile/eduprofile.js");

                    $('#educationprofile').submit(function (e) {
                        e.preventDefault();
                        var data2 = processeduprofile();                        
                        var request2 = $.ajax({
                            type: 'POST',
                            url: '/eduprofile',
                            data: JSON.stringify(data2),
                            contentType: "application/json",
                            datatype: 'html',
                            success: function () {
                                $('#educationprofile').hide();
                            }
                        });
                    });
                });

                request1.fail(function (jqXHR, textStatus) {
                    console.log("Request failed: " + textStatus);
                });

            });
        });

        request.fail(function (jqXHR, textStatus) {
            console.log("Request failed: " + textStatus);
        });
    });

    function processprofprofile() {
        var profprofiledata = {
            id: $('#userId').val(),
            objective: $('#objective').val(),
            summary: $('#summary').val(),
            jobpositions: []
        };

        var jobpositions = $('#professionalprofile .jobposition');

        $.each(jobpositions, function (k, v) {
            var t = {};   //temporary jobposition object
            var job = $(v);

            //generic data
            t.jobtitle = job.find('.jobtitle').val();
            t.iscurrentjob = job.find('.iscurrentjob').val();
            t.startdate = job.find('.startdate').val();
            t.enddate = job.find('.enddate').val();

            t.joblocationcity = job.find('.joblocationcity').val();
            t.joblocationstate = job.find('.joblocationstate').val();
            t.joblocationcountry = job.find('.joblocationcountry').val();
            t.joblocationzip = job.find('.joblocationzip').val();

            t.jobresponsibilities = job.find('.jobresponsibilities').val();
            t.jobskills = job.find('.jobskills').val();

            //company info
            t.companyinfo = {
                companyname: job.find('.companyname').val(),
                companydescription: job.find('.companydescription').val(),
                companylocationcity: job.find('.companylocationcity').val(),
                companylocationstate: job.find('.companylocationstate').val(),
                companylocationcountry: job.find('.companylocationcountry').val(),
                companylocationzip: job.find('.companylocationzip').val()
            };

            //agency info
            var agencyexists = job.find('.agencyname').val();
            if (agencyexists) {
                t.agencyinfo = {
                    agencyname: job.find('.agencyname').val(),
                    agencydescription: $(job).find('.agencydescription').val(),
                    agencylocationcity: $(job).find('.agencylocationcity').val(),
                    agencylocationstate: $(job).find('.agencylocationstate').val(),
                    agencylocationcountry: job.find('.agencylocationcountry').val(),
                    agencylocationzip: $(job).find('.agencylocationzip').val()
                };
            } else {
                t.agencyinfo = null;
            }

            //project info
            var projectinfoarray = job.find('.projectinfoarray');
            var projects = projectinfoarray.find('.project');
            t.projectinfo = [];
            $.each(projects, function (k, v) {
                var project = $(v);
                var o = {
                    projectname: project.find('.projectname').val(),
                    projectdescription: project.find('.projectdescription').val(),
                    iscurrentproject: project.find('.iscurrentproject').val(),
                    assignmentstart: project.find('.assignmentstart').val(),
                    assignmentend: project.find('.assignmentend').val(),
                    roleinprojectteam: project.find('.roleinprojectteam').val(),
                    responsibilitiesonprojectteam: project.find('.responsibilitiesonprojectteam').val(),
                    skillsonprojectteam: project.find('.skillsonprojectteam').val()
                };
                t.projectinfo.push(o);
            });

            //push job position data to array
            profprofiledata.jobpositions.push(t);

        });
        return profprofiledata;
    }

    function processeduprofile() {
        var educationprofiledata = {
            id: $('#userId').val(),
            educations: [],
            certifications: []
        };

        var educations = $('#educationprofile .education');

        $.each(educations, function (k, v) {
            var edu = $(v);
            var t = {
                schoolname: edu.find('.schoolname').val(),
                universityname: edu.find('.universityname').val(),
                degreename: edu.find('.degreename').val(),
                degreelevel: edu.find('.degreelevel').val(),
                attendedstartdate: edu.find('.attendedstartdate').val(),
                attendedenddate: edu.find('.attendedenddate').val(),
                graduated: edu.find('.graduated').val()
            };
            educationprofiledata.educations.push(t);
        });

        var certifications = $('.certification');

        $.each(certifications, function (k, v) {
            var cert = $(v);
            var t = {
                professionalorganizationname: cert.find('.professionalorganizationname').val(),
                certificationname: cert.find('.certificationname').val(),
                completed: cert.find('.completed').val(),
                validtill: cert.find('.validtill').val()
            };
            educationprofiledata.certifications.push(t);
        });
        return educationprofiledata;
    }    
});
   