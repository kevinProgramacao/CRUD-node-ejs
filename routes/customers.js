/*
 * GET customers listing.
 */
var dateFormat = require('dateformat');
var day        = Date();
var Jimp       = require("jimp");
var fs         = require("fs");

var path = require('path');

var crypto = require('crypto');

/////////////////////////////FUNÇÃO GERAR HASH RANDOM/////////////////////////////////////
function random (howMany, chars) {
    chars = chars 
        || "abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789";
    var rnd = crypto.randomBytes(howMany)
        , value = new Array(howMany)
        , len = chars.length;

    for (var i = 0; i < howMany; i++) {
        value[i] = chars[rnd[i] % len]
    };

    return value.join('');
}
//////////////////////////////////////////////////////////////////////////////////////


exports.list = function(req, res){
    req.getConnection(function(err,connection){
         
       connection.query('SELECT * FROM publicacoes',function(err,rows){
              
          if(err)
             console.log("Error Selecting : %s ",err );
       
              res.render('customers',{page_title:"Publicações",data:rows});
                             
           });
         
      });
    
  };
  exports.add = function(req, res){
    res.render('add_customer',{page_title:"Adicionar Cadastro"});
  };
  exports.edit = function(req, res){
      
    var id = req.params.id;
      
    req.getConnection(function(err,connection){
         
       connection.query('SELECT * FROM publicacoes WHERE id_pub = ?',[id],function(err,rows)
          {
              
              if(err)
                  console.log("Error Selecting : %s ",err );
       
              res.render('edit_customer',{page_title:"Edit Customers - Node.js",data:rows});
                             
           });
                   
      }); 
  };

  exports.crop = function(req, res){
      
    var id = req.params.id;

    req.getConnection(function (err, connection) {
        connection.query('SELECT * FROM publicacoes WHERE id_pub = ?', [id], function(err, rows){
            if(err)
                console.log("Error Selecting: %s" , err);

            res.render('crop_customer', {page_title:"Corte Imagem", data:rows});
        });
    });
  };
  
//////////////////////////////////////////////////////////////////////////////////////////////////////
  /*Save the customer*/
  exports.save = function(req,res){
    
      var input = JSON.parse(JSON.stringify(req.body));

      req.getConnection(function (err, connection) {
        
        

        if (!req.files.uploaded_image){
            var insere = {
                nome_pub    : input.name,
                texto_pub   : input.address,
                data        : dateFormat(day, "yyyy-m-d h:MM:ss")
            
            };
            
            var query = connection.query("INSERT INTO publicacoes set ? ",insere, function(err, rows)
            {
      
              if (err)
                  console.log("Error inserting : %s ",err );
                  res.redirect('/customers');
              })

        }else if (fs.existsSync('public/uploads/'+req.files.uploaded_image.name)){  
                var file = req.files.uploaded_image;
                var img_name = file.name;

                var name = path.parse(img_name).name;
                var extension = path.parse(img_name).ext;
                var new_name = name+random(3)+extension;
                    // Use the mv() method to place the file somewhere on your server
                    file.mv('public/uploads/'+new_name, function(err) {
                        if (err)
                        return res.status(500).send(err);
                    
                        var insere = {
                            nome_pub    : input.name,
                            texto_pub   : input.address,
                            imagem      : new_name,
                            data        : dateFormat(day, "yyyy-m-d h:MM:ss")
                        
                        };
          
                        var query = connection.query("INSERT INTO publicacoes set ? ",insere, function(err, rows)
                        {
                    
                            if (err)
                                console.log("Error inserting : %s ",err );
                                res.redirect('/customers');
                            })
                        
                            
                            
                        })
            }else{
                var file = req.files.uploaded_image;
                var img_name = file.name;
                // Use the mv() method to place the file somewhere on your server
                file.mv('public/uploads/'+file.name, function(err) {
                    if (err)
                    return res.status(500).send(err);
                
                    var insere = {
                        nome_pub    : input.name,
                        texto_pub   : input.address,
                        imagem      : img_name,
                        data        : dateFormat(day, "yyyy-m-d h:MM:ss")
                    
                    };
                    
                    var query = connection.query("INSERT INTO publicacoes set ? ",insere, function(err, rows)
                    {
                
                        if (err)
                            console.log("Error inserting : %s ",err );
                            res.redirect('/customers');
                        })
                    
                        
                        
                    })
        }
         // console.log(query.sql); get raw query
      
      })
  };/*Save edited customer*/
  exports.save_edit = function(req,res){
      
      var input = JSON.parse(JSON.stringify(req.body));
      var id = req.params.id;
     
      req.getConnection(function (err, connection) {
         
        if(!req.files.uploaded_image){

            var insere = {
                
                nome_pub    : input.name,
                texto_pub   : input.address,
                data        : dateFormat(day, "yyyy-m-d h:MM:ss")
            
            };
            
            connection.query("UPDATE publicacoes set ? WHERE id_pub = ? ",[insere,id], function(err, rows)
            {
      
              if (err)
                  console.log("Error Updating : %s ",err );
             
              res.redirect('/customers');
              
            });

        }else if (fs.existsSync('public/uploads/'+req.files.uploaded_image.name)){
            var file = req.files.uploaded_image;
            var img_name = file.name;
      
            var name = path.parse(img_name).name;
            var extension = path.parse(img_name).ext;
            var new_name = name+random(3)+extension;
                // Use the mv() method to place the file somewhere on your server
                file.mv('public/uploads/'+new_name, function(err) {
                    if (err)
                    return res.status(500).send(err);

                var insere = {
                    
                    nome_pub    : input.name,
                    texto_pub   : input.address,
                    imagem      : new_name,
                    data        : dateFormat(day, "yyyy-m-d h:MM:ss")
                
                  };
                
                  connection.query("UPDATE publicacoes set ? WHERE id_pub = ? ",[insere,id], function(err, rows)
                  {
          
                      if (err)
                          console.log("Error Updating : %s ",err );
                 
                      res.redirect('/customers');
                  
                  });
                })
            }else{
                var file = req.files.uploaded_image;
                var img_name = file.name;

            file.mv('public/uploads/'+img_name, function(err){
                if (err)
                    return res.status(500).send(err);

                var insere = {
                    
                    nome_pub    : input.name,
                    texto_pub   : input.address,
                    imagem      : img_name,
                    data        : dateFormat(day, "yyyy-m-d h:MM:ss")
                
                  };
                
                  connection.query("UPDATE publicacoes set ? WHERE id_pub = ? ",[insere,id], function(err, rows)
                  {
          
                      if (err)
                          console.log("Error Updating : %s ",err );
                 
                      res.redirect('/customers');
                  
                  });
            })
           
        }
      
      });
  };
  
  exports.delete_customer = function(req,res){
            
       var id = req.params.id;
      
       req.getConnection(function (err, connection) {
          
          connection.query("DELETE FROM publicacoes  WHERE id_pub = ? ",[id], function(err, rows)
          {
              
               if(err)
                   console.log("Error deleting : %s ",err );
              
               res.redirect('/customers');
               
          });
          
       });
  };

  exports.crop_final = function (req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    var newInput = req.body;

    var id = req.params.id;
    var datax = req.body.dataX;
    var datay = req.body.dataY;
    var dataheight = req.body.dataHeight;
    var datawidth = req.body.dataWidth;
    var horizontal = req.body.dataScaleX;
    var vertical = req.body.dataScaleY;
    var rotate = req.body.dataRotate;


    Jimp.read('public/uploads/'+input.imagem, function (err, image) {
        if (err) throw err; 
        
        if(horizontal == -1 && vertical == -1){
            image.crop(datax, datay, datawidth ,dataheight)
            .resize(1060, 700)
            .flip( true, true )
            .rotate( rotate, false )
            .quality(100)
            .background(0xFFFFFFFF)
            .write('newfile.jpg');
        }else if (vertical == -1){

            image.crop(datax, datay, datawidth ,dataheight)
            .flip( false, true )
            .rotate( rotate, false )
            .resize(1060, 700)
            .quality(100)
            .background(0xFFFFFFFF)
            .write('newfile.jpg');
        }else if ( horizontal == -1){

            image.crop(datax, datay, datawidth ,dataheight)
            .flip( true, false )
            .rotate( rotate, false )
            .resize(1060, 700)
            .quality(100)
            .background(0xFFFFFFFF)
            .write('newfile.jpg');
        }else{
            image.crop(datax, datay, datawidth ,dataheight)
            .rotate( rotate, true )
            .resize(1060, 700)
            .quality(100)
            .background(0xFFFFFFFF)
            .write('newfile.jpg');
        }
        

    });
    res.redirect('/customers');
  };