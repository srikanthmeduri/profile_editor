$(function () {


	$('#addjobopeningform').submit(function (e) {
        e.preventDefault();                
        var data3 = processaddjob(this);        
        var request3 = $.ajax({
            type: 'POST',
            url: '/jobopening',
            data: JSON.stringify(data3),
            contentType: 'application/json'
        });
        request3.done(function () {
            $('#addjobopeningform').hide();
            var temp = {                
                company: data3.companyinfo.companyname,
                jobtitle: data3.jobinfo.jobtitle,
                status: ''
            }
            if (data3.agencyinfo != null) {
                temp.agency = data3.agencyinfo.agencyname
            } else {
                temp.agency = '';
            }
            var model = new Job();
            //console.log('add model');
            model.save(temp);
            mycollection.add(model);
        });
        request3.fail(function (jqXHR, textStatus) {
            console.log("Request failed: " + textStatus);
        });
    });

    $('#editjobopeningform').submit(function (e) {
        e.preventDefault();
        var data4 = processaddjob(this);        
        var id = $('#editjobopeningform').find('#rowid').val();
        data4.rowid = id;
        var request4 = $.ajax({
            type: 'POST',
            url: '/editjobopening',
            data: JSON.stringify(data4),
            contentType: 'application/json'
        });
        request4.done(function () {
            $('#editjobopeningform').hide();
            var model = mycollection.at(id);
            var t = {
                id: id,
                company: data4.companyinfo.companyname,
                jobtitle: data4.jobinfo.jobtitle,
                status: ''
            };
            if (data4.agencyinfo != null) {
                t.agency = data4.agencyinfo.agencyname;
            } else {
                t.agency = '';
            }
            //console.log('model changed');            
            model.save(t);
        });
        request4.fail(function (jqXHR, textStatus) {
            console.log("Request failed: " + textStatus);
        });
    });



    $('#addjob').click(function () {
        $('#addjobopeningform').show();
    });

	$('#addjobopeningformcancel').click(function () {
        $('#addjobopeningform').hide();
    });
    
    $('#editjobopeningform').on('click','#editjobopeningformcancel', function () {
        $('#editjobopeningform').hide();
    });

	$('#addjobopeningform .byagency').click(function () {
	    var cb = $(this);
	    var $parent = $('#addjobopeningform');

	    if (cb.is(':checked') == true) {
	        cb.val('true');        
			$parent.find('.agencyname').val('').prop('disabled', false);		
			$parent.find('.agencycountry').val('').prop('disabled', false);		
			$parent.find('.agencystate').val('').prop('disabled', false);		
			$parent.find('.agencycity').val('').prop('disabled', false);		
			$parent.find('.agencyzip').val('').prop('disabled', false);

	    } else {
	        cb.val('false');        
			$parent.find('.agencyname').val('').prop('disabled', true);		
			$parent.find('.agencycountry').val('').prop('disabled', true);		
			$parent.find('.agencystate').val('').prop('disabled', true);		
			$parent.find('.agencycity').val('').prop('disabled', true);		
			$parent.find('.agencyzip').val('').prop('disabled', true);       
	    }
	});


	$('#editjobopeningform').on('click', '.byagency', function () {
	    var cb = $(this);
	    var $parent = $('#editjobopeningform');

	    if (cb.is(':checked') == true) {
	        cb.val('true');        
			$parent.find('.agencyname').val('').prop('disabled', false);		
			$parent.find('.agencycountry').val('').prop('disabled', false);		
			$parent.find('.agencystate').val('').prop('disabled', false);		
			$parent.find('.agencycity').val('').prop('disabled', false);		
			$parent.find('.agencyzip').val('').prop('disabled', false);

	    } else {
	        cb.val('false');        
			$parent.find('.agencyname').val('').prop('disabled', true);		
			$parent.find('.agencycountry').val('').prop('disabled', true);		
			$parent.find('.agencystate').val('').prop('disabled', true);		
			$parent.find('.agencycity').val('').prop('disabled', true);		
			$parent.find('.agencyzip').val('').prop('disabled', true);       
	    }
	});

	function processaddjob(obj) {
        var t = {
            id: $('#userId').val()
        };

        var $parent = $(obj);

        var jobinfo = {
            jobtitle: $parent.find('.jobtitle').val(),
            joblocation: $parent.find('.joblocation').val(),
            jobdescription: ($parent.find('.jobdescription').val()).replace(/(\r\n|\n|\r)/gm,""),
            jobresponsibilities: ($parent.find('.jobresponsibilities').val()).replace(/(\r\n|\n|\r)/gm,""),
            skills: ($parent.find('.skills').val()).replace(/(\r\n|\n|\r)/gm,"")
        };

        var agencyexists = $parent.find('.byagency').val();

        var agencyinfo = null;

        if (agencyexists === 'true') {
            agencyinfo = {
                agencyname: $parent.find('.agencyname').val(),
                agencycountry: $parent.find('.agencycountry').val(),
                agencystate: $parent.find('.agencystate').val(),
                agencycity: $parent.find('.agencycity').val(),
                agencyzip: $parent.find('.agencyzip').val()
            };
        }

        var companyinfo = {
            companyname: $parent.find('.companyname').val(),
            companydescription: $parent.find('.companydescription').val(),
            companycountry: $parent.find('.companycountry').val(),
            companystate: $parent.find('.companystate').val(),
            companycity: $parent.find('.companycity').val(),
            companyzip: $parent.find('.companyzip').val()
        };



        t.jobinfo = jobinfo;
        t.agencyexists = agencyexists;
        t.agencyinfo = agencyinfo;
        t.companyinfo = companyinfo;

        return t;

    }


});