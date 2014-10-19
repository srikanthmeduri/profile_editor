function generate(dataarray){

    //word generation
    var ids = ['#jobdesc','#jobresp','#skills'];
    for (var h = 0; h < dataarray.length; h++ ){
        var data = dataarray[h];
        var line = data.split('.');
        generatelines(line, ids[h]);
    }

    function generatelines(line,id){
        for (i = 0; i < line.length; i++) {
            l = line[i]; 
            if (l) {                
                var words = l.split(' ');                   
                var wordstr = '';
                for (j = 0; j < words.length; j++ ){
                    wordstr += '<span>' + words[j] + '</span> ';
                }                       
                s = '<div class="section"><div class="left">' + wordstr + '</div><div class="right"><input type="checkbox"></div></div>';
                    $(id).append(s);
            }
        }
    }

    function process(value) {
			var value = $.trim(value);
			var $re = new RegExp(value, "i");
			
            //part1
            $('#jobdesc, #jobresp, #skills').each(function() {
				var $span = $(this).find('span');
				$span.each(function() {
					var $e = $(this);
					var $t = $e.text();
					if ($re.test($t)) {
						$e.prop('class', '');
					}
				});
			});

            //part2
			var $g = $('#part2').find('.greenbg').removeClass('greenbg');			
		}
		
        //middle search box

        $('#middle_contactfriend').click(function(){
        	$('#EmailFriendDialog').modal({ show: true, keyboard: true, backdrop: true });
        });


        $('#middle_runchecks').click(function(){
        	location.href = '/runchecks';
        });

        $('#middle_searchterm').keyup(function(){        	
        	var val = $(this).val();        	
        	if(val===''){        		
        		$('#part2 .greenbg').removeClass('greenbg');
        		$('#middle_searchstatus').html('');
        	}
        })

		$('#middle_searchbtn').click(function () {
		    var $text = $.trim($('#middle_searchterm').val());
		    var $re = new RegExp($text, "ig");
		    var $span = $('#part2 .searchcontent');
		    var found = 0;
		    $span.each(function () {
		        var $e = $(this);
		        var $t = $e.text();
		        var matches = $t.match($re);		        
		        if (matches) {
		            found++;		            		            		            
		            $e.html($e.html().replace($re, "<span class='greenbg'>" + $text + "</span>"));
		        }
		    });
            if(found){
                $('#middle_searchstatus').html(' '+ found +' Found');
            }else{
                $('#middle_searchstatus').html(' Not Found');    
            }                       
		});

        //search highlight
		$('#jobdesc, #jobresp, #skills').on('click', 'span', function (e) {
		    var $mode = $('input:radio[name=mode]:checked').val();
		    if ($mode === 'tag') {
		        var $parent = $(this).parent().parent().parent().prop('id');
		        var $class;
		        switch ($parent) {
		            case 'jobdesc':
		                $class = 'c1';
		                break;
		            case 'jobresp':
		                $class = 'c2';
		                break;
		            case 'skills':
		                $class = 'c3';
		                break;
		        }
		        var $el = $(this);
		        var $text = $.trim($el.text());
		        var $text = $text.replace(/[^\w]/gi, '');
		        var $re = new RegExp($text, "ig");
		        var found = false;
		        var $span = $('#part2 .searchcontent');
		        $span.each(function () {
		            var $e = $(this);
		            var $t = $e.text();
		            var matches = $t.match($re);		            
		            if (matches) {
		                found = true;
		                $e.html($e.html().replace($re, "<span class='greenbg'>" + $text + "</span>"));
		            }
		        });
		        
                var $c;
		        if (found) {
		            $el.addClass($class);
		            $c = 'whitebg';
		        } else {
		            $el.addClass('redbg');
		            $c = 'redbg';
		        };

		        //var $c = (found) ? 'whitebg' : 'redbg';
		        $tags = $('#part3 .tags');
		        $tagspans = $tags.find('span');

		            //if no tags add directly
		            if ($tagspans.length == 0) {
		                var str = '<span class="' + $c + '">' + $text + ' <a class="whitebg">(x)</a>' + '</span> ';
		                $tags.append(str);
		                $tags.on('click', 'a', function (e) {
		                    var $p = $(this).parent();
		                    $(this).remove();
		                    var $v = $.trim($p.text());
		                    $p.remove();
		                    process($v);
		                });
		            } else {
		                //search in tags - not found then add
		                var tagfound = false;
		                $('#part3 .tags span').each(function () {
		                    var $e1 = $(this);
		                    var $t1 = $e1.text();
		                    if ($re.test($t1)) {		                        
		                        tagfound = true;
		                    }
		                });
		                if (!tagfound) {
		                    var str = '<span class="' + $c + '">' + $text + ' <a class="whitebg">(x)</a>' + '</span> ';
		                    $tags.append(str);
		                }
		            }
		        
		    }


		    if ($mode === 'search') {
		        var $parent = $(this).parent().parent().parent().prop('id');
		        var $class;
		        switch ($parent) {
		            case 'jobdesc':
		                $class = 'c1';
		                break;
		            case 'jobresp':
		                $class = 'c2';
		                break;
		            case 'skills':
		                $class = 'c3';
		                break;
		        }
		        var $el = $(this);
		        var $text = $.trim($el.text());
		        var $text = $text.replace(/[^\w]/gi, '');
		        var $re = new RegExp($text, "ig");
		        var found = false;
		        var $span = $('#part2 .searchcontent');
		        $span.each(function () {
		            var $e = $(this);
		            var $t = $e.text();
		            var matches = $t.match($re);
		            if (matches) {
		                $e.html($e.html().replace($re, "<span class='greenbg'>" + $text + "</span>"));
		            }
		            found = true;
		        });
		        if (found) {
		            $el.addClass($class);
		        } else {
		            $el.addClass('redbg');
		        }
		    }
		});

    
    //percentage calculation
        var c1 = $('#jobdesc');
        var cg1 = c1.find('input');

        $('#jobdesc').on('click','input',function(e){
                var $checked = c1.find(':checked');
                var p = ( ($checked.length*100)/cg1.length ).toFixed(0) + '%';
                $('#job_desc_percent').html(p);
                var total = parseInt( $.trim($('#job_desc_percent').html()) , 10 ) + parseInt($.trim($('#job_resp_percent').html()) , 10 ) + parseInt($.trim($('#skills_percent').html()) , 10 );
                var avg = (total/3).toFixed(0) + '%';
                $('#overall_percent').html(avg);
        });

        var c2 = $('#jobresp');
        var cg2 = c2.find('input');
                
        $('#jobresp').on('click','input',function(e){
                var $checked = c2.find(':checked');
                var p = ( ($checked.length*100)/cg2.length ).toFixed(0) + '%';
                $('#job_resp_percent').html(p);
                var total = parseInt( $.trim($('#job_desc_percent').html()) , 10 ) + parseInt($.trim($('#job_resp_percent').html()) , 10 ) + parseInt($.trim($('#skills_percent').html()) , 10 );
                var avg = (total/3).toFixed(0) + '%';
                $('#overall_percent').html(avg);
        });

        var c3 = $('#skills');
        var cg3 = c3.find('input');
                
        $('#skills').on('click','input',function(e){
                var $checked = c3.find(':checked');             
                var p = ( ($checked.length*100)/cg3.length ).toFixed(0) + '%';
                $('#skills_percent').html(p);
                var total = parseInt( $.trim($('#job_desc_percent').html()) , 10 ) + parseInt($.trim($('#job_resp_percent').html()) , 10 ) + parseInt($.trim($('#skills_percent').html()) , 10 );               
                var avg = (total/3).toFixed(0) + '%';
                $('#overall_percent').html(avg);
        });










    //part2
        $('#part2 .showhide').click(function () {
            var $el = $(this);
            var $class = $el.hasClass('collapse');

            if ($class) {
                $el.removeClass('collapse');
                $el.addClass('expand');
            }else{
                $el.removeClass('expand');
                $el.addClass('collapse');
            }
               
            $(this).parent().next().toggle();
        });

        $('#experience .expdown').click(function (e) {
            e.preventDefault();
            var $box = $(this).parents('.expbox');
            var $nextbox = $box.next();
            if ($nextbox.length) {
                $box.insertAfter($nextbox);
            }
        });
        $('#experience .expup').click(function (e) {
            e.preventDefault();
            var $box = $(this).parents('.expbox');
            var $prevbox = $box.prev();
            if ($prevbox.length) {
                $box.insertBefore($prevbox);
            }
        });

        $('#experience .projdown').click(function (e) {
            e.preventDefault();     
            var $box = $(this).parents('.projectbox');      
            var $nextbox = $box.next();     
            if ($nextbox.length) {
                $box.insertAfter($nextbox);
            }
        });
        $('#experience .projup').click(function (e) {
            e.preventDefault();
            var $box = $(this).parents('.projectbox');
            var $prevbox = $box.prev();
            if ($prevbox.length) {
                $box.insertBefore($prevbox);
            }
        });
        
}