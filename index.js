const express=require('express') ;
const engine=require('ejs-locals') ;
const path=require('path') ;
const Request=require('request');

const app=express() ;
const bodyParser=require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.engine('ejs',engine) ;
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));



app.get('/',(req,res)=>{
    res.render('home');
});


app.post('/find',urlencodedParser,(reqq,ress)=>{
    dt=reqq.body;
    aa=dt['t1'];
    Request.post({
        'headers':{'content-type':'application/json'},
        'url':'https://saksham-github-api.herokuapp.com/get_repo',
        'body':JSON.stringify({
            'repo':aa
        })

    },(err,res,body)=>{
        // console.log(JSON.parse(body));

        var bc=JSON.parse(body);
        ress.render('result',{'data':bc,'dta':aa});
    });

    

    // ress.render('result',{'data':data});
});







app.listen(process.env.PORT || 7500,()=>{
    //console.log(app.get('views'))
    
    console.log(`Express running→PORT 7500`);
});


