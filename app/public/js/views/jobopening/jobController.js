var tpl = ' <tr> <td><a class="jobrow" href="#"><%= id %></a></td> <td><%= company %></td> <td><%= agency %></td> <td><%= jobtitle %></td> <td> <select class="status"> <% if(status==="Not Applied") { %> <option value="Not Applied" selected="selected">Not Applied</option> <option value="Applied">Applied</option> <option value="Accepted">Accepted</option> <option value="Rejected">Rejected</option> <% } %> <% if(status==="Applied") { %> <option value="Not Applied">Not Applied</option> <option value="Applied" selected="selected">Applied</option> <option value="Accepted">Accepted</option> <option value="Rejected">Rejected</option> <% } %> <% if(status==="Accepted") { %> <option value="Not Applied">Not Applied</option> <option value="Applied">Applied</option> <option value="Accepted" selected="selected">Accepted</option> <option value="Rejected">Rejected</option> <% } %> <% if(status==="Rejected") { %> <option value="Not Applied">Not Applied</option> <option value="Applied">Applied</option> <option value="Accepted">Accepted</option> <option value="Rejected" selected="selected">Rejected</option> <% } %> <% if(status==="") { %> <option value="Not Applied">Not Applied</option> <option value="Applied">Applied</option> <option value="Accepted">Accepted</option> <option value="Rejected">Rejected</option> <% } %> </select> </td> <td><a href="#" class="createCustomProfile">Create Custom Profile</td> </tr>';


var Job = Backbone.Model.extend({
    urlRoot : '/jobs'
});

var JobList = Backbone.Collection.extend({
    model : Job,
    url : '/jobs'
});

var JobView = Backbone.View.extend({
    initialize: function () {
        this.collection.on("add", this.renderAdd, this);
        this.collection.on("change", this.renderChange, this);
    },    
    renderAdd: function (model) {
        console.log('renderAdd');
        var index = this.collection.indexOf(model);
        //console.log(index);
        var obj = model.toJSON();
        //console.log(obj);
        obj.id = index + 1;
        //var tpl = $('#tpl').html();            
        var out = _.template(tpl, obj);        
        this.$el.find('tbody').append(out);        
    },
    renderChange: function (model) {
        console.log('renderChange');
        var id = Number(model.get('id')) + 1;
        var obj = model.toJSON();
        obj.id = id;
        //var tpl = $('#tpl').html();
        var newRow = _.template(tpl, obj);
        var $tr = $('#savedjobs tbody tr:eq(' + (id-1) + ')');        
        $tr.replaceWith(newRow);
    },
    events: {
        'click .jobrow': 'viewEditJob',
        'change .status': 'updateStatus',
        'click .createCustomProfile': 'createCustomProfile'        
    },
    createCustomProfile: function (e) {
        console.log('createCustomProfile');
        e.preventDefault();
        var $el = $(e.target);
        //console.log($el);
        var $tr = $el.parent('td').parent('tr');
        //console.log($tr);
        var id = $.trim($tr.find('.jobrow').html());
        id = Number(id) - 1;
        location.href = '/smartedit/' + id;
    },
    updateStatus: function (e) {
        console.log('updateStatus');
        var $el = $(e.target);
        //console.log($el);
        var $tr = $el.parent('td').parent('tr');
        //console.log($tr);
        var id = $.trim($tr.find('.jobrow').html());
        id = Number(id) - 1;
        //console.log(id);
        var model = this.collection.at(id);
        //console.log(model);
        model.save({id:id, status:$el.val()});
    },
    viewEditJob: function (e) {
        e.preventDefault();
        var $el = $(e.target);
        var id = $.trim($el.html());
        var url = '/jobopening/' + id;

        var request = $.ajax({
            type: 'GET',
            url: url,
            datatype: 'html'
        });

        request.done(function (editform) {
            $('#editjobopeningform').html(editform).show();
        });

        request.fail(function (jqXHR, textStatus) {
            console.log("Request failed: " + textStatus);
        });
    }
});

var mycollection = new JobList();
var myview = new JobView({ el: '#savedjobs', collection: mycollection });

$.ajax({
    type: 'GET',
    url: '/jobs',            
    datatype: 'json',
    success: function (data) {        
        if(data) {
            //console.log(data);
            mycollection.add(data);
        }        
    }
});




